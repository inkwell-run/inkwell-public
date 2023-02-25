import { AnyZodObject } from "zod";

export interface ISchema {
  name: string;
  validator: AnyZodObject;
}

export interface IInkwellStudioProps {
  accessToken: string;
  schemas: ISchema[];
  _themeOverride?: "light" | "dark";
}
