import { EventData } from "@uploadcare/blocks/abstract/EventManager";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lr-cloud-editor": any;
      "lr-crop-frame": any;
      "lr-editor-crop-button-control": any;
      "lr-editor-filter-control": any;
      "lr-editor-operation-control": any;
      "lr-editor-image-cropper": any;
      "lr-editor-image-fader": any;
      "lr-editor-scroller": any;
      "lr-editor-slider": any;
      "lr-editor-toolbar": any;
      "lr-lr-btn-ui": any;
      "lr-line-loader-ui": any;
      "lr-presence-toggle": any;
      "lr-slider-ui": any;
      "lr-icon": any;
      "lr-img": any;
      "lr-simple-btn": any;
      "lr-start-from": any;
      "lr-drop-area": any;
      "lr-source-btn": any;
      "lr-source-list": any;
      "lr-file-item": any;
      "lr-modal": any;
      "lr-upload-list": any;
      "lr-url-source": any;
      "lr-camera-source": any;
      "lr-upload-details": any;
      "lr-message-box": any;
      "lr-confirmation-dialog": any;
      "lr-progress-bar-common": any;
      "lr-progress-bar": any;
      "lr-editable-canvas": any;
      "lr-cloud-image-editor": any;
      "lr-external-source": any;
      "lr-tabs": any;
      "lr-data-output": LrDataOutputProps;
      "lr-activity-heading": any;
      "lr-file-uploader-regular": LrFileUploaderRegularProps;
      "lr-file-uploader-minimal": any;
    }
  }
}

interface LrFileUploaderRegularProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  class: string;
  "css-src": string;
}

interface LrDataOutputProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  "use-event": boolean;
  hidden: boolean;
  class: string;
  onEvent: (e: IUploadCareEvent) => void;
}

export interface IUploadCareEvent extends Event {
  detail: {
    timestamp: number;
    ctxName: string;
    data: IUploadCareFile[];
  };
}

export interface IUploadCareFile {
  cdnUrl: string;
  cdnUrlModifiers: string;
  isImage: boolean;
  isStored: boolean;
  mimeType: string;
  name: string;
  originalFilename: string;
  size: number;
  uuid: string;
}
