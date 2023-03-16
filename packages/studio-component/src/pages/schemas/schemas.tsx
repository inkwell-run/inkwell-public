import { TypographySmall, TypographySubtle } from "@doom.sh/ui";
import { useAtomValue } from "jotai";
import React from "react";
import { GlobalStateAtom } from "../../lib/store";
import { ISchema } from "../_app";

export const Schemas = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { schemas } = baseProps;

  return (
    <div className="flex flex-col gap-4">
      {/* heading */}
      <div className="text-lg font-medium">Schemas</div>
      {/* display schemas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {schemas.map((s, i) => {
          return <SchemaDisplay schema={s} key={`${i}-${s.name}`} />;
        })}
      </div>
    </div>
  );
};

interface ISchemaDisplayProps {
  schema: ISchema;
}
const SchemaDisplay = (props: ISchemaDisplayProps) => {
  const { schema } = props;
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md shadow-sm border-color">
      <TypographySmall>{schema.name}</TypographySmall>
      <pre className="h-[200px] overflow-auto rounded-md border p-4 text-xs">
        <TypographySubtle>
          {JSON.stringify(schema.validator.shape, null, 2)}
        </TypographySubtle>
      </pre>
    </div>
  );
};
