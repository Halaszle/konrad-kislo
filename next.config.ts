import type { NextConfig } from "next";

/**
 * GitHub Pages build (set by .github/workflows/deploy-pages.yml).
 * Pages only serves static files from a sub-path (https://<user>.github.io/<repo>/), so that build
 * is exported as plain HTML, served under the repo name and without the Next.js image optimizer
 * (which needs a server). Local development and any Node/Vercel hosting are unaffected.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGithubPages,
  },
  ...(isGithubPages && {
    output: "export",
    basePath,
    // "/photography/" → photography/index.html; also keeps in-page links like "/#music" working
    trailingSlash: true,
  }),
};

export default nextConfig;
