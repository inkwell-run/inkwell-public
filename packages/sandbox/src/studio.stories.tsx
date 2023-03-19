import type { Story } from "@ladle/react";
import { useLadleContext } from "@ladle/react";
import { InkwellStudio } from "@inkwell/studio";
import "@inkwell/studio/dist/index.css";
import React from "react";
import { z } from "zod";

export const Studio: Story<{}> = ({}) => {
  const { globalState } = useLadleContext();
  const { theme } = globalState;

  return (
    <InkwellStudio
      enableUserAuth={true}
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
          name: "Posts",
          validator: z.object({
            title: z.string(),
            date: z.coerce.date(),
          }),
        },
      ]}
    />
  );
};
