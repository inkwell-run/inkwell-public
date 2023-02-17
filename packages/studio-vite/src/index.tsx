import "./styles/globals.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

const ManuscriptStudio = <RouterProvider router={router} />;

export default { ManuscriptStudio };
