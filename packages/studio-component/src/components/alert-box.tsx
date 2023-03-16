import { TypographySubtle } from "@doom.sh/ui";
import { AlertCircle } from "lucide-react";
import React from "react";

interface IAlertBoxProps {
  iconOverride?: React.ReactNode;
  addendum?: React.ReactNode;
}

export const AlertBox = (props: React.PropsWithChildren<IAlertBoxProps>) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md shadow-sm w-fit">
      <div className="flex items-center gap-2 ">
        {props.iconOverride ?? <AlertCircle className="w-4 h-4 text-red-500" />}
        <TypographySubtle>{props.children}</TypographySubtle>
      </div>
      {props.addendum}
    </div>
  );
};
