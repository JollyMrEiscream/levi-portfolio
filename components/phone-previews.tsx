"use client"

import { useEffect, useRef } from "react"
import type { ProjectVideo } from "@/content/site"
import { DeviceFloor } from "@/components/device-stage"
import { PhoneSlot } from "@/components/phone-slot"
import { assetPath } from "@/lib/base-path"
import { cn } from "@/lib/utils"

export function PhonePreviews({ videos, className }: { videos: ProjectVideo[]; className?: string }) {
  return (
    <div className={cn("mt-16 grid gap-10 sm:grid-cols-3", className)}>
      {videos.map((video) => (
        <PhonePreview key={video.src ?? video.label} video={video} />
      ))}
    </div>
  )
}

function PhonePreview({ video }: { video: ProjectVideo }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !video.src) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const play = () => {
      if (!node.src) node.src = assetPath(video.src!)
      void node.play().catch(() => undefined)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play()
        else node.pause()
      },
      { rootMargin: "240px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [video.src])

  const cap = Math.min(240, video.width, video.posterWidth ?? video.width)

  return (
    <figure>
      <div className="mx-auto w-fit">
        <PhoneSlot
          alt={video.label}
          label={video.label}
          width={video.width}
          height={video.height}
          maxCssWidth={cap}
          fit="fill"
          className="mx-auto shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
        >
        {video.src ? (
          <video
            ref={ref}
            poster={video.poster ? assetPath(video.poster) : undefined}
            width={video.width}
            height={video.height}
            muted
            loop
            playsInline
            preload="none"
            aria-label={video.label}
            style={{ maxWidth: video.width, maxHeight: video.height }}
            className="h-full w-full object-contain"
          />
        ) : null}
        </PhoneSlot>
        <DeviceFloor />
      </div>
      {video.src ? (
        <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {video.label}
        </figcaption>
      ) : null}
    </figure>
  )
}
