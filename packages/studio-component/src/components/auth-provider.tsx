import * as ManuscriptApi from "@manuscript/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { AlertCircle } from "lucide-react";
import React, { useEffect } from "react";
import { GlobalStateAtom } from "../lib/store";

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
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  if (accessToken === "" || !accessTokenQuery.data?.organizationId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p>
            Seems like you don't have a valid access token. Please go to the
            Manuscript dashboard to get one!
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
