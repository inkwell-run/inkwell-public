import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { IInkwellStudioPropsInput, ZInkwellStudioProps } from "./baseProps";
import { GlobalStateAtom } from "./lib/store";
import { Assets } from "./pages/assets/assets";
import { Post } from "./pages/posts/post";
import { Posts } from "./pages/posts/posts";
import { Root } from "./pages/root";
import { Schemas } from "./pages/schemas/schemas";
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
      {
        path: "assets",
        element: <Assets />,
      },
    ],
  },
]);

export const InkwellStudio = (props: IInkwellStudioPropsInput) => {
  // parse props
  const parsedProps = ZInkwellStudioProps.safeParse(props);
  if (!parsedProps.success) {
    throw new Error(parsedProps.error.message);
  }

  // set props on global state
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => ({
      ...prev,
      baseProps: {
        ...parsedProps.data,
      },
    }));
  }, [props]);

  return <RouterProvider router={router} />;
};
