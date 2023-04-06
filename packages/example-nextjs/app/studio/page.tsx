"use client";

import React from "react";
import { InkwellStudio } from "@inkwell.run/studio";
import "@inkwell.run/studio/dist/index.css";

const Studio = () => {
  return (
    <InkwellStudio
      baseUrl="http://localhost:3001/api"
      accessToken="45dd3f96-b5b8-4fa7-924f-dd0fd09d89cf"
    />
  );
};

export default Studio;
