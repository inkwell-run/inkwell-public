interface IConstructUploadCareUrlProps {
  uuid: string;
  resizeWidth?: number;
}

export const constructUploadCareUrl = (props: IConstructUploadCareUrlProps) => {
  const { uuid, resizeWidth } = props;

  if (resizeWidth) {
    return `https://ucarecdn.com/${uuid}/-/resize/${resizeWidth}x/`;
  }

  return `https://ucarecdn.com/${uuid}/`;
};
