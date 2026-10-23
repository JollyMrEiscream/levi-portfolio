"use client"

import { useLayoutEffect, useRef } from "react"
import type { ProjectShot } from "@/content/site"
import { PhoneSlot } from "@/components/phone-slot"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function ShotGallery({ shots }: { shots: ProjectShot[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    const mm = gsap.matchMedia()
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      const refresh = () => ScrollTrigger.refresh()
      const images = [...track.querySelectorAll("img")]
      images.forEach((image) => {
        if (!image.complete) image.addEventListener("load", refresh, { once: true })
      })
      return () => {
        images.forEach((image) => image.removeEventListener("load", refresh))
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="shot-gallery mt-20" aria-label="Screenshots">
      <div ref={viewportRef} className="shot-viewport lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:overflow-hidden">
        <p className="px-safe font-mono text-[11px] uppercase tracking-[0.22em] text-faint lg:pb-8">Screens</p>
        <div className="mt-6 overflow-x-auto lg:mt-0 lg:overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-5 px-safe pb-4 snap-x snap-mandatory lg:snap-none lg:pb-0">
            {shots.map((shot) => (
              <PhoneSlot
                key={shot.src ?? shot.label}
                src={shot.src}
                srcSmall={shot.srcSmall}
                smallWidth={shot.smallWidth}
                sizes="270px"
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                label={shot.label}
                maxCssWidth={270}
                maxCssHeight="min(62dvh, 30rem)"
                className="shrink-0 snap-center"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
