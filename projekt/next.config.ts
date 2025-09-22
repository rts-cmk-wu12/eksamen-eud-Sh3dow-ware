import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("http://localhost:4000/**")],
    qualities: [25, 50, 75]
  }
};

export default nextConfig;
