import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@doom.sh/ui";
import { FileText, LayoutDashboard, MessageCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { ConnectionStatus } from "./connection-status";
export const OrgDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ConnectionStatus />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-2" align="end">
        <DropdownMenuGroup>
          <Link to="https://app.inkwell.run" target={"_blank"}>
            <DropdownMenuItem className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <div>Go to dashboard</div>
            </DropdownMenuItem>
          </Link>
          <Link to="https://docs.inkwell.run" target={"_blank"}>
            <DropdownMenuItem className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <div>Go to docs</div>
            </DropdownMenuItem>
          </Link>
          <Link to="https://inkwell.canny.io" target={"_blank"}>
            <DropdownMenuItem className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <div>Submit feedback</div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
