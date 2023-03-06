import { markdown } from "@codemirror/lang-markdown";
import {
  CodeEditor as lqkfj,
  SandpackCodeEditor,
  SandpackFiles,
  SandpackLayout,
  SandpackProvider,
  useActiveCode,
} from "@codesandbox/sandpack-react";
import { useDebounce } from "use-debounce";
import React, { useEffect, useState } from "react";

interface IMarkdocEditorProps {
  initialValue: string;
  setValue: (newValue: string) => void;
}

export const MarkdocEditor = (props: IMarkdocEditorProps) => {
  const [files] = useState<SandpackFiles>({
    "post.markdoc": {
      code: props.initialValue,
      active: true,
    },
  });

  return (
    <SandpackProvider
      files={files}
      theme="light"
      template="vanilla-ts"
      className="h-full"
    >
      <SandpackLayout className="h-full">
        <CodeEditor {...props} />
      </SandpackLayout>
    </SandpackProvider>
  );
};

const CodeEditor = (props: IMarkdocEditorProps) => {
  const { code } = useActiveCode();
  const [debouncedCode] = useDebounce(code, 1000);

  useEffect(() => {
    props.setValue(debouncedCode);
  }, [debouncedCode]);

  return (
    <SandpackCodeEditor
      style={{ height: "100%" }}
      showInlineErrors
      showLineNumbers
      wrapContent
      additionalLanguages={[
        {
          name: "markdoc",
          extensions: ["markdoc"],
          language: markdown(),
        },
      ]}
    />
  );
};
