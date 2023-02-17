import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@doom.sh/ui";
import React from "react";
import { Link } from "react-router-dom";
import { ConnectionStatus } from "./connection-status";
import { ExternalLink } from "lucide-react";
export const OrgDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ConnectionStatus />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-2" align="end">
        <DropdownMenuGroup>
          <Link to="https://dashboard.manuscriptcms.com">
            <DropdownMenuItem>
              <ExternalLink className="w-4 h-4 mr-2" />
              <div>Go to dashboard</div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
