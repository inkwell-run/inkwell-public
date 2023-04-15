import * as InkwellApi from "@inkwell.run/client";
import React from "react";
import { GlobalStateAtom } from "../lib/store";
import { useAtomValue } from "jotai";

interface IOpenAPIConfiguratorProps {
  children: React.ReactNode;
}

export const OpenAPIConfigurator = (props: IOpenAPIConfiguratorProps) => {
  const { baseProps } = useAtomValue(GlobalStateAtom);

  // set the base url
  InkwellApi.OpenAPI.BASE = baseProps.baseUrl;

  // Set the access token
  InkwellApi.OpenAPI.TOKEN = baseProps.accessToken;

  // if not using user authentication, pass children as normal
  return <>{props.children}</>;
};
