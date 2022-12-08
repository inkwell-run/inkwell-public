import { Box } from "@manuscript/lib";
import React from "react";

interface ShellProps {
  children: React.ReactNode;
}

export const Shell = (props: ShellProps) => {
  const { children } = props;
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        gap: t.spacing.md,
        border: "1px solid black",
        height: "100%",
      })}
    >
      {children}
    </Box>
  );
};
