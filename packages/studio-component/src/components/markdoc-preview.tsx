import Markdoc from "@markdoc/markdoc";
import React from "react";
import { markdocComponents } from "./markdoc/components";
import { markdocConfig } from "./markdoc/config";

interface IMarkdocPreviewProps {
  value: string;
}

const MarkdocPreview = (props: IMarkdocPreviewProps) => {
  const { value } = props;
  const ast = Markdoc.parse(value);
  const content = Markdoc.transform(ast, markdocConfig);
  const renderedNodes = Markdoc.renderers.react(content, React, {
    components: markdocComponents,
  });

  return (
    <div className="h-full px-4 py-8 overflow-y-auto border rounded-md">
      {renderedNodes}
    </div>
  );
};

export default MarkdocPreview;
