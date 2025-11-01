import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', '@studio-freight/lenis'],
  },
};

export default nextConfig;
