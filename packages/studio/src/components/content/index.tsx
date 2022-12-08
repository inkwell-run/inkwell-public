import { Box } from "@manuscript/lib";
import React from "react";

interface ContentProps {
  children: React.ReactNode;
}
const Content = (props: ContentProps) => {
  const { children } = props;
  return (
    <Box
      sx={{
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Content;
