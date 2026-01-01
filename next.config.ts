// next.config.js
/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";
const backendUrl = isDev ? "http://localhost:5000" : process.env.BACKEND_URL;

const nextConfig = {
  productionBrowserSourceMaps: false,

  async rewrites() {
    return [
      {
        // Proxy ALL /api/* requests to backend
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;