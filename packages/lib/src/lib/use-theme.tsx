import { ColorScheme } from "@mantine/core";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

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

export type ITheme = ColorScheme;

export const themeAtom = atomWithStorage<ITheme>(
  "store-theme",
  getSystemTheme()
);

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = (override?: ColorScheme) => {
    if (override) {
      setTheme(theme);
    } else {
      if (theme === "dark") {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
