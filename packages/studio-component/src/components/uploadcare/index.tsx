import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks/env";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./index.css";
import { IUploadCareEvent, IUploadCareFile } from "./types";
LR.registerBlocks(LR);

export interface IUploadCareWidgetProps {
  onUploadCallback: (files: IUploadCareFile[]) => void;
}

const UploadCareWidget = (props: IUploadCareWidgetProps) => {
  let dataOutputRef = useRef<HTMLDivElement>(null);

  const handleUploaderEvent = useCallback((e: Event) => {
    const detail = (e as IUploadCareEvent).detail;
    console.log({ event: e });
    props.onUploadCallback(detail.data ?? []);
  }, []);

  useEffect(() => {
    let el = dataOutputRef.current;
    if (el) {
      el.addEventListener("lr-data-output", handleUploaderEvent);
    }
    return () => {
      if (el) {
        el.removeEventListener("lr-data-output", handleUploaderEvent);
      }
    };
  }, [handleUploaderEvent]);

  return (
    <lr-file-uploader-regular
      class="uploaderCfg"
      css-src={`https://unpkg.com/@uploadcare/blocks@${PACKAGE_VERSION}/web/file-uploader-regular.min.css`}
    >
      <lr-data-output
        ref={dataOutputRef}
        use-event
        hidden
        class="uploaderCfg"
        onEvent={handleUploaderEvent}
      ></lr-data-output>
    </lr-file-uploader-regular>
  );
};

// React.lazy currently only supports default exports. If the module you want to
// import uses named exports, you can create an intermediate module that
// reexports it as the default. This ensures that tree shaking keeps working and
// that you don’t pull in unused components.
export default UploadCareWidget;
