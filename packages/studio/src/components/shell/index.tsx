import React from "react";
import style from "./index.module.css";

interface ShellProps {
  children: React.ReactNode;
}

export const Shell = (props: ShellProps) => {
  const { children } = props;
  return <div className={style.shell}>{children}</div>;
};
