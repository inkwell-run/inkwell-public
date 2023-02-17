import { Button } from "@doom.sh/ui";
import * as ManuscriptApi from "@manuscript/api-client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Loader2 } from "lucide-react";

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
    <Button variant="outline" className="flex items-center gap-4">
      {organization.isLoading ? (
        <>
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span>Connected to {organization.data?.clerkOrganizationName}</span>
        </>
      )}
    </Button>
  );
};
