import type { Project } from "@/content/site"
import { BrowserFrame, DeviceStage } from "@/components/device-stage"
import { ProjectMockup } from "@/components/mockups"

const screenSizes = "(min-width: 1024px) 960px, 100vw"

/** Case-study and card visual: a real capture in a browser, or a drawn device. */
export function ProjectFigure({
  project,
  presentation,
}: {
  project: Project
  presentation: "card" | "hero"
}) {
  if (project.screen?.src) {
    return (
      <DeviceStage>
        <BrowserFrame
          screen={project.screen}
          sizes={screenSizes}
          maxCssWidth={960}
          loading={presentation === "hero" ? "eager" : "lazy"}
        />
      </DeviceStage>
    )
  }

  return <ProjectMockup slug={project.slug} />
}
