"use client"

import { useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneSvg } from "@/components/cayenne-svg"
import { gsap } from "@/lib/gsap"

const LINES = [
  { top: "42%", width: "28%" },
  { top: "48%", width: "42%" },
  { top: "54%", width: "18%" },
  { top: "58%", width: "36%" },
  { top: "63%", width: "22%" },
  { top: "68%", width: "46%" },
  { top: "73%", width: "16%" },
]

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const ghostARef = useRef<HTMLDivElement>(null)
  const ghostBRef = useRef<HTMLDivElement>(null)
  const flareRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const car = carRef.current
    const ghostA = ghostARef.current
    const ghostB = ghostBRef.current
    const flare = flareRef.current
    const trail = trailRef.current
    const copy = copyRef.current
    const lines = linesRef.current
    if (!section || !car || !ghostA || !ghostB || !flare || !trail || !copy || !lines) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const mm = gsap.matchMedia()

    const build = (light: boolean) => {
      const distance = () => window.innerHeight * (light ? 0.95 : 1.85)
      const exitX = () => -window.innerWidth * (light ? 0.92 : 1.05)
      const approach = light ? 0.72 : 1.18
      const pass = light ? 1.28 : 1.42
      const streaks = [...lines.querySelectorAll<HTMLElement>("[data-streak]")]

      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: light ? 0.35 : 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.set([car, ghostA, ghostB], {
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 60%",
        force3D: true,
      })
      gsap.set(car, { scale: 0.18, y: -36, rotationY: 0, rotationZ: 0, opacity: 1 })
      gsap.set([ghostA, ghostB], { scale: 0.18, y: -36, opacity: 0 })
      gsap.set(flare, { opacity: 0.05, scale: 0.7 })
      gsap.set(trail, { xPercent: 55, opacity: 0 })
      gsap.set(copy, { opacity: 0, y: 28 })
      gsap.set(streaks, { opacity: 0, x: 80 })

      timeline.to(car, { scale: approach, y: 18, duration: 0.46 }, 0)
      timeline.to(ghostA, { scale: approach * 0.96, y: 18, opacity: light ? 0 : 0.16, duration: 0.46 }, 0)
      timeline.to(ghostB, { scale: approach * 0.92, y: 22, opacity: light ? 0 : 0.08, duration: 0.46 }, 0)
      timeline.to(flare, { opacity: 0.85, scale: 1, duration: 0.32 }, 0.12)
      timeline.to(flare, { opacity: 1, scale: 1.35, duration: 0.08 }, 0.4)
      timeline.to(flare, { opacity: 0.55, scale: 1.05, duration: 0.08 }, 0.48)

      streaks.forEach((streak, index) => {
        timeline.to(
          streak,
          { opacity: light && index > 2 ? 0 : 0.75, x: light ? -160 : -280, duration: 0.4 },
          0.12 + (index % 3) * 0.02,
        )
      })

      timeline.to(
        car,
        { x: exitX, y: -20, scale: pass, rotationY: light ? -26 : -42, rotationZ: light ? -4 : -7, duration: 0.34 },
        0.46,
      )
      timeline.to(
        ghostA,
        { x: () => exitX() * 0.72, y: 8, scale: pass * 0.94, rotationY: -18, opacity: 0, duration: 0.3 },
        0.48,
      )
      timeline.to(ghostB, { x: () => exitX() * 0.5, opacity: 0, duration: 0.26 }, 0.48)
      timeline.to(flare, { opacity: 0, duration: 0.14 }, 0.52)
      timeline.to(streaks, { opacity: 0, x: light ? -220 : -420, duration: 0.24 }, 0.5)
      timeline.fromTo(
        trail,
        { xPercent: 28, opacity: 0 },
        { xPercent: -78, opacity: 1, duration: 0.26, immediateRender: false },
        0.5,
      )
      timeline.to(trail, { opacity: 0, xPercent: -120, duration: 0.12 }, 0.78)
      timeline.to(copy, { opacity: 1, y: 0, duration: 0.16 }, 0.8)
      timeline.to(car, { opacity: 0, duration: 0.1 }, 0.72)

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
          <div className="absolute top-[61%] left-1/2 h-[34%] w-px origin-top bg-white/15" style={{ transform: "rotate(16deg)" }} />
          <div className="absolute top-[61%] left-1/2 h-[34%] w-px origin-top bg-white/15" style={{ transform: "rotate(-16deg)" }} />
          <div ref={linesRef}>
            {LINES.map((line) => (
              <span
                key={`${line.top}-${line.width}`}
                data-streak
                className="cayenne-streak"
                style={{ top: line.top, width: line.width }}
              />
            ))}
          </div>
          <div ref={ghostBRef} className="cayenne-car cayenne-ghost">
            <CayenneSvg className="h-full w-full" />
          </div>
          <div ref={ghostARef} className="cayenne-car cayenne-ghost">
            <CayenneSvg className="h-full w-full" />
          </div>
          <div ref={carRef} className="cayenne-car">
            <CayenneSvg className="h-full w-full" />
            <div ref={flareRef} className="cayenne-flares">
              <span />
              <span />
            </div>
          </div>
          <div ref={trailRef} className="cayenne-trail" />
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
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{site.credential.program}</p>
              <p className="mt-3 text-lg text-muted">{site.credential.place}</p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{site.credential.detail}</p>
            </div>
            <CayenneSvg className="cayenne-mark" />
          </div>
        </div>
      </div>
    </section>
  )
}
