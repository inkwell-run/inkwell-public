import type { WritableAtom } from "jotai";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import React from "react";
import { AlertScreen } from "../components/alert-screen";
import {
  IInkwellStudioPropsInput,
  ZInkwellStudioProps,
} from "../lib/base-props";
import { GlobalStateAtom, makeDefaultGlobalState } from "../lib/store";

interface IPropsValidatorProps {
  props: IInkwellStudioPropsInput;
  children: React.ReactNode;
}

// checks props and loads them into the global state
export const PropsValidator = ({ children, props }: IPropsValidatorProps) => {
  // parse props
  const parsedProps = ZInkwellStudioProps.safeParse(props);

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

  return (
    <Provider>
      <HydrateAtoms
        initialValues={[
          [
            GlobalStateAtom,
            {
              ...makeDefaultGlobalState(),
              baseProps: parsedProps.data,
            },
          ],
        ]}
      >
        {children}
      </HydrateAtoms>
    </Provider>
  );
};

interface IHydrateAtomsProps {
  initialValues: Array<[WritableAtom<any, any, any>, any]>;
  children: React.ReactNode;
}

const HydrateAtoms = (props: IHydrateAtomsProps) => {
  // initialising on state with prop on render here
  useHydrateAtoms(props.initialValues);
  return <>{props.children}</>;
};
