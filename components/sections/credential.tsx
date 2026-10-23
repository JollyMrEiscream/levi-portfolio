"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"
import { assetPath } from "@/lib/base-path"
import { gsap } from "@/lib/gsap"

const PORTRAIT = "/media/cayenne/cayenne-lineart-portrait-1080x1920.mp4"
const SMALL = "/media/cayenne/cayenne-lineart-720p.mp4"
const HD_WEBM = "/media/cayenne/cayenne-lineart-1080p.webm"
const HD_MP4 = "/media/cayenne/cayenne-lineart-1080p.mp4"
const POSTER = "/media/cayenne/poster.webp"

function sourceKind() {
  if (window.matchMedia("(max-aspect-ratio: 1/1)").matches) return "portrait"
  if (window.matchMedia("(max-width: 1023px)").matches) return "small"
  return "hd"
}

function mountSources(video: HTMLVideoElement) {
  const kind = sourceKind()
  if (video.dataset.kind === kind && video.querySelector("source")) return
  const time = video.currentTime
  video.dataset.kind = kind
  video.querySelectorAll("source").forEach((node) => node.remove())
  const add = (src: string, type: string, media?: string) => {
    const source = document.createElement("source")
    source.src = assetPath(src)
    source.type = type
    if (media) source.media = media
    video.append(source)
  }
  add(PORTRAIT, "video/mp4", "(max-aspect-ratio: 1/1)")
  add(SMALL, "video/mp4", "(max-width: 1023px)")
  add(HD_WEBM, "video/webm")
  add(HD_MP4, "video/mp4")
  video.load()
  if (time > 0 && Number.isFinite(time)) video.currentTime = time
}

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const play = () => {
      mountSources(video)
      video.muted = true
      if (video.ended) video.currentTime = 0
      void video.play().catch(() => undefined)
    }

    const portraitQ = window.matchMedia("(max-aspect-ratio: 1/1)")
    const smallQ = window.matchMedia("(max-width: 1023px)")
    const onChange = () => {
      const wasPlaying = !video.paused
      mountSources(video)
      if (wasPlaying) void video.play().catch(() => undefined)
    }
    portraitQ.addEventListener("change", onChange)
    smallQ.addEventListener("change", onChange)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.55 },
    )
    observer.observe(section)
    return () => {
      observer.disconnect()
      portraitQ.removeEventListener("change", onChange)
      smallQ.removeEventListener("change", onChange)
    }
  }, [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    if (!section || !copy) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const mm = gsap.matchMedia()

    const build = (light: boolean) => {
      const distance = () => window.innerHeight * (light ? 1.05 : 1.4)
      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: light ? 0.35 : 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.set(copy, { opacity: 0, y: 28 })
      timeline.to(copy, { opacity: 1, y: 0, duration: 0.24 }, 0.72)
      return timeline
    }

    mm.add("(min-width: 1024px)", () => {
      const timeline = build(false)
      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })

    mm.add("(max-width: 1023px)", () => {
      const timeline = build(true)
      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="credential"
      ref={sectionRef}
      className="credential-section"
      aria-label={`${site.credential.program}, ${site.credential.place}`}
    >
      <div className="cayenne-pin">
        <div className="cayenne-drive" aria-hidden>
          <video
            ref={videoRef}
            poster={assetPath(POSTER)}
            muted
            playsInline
            preload="none"
            className="cayenne-video"
          />
        </div>

        <div className="cayenne-still">
          <img src={assetPath(POSTER)} alt="Line drawing of a Cayenne on a road at night" width={1920} height={1080} />
        </div>

        <div ref={copyRef} className="credential-copy">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {site.credential.index} — {site.credential.kicker}
          </p>
          <h2 className="mt-6 max-w-5xl text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.88] tracking-[-0.05em]">
            {site.credential.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-10 max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{site.credential.program}</p>
            <p className="mt-3 text-lg text-muted">{site.credential.place}</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{site.credential.detail}</p>
          </div>
        </div>
        <CayenneCredit className="cayenne-credit" />
      </div>
    </section>
  )
}
