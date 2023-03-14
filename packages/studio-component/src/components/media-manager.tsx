import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  toast,
} from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipboardIcon, MoreHorizontal, TrashIcon } from "lucide-react";
import React from "react";
import { UploadCareWidget } from "./uploadcare";
import { IUploadCareFile } from "./uploadcare/types";
import { constructUploadCareUrl } from "./uploadcare/utils";

interface IMediaManagerProps {
  postId: number;
}

export const MediaManager = (props: IMediaManagerProps) => {
  const { postId } = props;

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
    <div className="flex flex-col gap-4">
      <UploadCareWidget onUploadCallback={onUploadCallback} />
      <div className="flex flex-wrap gap-4">
        {(getAssets.data ?? []).map((asset) => {
          return (
            <MediaItem
              asset={asset}
              key={asset.id}
              refetchAssets={getAssets.refetch}
            />
          );
        })}
      </div>
    </div>
  );
};

interface IMediaItemProps {
  asset: Awaited<
    ReturnType<typeof InkwellApi.AssetsService.queryAssetsFindMany>
  >[number];
  refetchAssets: () => void;
}

const MediaItem = (props: IMediaItemProps) => {
  const { asset } = props;

  const handleCopyClipboard = () => {
    toast.success("Copied to clipboard");
    window.navigator.clipboard.writeText(
      constructUploadCareUrl(asset.providerId)
    );
  };

  // todo(sarim): don't delete if used inside text
  const assetDelete = useMutation({
    mutationFn: InkwellApi.AssetsService.mutationAssetsDelete,
    onSuccess: () => {
      props.refetchAssets();
    },
  });

  return (
    <div className="relative border first-letter:w-[25%] md:w-[150px] flex flex-col items-center justify-center gap-2 overflow-hidden text-center bg-gray-200 rounded-md aspect-square">
      <img
        src={constructUploadCareUrl(asset.providerId)}
        alt={"uploaded media"}
        className="object-cover w-full h-full"
      />
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center w-4 h-4 p-4 bg-white border rounded-full shadow-md cursor-pointer">
            <MoreHorizontal className="w-4 h-4 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="my-2">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleCopyClipboard}
              >
                <ClipboardIcon className="w-4 h-4" />
                <div>Copy</div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => {
                  toast.promise(
                    assetDelete.mutateAsync({
                      assetId: asset.id,
                    }),
                    {
                      loading: "Deleting...",
                      success: "Deleted!",
                      error: "Error deleting asset",
                    }
                  );
                }}
              >
                <TrashIcon className="w-4 h-4" />
                <div>Delete</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
