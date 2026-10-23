"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"
import { assetPath } from "@/lib/base-path"
import { gsap } from "@/lib/gsap"

const CLIP_PORTRAIT = "/media/cayenne/cayenne-lineart-portrait-1080x1920.mp4"
const CLIP_SMALL = "/media/cayenne/cayenne-lineart-720p.mp4"
const CLIP_HD_WEBM = "/media/cayenne/cayenne-lineart-1080p.webm"
const CLIP_HD_MP4 = "/media/cayenne/cayenne-lineart-1080p.mp4"
const CLIP_POSTER = "/media/cayenne/poster.webp"

const LOOP_PORTRAIT_WEBM = "/media/cayenne/front2/cayenne-front2-loop-portrait-1080x1920.webm"
const LOOP_PORTRAIT_MP4 = "/media/cayenne/front2/cayenne-front2-loop-portrait-1080x1920.mp4"
const LOOP_SMALL = "/media/cayenne/front2/cayenne-front2-loop-720p.mp4"
const LOOP_HD_WEBM = "/media/cayenne/front2/cayenne-front2-loop-1080p.webm"
const LOOP_HD_MP4 = "/media/cayenne/front2/cayenne-front2-loop-1080p.mp4"
const STILL_PORTRAIT = "/media/cayenne/front2/cayenne-front2-portrait-1080x1920.webp"
const STILL_HD = "/media/cayenne/front2/cayenne-front2-1080p.webp"

function sourceKind() {
  if (window.matchMedia("(max-aspect-ratio: 1/1)").matches) return "portrait"
  if (window.matchMedia("(max-width: 1023px)").matches) return "small"
  return "hd"
}

function mountSources(
  video: HTMLVideoElement,
  sources: { src: string; type: string; media?: string }[],
) {
  const kind = sourceKind()
  if (video.dataset.kind === kind && video.querySelector("source")) return
  const time = video.currentTime
  video.dataset.kind = kind
  video.querySelectorAll("source").forEach((node) => node.remove())
  for (const item of sources) {
    const source = document.createElement("source")
    source.src = assetPath(item.src)
    source.type = item.type
    if (item.media) source.media = item.media
    video.append(source)
  }
  video.load()
  if (time > 0 && Number.isFinite(time) && !video.ended) video.currentTime = time
}

const CLIP_SOURCES = [
  { src: CLIP_PORTRAIT, type: "video/mp4", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_SMALL, type: "video/mp4", media: "(max-width: 1023px)" },
  { src: CLIP_HD_WEBM, type: "video/webm" },
  { src: CLIP_HD_MP4, type: "video/mp4" },
]

const LOOP_SOURCES = [
  { src: LOOP_PORTRAIT_WEBM, type: "video/webm", media: "(max-aspect-ratio: 1/1)" },
  { src: LOOP_PORTRAIT_MP4, type: "video/mp4", media: "(max-aspect-ratio: 1/1)" },
  { src: LOOP_SMALL, type: "video/mp4", media: "(max-width: 1023px)" },
  { src: LOOP_HD_WEBM, type: "video/webm" },
  { src: LOOP_HD_MP4, type: "video/mp4" },
]

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLVideoElement>(null)
  const loopRef = useRef<HTMLVideoElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const clip = clipRef.current
    const loop = loopRef.current
    if (!section || !pin || !clip || !loop) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let handed = false

    const showStill = () => {
      pin.classList.add("cayenne-fallback")
      clip.pause()
      loop.pause()
    }

    const arm = () => {
      mountSources(clip, CLIP_SOURCES)
      mountSources(loop, LOOP_SOURCES)
      clip.muted = true
      loop.muted = true
    }

    const settle = () => {
      if (handed || pin.classList.contains("cayenne-fallback")) return
      handed = true
      const fade = () => {
        loop.currentTime = 0
        void loop.play().then(
          () => pin.classList.add("is-resting"),
          () => showStill(),
        )
      }
      if (loop.readyState >= 2) fade()
      else {
        loop.addEventListener("canplay", fade, { once: true })
        loop.addEventListener("error", () => showStill(), { once: true })
      }
    }

    const playClip = () => {
      if (pin.classList.contains("cayenne-fallback")) return
      arm()
      if (handed || clip.ended) {
        if (loop.paused) void loop.play().catch(() => showStill())
        pin.classList.add("is-resting")
        return
      }
      void clip.play().catch(() => showStill())
    }

    const onEnded = () => settle()
    const onClipError = () => showStill()
    clip.addEventListener("ended", onEnded)
    clip.addEventListener("error", onClipError)

    const portraitQ = window.matchMedia("(max-aspect-ratio: 1/1)")
    const smallQ = window.matchMedia("(max-width: 1023px)")
    const onChange = () => {
      if (pin.classList.contains("cayenne-fallback")) return
      arm()
      if (handed || clip.ended) void loop.play().catch(() => showStill())
      else if (!clip.paused) void clip.play().catch(() => showStill())
    }
    portraitQ.addEventListener("change", onChange)
    smallQ.addEventListener("change", onChange)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) playClip()
        else {
          clip.pause()
          loop.pause()
        }
      },
      { rootMargin: "240px", threshold: 0.2 },
    )
    observer.observe(section)

    return () => {
      observer.disconnect()
      clip.removeEventListener("ended", onEnded)
      clip.removeEventListener("error", onClipError)
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
      <div ref={pinRef} className="cayenne-pin">
        <div className="cayenne-drive" aria-hidden>
          <video ref={loopRef} className="cayenne-video cayenne-loop" muted playsInline loop preload="auto" />
          <video
            ref={clipRef}
            className="cayenne-video cayenne-clip"
            poster={assetPath(CLIP_POSTER)}
            muted
            playsInline
            preload="auto"
          />
        </div>

        <picture className="cayenne-still">
          <source media="(max-aspect-ratio: 1/1)" srcSet={assetPath(STILL_PORTRAIT)} />
          <img src={assetPath(STILL_HD)} alt="Line drawing of a Cayenne, front three-quarter" width={1920} height={1080} />
        </picture>

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
