export type ValueOf<T> = T[keyof T];

export const PageLinks = {
  Index: "/",
  Posts: "/posts",
  Schemas: "/schemas",
} as const;

export type PageLink = ValueOf<typeof PageLinks>;
