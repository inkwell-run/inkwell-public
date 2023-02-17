import React from "react";
import { z, ZodAny } from "zod";
import Markdoc from "@markdoc/markdoc";
import matter from "gray-matter";

interface RendererProps<T extends z.ZodTypeAny> {
  markdown: string;
  schema: T;
}

export const MarkdocRenderer = <T extends z.ZodTypeAny>(
  props: RendererProps<T>
) => {
  const { markdown, schema } = props;

  // run markdoc validation (will throw)
  const ast = Markdoc.parse(markdown);
  const markdocErrors = Markdoc.validate(ast);
  if (markdocErrors.length > 0) {
    throw new Error(JSON.stringify(markdocErrors));
  }

  // run graymatter (will throw)
  const maybeFrontmatter = matter(
    "---\n" + ast.attributes.frontmatter + "\n---\n" ?? ""
  ).data;

  // run zod (will throw)
  schema.parse(maybeFrontmatter);

  // render to jsx
  const renderedMarkdoc = Markdoc.transform(ast);

  return <div>{Markdoc.renderers.react(renderedMarkdoc, React)}</div>;
};
