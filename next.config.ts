import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://cdn.dsmcdn.com/**'),
      new URL('https://37e69e.a-cdn.akinoncloud.com/**')
    ],
  },
};

export default nextConfig;
