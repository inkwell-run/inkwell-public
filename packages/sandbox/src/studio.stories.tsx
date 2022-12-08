import React from "react";
import { ManuscriptStudio } from "@manuscript/studio";
import { z } from "zod";
import "@manuscript/studio/dist/index.css";

export const TestStudio = () => {
  return (
    <ManuscriptStudio
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
