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

// the input to the Zod schema is more permissive
export type IInkwellStudioPropsInput = z.input<typeof ZInkwellStudioProps>;

// the output of the Zod schema provides guarantees
export type IInkwellStudioProps = z.infer<typeof ZInkwellStudioProps>;

export type ISchema = z.infer<typeof ZSchema>;
