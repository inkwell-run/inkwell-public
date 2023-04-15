import * as InkwellApi from "@inkwell.run/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AlertScreen } from "../components/alert-screen";

interface IAuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

const AuthProvider = (props: IAuthProviderProps) => {
  const { accessToken, children } = props;

  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: InkwellApi.AccessTokensService.queryAccessTokensTest,
  });

  const environmentQuery = useQuery({
    queryKey: ["environment"],
    queryFn: InkwellApi.EnvironmentService.queryEnvironmentTest,
  });

  // if loading, show a skeleton
  if (accessTokenQuery.isLoading || environmentQuery.isLoading) {
    return <AlertScreen type="loading">Authenticating...</AlertScreen>;
  }

  // check that the access token ping worked
  if (accessToken === "" || !accessTokenQuery.data?.organizationId) {
    return (
      <AlertScreen type="error">
        Seems like you don't have a valid access token. Please go to the Inkwell
        dashboard to get one!
      </AlertScreen>
    );
  }

  if (!environmentQuery.data?.userAuthPublicKey) {
    return (
      <AlertScreen type="error">
        Something went wrong while setting up the studio.
      </AlertScreen>
    );
  }

  // if not using user authentication, pass children as normal
  return <>{children}</>;
};

export default AuthProvider;
