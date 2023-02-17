import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { GlobalStateAtom } from "./lib/store";
import { Root } from "./pages/root";
import { Schemas } from "./pages/schemas/schemas";
import { IManuscriptStudioProps } from "./pages/_app";
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
    ],
  },
]);

export const ManuscriptStudio = (props: IManuscriptStudioProps) => {
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => ({
      ...prev,
      baseProps: props,
    }));
  }, [props]);

  return <RouterProvider router={router} />;
};
