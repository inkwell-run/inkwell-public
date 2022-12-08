import { useAtomValue } from "jotai";
import React from "react";
import { ISchema } from "./_app";
import { GlobalStateAtom } from "../lib/store";

const SchemasPage = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { schemas } = baseProps;

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <h1 className="text-lg">Schemas</h1>
      <p>These are all the schemas you have defined</p>
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
      <div>{schema.name}</div>
      <div className="flex gap-2">
        {Object.keys(schema.validator.shape).map((k) => {
          return (
            <div key={k} className="px-2 py-1 bg-gray-500 rounded-md">
              {k}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemasPage;
