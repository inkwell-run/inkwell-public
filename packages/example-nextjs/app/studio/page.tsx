"use client";

import React from "react";
import { InkwellStudio } from "@inkwell.run/studio";
import "@inkwell.run/studio/dist/index.css";

const Studio = () => {
  return (
    <div>
      <InkwellStudio accessToken="20d73831-4255-46ff-8021-aaadab975554" />
    </div>
  );
};

export default Studio;
