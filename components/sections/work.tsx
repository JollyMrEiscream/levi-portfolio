"use client"

import { useLayoutEffect, useRef } from "react"
import { projects, site } from "@/content/site"
import { ProjectCard } from "@/components/project-card"
import { gsap } from "@/lib/gsap"
import { pad } from "@/lib/utils"

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!section || !track || !viewport) return

    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (projects.length - 1))
            if (indexRef.current) indexRef.current.textContent = pad(index + 1)
            if (barRef.current) barRef.current.style.transform = `scaleY(${self.progress})`
          },
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div id="work">
      <section ref={sectionRef} className="work-pin" aria-label={site.work.title}>
        <div className="flex h-dvh items-stretch">
          <aside className="flex w-[min(22rem,34vw)] shrink-0 flex-col justify-between py-10 pr-6 pl-safe">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              {site.work.index} — {site.work.title}
            </p>
            <div>
              <h2 className="font-serif text-[clamp(3.5rem,6vw,6.5rem)] italic leading-[0.85] tracking-[-0.045em]">
                Work
              </h2>
              <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-muted">{site.work.lede}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="relative h-24 w-px bg-line" aria-hidden>
                <span ref={barRef} className="absolute inset-0 origin-top bg-accent" style={{ transform: "scaleY(0)" }} />
              </span>
              <p className="font-mono text-[11px] tracking-[0.18em] text-faint">
                <span ref={indexRef}>01</span>
                <span> / {pad(projects.length)}</span>
              </p>
            </div>
          </aside>
          <div ref={viewportRef} className="relative min-w-0 flex-1 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent" />
            <div ref={trackRef} className="flex h-full w-max items-center gap-8 pr-[10vw]">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} variant="pin" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="work-stack px-safe py-24 md:py-32" aria-label={site.work.title}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          {site.work.index} — {site.work.title}
        </p>
        <h2 className="mt-6 font-serif text-[clamp(3.2rem,10vw,6rem)] italic leading-none tracking-[-0.045em]">Work</h2>
        <p className="mt-4 max-w-md text-muted">{site.work.lede}</p>
        <div className="mt-12 grid gap-14 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} variant="stack" />
          ))}
        </div>
      </section>
    </div>
  )
}
