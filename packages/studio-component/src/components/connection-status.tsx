import { Button } from "@doom.sh/ui";
import * as ManuscriptApi from "@manuscript/api-client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const ConnectionStatus = () => {
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
    <Button variant="outline" className="font-medium">
      Connected to {organization.data?.clerkOrganizationName}
    </Button>
  );
};
