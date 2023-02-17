import { ITheme } from "@manuscript/lib";
import { AnyZodObject } from "zod";

export interface ISchema {
  name: string;
  validator: AnyZodObject;
}

export interface IManuscriptStudioProps {
  accessToken: string;
  schemas: ISchema[];
  _themeOverride?: ITheme;
}