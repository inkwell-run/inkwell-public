import { z, ZodObject } from "zod";
import type { Config } from "@markdoc/markdoc";
import React from "react";

// these are "any" but we still want intellisense
const ZMarkdocConfig: z.ZodType<Config> = z.any();
const ZMarkdocComponents: z.ZodType<Record<string, React.FC<any>>> = z.any();

export const ZSchema = z.object({
  name: z.string(),
  validator: z.instanceof(ZodObject),
});

export const ZInkwellStudioProps = z.object({
  accessToken: z.string(),
  schemas: z.array(ZSchema).default([]),
  baseUrl: z.string().url().default("https://app.inkwell.run/api"),
  markdoc: z
    .object({
      config: ZMarkdocConfig,
      components: ZMarkdocComponents,
    })
    .optional(),

  // deprecated
  _themeOverride: z.union([z.literal("light"), z.literal("dark")]).optional(),
});

// the input to the Zod schema is more permissive
export type IInkwellStudioPropsInput = z.input<typeof ZInkwellStudioProps>;

// the output of the Zod schema provides guarantees
export type IInkwellStudioProps = z.infer<typeof ZInkwellStudioProps>;

export type ISchema = z.infer<typeof ZSchema>;
