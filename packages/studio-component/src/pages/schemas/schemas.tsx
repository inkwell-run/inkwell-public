import { TypographySmall, TypographySubtle } from "@doom.sh/ui";
import { useAtomValue } from "jotai";
import React from "react";
import { AlertBox } from "../../components/alert-box";
import { GlobalStateAtom } from "../../lib/store";
import { ISchema } from "../_app";

export const Schemas = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { schemas } = baseProps;

  // check if there are any duplicate schemas
  const schemaDuplicateChecker = schemas.reduce((prev, curr) => {
    if (!(curr.name in prev)) {
      prev[curr.name] = 0;
    }
    prev[curr.name] += 1;
    return prev;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col gap-4">
      {/* heading */}
      <div className="text-lg font-medium">Schemas</div>
      {/* duplicate schema checker */}
      {Object.values(schemaDuplicateChecker).some((v) => v > 1) ? (
        <AlertBox>
          Duplicate schemas detected. Please make sure that all schemas have a
          unique name.
        </AlertBox>
      ) : null}
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
      <pre className="h-[200px] overflow-y-auto rounded-md border p-4 text-xs">
        <TypographySubtle>
          {JSON.stringify(schema.validator.shape, null, 2)}
        </TypographySubtle>
      </pre>
    </div>
  );
};
