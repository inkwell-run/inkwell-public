import React from "react";
import Markdoc from "@markdoc/markdoc";

interface IMarkdocPreviewProps {
  value: string;
}

const MarkdocPreview = (props: IMarkdocPreviewProps) => {
  const { value } = props;
  const ast = Markdoc.parse(value);
  const content = Markdoc.transform(ast /* config */);
  const html = Markdoc.renderers.html(content);

  return (
    <div
      className="px-4 py-2 overflow-hidden border rounded-md"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdocPreview;
