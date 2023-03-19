import { atom } from "jotai";
import { IInkwellStudioProps } from "../index";

export interface IGlobalState {
  baseProps: IInkwellStudioProps;
}

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
    enableUserAuth: true,
  },
});
