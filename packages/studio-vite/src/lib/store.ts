import { atom } from "jotai";
import { IManuscriptStudioProps } from "../pages/_app";

export interface IGlobalState {
  baseProps: IManuscriptStudioProps;
}

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
  },
});
