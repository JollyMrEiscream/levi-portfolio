import Link from "next/link"
import type { Project } from "@/content/site"
import { PhoneStage } from "@/components/device-stage"
import { PhoneSlot } from "@/components/phone-slot"
import { ProjectFigure } from "@/components/project-figure"
import { cn, pad } from "@/lib/utils"

export function ProjectCard({
  project,
  index,
  variant,
}: {
  project: Project
  index: number
  variant: "pin" | "stack"
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      data-transition={project.title}
      className={cn("group block", variant === "pin" && "shrink-0")}
    >
      <article>
        <div
          className={cn(
            "relative overflow-hidden border border-line bg-[#0b0b0b] transition-colors duration-500 group-hover:border-white/30",
            variant === "pin" ? "h-[min(64dvh,38rem)] aspect-[4/5]" : "aspect-[4/5]",
          )}
        >
          <span className="absolute left-4 top-4 z-10 font-mono text-[11px] tracking-[0.18em] text-foreground/80">
            {pad(index + 1)}
          </span>
          {project.cover ? (
            <PhoneStage>
              <PhoneSlot
                src={project.cover.src}
                srcSmall={project.cover.srcSmall}
                smallWidth={project.cover.smallWidth}
                sizes="560px"
                width={project.cover.width}
                height={project.cover.height}
                alt=""
                label="Home"
                maxCssWidth={560}
                fit="container"
                className="shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
              />
            </PhoneStage>
          ) : (
            <ProjectFigure project={project} presentation="card" />
          )}
        </div>
        <div className="flex items-end justify-between gap-4 pt-5">
          <div>
            <h3 className="text-2xl tracking-[-0.04em] md:text-3xl">{project.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{project.summary}</p>
          </div>
          <span className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-accent">View</span>
        </div>
      </article>
    </Link>
  )
}
