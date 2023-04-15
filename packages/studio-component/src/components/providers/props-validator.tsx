import React, { useEffect } from "react";
import { AlertScreen } from "../alert-screen";
import {
  IInkwellStudioPropsInput,
  ZInkwellStudioProps,
} from "../../lib/base-props";
import { useSetAtom } from "jotai";
import { GlobalStateAtom } from "../../lib/store";

interface IPropsValidatorProps {
  props: IInkwellStudioPropsInput;
  children: React.ReactNode;
}

export const PropsValidator = ({ children, props }: IPropsValidatorProps) => {
  // parse props
  const parsedProps = ZInkwellStudioProps.safeParse(props);

  // set props on global state
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    if (parsedProps.success) {
      setGlobalState((prev) => ({
        ...prev,
        baseProps: {
          ...parsedProps.data,
        },
      }));
    }
  }, [props]);

  if (!parsedProps.success) {
    console.error(parsedProps.error);
    return (
      <AlertScreen type="error">
        Something went wrong while parsing your props. Please check the console
        for more information.
      </AlertScreen>
    );
  }

  // check if there are any duplicate schemas
  const schemaDuplicateChecker = parsedProps.data.schemas.reduce(
    (prev, curr) => {
      if (!(curr.name in prev)) {
        prev[curr.name] = 0;
      }
      prev[curr.name] += 1;
      return prev;
    },
    {} as Record<string, number>
  );

  if (Object.values(schemaDuplicateChecker).some((v) => v > 1)) {
    return (
      <AlertScreen type="error">
        Duplicate schemas detected. Please make sure that all schemas have a
        unique name.
      </AlertScreen>
    );
  }

  return <>{children}</>;
};
