import { atom } from "jotai";
import { IInkwellStudioProps } from "./base-props";

export interface IGlobalState {
  baseProps: IInkwellStudioProps;
}

export const makeDefaultGlobalState = (): IGlobalState => {
  return {
    baseProps: {
      accessToken: "",
      schemas: [],
      baseUrl: "",
    },
  };
};

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
    baseUrl: "",
  },
});
