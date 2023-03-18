import { Toaster } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../components/auth-provider";
import Navigation from "../components/navigation";
import { PropsValidator } from "../components/props-validator";
import { GlobalStateAtom } from "../lib/store";

InkwellApi.OpenAPI.BASE = "http://localhost:3001/api";

const queryClient = new QueryClient();

export const Root = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { accessToken, _themeOverride, enableUserAuth } = baseProps;

  return (
    <QueryClientProvider client={queryClient}>
      <PropsValidator>
        <AuthProvider accessToken={accessToken} enableUserAuth={enableUserAuth}>
          <div className="flex flex-col h-full">
            <Navigation />
            <div className="p-4 md:p-8">
              <Outlet />
            </div>
          </div>
          <Toaster position="top-center" />
        </AuthProvider>
      </PropsValidator>
    </QueryClientProvider>
  );
};
