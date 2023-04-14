import { z } from "zod";

export const ZAdapter = z.object({
  useRouteInfo: z.function().returns(
    z.object({
      pathname: z.string(),
      params: z.record(z.union([z.string(), z.undefined()])),
    })
  ),
});

export type IAdapter = z.infer<typeof ZAdapter>;

// export interface IAdapter {
//   useRouteInfo: () => {
//     pathname: string;
//     params: Record<string, string | undefined>;
//   };
// }

// const ZAdapter: z.ZodType<IAdapter> = z.any();
