import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build optimizations for Heroku
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Reduce bundle size
  swcMinify: true,
  // Compress static assets
  compress: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ["rabble-dev1.s3.us-east-2.amazonaws.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
