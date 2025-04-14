import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cookrecipeimages.s3.us-west-1.amazonaws.com"],
  },
};

export default nextConfig;
