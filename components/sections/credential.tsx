"use client"

import { useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"
import { assetPath } from "@/lib/base-path"
import { ScrollTrigger } from "@/lib/gsap"

const CLIP_PORTRAIT_WEBM = "/media/cayenne/cayenne-lineart-portrait-1080x1920.webm"
const CLIP_PORTRAIT_MP4 = "/media/cayenne/cayenne-lineart-portrait-1080x1920.mp4"
const CLIP_SMALL_WEBM = "/media/cayenne/cayenne-lineart-720p.webm"
const CLIP_SMALL_MP4 = "/media/cayenne/cayenne-lineart-720p.mp4"
const CLIP_HD_WEBM = "/media/cayenne/cayenne-lineart-1080p.webm"
const CLIP_HD_MP4 = "/media/cayenne/cayenne-lineart-1080p.mp4"
const CLIP_POSTER = "/media/cayenne/poster.webp"

const STILL_PORTRAIT = "/media/cayenne/front2/cayenne-front2-portrait-1080x1920.webp"
const STILL_HD = "/media/cayenne/front2/cayenne-front2-1080p.webp"

/** Scroll, in viewport heights: clip scrub, then the crossfade, then the collapse. */
const CLIP_VH = 1.75
const FADE_VH = 0.2
const COLLAPSE_VH = 0.85
const TOTAL_VH = CLIP_VH + FADE_VH + COLLAPSE_VH

type Source = { src: string; type: string; media?: string }

const CLIP_SOURCES: Source[] = [
  { src: CLIP_PORTRAIT_WEBM, type: "video/webm", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_PORTRAIT_MP4, type: "video/mp4", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_SMALL_WEBM, type: "video/webm", media: "(max-width: 1023px)" },
  { src: CLIP_SMALL_MP4, type: "video/mp4", media: "(max-width: 1023px)" },
  { src: CLIP_HD_WEBM, type: "video/webm" },
  { src: CLIP_HD_MP4, type: "video/mp4" },
]

const H264_SOURCES: Source[] = [
  { src: CLIP_PORTRAIT_MP4, type: "video/mp4", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_SMALL_MP4, type: "video/mp4", media: "(max-width: 1023px)" },
  { src: CLIP_HD_MP4, type: "video/mp4" },
]

function sourceKind() {
  if (window.innerWidth / window.innerHeight <= 1) return "portrait"
  if (window.matchMedia("(max-width: 1023px)").matches) return "small"
  return "hd"
}

/** iOS and Safari seek H.264 more reliably than VP9. Other browsers get WebM first. */
function scrubSources() {
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  const safari = /Safari/i.test(ua) && !/Chrome|Chromium|Android/i.test(ua)
  return iOS || safari ? H264_SOURCES : CLIP_SOURCES
}

function applyKind(section: HTMLElement) {
  const kind = sourceKind()
  section.dataset.kind = kind
  if (kind === "portrait") {
    section.style.setProperty("--frame-ratio", "9 / 16")
    section.style.setProperty("--frame-aspect", "0.5625")
    section.style.setProperty("--src-w", "1080")
    return
  }
  section.style.setProperty("--frame-ratio", "16 / 9")
  section.style.setProperty("--frame-aspect", "1.7778")
  section.style.setProperty("--src-w", kind === "small" ? "1280" : "1920")
}

function mountSources(video: HTMLVideoElement, sources: Source[]) {
  const kind = sourceKind()
  const codec = sources === H264_SOURCES ? "h264" : "mix"
  const stamp = `${kind}:${codec}`
  if (video.dataset.kind === stamp && video.querySelector("source")) return
  video.dataset.kind = stamp
  video.querySelectorAll("source").forEach((node) => node.remove())
  for (const item of sources) {
    const source = document.createElement("source")
    source.src = assetPath(item.src)
    source.type = item.type
    if (item.media) source.media = item.media
    video.append(source)
  }
  video.load()
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLVideoElement>(null)
  const stillRef = useRef<HTMLPictureElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const creditRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const slot = slotRef.current
    const frame = frameRef.current
    const clip = clipRef.current
    const still = stillRef.current
    const copy = copyRef.current
    const credit = creditRef.current
    if (!section || !slot || !frame || !clip || !still || !copy || !credit) return
    applyKind(section)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    section.classList.add("is-scrub")

    let wantTime = 0
    let raf = 0
    let seeking = false
    let seekTimer = 0

    const flushSeek = () => {
      raf = 0
      const duration = clip.duration
      if (!duration || !Number.isFinite(duration) || clip.readyState < 2) return
      const last = Math.max(0, duration - 0.05)
      const next = Math.min(Math.max(0, wantTime), last)
      if (Math.abs(clip.currentTime - next) < 0.02) return
      if (seeking) return
      seeking = true
      window.clearTimeout(seekTimer)
      seekTimer = window.setTimeout(() => {
        if (!seeking) return
        seeking = false
        if (!raf) raf = requestAnimationFrame(flushSeek)
      }, 48)
      try {
        clip.currentTime = next
      } catch {
        seeking = false
      }
    }

    const onSeeked = () => {
      seeking = false
      window.clearTimeout(seekTimer)
      const duration = clip.duration
      if (!duration || !Number.isFinite(duration)) return
      const last = Math.max(0, duration - 0.05)
      const next = Math.min(Math.max(0, wantTime), last)
      if (Math.abs(clip.currentTime - next) > 0.03 && !raf) raf = requestAnimationFrame(flushSeek)
    }

    const requestSeek = (time: number) => {
      wantTime = time
      if (!raf) raf = requestAnimationFrame(flushSeek)
    }

    const prime = () => {
      clip.muted = true
      clip.defaultMuted = true
      clip.playsInline = true
      clip.setAttribute("playsinline", "")
      clip.setAttribute("webkit-playsinline", "")
      const kick = () => {
        const played = clip.play()
        if (!played) return
        played.then(
          () => {
            clip.pause()
            try {
              clip.currentTime = 0
            } catch {
              /* the first scroll seek will land */
            }
          },
          () => {
            /* seeking still runs once a frame is buffered */
          },
        )
      }
      if (clip.readyState >= 2) kick()
      else clip.addEventListener("loadeddata", kick, { once: true })
    }

    const clearFrame = () => {
      frame.style.top = ""
      frame.style.left = ""
      frame.style.width = ""
      frame.style.height = ""
      frame.style.borderRadius = ""
    }

    const paint = (progress: number) => {
      const clipEnd = CLIP_VH / TOTAL_VH
      const fadeEnd = (CLIP_VH + FADE_VH) / TOTAL_VH
      const clipP = Math.min(1, progress / clipEnd)
      const fadeP = progress <= clipEnd ? 0 : progress >= fadeEnd ? 1 : (progress - clipEnd) / (fadeEnd - clipEnd)
      const collapseP = progress <= fadeEnd ? 0 : (progress - fadeEnd) / (1 - fadeEnd)

      const duration = clip.duration
      if (duration && Number.isFinite(duration)) requestSeek(clipP * Math.max(0, duration - 0.05))

      const stillImg = still.querySelector("img")
      const stillReady = !!stillImg && stillImg.complete && stillImg.naturalWidth > 0
      if (clip.classList.contains("is-broken")) {
        clip.style.opacity = "0"
        still.style.opacity = "1"
      } else {
        const fade = stillReady ? fadeP : 0
        clip.style.opacity = String(1 - fade)
        still.style.opacity = String(fade)
      }
      const shown = String(collapseP)
      copy.style.opacity = shown
      credit.style.opacity = shown

      if (collapseP <= 0) {
        clearFrame()
        return
      }

      const slotBox = slot.getBoundingClientRect()
      const root = section.getBoundingClientRect()
      const fullW = section.clientWidth
      const fullH = section.clientHeight
      frame.style.top = `${lerp(0, slotBox.top - root.top, collapseP)}px`
      frame.style.left = `${lerp(0, slotBox.left - root.left, collapseP)}px`
      frame.style.width = `${lerp(fullW, slotBox.width, collapseP)}px`
      frame.style.height = `${lerp(fullH, slotBox.height, collapseP)}px`
      frame.style.borderRadius = `${lerp(0, 20, collapseP)}px`
    }

    mountSources(clip, scrubSources())
    prime()
    clip.addEventListener("seeked", onSeeked)
    const onError = () => {
      clip.classList.add("is-broken")
      still.style.opacity = "1"
    }
    clip.addEventListener("error", onError)

    const portraitQ = window.matchMedia("(max-aspect-ratio: 1/1)")
    const smallQ = window.matchMedia("(max-width: 1023px)")
    const onChange = () => {
      applyKind(section)
      mountSources(clip, scrubSources())
      prime()
      ScrollTrigger.refresh()
    }
    portraitQ.addEventListener("change", onChange)
    smallQ.addEventListener("change", onChange)

    const trigger = ScrollTrigger.create({
      id: "cayenne",
      trigger: section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * TOTAL_VH)}`,
      pin: true,
      pinType: "fixed",
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => paint(self.progress),
      onRefresh: (self) => paint(self.progress),
    })

    paint(trigger.progress)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(seekTimer)
      clip.removeEventListener("seeked", onSeeked)
      clip.removeEventListener("error", onError)
      portraitQ.removeEventListener("change", onChange)
      smallQ.removeEventListener("change", onChange)
      trigger.kill()
      section.classList.remove("is-scrub")
      clearFrame()
      clip.pause()
    }
  }, [])

  return (
    <section
      id="credential"
      ref={sectionRef}
      className="credential-section"
      aria-label={`${site.credential.program}, ${site.credential.place}`}
    >
      <div className="credential-layout">
        <div ref={slotRef} className="cayenne-slot">
          <div ref={frameRef} className="cayenne-frame">
            <div className="cayenne-drive" aria-hidden>
              <video
                ref={clipRef}
                className="cayenne-video cayenne-clip"
                poster={assetPath(CLIP_POSTER)}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
              />
            </div>
            <picture ref={stillRef} className="cayenne-still">
              <source media="(max-aspect-ratio: 1/1)" srcSet={assetPath(STILL_PORTRAIT)} />
              <img
                src={assetPath(STILL_HD)}
                alt="Line drawing of a Cayenne, front three-quarter"
                width={1920}
                height={1080}
              />
            </picture>
          </div>
        </div>
        <div ref={copyRef} className="credential-copy">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {site.credential.index} — {site.credential.kicker}
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.7rem,4.6vw,5rem)] leading-[0.9] tracking-[-0.05em]">
            {site.credential.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-3 max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{site.credential.program}</p>
            <p className="mt-2 text-base text-muted">{site.credential.place}</p>
            <p className="mt-2 text-sm leading-snug text-muted md:mt-3 md:text-base md:leading-relaxed">{site.credential.detail}</p>
          </div>
        </div>
        <div ref={creditRef} className="cayenne-credit">
          <CayenneCredit />
        </div>
      </div>
    </section>
  )
}
