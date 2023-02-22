import { Toaster, toast } from "@doom.sh/ui";
import * as ManuscriptApi from "@manuscript/api-client";
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
      <AuthProvider accessToken={accessToken}>
        <div className="flex flex-col h-full">
          <Navigation />
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
        <Toaster position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
};
