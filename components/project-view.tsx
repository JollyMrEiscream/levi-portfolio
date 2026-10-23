import Link from "next/link"
import type { Project, ProjectFeature, ProjectTier } from "@/content/site"
import { ProjectMockup } from "@/components/mockups"
import { PhonePreviews } from "@/components/phone-previews"
import { ShotGallery } from "@/components/shot-gallery"
import { ScaleFrame } from "@/components/scale-frame"
import { PhoneSlot } from "@/components/phone-slot"
import { LineReveal } from "@/components/text-reveal"
import { assetPath } from "@/lib/base-path"
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
    <article className="pb-8 pt-32 md:pt-40">
      <div className="flex items-center justify-between gap-4 px-safe">
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

      <div className="px-safe">
        <div className="mt-12 flex items-center gap-4">
          {project.mark?.src ? (
            <img
              src={assetPath(project.mark.src)}
              alt=""
              width={project.mark.width}
              height={project.mark.height}
              style={{
                aspectRatio: `${project.mark.width} / ${project.mark.height}`,
                maxWidth: project.mark.width,
                maxHeight: project.mark.height,
              }}
              className="h-11 w-auto object-contain"
            />
          ) : null}
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{project.eyebrow}</p>
        </div>
        <LineReveal
          as="h1"
          lines={project.titleLines}
          immediate
          tabIndex={-1}
          ariaLabel={project.title}
          className="mt-4 max-w-6xl text-[clamp(3.4rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.05em] outline-none"
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>
      </div>

      {project.videos?.length ? (
        <div className="px-safe">
          <PhonePreviews videos={project.videos} />
        </div>
      ) : (
        <div className="px-safe">
          <ScaleFrame className="mt-14 border border-line bg-surface">
            <div className="aspect-[4/5] sm:aspect-[16/10]">
              <ProjectMockup slug={project.slug} />
            </div>
          </ScaleFrame>
        </div>
      )}

      <div className="mt-16 grid gap-12 px-safe md:grid-cols-12">
        <dl className="md:col-span-4">
          <Meta label="Year" value={project.year ?? "—"} />
          <Meta label="Platform" value={project.platform} />
          {project.status ? <Meta label="Status" value={project.status} /> : null}
          <div className="border-t border-line py-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Stack</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.stack.length ? (
                project.stack.map((item) => (
                  <span key={item} className="border border-line px-2 py-1 font-mono text-[11px] tracking-[0.04em]">
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-faint">Add in content/site.ts</span>
              )}
            </dd>
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-line py-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Link</dt>
            <dd>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor="Open" className="underline decoration-accent underline-offset-4">
                  Visit
                </a>
              ) : (
                <span className="text-faint">No public link yet</span>
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

      {project.features?.length ? <FeatureGrid title="What it does" items={project.features} /> : null}
      {project.tiers?.length ? <TierGrid tiers={project.tiers} /> : null}
      {project.gallery?.length ? <ShotGallery shots={project.gallery} /> : null}
      {project.challenges?.length ? <FeatureGrid title="How it is built" items={project.challenges} /> : null}

      <div className="px-safe">
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
      </div>
    </article>
  )
}

function FeatureGrid({ title, items }: { title: string; items: ProjectFeature[] }) {
  return (
    <section className="mt-20 px-safe">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">{title}</p>
      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="bg-background p-6 md:p-8">
            <h2 className="text-xl tracking-[-0.03em]">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TierGrid({ tiers }: { tiers: ProjectTier[] }) {
  return (
    <section className="mt-20 px-safe">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Membership</p>
      <p className="mt-4 max-w-2xl text-muted">
        Apple In-App Purchase on iOS. Square payment links on other platforms. Free accounts and guests see 14 days of the schedule.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className="border border-line bg-surface">
            {tier.image && tier.imageWidth && tier.imageHeight ? (
              <div className="flex justify-center px-6 pt-8">
                <PhoneSlot
                  src={tier.image}
                  srcSmall={tier.imageSmall}
                  smallWidth={tier.imageSmallWidth}
                  sizes="260px"
                  width={tier.imageWidth}
                  height={tier.imageHeight}
                  alt={`${tier.name} membership screen`}
                  maxCssWidth={260}
                  fit="fill"
                />
              </div>
            ) : null}
            <div className="p-5">
              <h2 className="text-2xl tracking-[-0.03em]">{tier.name}</h2>
              <p className="mt-2 font-mono text-[12px] tracking-[0.06em] text-accent">{tier.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tier.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
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
