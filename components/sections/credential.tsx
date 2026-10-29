"use client"

import { useLayoutEffect, useRef } from "react"
import { site } from "@/content/site"
import { CayenneCredit } from "@/components/cayenne-credit"
import { assetPath } from "@/lib/base-path"
import { gsap } from "@/lib/gsap"

const STILL_PORTRAIT = "/media/cayenne/front2/cayenne-front2-portrait-1080x1920.webp"
const STILL_HD = "/media/cayenne/front2/cayenne-front2-1080p.webp"

function applyKind(section: HTMLElement) {
  const portrait = window.innerWidth / window.innerHeight <= 1
  if (portrait) {
    section.style.setProperty("--frame-ratio", "9 / 16")
    section.style.setProperty("--frame-aspect", "0.5625")
    section.style.setProperty("--src-w", "1080")
    return
  }
  section.style.setProperty("--frame-ratio", "16 / 9")
  section.style.setProperty("--frame-aspect", "1.7778")
  section.style.setProperty("--src-w", "1920")
}

export function Credential() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    if (!section || !frame) return
    applyKind(section)
    const onResize = () => applyKind(section)
    window.addEventListener("resize", onResize)
    if (document.documentElement.classList.contains("rm")) {
      return () => window.removeEventListener("resize", onResize)
    }

    const tween = gsap.fromTo(
      frame,
      { autoAlpha: 0, y: 36, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 42%",
          scrub: 0.4,
        },
      },
    )

    return () => {
      window.removeEventListener("resize", onResize)
      tween.scrollTrigger?.kill()
      tween.kill()
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
        <div className="cayenne-slot">
          <div ref={frameRef} className="cayenne-frame">
            <picture className="cayenne-still">
              <source media="(max-aspect-ratio: 1/1)" srcSet={assetPath(STILL_PORTRAIT)} />
              <img
                src={assetPath(STILL_HD)}
                alt="Line drawing of a Cayenne, front three-quarter"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
        <div className="credential-copy">
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
        <div className="cayenne-credit">
          <CayenneCredit />
        </div>
      </div>
    </section>
  )
}
