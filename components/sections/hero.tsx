"use client"

import { useLayoutEffect, useRef, type CSSProperties } from "react"
import { site } from "@/content/site"
import { gsap } from "@/lib/gsap"

function chars(word: string, offset: number) {
  return word.split("").map((character, index) => (
    <span
      key={`${word}-${character}-${index}`}
      className="hero-char inline-block"
      style={{ "--i": offset + index } as CSSProperties}
    >
      {character}
    </span>
  ))
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const heading = headingRef.current
    const section = sectionRef.current
    if (!heading || !section) return
    if (document.documentElement.classList.contains("rm")) return

    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(heading, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-dvh flex-col px-safe pb-8 pt-28">
      <p className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-[11px] uppercase tracking-[0.28em] text-faint lg:block [writing-mode:vertical-rl]">
        {site.studio}
      </p>
      <div className="flex flex-1 flex-col justify-end">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.role}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          aria-label={site.name}
          className="text-[clamp(3.5rem,15.2vw,15.5rem)] leading-[0.84] tracking-[-0.065em] outline-none"
        >
          <span aria-hidden className="block overflow-hidden pb-[0.08em] uppercase">
            {chars(site.firstName, 0)}
          </span>
          <span aria-hidden className="mt-[0.02em] block overflow-hidden pb-[0.16em] pr-[0.08em] font-serif text-[0.82em] italic leading-[0.9] tracking-[-0.045em]">
            {chars(site.lastName, site.firstName.length)}
            <span
              className="hero-char ml-[0.12em] inline-block h-[0.14em] w-[0.14em] bg-accent align-[0.08em]"
              style={{ "--i": site.firstName.length + site.lastName.length } as CSSProperties}
            />
          </span>
        </h1>
      </div>
      <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">{site.hero.lede}</p>
        <div className="flex items-center gap-4">
          <span className="scroll-hint hidden h-14 w-px bg-foreground/30 md:block" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Scroll</span>
        </div>
      </div>
    </section>
  )
}
