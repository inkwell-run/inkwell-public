import { Box } from "@manuscript/lib";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React from "react";
import * as ManuscriptApi from "../api-client";

const Sidebar = () => {
  return (
    <Box
      sx={(t) => ({
        display: "flex",
        flexDirection: "column",
        gap: t.spacing.sm,
        padding: t.spacing.sm,
        borderRight: "1px solid",
      })}
    >
      <ConnectionStatus />
      <Box
        sx={(t) => ({
          display: "flex",
          flexDirection: "column",
          gap: t.spacing.sm,
        })}
      >
        <Link to="/">Posts</Link>
        <Link to="/schemas">Schemas</Link>
      </Box>
    </Box>
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
