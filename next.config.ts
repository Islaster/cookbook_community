import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cookrecipeimages.s3.us-west-1.amazonaws.com",
        pathname: "/recipes/**",
      },
    ],
  },
};

export default nextConfig;
