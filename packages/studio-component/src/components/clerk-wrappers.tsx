import { useAtomValue } from "jotai";
import React from "react";
import { GlobalStateAtom } from "../lib/store";

interface IUseClerkSafeProps {
  initialValue?: boolean;
}

export const useClerkSafe = (props?: IUseClerkSafeProps) => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  return {
    isSafe:
      typeof props?.initialValue !== "undefined"
        ? props.initialValue
        : baseProps.enableUserAuth,
  };
};

interface IClerkSafeProps {
  children: React.ReactNode;
}

export const ClerkSafe = ({ children }: IClerkSafeProps) => {
  const { isSafe } = useClerkSafe();
  if (isSafe) {
    return <>{children}</>;
  }
  return null;
};
