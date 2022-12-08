"use client";

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

const ReferencePage = () => {
  return <SwaggerUI url="/api/openapi.json" />;
};

export default ReferencePage;
