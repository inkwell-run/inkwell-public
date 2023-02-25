import { Button } from "@doom.sh/ui";
import * as InkwellApi from "@inkwell/api-client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ChevronsUpDown } from "lucide-react";

export const ConnectionStatus = () => {
  const accessToken = useQuery({
    queryKey: ["access-token"],
    queryFn: InkwellApi.AccessTokensService.queryAccessTokensTest,
  });

  const organization = useQuery({
    queryKey: ["organization", accessToken.data?.organizationId!],
    queryFn: () =>
      InkwellApi.OrganizationsService.queryOrganizationsFindUnique(
        accessToken.data?.organizationId!
      ),
    enabled: !!accessToken.data?.organizationId,
  });

  return (
    <Button variant="outline" className="flex items-center gap-4">
      {organization.isLoading ? (
        <>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span>Connected to {organization.data?.clerkOrganizationName}</span>
        </>
      )}
      <ChevronsUpDown className="w-4 h-4" />
    </Button>
  );
};
