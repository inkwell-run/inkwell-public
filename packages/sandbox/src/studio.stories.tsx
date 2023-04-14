import type { Story } from "@ladle/react";
import { useLadleContext } from "@ladle/react";
import { InkwellStudio } from "@inkwell.run/studio";
import "@inkwell.run/studio/index.css";
import React from "react";
import { z } from "zod";

export const Studio: Story<{}> = ({}) => {
  const { globalState } = useLadleContext();
  const { theme } = globalState;

  return (
    <div className="h-screen">
      <InkwellStudio
        enableUserAuth
        baseUrl="http://localhost:3001/api"
        _themeOverride={theme as any}
        accessToken="24b1861f-893e-4c42-bdf4-870b651be285"
        markdoc={{
          components: {
            TypographyHeader: (props) => (
              <h1 style={{ color: "red" }} {...props} />
            ),
          },
          config: {},
        }}
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
    </div>
  );
};
