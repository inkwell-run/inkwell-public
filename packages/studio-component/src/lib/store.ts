import { atom } from "jotai";
import { IInkwellStudioProps } from "../pages/_app";

export interface IGlobalState {
  baseProps: IInkwellStudioProps;
}

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
  },
});
