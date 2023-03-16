import { useAtomValue } from "jotai";
import { AlertCircle } from "lucide-react";
import React from "react";
import { GlobalStateAtom } from "../lib/store";

interface IPropsValidatorProps {}

export const PropsValidator = (
  props: React.PropsWithChildren<IPropsValidatorProps>
) => {
  const { baseProps } = useAtomValue(GlobalStateAtom);

  // check if there are any duplicate schemas
  const schemaDuplicateChecker = baseProps.schemas.reduce((prev, curr) => {
    if (!(curr.name in prev)) {
      prev[curr.name] = 0;
    }
    prev[curr.name] += 1;
    return prev;
  }, {} as Record<string, number>);

  if (Object.values(schemaDuplicateChecker).some((v) => v > 1)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p>
            Duplicate schemas detected. Please make sure that all schemas have a
            unique name.
          </p>
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
};
