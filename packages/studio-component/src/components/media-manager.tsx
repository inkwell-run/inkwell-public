import React, { useState } from "react";
import { UploadCareWidget } from "./uploadcare";
import * as InkwellApi from "@inkwell/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUploadCareFile } from "./uploadcare/types";

interface IMediaManagerProps {
  postId: number;
}
const MediaManager = (props: IMediaManagerProps) => {
  const { postId } = props;
  const [media, setMedia] = useState<string[]>([]);

  const getAssets = useQuery({
    queryKey: ["assets", postId],
    queryFn: () => InkwellApi.AssetsService.queryAssetsFindMany(postId),
  });

  const createAsset = useMutation({
    mutationFn: InkwellApi.AssetsService.mutationAssetsCreate,
    onSuccess: () => {
      getAssets.refetch();
    },
  });

  const onUploadCallback = (files: IUploadCareFile[]) => {
    console.log({ files });
    files.forEach((f) => {
      createAsset.mutate({
        postId,
        providerId: f.uuid,
        providerType: "UPLOADCARE",
      });
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {/* dropzone */}
      {/* <div
        {...getRootProps({})}
        className="w-[25%] md:w-[150px] flex flex-col items-center justify-center gap-2 p-4 text-center bg-gray-200 rounded-md aspect-square"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <TypographySubtle>Drop files here</TypographySubtle>
        ) : (
          <>
            <TypographySubtle>Drag files here</TypographySubtle>
            <Button>Browse</Button>
          </>
        )}
      </div> */}
      <UploadCareWidget onUploadCallback={onUploadCallback} />
      {JSON.stringify(getAssets.data, null, 2)}
      {/* files */}
      {media.map((url) => {
        return (
          <div className="border first-letter:w-[25%] md:w-[150px] flex flex-col items-center justify-center gap-2 overflow-hidden text-center bg-gray-200 rounded-md aspect-square">
            <img src={url} alt="" className="object-cover w-full h-full" />
          </div>
        );
      })}
    </div>
  );
};

export default MediaManager;
