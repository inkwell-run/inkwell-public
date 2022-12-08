import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import React from "react";
import * as ManuscriptApi from "../api-client";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-r border-color">
      <ConnectionStatus />
      <div className="flex flex-col gap-2">
        <Link to="/">Posts</Link>
        <Link to="/schemas">Schemas</Link>
      </div>
    </div>
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
    <div className="p-2 border rounded-md border-color">
      Connected to <strong>{organization.data?.clerkOrganizationName}</strong>
    </div>
  );
};
