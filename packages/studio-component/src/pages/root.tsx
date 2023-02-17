import * as ManuscriptApi from "@manuscript/api-client";
import { UIProvider } from "@manuscript/lib";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../components/auth-provider";
import Navigation from "../components/navigation";
import { GlobalStateAtom } from "../lib/store";

ManuscriptApi.OpenAPI.BASE = "http://localhost:3001/api";

const queryClient = new QueryClient();

export const Root = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { accessToken, _themeOverride } = baseProps;

  return (
    <QueryClientProvider client={queryClient}>
      <UIProvider _themeOverride={_themeOverride}>
        <AuthProvider accessToken={accessToken}>
          <div className="flex flex-col h-full">
            <Navigation />
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </div>
          {/* <Shell navbar={<Sidebar />} header={<Header />}> */}
          {/* </Shell> */}
        </AuthProvider>
      </UIProvider>
    </QueryClientProvider>
  );
};
