import { ITheme } from "@manuscript/lib";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import { AnyZodObject } from "zod";
import { router } from "./_routes";

export interface ISchema {
  name: string;
  validator: AnyZodObject;
}

export interface IManuscriptStudioProps {
  accessToken: string;
  schemas: ISchema[];
  _themeOverride?: ITheme;
}

export const ManuscriptStudio = (props: IManuscriptStudioProps) => {
  return (
    // <PropsProvider {...props}>
    <RouterProvider router={router} />
    // </PropsProvider>
  );
};
