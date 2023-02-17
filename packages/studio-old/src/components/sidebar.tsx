import { Alert, Navbar, NavLink, Stack } from "@manuscript/lib";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React from "react";
import * as ManuscriptApi from "@manuscript/api-client";
import { postsRoute } from "../pages/posts/_routes";
import { schemasRoute } from "../pages/schemas/_routes";

const Sidebar = () => {
  return (
    <Stack justify="space-between" h="100%">
      <Navbar.Section>
        <Link to={postsRoute.fullPath} style={{ all: "unset" }}>
          <NavLink label="Posts" />
        </Link>
        <Link to={schemasRoute.fullPath} style={{ all: "unset" }}>
          <NavLink label="Schemas" />
        </Link>
      </Navbar.Section>
      <Navbar.Section>
        <ConnectionStatus />
      </Navbar.Section>
    </Stack>
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
    <Alert title="Connected to:" color="lime" radius="md">
      {organization.data?.clerkOrganizationName ?? <>&nbsp;</>}
    </Alert>
  );
};
