import { UserButton, useUser } from "@clerk/clerk-react";
import * as InkwellApi from "@inkwell.run/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AlertScreen } from "./alert-screen";
import { useClerkSafe } from "./clerk-wrappers";

interface IUserValidatorProps {
  children: React.ReactNode;
  enableUserAuth?: boolean;
}

export const UserValidator = (props: IUserValidatorProps) => {
  const { isSafe } = useClerkSafe({
    initialValue: props.enableUserAuth,
  });
  if (isSafe) {
    return <UserValidatorInner {...props} />;
  }
  return <>{props.children}</>;
};

const UserValidatorInner = (props: IUserValidatorProps) => {
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

  // if loading queries, show a skeleton
  if (accessTokenQuery.isLoading || organizationQuery.isLoading) {
    return <AlertScreen type="loading">Authorizing...</AlertScreen>;
  }

  // make sure the user belongs to an organization that is referenced by the
  // access token
  if (props.enableUserAuth) {
    // wait for user to be loaded
    if (!isLoaded)
      return <AlertScreen type="loading">Authorizing...</AlertScreen>;

    // check user org memberships
    if (
      !user?.organizationMemberships ||
      !user.organizationMemberships.find(
        (o) => o.organization.id == organizationQuery.data?.clerkOrganizationId
      )
    )
      return (
        <AlertScreen type="error">
          <p>
            You are not authorized to modify this organization. Try switching
            accounts.
          </p>
          <UserButton />
        </AlertScreen>
      );
  }

  return <>{props.children}</>;
};
