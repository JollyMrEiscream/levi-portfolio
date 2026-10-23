import Link from "next/link"
import { getProject, site } from "@/content/site"
import { PhoneSlot } from "@/components/phone-slot"
import { ProjectMockup } from "@/components/mockups"
import { ScaleFrame } from "@/components/scale-frame"

export function Featured() {
  const project = getProject(site.featured.slug)
  const cover = project?.cover

  return (
    <section className="px-safe pb-12 md:pb-20" aria-label={site.featured.title}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.featured.kicker}</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{site.featured.title}</p>
      </div>
      {cover ? (
        <Link
          href={`/work/${site.featured.slug}`}
          data-cursor="View"
          data-transition={site.featured.title}
          className="grid items-center gap-8 lg:grid-cols-[auto_minmax(0,32rem)] lg:justify-between lg:gap-16"
        >
          <PhoneSlot
            src={cover.src}
            srcSmall={cover.srcSmall}
            smallWidth={cover.smallWidth}
            sizes="560px"
            width={cover.width}
            height={cover.height}
            alt=""
            label="Home"
            maxCssWidth={560}
            maxCssHeight="78dvh"
            className="justify-self-center lg:justify-self-start"
          />
          <div>
            <p className="font-serif text-[clamp(2.8rem,5vw,4.6rem)] italic leading-[0.9] tracking-[-0.045em]">
              {site.featured.title}
            </p>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{site.featured.caption}</p>
            <span className="mt-6 inline-block font-mono text-[11px] tracking-[0.18em] text-accent">View</span>
          </div>
        </Link>
      ) : (
        <Link
          href={`/work/${site.featured.slug}`}
          data-cursor="View"
          data-transition={site.featured.title}
          className="group block"
        >
          <ScaleFrame className="border border-line bg-surface">
            <div className="aspect-[4/5] sm:aspect-[16/10]">
              <ProjectMockup slug={site.featured.slug} />
            </div>
          </ScaleFrame>
          <p className="mt-5 max-w-xl text-muted">{site.featured.caption}</p>
        </Link>
      )}
    </section>
  )
}
