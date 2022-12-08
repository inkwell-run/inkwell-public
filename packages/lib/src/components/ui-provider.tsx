import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Provider } from "jotai";
import React from "react";
import { createInitialValues } from "../lib";
import { ITheme, themeAtom, useTheme } from "../lib/use-theme";
import { useColorScheme as useSystemTheme } from "@mantine/hooks";

interface UIProviderProps {
  children: React.ReactNode;
  initialTheme?: ITheme;
}

export const UIProvider = (props: UIProviderProps) => {
  const { children, initialTheme } = props;
  const systemTheme = useSystemTheme();

  // https://jotai.org/docs/guides/initialize-atom-on-render
  const initialValues = createInitialValues();
  initialValues.set(themeAtom, initialTheme ?? systemTheme);

  return (
    <Provider initialValues={initialValues.get()}>
      <UIProviderInner>{children}</UIProviderInner>
    </Provider>
  );
};

const UIProviderInner = (props: UIProviderProps) => {
  const { children } = props;
  const { theme, toggleTheme } = useTheme();
  return (
    <ColorSchemeProvider colorScheme={theme} toggleColorScheme={toggleTheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        withCSSVariables
        theme={{ colorScheme: theme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
