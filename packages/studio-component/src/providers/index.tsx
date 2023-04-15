import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { IInkwellStudioPropsInput } from "../lib/base-props";
import AuthProvider from "./auth-provider";
import { OpenAPIConfigurator } from "./openapi-configurator";
import { PropsValidator } from "./props-validator";
import { UserValidator } from "./user-validator";

const queryClient = new QueryClient();

interface IProviderChainProps {
  children: React.ReactNode;
  baseProps: IInkwellStudioPropsInput;
}

export const ProviderChain = (props: IProviderChainProps) => {
  const { baseProps } = props;
  const { accessToken, _themeOverride, enableUserAuth } = baseProps;

  return (
    <PropsValidator props={baseProps}>
      <OpenAPIConfigurator>
        <QueryClientProvider client={queryClient}>
          <AuthProvider
            accessToken={accessToken}
            enableUserAuth={enableUserAuth}
          >
            <UserValidator>{props.children}</UserValidator>
          </AuthProvider>
        </QueryClientProvider>
      </OpenAPIConfigurator>
    </PropsValidator>
  );
};
