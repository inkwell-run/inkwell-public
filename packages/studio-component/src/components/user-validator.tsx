import { useUser } from "@clerk/clerk-react";
import * as InkwellApi from "@inkwell/api-client";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import React from "react";

interface IUserValidatorProps {
  children: React.ReactNode;
  enableUserAuth?: boolean;
}

export const UserValidator = (props: IUserValidatorProps) => {
  const { isLoaded, user } = useUser();

  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: InkwellApi.AccessTokensService.queryAccessTokensTest,
  });

  const organizationQuery = useQuery({
    queryKey: ["organization"],
    queryFn: () =>
      InkwellApi.OrganizationsService.queryOrganizationsFindUnique(
        accessTokenQuery.data?.organizationId!
      ),
    enabled: !!accessTokenQuery.data?.organizationId,
  });

  // if loading, show a skeleton
  if (accessTokenQuery.isLoading || organizationQuery.isLoading || !isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
          <p>Authorizing...</p>
        </div>
      </div>
    );
  }

  // if there is a user loaded, make sure the user belongs to an organization
  // that is referenced by the access token
  if (props.enableUserAuth) {
    if (
      !user?.organizationMemberships ||
      !user.organizationMemberships.find(
        (o) => o.organization.id == organizationQuery.data?.clerkOrganizationId
      )
    )
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p>
              You are not authorized to modify this organization. Try switching
              accounts.
            </p>
          </div>
        </div>
      );
  }

  return <>{props.children}</>;
};