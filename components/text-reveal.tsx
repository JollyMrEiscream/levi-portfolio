"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { onIntroDone } from "@/lib/intro"
import { cn } from "@/lib/utils"

type Tag = "h1" | "h2" | "h3" | "p"

export function LineReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  immediate = false,
  tabIndex,
  ariaLabel,
}: {
  lines: string[]
  as?: Tag
  className?: string
  lineClassName?: string
  immediate?: boolean
  tabIndex?: number
  ariaLabel?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const rows = el.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!rows.length) return

    if (document.documentElement.classList.contains("rm")) {
      gsap.set(rows, { yPercent: 0 })
      return
    }

    const tween = gsap.fromTo(
      rows,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.08,
        paused: immediate,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start: "top 86%",
            },
      },
    )

    const off = immediate ? onIntroDone(() => tween.play()) : () => {}

    return () => {
      off()
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [immediate, lines])

  const Comp = as

  return (
    <Comp ref={ref as never} className={className} tabIndex={tabIndex} aria-label={ariaLabel}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden pb-[0.08em]">
          <span data-reveal className={cn("block", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Comp>
  )
}
