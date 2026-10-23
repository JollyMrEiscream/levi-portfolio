/**
 * All portfolio copy lives in this file.
 *
 * STARTER COPY — Levi should replace anything marked `placeholder: true`
 * or called out in the README under "What to fill in". Facts below come
 * from Levi's brief. Tone, case-study paragraphs, years, links, and the
 * email address are editable drafts, not verified quotes.
 */

export type Project = {
  slug: string
  title: string
  titleLines: string[]
  eyebrow: string
  summary: string
  year: string | null
  platform: string
  stack: string[]
  paragraphs: string[]
  /** Shown on the case study when the write-up still needs Levi's own story. */
  placeholder: boolean
  liveUrl: string | null
  repoUrl: string | null
}

export const site = {
  name: "Levi Szantosi",
  firstName: "Levi",
  lastName: "Szantosi",
  monogram: "LS",
  role: "Developer & aspiring game designer",
  location: "Sarasota, Florida",
  locationShort: "Sarasota",
  region: "US Eastern",
  timeZone: "America/New_York",
  studio: "Clear Web Studio",
  email: "levi@srqcoding.club",
  emailIsPlaceholder: false,
  copyrightYear: 2026,
  description:
    "Portfolio of Levi Szantosi, a developer and aspiring game designer in Sarasota, Florida. Studying Japanese, planning language school in Tokyo, and running Clear Web Studio.",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  marquee: [
    "Sarasota",
    "Tokyo",
    "Clear Web Studio",
    "Expo",
    "Electron",
    "Japanese",
    "Game design",
  ],
  hero: {
    lede: "From Sarasota. Studying Japanese. Next stop is language school in Tokyo, then game design at a Japanese university.",
  },
  about: {
    index: "01",
    lines: ["A developer in Sarasota,", "studying Japanese,", "heading for Tokyo."],
    paragraphs: [
      "I design and build software for phones, desktops, and the web, and I run Clear Web Studio for client sites.",
      "The longer plan is language school in Tokyo, then a game design program at a Japanese university.",
    ],
    quote: "Language school in Tokyo, then game design in Japan.",
    facts: [
      { label: "Based in", value: "Sarasota, Florida" },
      { label: "Time", value: "US Eastern" },
      { label: "Studying", value: "Japanese" },
      { label: "Studio", value: "Clear Web Studio" },
      { label: "Next", value: "Language school in Tokyo" },
    ],
  },
  /**
   * Track credential. Edit the words here.
   * The car mark is an original drawing in components/cayenne-svg.tsx.
   * Do not swap in the Porsche crest, official photos, or a downloaded model.
   */
  credential: {
    index: "01",
    kicker: "Credential",
    lines: ["Certified", "on the track", "in Atlanta."],
    program: "Porsche Young Driver Experience",
    place: "Porsche Experience Center Atlanta",
    detail:
      "Levi is certified through the Porsche Young Driver Experience at the Porsche Experience Center Atlanta.",
  },
  featured: {
    kicker: "In focus",
    slug: "notch-media",
    title: "notch-media",
    caption: "Lyrics, held in time with the music. Word by word.",
  },
  work: {
    index: "02",
    title: "Selected work",
    lede: "Products, an experiment, and the studio.",
  },
  skills: {
    index: "03",
    // Add a tool only after Levi confirms it. Candidates: TypeScript, React, Next.js, Swift, Unity, Blender.
    lines: ["What the work", "is made of."],
    note: "A short list on purpose. Add tools in content/site.ts once they’re confirmed.",
    groups: [
      {
        label: "Build",
        items: [
          {
            name: "Expo",
            detail: "DancingSRQ — a dance-events app for iOS and Android.",
          },
          {
            name: "Electron",
            detail: "notch-media — a desktop media widget with synced lyrics.",
          },
          {
            name: "Web",
            detail: "Client sites at Clear Web Studio, and Vela, an AI browser.",
          },
        ],
      },
      {
        label: "Aim",
        items: [
          {
            name: "Japanese",
            detail: "Studying now, toward language school in Tokyo.",
          },
          {
            name: "Game design",
            detail: "The plan after Tokyo: a program at a Japanese university.",
          },
          {
            name: "Clear Web Studio",
            detail: "The practice behind the client websites.",
          },
        ],
      },
    ],
  },
  contact: {
    index: "04",
    lines: ["Have a site,", "a product, or", "a game to make?"],
    lede: "Studio work and collaborations go through Clear Web Studio.",
    button: "Start a project",
  },
  /** Shown in the contact section and the footer. */
  socials: [
    { label: "GitHub", href: "https://github.com/JollyMrEiscream" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/levi-szantosi-69301a340" },
  ],
}

export const projects: Project[] = [
  {
    slug: "dancingsrq",
    title: "DancingSRQ",
    titleLines: ["DancingSRQ"],
    eyebrow: "Mobile product",
    summary: "A dance-events app for iOS and Android, built with Expo.",
    year: null,
    platform: "iOS & Android",
    stack: ["Expo"],
    paragraphs: [
      "DancingSRQ is a phone app for dance events. One Expo codebase ships to both iOS and Android.",
      "The screen in this case study is a drawn mockup. Event names on it are samples, not a live listing.",
    ],
    placeholder: true,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "notch-media",
    title: "notch-media",
    titleLines: ["notch-", "media"],
    eyebrow: "Desktop product",
    summary:
      "A Dynamic Island–style desktop media widget, built in Electron, with lyrics synced word by word.",
    year: null,
    platform: "Desktop",
    stack: ["Electron"],
    paragraphs: [
      "notch-media sits at the top of the desktop like a Dynamic Island: artwork, track, and lyrics in one compact surface.",
      "The lyric line stays locked to the music word by word, so the word you hear is the word that’s lit.",
    ],
    placeholder: true,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "vela",
    title: "Vela",
    titleLines: ["Vela"],
    eyebrow: "Experiment",
    summary: "An AI web browser.",
    year: null,
    platform: "Web",
    stack: [],
    paragraphs: [
      "Vela is an AI web browser: the page and the question share one window.",
      "Stack, status, and a real product story still need to be written by Levi. The browser frame here is a drawn preview, not a capture of the product.",
    ],
    placeholder: true,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "clear-web-studio",
    title: "Clear Web Studio",
    titleLines: ["Clear Web", "Studio"],
    eyebrow: "Studio",
    summary: "Client websites designed and built under Clear Web Studio.",
    year: null,
    platform: "Web",
    stack: [],
    paragraphs: [
      "Clear Web Studio is Levi’s web studio. The work is client websites.",
      "Client names, launch links, and outcomes are not public on this page yet. Add them here when they’re ready to show.",
    ],
    placeholder: true,
    liveUrl: null,
    repoUrl: "https://github.com/JollyMrEiscream/clear-web-studio",
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getProjectNav(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  const next = projects[(index + 1) % projects.length]
  return { index, total: projects.length, next }
}
