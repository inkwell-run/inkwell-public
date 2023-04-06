import { RouterProvider } from "react-router-dom";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { AlertScreen } from "./components/alert-screen";
import {
  IInkwellStudioPropsInput,
  ZInkwellStudioProps,
} from "./lib/base-props";
import { GlobalStateAtom } from "./lib/store";
import "./styles/globals.css";
import { createHashRouter } from "react-router-dom";
import { Root } from "./pages/root";
import { Schemas } from "./pages/schemas/schemas";
import { Posts } from "./pages/posts/posts";
import { Post } from "./pages/posts/post";
import { Assets } from "./pages/assets/assets";

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

  // set props on global state
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    if (parsedProps.success) {
      setGlobalState((prev) => ({
        ...prev,
        baseProps: {
          ...parsedProps.data,
        },
      }));
    }
  }, [props]);

  if (!parsedProps.success) {
    console.error(parsedProps.error);
    return (
      <AlertScreen type="error">
        Something went wrong while parsing your props. Please check the console
        for more information.
      </AlertScreen>
    );
  }

  // check if there are any duplicate schemas
  const schemaDuplicateChecker = parsedProps.data.schemas.reduce(
    (prev, curr) => {
      if (!(curr.name in prev)) {
        prev[curr.name] = 0;
      }
      prev[curr.name] += 1;
      return prev;
    },
    {} as Record<string, number>
  );

  if (typeof window === "undefined") {
    return null;
  }

  if (Object.values(schemaDuplicateChecker).some((v) => v > 1)) {
    return (
      <AlertScreen type="error">
        Duplicate schemas detected. Please make sure that all schemas have a
        unique name.
      </AlertScreen>
    );
  }

  return <RouterProvider router={router} />;
};
