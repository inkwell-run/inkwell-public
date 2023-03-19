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
        {props.type === "error" && (
          <AlertCircle
            className={cn("w-8 h-8", {
              "text-red-400": props.type === "error",
            })}
          />
        )}
        {props.type === "loading" && (
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
        )}
        <div className="flex flex-col justify-center gap-4">{children}</div>
      </div>
    </div>
  );
};
