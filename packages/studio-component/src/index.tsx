import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { GlobalStateAtom } from "./lib/store";
import { Assets } from "./pages/assets/assets";
import { Post } from "./pages/posts/post";
import { Posts } from "./pages/posts/posts";
import { Root } from "./pages/root";
import { Schemas } from "./pages/schemas/schemas";
import "./styles/globals.css";
import { AnyZodObject } from "zod";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "schemas",
        element: <Schemas />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
      },
      {
        path: "assets",
        element: <Assets />,
      },
    ],
  },
]);

export interface ISchema {
  name: string;
  validator: AnyZodObject;
}

export interface IInkwellStudioProps {
  accessToken: string;
  schemas: ISchema[];

  // enable user authentication. default: true
  enableUserAuth?: boolean;

  // experimental
  _themeOverride?: "light" | "dark";
  _baseUrlOverride?: string;
}

export const InkwellStudio = (props: IInkwellStudioProps) => {
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => ({
      ...prev,
      baseProps: props,
    }));
  }, [props]);

  return <RouterProvider router={router} />;
};
