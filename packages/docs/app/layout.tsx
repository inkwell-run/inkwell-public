import React from "react";

interface RootLayoutProps {}

const RootLayout = (props: React.PropsWithChildren<RootLayoutProps>) => {
  const { children } = props;
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
