import * as InkwellApi from "@inkwell.run/client";
import { constructUploadCareUrl } from "../uploadcare/utils";

function joinPaths(...paths: string[]) {
  return paths
    .map((path) => path.trim())
    .join("/")
    .replace(/\/\/+/g, "/");
}

interface IConstructAssetUrlProps {
  asset: Awaited<
    ReturnType<typeof InkwellApi.AssetsService.queryAssetsFindMany>
  >[number];
  resizeWidth?: number;
}

export const constructAssetUrl = (props: IConstructAssetUrlProps) => {
  const { asset, resizeWidth } = props;

  if (asset.providerType === "UPLOADCARE") {
    return constructUploadCareUrl({
      uuid: asset.providerId,
      resizeWidth,
    });
  }

  if (asset.providerType === "UPLOADIO") {
    const url = new URL(
      joinPaths("kW15b6m", "image", asset.providerId),
      "https://upcdn.io"
    );
    const params = new URLSearchParams();
    if (resizeWidth) {
      params.set("w", String(resizeWidth));
    }
    url.search = params.toString();
    return url.toString();
  }

  return asset.providerId;
};
