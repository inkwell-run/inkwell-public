import { ColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ITheme = ColorScheme;

export const themeAtom = atomWithStorage<ITheme>("store-theme", "light");

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

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

export const getSystemTheme = (): ITheme => {
  if (
    typeof window !== "undefined" &&
    window?.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};
