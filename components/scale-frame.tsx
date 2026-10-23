"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { cn } from "@/lib/utils"

export function ScaleFrame({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const inner = innerRef.current
    if (!frame || !inner) return

    const mm = gsap.matchMedia()
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        frame,
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 92%",
            end: "top 35%",
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        inner,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    })
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        frame,
        { scale: 0.97 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 96%",
            end: "top 55%",
            scrub: true,
          },
        },
      )
    })

    return () => mm.revert()
  }, [])

  return (
    <div ref={frameRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef}>
        <div className={cn("origin-center md:scale-110", innerClassName)}>{children}</div>
      </div>
    </div>
  )
}
