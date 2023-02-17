import { Shell, UIProvider } from "@manuscript/lib";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import * as ManuscriptApi from "@manuscript/api-client";
import AuthProvider from "../components/auth-provider";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { GlobalStateAtom } from "../lib/store";
import { Outlet } from "react-router-dom";

ManuscriptApi.OpenAPI.BASE = "http://localhost:3001/api";

const queryClient = new QueryClient();

export const Root = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { accessToken, _themeOverride } = baseProps;

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider _themeOverride={_themeOverride}>
        <AuthProvider accessToken={accessToken}>
          <Shell navbar={<Sidebar />} header={<Header />}>
            <Outlet />
          </Shell>
        </AuthProvider>
      </UIProvider>
    </QueryClientProvider>
  );
};
