import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ColorScheme } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useEffect } from "react";

export const themeAtom = atomWithStorage<ColorScheme>("store-theme", "light");

export const useTheme = () => {
  const userPreferredTheme = useColorScheme();
  const [theme, setTheme] = useAtom(themeAtom);

  // synchronize preferred theme
  useEffect(() => {
    setTheme(userPreferredTheme);
  }, [userPreferredTheme]);

  const toggleTheme = (theme?: ColorScheme) => {
    if (theme) {
      setTheme(theme);
    } else {
      setTheme((prev) => {
        if (prev === "dark") {
          return "light";
        } else {
          return "dark";
        }
      });
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
