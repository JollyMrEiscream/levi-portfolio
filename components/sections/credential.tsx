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

/**
 * One pinned gesture, in viewport heights.
 * The clip plays, then the camera is already moving when the light catches the car.
 */
const TOTAL_VH = 2.8
const DRIVE_END = 0.74
const MOVE_START = 0.62
const WIPE_START = 0.74
const WIPE_SPAN = 0.08
const COPY_START = 0.78
const CREDIT_START = 0.84

type Source = { src: string; type: string; media?: string }

/**
 * H.264 first. The WebM files are larger and their duration isn't in the header,
 * so a seek before they buffer never paints and the poster stays up.
 * WebM remains the fallback when H.264 isn't playable.
 */
const CLIP_SOURCES: Source[] = [
  { src: CLIP_PORTRAIT_MP4, type: "video/mp4", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_PORTRAIT_WEBM, type: "video/webm", media: "(max-aspect-ratio: 1/1)" },
  { src: CLIP_SMALL_MP4, type: "video/mp4", media: "(max-width: 1023px)" },
  { src: CLIP_SMALL_WEBM, type: "video/webm", media: "(max-width: 1023px)" },
  { src: CLIP_HD_MP4, type: "video/mp4" },
  { src: CLIP_HD_WEBM, type: "video/webm" },
]

function sourceKind() {
  if (window.innerWidth / window.innerHeight <= 1) return "portrait"
  if (window.matchMedia("(max-width: 1023px)").matches) return "small"
  return "hd"
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

function mountSources(video: HTMLVideoElement) {
  const kind = sourceKind()
  if (video.dataset.kind === kind && video.querySelector("source")) return
  video.dataset.kind = kind
  video.querySelectorAll("source").forEach((node) => node.remove())
  for (const item of CLIP_SOURCES) {
    const source = document.createElement("source")
    source.src = assetPath(item.src)
    source.type = item.type
    if (item.media) source.media = item.media
    video.append(source)
  }
}

function clamp01(value: number) {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/** Fast leave, long settle. */
function expoOut(value: number) {
  const t = clamp01(value)
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function power4Out(value: number) {
  const t = clamp01(value)
  return 1 - Math.pow(1 - t, 4)
}

type Rig = {
  frameScale: number
  tx: number
  ty: number
  inner: number
  wide: boolean
}

function measureRig(section: HTMLElement, slot: HTMLElement): Rig | null {
  const sectionBox = section.getBoundingClientRect()
  const slotBox = slot.getBoundingClientRect()
  if (slotBox.width < 8 || slotBox.height < 8 || sectionBox.width < 8) return null

  const kind = sourceKind()
  const videoW = kind === "portrait" ? 1080 : kind === "small" ? 1280 : 1920
  const videoH = kind === "portrait" ? 1920 : kind === "small" ? 720 : 1080
  const stillW = kind === "portrait" ? 1080 : 1920
  const stillH = kind === "portrait" ? 1920 : 1080
  const srcW = Math.min(videoW, stillW)
  const srcH = Math.min(videoH, stillH)
  const dpr = window.devicePixelRatio || 1
  const cover = Math.max(sectionBox.width / slotBox.width, sectionBox.height / slotBox.height)
  const cap = Math.min(srcW / (slotBox.width * dpr), srcH / (slotBox.height * dpr))
  const frameScale = Math.min(cover, Math.max(1, cap))
  const slotCx = slotBox.left - sectionBox.left + slotBox.width / 2
  const slotCy = slotBox.top - sectionBox.top + slotBox.height / 2

  return {
    frameScale,
    tx: sectionBox.width / 2 - slotCx,
    ty: sectionBox.height / 2 - slotCy,
    inner: Math.min(1.06, cap / frameScale),
    wide: window.innerWidth >= 1024,
  }
}

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const clipRef = useRef<HTMLVideoElement>(null)
  const stillRef = useRef<HTMLPictureElement>(null)
  const sweepRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const creditRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const slot = slotRef.current
    const frame = frameRef.current
    const media = mediaRef.current
    const clip = clipRef.current
    const still = stillRef.current
    const sweep = sweepRef.current
    const copy = copyRef.current
    const credit = creditRef.current
    if (!section || !slot || !frame || !media || !clip || !still || !sweep || !copy || !credit) return
    applyKind(section)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    section.classList.add("is-scrub")

    let wantTime = 0
    let raf = 0
    let seeking = false
    let seekTimer = 0

    const hold = () => {
      if (!clip.paused) clip.pause()
    }

    const flushSeek = () => {
      raf = 0
      hold()
      const duration = clip.duration
      if (!duration || !Number.isFinite(duration)) return
      const last = Math.max(0, duration - 0.04)
      const next = Math.min(Math.max(0, wantTime), last)
      if (Math.abs(clip.currentTime - next) < 0.03) return
      // One seek at a time. A new currentTime before seeked stacks on a slow
      // decoder and the picture freezes after the first few frames.
      if (seeking) return
      seeking = true
      window.clearTimeout(seekTimer)
      seekTimer = window.setTimeout(() => {
        if (!seeking) return
        seeking = false
        if (!raf) raf = requestAnimationFrame(flushSeek)
      }, 240)
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
      hold()
    }

    const textNodes = [
      ...copy.querySelectorAll<HTMLElement>(".credential-kicker, .credential-line, .credential-meta"),
    ]
    let rig: Rig | null = measureRig(section, slot)

    const clearMotion = () => {
      frame.style.transform = ""
      frame.style.borderRadius = ""
      frame.style.boxShadow = ""
      media.style.transform = ""
      still.style.clipPath = ""
      still.style.opacity = ""
      clip.style.opacity = ""
      sweep.style.opacity = ""
      sweep.style.transform = ""
      credit.style.opacity = ""
      credit.style.transform = ""
      for (const node of textNodes) {
        node.style.opacity = ""
        node.style.transform = ""
      }
    }

    const paint = (progress: number) => {
      const p = clamp01(progress)
      const driveP = clamp01(p / DRIVE_END)
      const moveP = clamp01((p - MOVE_START) / (1 - MOVE_START))
      const moveT = expoOut(moveP)
      const sweepT = clamp01((p - WIPE_START) / WIPE_SPAN)
      const wipe = power4Out(clamp01((sweepT - 0.18) / 0.5))

      const duration = clip.duration
      if (duration && Number.isFinite(duration)) requestSeek(driveP * Math.max(0, duration - 0.05))

      const stillImg = still.querySelector("img")
      const stillReady = !!stillImg && stillImg.complete && stillImg.naturalWidth > 0
      const broken = clip.classList.contains("is-broken")
      const reveal = broken || !stillReady ? (broken ? 1 : 0) : wipe
      still.style.clipPath = reveal >= 1 ? "inset(0 0 0 0)" : `inset(0 ${(1 - reveal) * 100}% 0 0)`
      // Opacity too, so a browser that ignores clip-path on <picture> can't cover the clip with the still.
      still.style.opacity = reveal > 0 ? "1" : "0"
      clip.style.opacity = broken || reveal >= 0.995 ? "0" : "1"

      const sweepOn = !broken && stillReady && sweepT > 0 && sweepT < 1
      sweep.style.opacity = sweepOn ? String(Math.sin(sweepT * Math.PI)) : "0"
      sweep.style.transform = `translate3d(${lerp(-72, 72, sweepT)}%, 0, 0)`

      if (!rig) rig = measureRig(section, slot)
      const pose = rig
      const scale = pose ? lerp(pose.frameScale, 1, moveT) : 1
      const arc = Math.sin(clamp01(moveT) * Math.PI)
      const x = pose ? pose.tx * (1 - moveT) + arc * (pose.wide ? 48 : 16) : 0
      const y = pose ? pose.ty * (1 - moveT) - arc * (pose.wide ? 34 : 20) : 0
      frame.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      const visualRadius = 22 * moveT
      frame.style.borderRadius = `${(visualRadius / Math.max(scale, 0.2)).toFixed(2)}px`

      const land = clamp01((1.22 - scale) / 0.22)
      frame.style.boxShadow =
        land <= 0
          ? "none"
          : `0 0 0 1px rgba(243,240,232,${(0.38 * land).toFixed(3)}), 0 0 ${(36 * land).toFixed(1)}px rgba(243,240,232,${(0.09 * land).toFixed(3)}), 0 ${(24 * land).toFixed(1)}px ${(54 * land).toFixed(1)}px rgba(0,0,0,${(0.48 * land).toFixed(3)})`

      const drift = 1 - moveT
      const inner = pose ? pose.inner : 1
      const mediaScale = 1 + (inner - 1) * drift
      media.style.transform = `translate3d(${(drift * -2.4).toFixed(2)}%, ${(drift * 1.2).toFixed(2)}%, 0) scale(${mediaScale.toFixed(4)})`

      const wide = pose?.wide ?? window.innerWidth >= 1024
      textNodes.forEach((node, index) => {
        const start = COPY_START + index * 0.025
        const shown = power4Out(clamp01((p - start) / 0.2))
        node.style.opacity = String(shown)
        node.style.transform = wide
          ? `translate3d(${((1 - shown) * 36).toFixed(2)}px, 0, 0)`
          : `translate3d(0, ${((1 - shown) * 18).toFixed(2)}px, 0)`
      })

      const creditShown = power4Out(clamp01((p - CREDIT_START) / 0.18))
      credit.style.opacity = String(creditShown)
      credit.style.transform = `translate3d(0, ${((1 - creditShown) * 14).toFixed(2)}px, 0)`
    }

    mountSources(clip)
    prime()
    const arm = () => {
      if (section.getBoundingClientRect().top > window.innerHeight * 1.4) return
      window.removeEventListener("scroll", arm)
      if (clip.preload !== "auto") {
        clip.preload = "auto"
        clip.load()
      }
    }
    window.addEventListener("scroll", arm, { passive: true })
    arm()
    clip.addEventListener("playing", hold)
    clip.addEventListener("seeked", onSeeked)
    const onMediaReady = () => {
      if (!raf) raf = requestAnimationFrame(flushSeek)
    }
    clip.addEventListener("loadedmetadata", onMediaReady)
    clip.addEventListener("loadeddata", onMediaReady)
    clip.addEventListener("canplay", onMediaReady)
    const onError = () => {
      // 1 is MEDIA_ERR_ABORTED, which load() raises while swapping sources.
      if (clip.error && clip.error.code === 1) return
      clip.classList.add("is-broken")
      still.style.opacity = "1"
    }
    clip.addEventListener("error", onError)

    const portraitQ = window.matchMedia("(max-aspect-ratio: 1/1)")
    const smallQ = window.matchMedia("(max-width: 1023px)")
    const onChange = () => {
      applyKind(section)
      mountSources(clip)
      if (clip.preload === "auto") clip.load()
      prime()
      rig = null
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
      onRefresh: (self) => {
        rig = measureRig(section, slot)
        paint(self.progress)
      },
    })

    paint(trigger.progress)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(seekTimer)
      window.removeEventListener("scroll", arm)
      clip.removeEventListener("playing", hold)
      clip.removeEventListener("seeked", onSeeked)
      clip.removeEventListener("loadedmetadata", onMediaReady)
      clip.removeEventListener("loadeddata", onMediaReady)
      clip.removeEventListener("canplay", onMediaReady)
      clip.removeEventListener("error", onError)
      portraitQ.removeEventListener("change", onChange)
      smallQ.removeEventListener("change", onChange)
      trigger.kill()
      section.classList.remove("is-scrub")
      clearMotion()
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
            <div ref={mediaRef} className="cayenne-media">
              <div className="cayenne-drive" aria-hidden>
                <video
                  ref={clipRef}
                  className="cayenne-video cayenne-clip"
                  poster={assetPath(CLIP_POSTER)}
                  muted
                  playsInline
                  preload="metadata"
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
              <div ref={sweepRef} className="cayenne-sweep" aria-hidden />
            </div>
          </div>
        </div>
        <div ref={copyRef} className="credential-copy">
          <p className="credential-kicker font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            {site.credential.index} — {site.credential.kicker}
          </p>
          <h2 className="mt-3 max-w-xl text-[clamp(1.7rem,4.6vw,5rem)] leading-[0.9] tracking-[-0.05em]">
            {site.credential.lines.map((line) => (
              <span key={line} className="credential-line block">
                {line}
              </span>
            ))}
          </h2>
          <div className="credential-meta mt-3 max-w-md">
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
