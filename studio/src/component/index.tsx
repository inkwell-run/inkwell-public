import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { AnyZodObject } from "zod";
import * as ManuscriptApi from "../api-client";
import PostsPage from "./pages/posts";
import SchemasPage from "./pages/schemas";
import Sidebar from "./sidebar";
import { GlobalStateAtom } from "./store";
import { Toaster } from "react-hot-toast";

const rootRoute = createRouteConfig();

const postsRoute = rootRoute.createRoute({
  path: "/",
  component: PostsPage,
});

const schemasRoute = rootRoute.createRoute({
  path: "/schemas",
  component: SchemasPage,
});

const routeConfig = rootRoute.addChildren([postsRoute, schemasRoute]);

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});

const router = createReactRouter({ routeConfig, history: memoryHistory });

ManuscriptApi.OpenAPI.BASE = "http://localhost:3001/api";

const queryClient = new QueryClient();

export interface ISchema {
  name: string;
  validator: AnyZodObject;
}

export interface IManuscriptStudioProps {
  accessToken: string;
  schemas: ISchema[];
}

export const ManuscriptStudio = (props: IManuscriptStudioProps) => {
  const { accessToken } = props;
  ManuscriptApi.OpenAPI.TOKEN = accessToken;

  // set globals
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => {
      return {
        ...prev,
        baseProps: props,
      };
    });
  }, [props]);

  return (
    <RouterProvider router={router}>
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full h-full dark:bg-gray-800 dark:text-slate-50">
          <Sidebar />
          <Outlet />
          <Toaster />
        </div>
      </QueryClientProvider>
    </RouterProvider>
  );
};
