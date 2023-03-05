import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFiles,
} from "@codesandbox/sandpack-react";
import { markdown } from "@codemirror/lang-markdown";

interface IMarkdocEditorProps {
  initialValue: string;
}

export const MarkdocEditor = (props: IMarkdocEditorProps) => {
  const { initialValue } = props;

  const files: SandpackFiles = {
    "post.markdoc": {
      code: initialValue,
      active: true,
    },
  };

  return (
    <SandpackProvider files={files} theme="light" template="vanilla-ts">
      <SandpackLayout>
        <SandpackCodeEditor
          showInlineErrors
          showLineNumbers
          additionalLanguages={[
            {
              name: "markdoc",
              extensions: ["markdoc"],
              language: markdown(),
            },
          ]}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};
