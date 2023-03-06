import { nodes, Config } from "@markdoc/markdoc";

const HeadingNode: typeof nodes.heading = {
  attributes: {
    id: { type: String },
    level: { type: Number },
  },
  render: "TypographyHeader",
};

const ParagraphNode: typeof nodes.paragraph = {
  render: "TypographyP",
};

const BlockquoteNode: typeof nodes.blockquote = {
  render: "TypographyBlockquote",
};

const ListNode: typeof nodes.list = {
  render: "TypographyList",
  attributes: {
    ordered: { type: Boolean },
  },
};

const InlineCodeNode: typeof nodes.code = {
  render: "TypographyInlineCode",
  attributes: {
    content: { type: String },
  },
};

export const markdocNodes: Config["nodes"] = {
  heading: HeadingNode,
  paragraph: ParagraphNode,
  blockquote: BlockquoteNode,
  list: ListNode,
  code: InlineCodeNode,
};
