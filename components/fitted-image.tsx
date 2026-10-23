import { assetPath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

/**
 * Bitmap that keeps its aspect ratio and never paints larger than its
 * intrinsic pixel size. Optional caps only make it smaller.
 */
export function FittedImage({
  src,
  width,
  height,
  alt,
  maxCssWidth,
  maxCssHeight,
  className,
  frame = false,
}: {
  src: string
  width: number
  height: number
  alt: string
  /** CSS-pixel cap, clamped to the intrinsic width. */
  maxCssWidth?: number
  /** Extra height cap, such as `78dvh` or `min(62dvh, 30rem)`. */
  maxCssHeight?: string
  className?: string
  frame?: boolean
}) {
  const capW = Math.min(width, maxCssWidth ?? width)
  const heightCap = maxCssHeight ? `min(${height}px, ${maxCssHeight})` : `${height}px`
  const img = (
    <img
      src={assetPath(src)}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{
        aspectRatio: `${width} / ${height}`,
        width: `min(${capW}px, calc(100vw - 4rem), calc(${heightCap} * ${width} / ${height}))`,
        height: "auto",
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
      className={cn("block object-contain", frame ? "rounded-[1.35rem]" : className)}
    />
  )

  if (!frame) return img

  return (
    <div
      className={cn(
        "inline-block max-w-full rounded-[2rem] border border-white/15 bg-black p-2 shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {img}
    </div>
  )
}
