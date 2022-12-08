import { useLadleContext } from "@ladle/react";
import { ManuscriptStudio } from "@manuscript/studio";
import "@manuscript/studio/dist/index.css";
import React from "react";
import { z } from "zod";

export const TestStudio = () => {
  const { globalState } = useLadleContext();
  const { theme } = globalState;

  return (
    <ManuscriptStudio
      _themeOverride={theme as any}
      accessToken="45dd3f96-b5b8-4fa7-924f-dd0fd09d89cf"
      schemas={[
        {
          name: "News",
          validator: z.object({
            title: z.string(),
            date: z.date(),
          }),
        },
        {
          name: "Project",
          validator: z.object({
            title: z.string(),
            date: z.date(),
          }),
        },
      ]}
    />
  );
};
