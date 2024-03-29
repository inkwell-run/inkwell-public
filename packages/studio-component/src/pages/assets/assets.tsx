import {
  Checkbox,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  TypographyInlineCode,
  TypographyLarge,
  toast,
} from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { Link } from "lucide-react";
import React from "react";
import { constructAssetUrl } from "../../components/assets/utils";
import DateCycler from "../../components/date-cycler";
import { UploadIOButton } from "../../components/uploadio";

export const Assets = () => {
  const getAssets = useQuery({
    queryKey: ["assets"],
    queryFn: () => InkwellApi.AssetsService.queryAssetsFindMany(),
  });

  const createAsset = useMutation({
    mutationFn: InkwellApi.AssetsService.mutationAssetsCreate,
    onSuccess: () => {
      getAssets.refetch();
    },
  });

  if (getAssets.isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
        <p>Loading assets...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      {/* header */}
      <TypographyLarge>Assets</TypographyLarge>
      {/* add asset */}
      <UploadIOButton
        className="w-fit"
        onComplete={(files) => {
          files.forEach((f) => {
            toast.promise(
              createAsset.mutateAsync({
                providerId: f.filePath,
                providerType: "UPLOADIO",
                name: f.editedFile?.file.name ?? f.originalFile.file.name,
              }),
              {
                loading: `Adding asset...`,
                success: `Added asset successfully`,
                error: `Failed to add asset`,
              }
            );
          });
        }}
      />
      {/* assets list */}
      <AssetsList assets={getAssets.data ?? []} />
    </div>
  );
};

interface IAssetsListProps {
  assets: Awaited<
    ReturnType<typeof InkwellApi.AssetsService.queryAssetsFindMany>
  >;
}

const AssetsList = (props: IAssetsListProps) => {
  const { assets } = props;

  return (
    <div className="flex flex-col gap-8">
      {/* post items */}
      <div className="flex flex-col gap-4">
        {assets
          ?.sort((a, b) =>
            compareDesc(new Date(a.createdAt), new Date(b.createdAt))
          )
          .map((a) => (
            <div className="flex items-center gap-4" key={a.id}>
              <Checkbox />
              <AssetDisplay asset={a} />
            </div>
          ))}
      </div>
    </div>
  );
};

interface IAssetDisplayProps {
  asset: Awaited<
    ReturnType<typeof InkwellApi.AssetsService.queryAssetsFindMany>
  >[number];
}

const AssetDisplay = (props: IAssetDisplayProps) => {
  const { asset } = props;
  return (
    <div className="flex items-center justify-between flex-1 gap-4 px-4 py-2 border rounded shadow-sm">
      <div className="flex items-center gap-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <img
              className="object-cover w-6 h-6 rounded-md cursor-pointer"
              src={constructAssetUrl({
                asset,
                resizeWidth: 100,
              })}
            />
          </HoverCardTrigger>
          <HoverCardContent className="p-2 w-80" align="start">
            <img
              className="object-cover w-full h-full rounded"
              src={constructAssetUrl({
                asset,
              })}
            />
          </HoverCardContent>
        </HoverCard>
        <TypographyInlineCode className="truncate">
          {asset.name ?? asset.providerId}
        </TypographyInlineCode>
      </div>
      <div className="flex items-center gap-4">
        <LinkUseStats asset={asset} />
        <DateCycler createdAt={asset.createdAt} />
      </div>
    </div>
  );
};

interface ILinkUseStatsProps {
  asset: Awaited<
    ReturnType<typeof InkwellApi.AssetsService.queryAssetsFindMany>
  >[number];
}

const LinkUseStats = (props: ILinkUseStatsProps) => {
  const { asset } = props;
  return (
    <div className="flex items-center gap-2 px-2 py-0.5 bg-slate-200 rounded-full">
      <Link className="w-2 h-2 opacity-50" />
      <div className="font-mono text-xs opacity-50">
        {asset.usedInPostIds?.length}/{asset.linkedPostIds?.length ?? 0}
      </div>
    </div>
  );
};
