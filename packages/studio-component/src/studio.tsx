import "allotment/dist/style.css";
import React from "react";
import { ClientOnly } from "./components/client-only";
import { ProviderChain } from "./components/providers";
import { IInkwellStudioPropsInput } from "./lib/base-props";
import { PageRouter } from "./pages/router";
import "./styles/globals.css";

export const InkwellStudio = (props: IInkwellStudioPropsInput) => {
  return (
    <ClientOnly>
      <ProviderChain baseProps={props}>
        <PageRouter />
      </ProviderChain>
    </ClientOnly>
  );
};
