import { z, ZodObject } from "zod";

export const ZSchema = z.object({
  name: z.string(),
  validator: z.instanceof(ZodObject),
});

export const ZInkwellStudioProps = z.object({
  accessToken: z.string(),
  schemas: z.array(ZSchema).default([]),
  enableUserAuth: z.boolean().default(false),
  baseUrl: z.string().url().default("https://app.inkwell.run/api"),
  // deprecated
  _themeOverride: z.union([z.literal("light"), z.literal("dark")]).optional(),
});

export type IInkwellStudioProps = z.infer<typeof ZInkwellStudioProps>;

export type ISchema = z.infer<typeof ZSchema>;
