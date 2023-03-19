import { cn } from "@doom.sh/ui";
import { AlertCircle } from "lucide-react";
import React from "react";

interface IAlertScreenProps {
  type: "error" | "loading";
  children?: React.ReactNode;
}

export const AlertScreen = (props: IAlertScreenProps) => {
  const { children } = props;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle
          className={cn("w-8 h-8", {
            "text-red-400": props.type === "error",
            "text-blue-400 animate-ping": props.type === "loading",
          })}
        />
        <div className="flex flex-col justify-center gap-4">{children}</div>
      </div>
    </div>
  );
};
