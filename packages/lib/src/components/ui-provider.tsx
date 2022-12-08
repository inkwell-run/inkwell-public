import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import React from "react";
import { useTheme } from "../lib/use-theme";

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider = (props: UIProviderProps) => {
  const { children } = props;
  const { theme, toggleTheme } = useTheme();
  return (
    <ColorSchemeProvider colorScheme={theme} toggleColorScheme={toggleTheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: theme }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
