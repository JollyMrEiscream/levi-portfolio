import { SmoothScroll } from "@/components/smooth-scroll"
import { ScrollProgress } from "@/components/scroll-progress"
import { CustomCursor } from "@/components/custom-cursor"
import { Intro } from "@/components/intro"
import { PageTransition } from "@/components/page-transition"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Intro />
      <PageTransition>
        <div id="site">
          <a href="#content" data-skip className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main id="content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </PageTransition>
    </SmoothScroll>
  )
}
