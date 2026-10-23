import Link from "next/link"
import { getProject, site } from "@/content/site"
import { ProjectMockup } from "@/components/mockups"
import { ScaleFrame } from "@/components/scale-frame"
import { assetPath } from "@/lib/base-path"

export function Featured() {
  const project = getProject(site.featured.slug)
  return (
    <section className="px-safe pb-12 md:pb-20" aria-label={site.featured.title}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.featured.kicker}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.featured.title}</p>
      </div>
      <Link
        href={`/work/${site.featured.slug}`}
        data-cursor="View"
        data-transition={site.featured.title}
        className="group block"
      >
        <ScaleFrame className="border border-line bg-surface">
          <div className="aspect-[4/5] sm:aspect-[16/10]">
            {project?.cover ? (
              <img
                src={assetPath(project.cover)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <ProjectMockup slug={site.featured.slug} />
            )}
          </div>
        </ScaleFrame>
      </Link>
      <p className="mt-5 max-w-xl text-muted">{site.featured.caption}</p>
    </section>
  )
}
