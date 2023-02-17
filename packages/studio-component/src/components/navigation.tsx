import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@doom.sh/ui";
import { Link, useLocation } from "react-router-dom";
import { PageLink, PageLinks } from "../lib/links";
import { OrgDropdown } from "./org-dropdown";

interface NavLink {
  text: string;
  pageLink: PageLink;
  isActive: (currentPathname: string) => boolean;
  isExternal?: boolean;
}

const links: NavLink[] = [
  {
    text: "Posts",
    pageLink: PageLinks.Posts,
    isActive: (currentPathname) => currentPathname === "/posts",
  },
  {
    text: "Schemas",
    pageLink: PageLinks.Schemas,
    isActive: (currentPathname) => currentPathname === "/schemas",
  },
];

const Navigation = () => {
  const { pathname } = useLocation();
  console.log({ pathname });
  return (
    <div className="p-4 border-b md:px-8 md:py-4">
      {/* pickers */}
      <div className="flex flex-wrap-reverse items-center justify-between gap-6">
        {/* left */}
        <div className="flex items-center gap-4">
          <div className="font-semibold">Manuscript</div>
          <NavigationMenu className="flex-initial">
            <NavigationMenuList className="gap-4">
              {links.map((l) => {
                return (
                  <NavigationMenuItem key={l.pageLink}>
                    <Link to={l.pageLink}>
                      <NavigationMenuLink
                        active={l.isActive(pathname ?? "")}
                        className={navigationMenuTriggerStyle()}
                      >
                        {l.text}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* right */}
        <div className="flex items-center gap-8">
          <OrgDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
