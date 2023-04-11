import { Button } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { UploadButton } from "react-uploader";
import { Uploader, UploadWidgetResult } from "uploader";

export const UploadIO = Uploader({
  apiKey: "public_kW15b6mBPTtCyNQL8A5aVwgKTctt",
});

interface IUploadIOButtonProps {
  onComplete: (files: UploadWidgetResult[]) => void;
}

export const UploadIOButton = (props: IUploadIOButtonProps) => {
  const { onComplete } = props;

  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: InkwellApi.AccessTokensService.queryAccessTokensTest,
  });

  if (!accessTokenQuery.data?.organizationId) {
    return null;
  }

  return (
    <UploadButton
      uploader={UploadIO}
      options={{
        multi: true,
        path: {
          folderPath: `/inkwell/${accessTokenQuery.data.organizationId}`,
        },
      }}
      onComplete={onComplete}
    >
      {({ onClick }) => <Button onClick={onClick}>Upload a file...</Button>}
    </UploadButton>
  );
};
