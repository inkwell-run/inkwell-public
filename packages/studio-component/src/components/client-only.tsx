import React, { useState, useEffect } from "react";

interface IClientOnlyProps {
  children: React.ReactNode;
}

export const ClientOnly = (props: IClientOnlyProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{props.children}</>;
};
