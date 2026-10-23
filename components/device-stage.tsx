import type { ReactNode } from "react"
import type { ProjectScreen } from "@/content/site"
import { assetPath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

/** Dark field, centered device, and a short floor sheen. Shared by cards and case studies. */
export function DeviceStage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0b0b0b]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(243,240,232,0.06),transparent_58%)]"
      />
      <div className="relative z-[1] flex w-[90%] max-w-[960px] flex-col items-center">
        {children}
        <DeviceFloor />
      </div>
    </div>
  )
}

export function DeviceFloor() {
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto h-6 w-[72%]">
      <div className="absolute inset-x-0 top-0 h-4 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75),transparent_72%)]" />
      <div className="absolute inset-x-[16%] top-1 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </div>
  )
}

/** Portrait phone on the same dark field as the other devices. */
export function PhoneStage({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0b0b0b]"
      style={{ containerType: "size" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(243,240,232,0.06),transparent_58%)]"
      />
      <div className="relative z-[1] flex max-h-full flex-col items-center">
        {children}
        <DeviceFloor />
      </div>
    </div>
  )
}

function Dots() {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
      <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
      <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
    </span>
  )
}

function sourceSet(items: Array<{ src?: string; width?: number }>) {
  const ready = items.filter((item): item is { src: string; width: number } => Boolean(item.src && item.width))
  if (!ready.length) return undefined
  return ready.map((item) => `${assetPath(item.src)} ${item.width}w`).join(", ")
}

/**
 * Browser chrome around a real capture. The picture never paints wider than
 * `maxCssWidth`, which stays at or below the full file so a 2× or 3× screen
 * can still use native pixels. `sizes` is an upper bound of that slot.
 */
export function BrowserFrame({
  screen,
  sizes,
  maxCssWidth,
  loading = "lazy",
}: {
  screen: ProjectScreen
  sizes: string
  maxCssWidth: number
  loading?: "eager" | "lazy"
}) {
  const cap = Math.min(maxCssWidth, screen.width)
  const webp = sourceSet([
    { src: screen.srcSmall, width: screen.smallWidth },
    { src: screen.srcMid, width: screen.midWidth },
    { src: screen.src, width: screen.width },
  ])
  const avif = sourceSet([
    { src: screen.srcAvifSmall, width: screen.smallWidth },
    { src: screen.srcAvifMid, width: screen.midWidth },
    { src: screen.srcAvif, width: screen.width },
  ])
  const host = screen.url.replace(/^https?:\/\//, "")

  return (
    <figure className="w-full" style={{ maxWidth: cap }}>
      <div className="overflow-hidden rounded-[0.9rem] border border-white/12 bg-[#161616] shadow-[0_28px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <Dots />
          <div
            className="min-w-0 flex-1 truncate rounded-md bg-black/45 px-2 py-1 text-center font-mono text-[10px] tracking-[0.04em] text-white/50"
            title={screen.url}
          >
            {host}
          </div>
        </div>
        <picture>
          {avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
          {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
          <img
            src={assetPath(screen.src!)}
            alt={screen.alt}
            width={screen.width}
            height={screen.height}
            loading={loading}
            decoding="async"
            fetchPriority={loading === "eager" ? "high" : undefined}
            style={{
              aspectRatio: `${screen.width} / ${screen.height}`,
              maxWidth: screen.width,
              maxHeight: screen.height,
            }}
            className="block h-auto w-full bg-white object-contain"
          />
        </picture>
      </div>
    </figure>
  )
}
