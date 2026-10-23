"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { markIntroDone } from "@/lib/intro"
import { lockScroll, unlockScroll } from "@/lib/scroll-lock"

export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const line = lineRef.current
    if (!root || !line) return

    if (document.documentElement.classList.contains("rm")) {
      gsap.set(root, { autoAlpha: 0 })
      markIntroDone()
      return
    }

    const site = document.getElementById("site")
    site?.setAttribute("inert", "")
    lockScroll("intro")
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" })

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" })
        site?.removeAttribute("inert")
        unlockScroll("intro")
      },
    })

    timeline.to(line, { scaleX: 1, duration: 0.75, ease: "power3.inOut" }, 0.2)
    timeline.to(root, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, 1.1)
    timeline.add(() => markIntroDone(), 1.1)

    return () => {
      timeline.kill()
      site?.removeAttribute("inert")
      unlockScroll("intro")
    }
  }, [])

  return (
    <div ref={rootRef} className="intro fixed inset-0 z-[90] bg-background text-foreground" aria-hidden>
      <div className="flex h-full flex-col justify-between px-safe py-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Levi Szantosi</p>
        <p className="max-w-4xl font-serif text-[clamp(3rem,8vw,7.2rem)] italic leading-[0.92] tracking-[-0.045em]">
          Sarasota
          <span className="text-accent"> → </span>
          Tokyo
        </p>
        <div className="flex items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span>Developer</span>
          <span className="text-right">Aspiring game designer</span>
        </div>
      </div>
      <div ref={lineRef} className="absolute inset-x-0 bottom-0 h-[3px] bg-accent" />
    </div>
  )
}
