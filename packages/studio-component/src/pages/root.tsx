import { Toaster } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell.run/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../components/auth-provider";
import Navigation from "../components/navigation";
import { PropsValidator } from "../components/props-validator";
import { UserValidator } from "../components/user-validator";
import { GlobalStateAtom } from "../lib/store";

const queryClient = new QueryClient();

export const Root = () => {
  const { baseProps } = useAtomValue(GlobalStateAtom);
  const { accessToken, _themeOverride, enableUserAuth } = baseProps;

  // set the base url
  InkwellApi.OpenAPI.BASE = baseProps.baseUrl;

  return (
    <QueryClientProvider client={queryClient}>
      <PropsValidator>
        <AuthProvider accessToken={accessToken} enableUserAuth={enableUserAuth}>
          <UserValidator>
            <div className="flex flex-col h-full">
              <Navigation />
              <div className="p-4 md:p-8">
                <Outlet />
              </div>
            </div>
            <Toaster position="top-center" />
          </UserValidator>
        </AuthProvider>
      </PropsValidator>
    </QueryClientProvider>
  );
};
