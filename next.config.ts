import type { NextConfig } from "next";

/**
 * Empty in local dev and in a root-hosted build, so the site stays at `/`.
 * GitHub Actions sets this to `/levi-portfolio` for
 * https://jollymreiscream.github.io/levi-portfolio/
 */
function pagesBasePath() {
  const raw = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
  if (!raw || raw === "/") return "";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

const basePath = pagesBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Next does not prepend basePath onto assetPrefix, so they match on purpose.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Dev is served on 127.0.0.1 as well as localhost.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
