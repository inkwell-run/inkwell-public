import { Box, Navbar, NavLink } from "@manuscript/lib";
import { useQuery } from "@tanstack/react-query";
import { Link, linkProps } from "@tanstack/react-router";
import React from "react";
import * as ManuscriptApi from "../api-client";

const Sidebar = () => {
  const p = linkProps({
    to: "/",
  });
  return (
    <>
      <Navbar.Section>
        <Link to="/" style={{ all: "unset" }}>
          <NavLink label="Posts" />
        </Link>
        <Link to="/schemas" style={{ all: "unset" }}>
          <NavLink label="Schemas" />
        </Link>
      </Navbar.Section>
      <Navbar.Section>
        <ConnectionStatus />
      </Navbar.Section>
    </>
  );
};

export default Sidebar;

const ConnectionStatus = () => {
  const accessToken = useQuery({
    queryKey: ["access-token"],
    queryFn: ManuscriptApi.AccessTokensService.queryAccessTokensTest,
  });

  const organization = useQuery({
    queryKey: ["organization", accessToken.data?.organizationId!],
    queryFn: () =>
      ManuscriptApi.OrganizationsService.queryOrganizationsFindUnique(
        accessToken.data?.organizationId!
      ),
    enabled: !!accessToken.data?.organizationId,
  });

  return (
    <Box
      sx={(t) => ({
        padding: t.spacing.sm,
        border: "1px solid",
        borderRadius: t.radius.md,
      })}
    >
      Connected to <strong>{organization.data?.clerkOrganizationName}</strong>
    </Box>
  );
};
