import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { GlobalStateAtom } from "./lib/store";
import { Posts } from "./pages/posts/posts";
import { Post } from "./pages/posts/post";
import { Root } from "./pages/root";
import { Schemas } from "./pages/schemas/schemas";
import { IInkwellStudioProps } from "./pages/_app";
import "./styles/globals.css";

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
    ],
  },
]);

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
