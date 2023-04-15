import { UserButton } from "@clerk/clerk-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@doom.sh/ui";
import React from "react";
import { useHashLocation } from "../lib/hash-router";
import { PageLink, PageLinks } from "../lib/links";
import { ClerkSafe } from "./clerk-wrappers";
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
    isActive: (currentPathname) => currentPathname.startsWith("/posts"),
  },
  {
    text: "Schemas",
    pageLink: PageLinks.Schemas,
    isActive: (currentPathname) => currentPathname === "/schemas",
  },
  {
    text: "Assets",
    pageLink: PageLinks.Assets,
    isActive: (currentPathname) => currentPathname === "/assets",
  },
];

const Navigation = () => {
  const [location, hashNavigate] = useHashLocation();

  return (
    <div className="p-4 border-b md:px-8 md:py-4">
      {/* pickers */}
      <div className="flex flex-wrap-reverse items-center justify-between gap-6">
        {/* left */}
        <div className="flex items-center gap-4">
          <div className="font-semibold">Inkwell</div>
          <NavigationMenu className="flex-initial">
            <NavigationMenuList className="gap-4">
              {links.map((l) => {
                return (
                  <NavigationMenuItem key={l.pageLink}>
                    <NavigationMenuLink
                      onClick={() => {
                        if (l.isExternal) {
                          window.open(l.pageLink, "_blank");
                        } else {
                          hashNavigate(l.pageLink);
                        }
                      }}
                      active={l.isActive(location ?? "")}
                      className={navigationMenuTriggerStyle()}
                    >
                      {l.text}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* right */}
        <div className="flex items-center gap-8">
          <OrgDropdown />
          <ClerkSafe>
            <UserButton />
          </ClerkSafe>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
