"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"
import { assetPath } from "@/lib/base-path"
import { gsap } from "@/lib/gsap"

const CLIP = "/media/cayenne/clip.mp4"
const CLIP_WEBM = "/media/cayenne/clip.webm"
const POSTER = "/media/cayenne/poster.webp"

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const play = () => {
      if (!video.querySelector("source")) {
        const webm = document.createElement("source")
        webm.src = assetPath(CLIP_WEBM)
        webm.type = "video/webm"
        const mp4 = document.createElement("source")
        mp4.src = assetPath(CLIP)
        mp4.type = "video/mp4"
        video.append(webm, mp4)
        video.load()
      }
      video.muted = true
      if (video.ended) video.currentTime = 0
      void video.play().catch(() => undefined)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.28 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const trail = trailRef.current
    const copy = copyRef.current
    if (!section || !stage || !trail || !copy) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const mm = gsap.matchMedia()

    const build = (light: boolean) => {
      const distance = () => window.innerHeight * (light ? 0.95 : 1.7)
      const exitX = () => -(window.innerWidth * 0.5 + Math.min(window.innerWidth * 0.92, 1280) * 0.55 + 32)
      const startScale = light ? 0.92 : 0.7

      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: light ? 0.35 : 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.set(stage, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: startScale,
        rotationZ: 0,
        opacity: 1,
        force3D: true,
      })
      gsap.set(trail, { xPercent: 55, opacity: 0 })
      gsap.set(copy, { opacity: 0, y: 28 })

      timeline.to(stage, { scale: 1, duration: 0.42 }, 0)
      timeline.to(stage, { x: exitX, y: light ? -8 : -18, rotationZ: light ? -3 : -6, duration: 0.36 }, 0.42)
      timeline.fromTo(
        trail,
        { xPercent: 28, opacity: 0 },
        { xPercent: -78, opacity: 1, duration: 0.24, immediateRender: false },
        0.5,
      )
      timeline.to(trail, { opacity: 0, xPercent: -120, duration: 0.12 }, 0.76)
      timeline.to(stage, { opacity: 0, duration: 0.1 }, 0.74)
      timeline.to(copy, { opacity: 1, y: 0, duration: 0.16 }, 0.8)

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
      <div className="cayenne-pin relative h-dvh overflow-hidden bg-background">
        <div className="cayenne-drive" aria-hidden>
          <div className="absolute inset-x-0 top-[61%] h-px bg-line" />
          <div ref={stageRef} className="cayenne-stage">
            <video
              ref={videoRef}
              poster={assetPath(POSTER)}
              width={1280}
              height={720}
              muted
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          </div>
          <div ref={trailRef} className="cayenne-trail" />
        </div>

        <div className="cayenne-still">
          <img
            src={assetPath(POSTER)}
            alt="Cayenne on a wet road at night"
            width={1280}
            height={720}
          />
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
            <CayenneCredit className="cayenne-credit mt-8 max-w-xl text-[11px] leading-relaxed text-faint" />
          </div>
        </div>
      </div>
    </section>
  )
}
