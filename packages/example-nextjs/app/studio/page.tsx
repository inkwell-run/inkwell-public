"use client";

import { InkwellStudio } from "@inkwell.run/studio";
import "@inkwell.run/studio/index.css";

const Studio = () => {
  return (
    <InkwellStudio
      baseUrl="http://localhost:3001/api"
      accessToken="24b1861f-893e-4c42-bdf4-870b651be285"
    />
  );
};

export default Studio;
