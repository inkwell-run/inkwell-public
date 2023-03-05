import { markdown } from "@codemirror/lang-markdown";
import {
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
    <SandpackProvider files={files} theme="light" template="vanilla-ts">
      <SandpackLayout>
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
  );
};
