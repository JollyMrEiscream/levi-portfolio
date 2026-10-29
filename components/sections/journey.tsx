"use client"

import { useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { LineReveal } from "@/components/text-reveal"
import { gsap } from "@/lib/gsap"

function CompassMark() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -right-[6vw] top-8 w-[min(52vw,340px)] text-foreground/[0.14] md:top-16"
      aria-hidden
    >
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M100 14v16M100 170v16M14 100h16M170 100h16" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M100 28 112 100 100 172 88 100Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M100 28 112 100 100 100Z" fill="currentColor" />
      <circle cx="100" cy="100" r="3.5" fill="var(--accent)" />
    </svg>
  )
}

export function Journey() {
  const routeRef = useRef<HTMLOListElement>(null)

  useLayoutEffect(() => {
    const route = routeRef.current
    if (!route) return
    const lines = route.querySelectorAll<HTMLElement>(".journey-line")
    if (!lines.length || document.documentElement.classList.contains("rm")) return

    const tween = gsap.fromTo(
      lines,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: route,
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.4,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section id="journey" className="relative overflow-clip border-t border-line px-safe py-28 md:py-40">
      <CompassMark />
      <div className="relative">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.journey.kicker}</p>
        <LineReveal
          as="h2"
          lines={site.journey.lines}
          className="mt-8 max-w-5xl text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.045em]"
        />
        <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <ol ref={routeRef} aria-label="Teams">
              {site.journey.stops.map((stop, index) => {
                const last = index === site.journey.stops.length - 1
                const body = (
                  <>
                    <span className="block text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-[-0.04em]">{stop.name}</span>
                    <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{stop.kind}</span>
                    <span className="mt-1 block text-sm text-muted">{stop.place}</span>
                  </>
                )
                return (
                  <li key={stop.name} className="relative flex gap-5 pb-12 last:pb-0">
                    {last ? null : (
                      <span className="journey-line absolute left-[5px] top-[13px] -bottom-[13px] w-px bg-foreground/30" aria-hidden />
                    )}
                    <span
                      className={
                        last
                          ? "relative z-[1] mt-2 h-[11px] w-[11px] shrink-0 rounded-full bg-accent"
                          : "relative z-[1] mt-2 h-[11px] w-[11px] shrink-0 rounded-full border border-foreground/50 bg-background"
                      }
                      aria-hidden
                    />
                    {last ? (
                      <a
                        href={site.journey.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="Open"
                        className="block min-w-0 transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:hover:translate-x-2"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="min-w-0">{body}</div>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted md:col-span-6 md:col-start-7 md:text-lg">
            {site.journey.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{site.journey.idealsLabel}</p>
          <ul className="mt-4 grid border-t border-line sm:grid-cols-2">
            {site.journey.ideals.map((ideal) => (
              <li key={ideal} className="flex items-baseline gap-3 border-b border-line py-4 text-sm text-foreground/90 sm:odd:pr-8">
                <span className="font-mono text-[11px] text-accent" aria-hidden>
                  +
                </span>
                {ideal}
              </li>
            ))}
          </ul>
        </div>
        <blockquote className="mt-16 max-w-4xl border-l-2 border-accent pl-6">
          <p className="font-serif text-[clamp(1.8rem,4vw,3.5rem)] italic leading-[1.12] tracking-[-0.03em]">{site.journey.signoff}</p>
          <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{site.journey.signoffFrom}</footer>
        </blockquote>
        <a
          href={site.journey.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="Open"
          className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-muted underline decoration-accent decoration-2 underline-offset-[0.45em] hover:text-foreground"
        >
          {site.journey.linkLabel}
        </a>
      </div>
    </section>
  )
}
