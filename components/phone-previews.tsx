"use client"

import { useEffect, useRef } from "react"
import type { ProjectVideo } from "@/content/site"
import { assetPath } from "@/lib/base-path"

export function PhonePreviews({ videos }: { videos: ProjectVideo[] }) {
  return (
    <div className="mt-16 grid gap-10 sm:grid-cols-3">
      {videos.map((video) => (
        <PhonePreview key={video.src} video={video} />
      ))}
    </div>
  )
}

function PhonePreview({ video }: { video: ProjectVideo }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const play = () => {
      if (!node.src) node.src = assetPath(video.src)
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

  return (
    <figure>
      <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-white/15 bg-black p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <video
          ref={ref}
          poster={assetPath(video.poster)}
          muted
          loop
          playsInline
          preload="none"
          aria-label={video.label}
          className="aspect-[9/16] w-full rounded-[1.45rem] bg-[#120e0c] object-cover"
        />
      </div>
      <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        {video.label}
      </figcaption>
    </figure>
  )
}
