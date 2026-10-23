import Link from "next/link"
import type { Project } from "@/content/site"
import { ProjectMockup } from "@/components/mockups"
import { ScaleFrame } from "@/components/scale-frame"
import { LineReveal } from "@/components/text-reveal"
import { pad } from "@/lib/utils"

export function ProjectView({
  project,
  index,
  total,
  next,
}: {
  project: Project
  index: number
  total: number
  next: Project
}) {
  return (
    <article className="px-safe pb-8 pt-32 md:pt-40">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/#work"
          data-transition="Work"
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-foreground"
        >
          ← All work
        </Link>
        <p className="font-mono text-[11px] tracking-[0.18em] text-faint">
          {pad(index + 1)} / {pad(total)}
        </p>
      </div>

      <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{project.eyebrow}</p>
      <LineReveal
        as="h1"
        lines={project.titleLines}
        immediate
        tabIndex={-1}
        ariaLabel={project.title}
        className="mt-4 max-w-6xl text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.05em] outline-none"
      />
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>

      <ScaleFrame className="mt-14 border border-line bg-surface">
        <div className="aspect-[4/5] sm:aspect-[16/10]">
          <ProjectMockup slug={project.slug} />
        </div>
      </ScaleFrame>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <dl className="md:col-span-4">
          <Meta label="Year" value={project.year ?? "—"} />
          <Meta label="Platform" value={project.platform} />
          <Meta label="Stack" value={project.stack.length ? project.stack.join(" · ") : "Add in content/site.ts"} />
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Link</dt>
            <dd>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor="Open" className="underline decoration-accent underline-offset-4">
                  Visit
                </a>
              ) : (
                <span className="text-faint">Add a URL in content/site.ts</span>
              )}
              {project.repoUrl ? (
                <>
                  <span className="text-faint"> · </span>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" data-cursor="Open" className="underline decoration-accent underline-offset-4">
                    Code
                  </a>
                </>
              ) : null}
            </dd>
          </div>
        </dl>
        <div className="space-y-5 text-base leading-relaxed text-muted md:col-span-7 md:col-start-6 md:text-lg">
          {project.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {project.placeholder ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              Starter copy — edit this project in content/site.ts
            </p>
          ) : null}
        </div>
      </div>

      <ScaleFrame className="mt-16 hidden border border-line bg-surface md:block">
        <div className="aspect-[16/7]">
          <ProjectMockup slug={project.slug} />
        </div>
      </ScaleFrame>

      <Link
        href={`/work/${next.slug}`}
        data-cursor="View"
        data-transition={next.title}
        className="group mt-20 flex flex-col gap-6 border-t border-line py-12 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Next</p>
          <p className="mt-3 font-serif text-[clamp(2.8rem,7vw,6rem)] italic leading-[0.9] tracking-[-0.045em] transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover:translate-x-2">
            {next.title}
          </p>
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-accent">View</span>
      </Link>
    </article>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
