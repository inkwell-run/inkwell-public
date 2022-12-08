import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import React, { useEffect } from "react";
import { ITheme, useTheme } from "../lib/use-theme";

interface UIProviderProps {
  children: React.ReactNode;
  _themeOverride?: ITheme;
}

export const UIProvider = (props: UIProviderProps) => {
  const { children, _themeOverride } = props;
  const { theme, toggleTheme, setTheme } = useTheme();

  // not recommended for anything but testing or use with ladle sandbox as it will cause flash
  useEffect(() => {
    if (_themeOverride) {
      console.info("Applying theme override");
      setTheme(_themeOverride);
    }
  }, [_themeOverride]);

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
