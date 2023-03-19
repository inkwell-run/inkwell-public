import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import * as InkwellApi from "@inkwell.run/client";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import React from "react";

interface IAuthProviderProps {
  accessToken: string;
  children: React.ReactNode;
  enableUserAuth?: boolean;
}

const AuthProvider = (props: IAuthProviderProps) => {
  const { accessToken, enableUserAuth, children } = props;

  // Set the access token onto the OpenAPI
  InkwellApi.OpenAPI.TOKEN = accessToken;

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping" />
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  // check that the access token ping worked
  if (accessToken === "" || !accessTokenQuery.data?.organizationId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p>
            Seems like you don't have a valid access token. Please go to the
            Inkwell dashboard to get one!
          </p>
        </div>
      </div>
    );
  }

  if (!environmentQuery.data?.userAuthPublicKey) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-400" />
          <p>Something went wrong while setting up the studio.</p>
        </div>
      </div>
    );
  }

  // enable clerk user authentication
  // set up clerk with the public key obtained from the ping
  if (enableUserAuth) {
    return (
      <ClerkProvider publishableKey={environmentQuery.data.userAuthPublicKey}>
        <SignedIn>{children}</SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    );
  }

  // if not using user authentication, still wrap with clerk, but don't guard.
  // we need the clerk provider so that the user button/hooks downstream don't
  // throw errors. sadly this means we cant totally disable clerk
  return (
    <ClerkProvider publishableKey={environmentQuery.data.userAuthPublicKey}>
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
