import React, { lazy, Suspense, useState, useEffect } from "react";
import type { IInkwellStudioPropsInput } from "./lib/base-props";

const Studio = lazy(() =>
  import("./studio").then((m) => ({ default: m.InkwellStudio }))
);

export const InkwellStudio = (props: IInkwellStudioPropsInput) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Studio {...props} />
    </Suspense>
  );
};
