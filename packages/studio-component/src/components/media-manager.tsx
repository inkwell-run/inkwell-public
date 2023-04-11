import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  toast,
} from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Clipboard, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { constructAssetUrl } from "./assets/utils";
import { UploadIOButton } from "./uploadio";

interface IMediaManagerProps {
  postId: string;
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

  return (
    <div className="flex flex-col gap-4">
      <UploadIOButton
        onComplete={(files) => {
          files.forEach((f) => {
            createAsset.mutate({
              postId,
              providerId: f.filePath,
              providerType: "UPLOADIO",
              name: f.editedFile?.file.name ?? f.originalFile.file.name,
            });
          });
        }}
      />
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
    window.navigator.clipboard.writeText(constructAssetUrl({ asset }));
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
      {/* todo(sarim): offer to clean up unused assets if error during image load */}
      <img
        src={constructAssetUrl({
          asset,
          resizeWidth: 200,
        })}
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
                <Clipboard className="w-4 h-4" />
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
                <Trash className="w-4 h-4" />
                <div>Delete</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
