import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://cdn.dsmcdn.com/**')],
  },
};

export default nextConfig;
