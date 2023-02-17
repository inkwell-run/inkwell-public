import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
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
    ],
  },
]);

export const ManuscriptStudio = <RouterProvider router={router} />;
