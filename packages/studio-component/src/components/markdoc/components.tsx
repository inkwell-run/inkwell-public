import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode,
} from "@doom.sh/ui";
import React from "react";

export interface ITypographyHeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level: number;
}

export const CustomTypographyHeader = (props: ITypographyHeaderProps) => {
  switch (props.level) {
    case 1:
      return <TypographyH1 {...props} />;
    case 2:
      return <TypographyH2 {...props} />;
    case 3:
      return <TypographyH3 {...props} />;
    case 4:
      return <TypographyH4 {...props} />;
    default:
      return <TypographyP {...props} />;
  }
};

CustomTypographyHeader.displayName = "TypographyHeader";

export interface ITypographyInlineCodeProps
  extends React.ComponentPropsWithoutRef<"code"> {
  content: string;
}

export const CustomTypographyInlineCode = (
  props: ITypographyInlineCodeProps
) => {
  return (
    <TypographyInlineCode {...props}>{props.content}</TypographyInlineCode>
  );
};

export const markdocComponents = {
  TypographyHeader: CustomTypographyHeader,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyInlineCode: CustomTypographyInlineCode,
};
