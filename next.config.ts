/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";
const backendUrl = isDev
  ? "http://localhost:5000"
  : process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  productionBrowserSourceMaps: false,

  async rewrites() {
    if (!backendUrl) {
      console.warn("NEXT_PUBLIC_API_URL is not set — skipping rewrite");
      return [];
    }

    const normalizedApiUrl =
      backendUrl.startsWith("http://") || backendUrl.startsWith("https://")
        ? backendUrl
        : `https://${backendUrl}`;

    return [
      {
        source: "/api/:path*",
        destination: `${normalizedApiUrl.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;