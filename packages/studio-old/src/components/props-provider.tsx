import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { GlobalStateAtom } from "../lib/store";
import { IManuscriptStudioProps } from "../pages/_app";

const PropsProvider = (
  props: React.PropsWithChildren<IManuscriptStudioProps>
) => {
  const { children, ...rest } = props;

  // set globals
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => {
      return {
        ...prev,
        baseProps: rest,
      };
    });
  }, [rest]);

  return <>{children}</>;
};

export default PropsProvider;
