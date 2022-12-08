export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export const getApiUrl = () => {
  if (isDev()) {
    return "http://localhost:3001/api";
  } else {
    return "https://dashboard.manuscriptcms.com/api";
  }
};

export const getOpenApiUrl = () => {
  return `${getApiUrl()}/openapi.json`;
};
