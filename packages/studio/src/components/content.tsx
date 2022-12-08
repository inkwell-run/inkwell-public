import React from "react";

interface ContentProps {
  children: React.ReactNode;
}
const Content = (props: ContentProps) => {
  const { children } = props;
  return <div className="overflow-y-auto">{children}</div>;
};

export default Content;
