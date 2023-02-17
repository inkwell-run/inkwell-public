/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ["@doom.sh/ui"],
  },
};

module.exports = nextConfig;
