import { atom } from "jotai";
import { IInkwellStudioProps } from "../baseProps";

export interface IGlobalState {
  baseProps: IInkwellStudioProps;
}

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
    enableUserAuth: false,
    baseUrl: "",
  },
});
