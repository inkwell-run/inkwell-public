import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import * as ManuscriptApi from "@manuscript/api-client";
import { GlobalStateAtom } from "../lib/store";
import { IconAlertCircle, Alert, Loader, Box, Center } from "@manuscript/lib";
import { useQuery } from "@tanstack/react-query";

interface IAuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
}

// 1. Sets the access token onto the OpenAPI
// 2. Adds token to the global store
const AuthProvider = (props: IAuthProviderProps) => {
  const { accessToken, children } = props;
  console.log("auth provider");

  // 1. Set the access token onto the OpenAPI
  ManuscriptApi.OpenAPI.TOKEN = accessToken;

  // 2. Add token to the global store
  const setGlobalState = useSetAtom(GlobalStateAtom);
  useEffect(() => {
    setGlobalState((prev) => {
      return {
        ...prev,
        baseProps: {
          ...prev.baseProps,
          accessToken,
        },
      };
    });
  }, [accessToken]);

  // 3. If the access token is invalid, show an error
  const accessTokenQuery = useQuery({
    queryKey: ["access-token"],
    queryFn: ManuscriptApi.AccessTokensService.queryAccessTokensTest,
  });

  // if loading, show a skeleton
  if (accessTokenQuery.isLoading) {
    return (
      <Center h="100vh">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Loader />
          <p>Authenticating...</p>
        </Box>
      </Center>
    );
  }

  if (accessToken === "" || !accessTokenQuery.data?.organizationId) {
    return (
      <Center h="100vh">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Invalid access token"
          color="red"
        >
          Seems like you don't have a valid access token. Please go to the
          Manuscript dashboard to get one!
        </Alert>
      </Center>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
