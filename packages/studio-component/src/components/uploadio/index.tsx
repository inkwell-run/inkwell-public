import React from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Button } from "@doom.sh/ui";

const uploader = Uploader({ apiKey: "public_kW15b6mBPTtCyNQL8A5aVwgKTctt" });

export const UploadIOButton = () => {
  return (
    <UploadButton
      uploader={uploader}
      options={{ multi: true }}
      onComplete={(files) => alert(files.map((x) => x.fileUrl).join("\n"))}
    >
      {({ onClick }) => <Button onClick={onClick}>Upload a file...</Button>}
    </UploadButton>
  );
};
