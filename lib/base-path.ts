/**
 * The Pages project path, inlined at build time. Empty when the site is served from `/`.
 * Keep this in sync with `NEXT_PUBLIC_BASE_PATH` in next.config.ts.
 */
export function configuredBasePath() {
  const raw = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim()
  if (!raw || raw === "/") return ""
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`
  return withSlash.replace(/\/$/, "")
}

/** App Router path, without the GitHub Pages base path or a trailing slash. */
export function toAppPath(pathname: string) {
  const base = configuredBasePath()
  let path = pathname || "/"
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/"
  }
  if (!path.startsWith("/")) path = `/${path}`
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path
}
