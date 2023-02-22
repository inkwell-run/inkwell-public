const isDev = () => {
  return process.env.NODE_ENV === "development";
};

const getApiUrl = () => {
  if (isDev()) {
    return "http://localhost:3001/api";
  } else {
    return "https://dashboard.manuscriptcms.com/api";
  }
};

const getOpenApiUrl = () => {
  return `${getApiUrl()}/openapi.json`;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/openapi.json",
        destination: getOpenApiUrl(),
      },
    ];
  },
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra(nextConfig);
