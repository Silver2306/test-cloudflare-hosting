import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to ./out,
  // which Cloudflare can serve directly (Workers static assets / Pages).
  output: "export",
  images: { unoptimized: true },
  // Each route becomes /about/index.html so URLs work on static hosts.
  trailingSlash: true,
};

export default nextConfig;
