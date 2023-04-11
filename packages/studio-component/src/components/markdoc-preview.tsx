import Markdoc from "@markdoc/markdoc";
import type { Config } from "@markdoc/markdoc";
import React from "react";
import { markdocComponents } from "./markdoc/components";
import { markdocConfig } from "./markdoc/config";

interface IMarkdocPreviewProps {
  value: string;
  userOverrides: {
    components: Record<string, React.FC<any>>;
    config: Config;
  };
}

const MarkdocPreview = (props: IMarkdocPreviewProps) => {
  const { value, userOverrides } = props;
  const ast = Markdoc.parse(value);
  const content = Markdoc.transform(ast, {
    ...markdocConfig,
    ...userOverrides.config,
  });
  const renderedNodes = Markdoc.renderers.react(content, React, {
    components: { ...markdocComponents, ...userOverrides.components },
  });

  return (
    <div className="h-full px-4 py-8 overflow-y-auto">{renderedNodes}</div>
  );
};

export default MarkdocPreview;
