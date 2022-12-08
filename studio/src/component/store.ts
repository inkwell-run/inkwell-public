import { atom } from "jotai";
import { IManuscriptStudioProps } from ".";

export interface IGlobalState {
  baseProps: IManuscriptStudioProps;
}

export const GlobalStateAtom = atom<IGlobalState>({
  baseProps: {
    accessToken: "",
    schemas: [],
  },
});
