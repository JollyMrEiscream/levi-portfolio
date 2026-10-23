import type { ReactNode } from "react"
import { assetPath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

/**
 * Portrait phone frame. The screen keeps the capture's aspect ratio and
 * never paints larger than `width`×`height` CSS pixels. Pass `srcSmall`
 * plus `sizes` so the 590-wide file is used only when it will not be upscaled.
 */
export function PhoneSlot({
  src,
  srcSmall,
  smallWidth,
  sizes,
  alt,
  label,
  width,
  height,
  maxCssWidth,
  maxCssHeight,
  fit = "viewport",
  className,
  children,
}: {
  src?: string
  srcSmall?: string
  smallWidth?: number
  sizes?: string
  alt: string
  label?: string
  width: number
  height: number
  maxCssWidth?: number
  maxCssHeight?: string
  fit?: "viewport" | "container" | "fill"
  className?: string
  children?: ReactNode
}) {
  const capW = Math.min(width, maxCssWidth ?? width)
  const heightCap = maxCssHeight ? `min(${height}px, ${maxCssHeight})` : `${height}px`
  const widthCss =
    fit === "container"
      ? `min(${capW}px, 70cqw, calc(78cqh * ${width} / ${height}))`
      : fit === "fill"
        ? undefined
        : `min(${capW}px, calc(100vw - 4rem), calc(${heightCap} * ${width} / ${height}))`

  return (
    <div
      className={cn(
        "inline-block max-w-full rounded-[2rem] border border-white/15 bg-black p-2 shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
        fit === "fill" && "w-full",
        className,
      )}
      style={{
        width: widthCss,
        maxWidth: capW,
      }}
    >
      <div
        className="overflow-hidden rounded-[1.35rem] bg-[#120e0c]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {children ? (
          children
        ) : src ? (
          <img
            src={assetPath(src)}
            srcSet={
              srcSmall && smallWidth
                ? `${assetPath(srcSmall)} ${smallWidth}w, ${assetPath(src)} ${width}w`
                : undefined
            }
            sizes={srcSmall && smallWidth ? sizes : undefined}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            style={{ maxWidth: width, maxHeight: height }}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full flex-col justify-between px-[12%] py-[14%] text-[#f3f0e8]">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">DancingSRQ</p>
            <p className="font-serif text-[clamp(1.6rem,2vw,2.4rem)] italic leading-none">{label}</p>
            <div className="h-px w-full bg-white/15" />
          </div>
        )}
      </div>
    </div>
  )
}
