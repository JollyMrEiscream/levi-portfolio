/**
 * All portfolio copy lives in this file.
 *
 * Project facts come from the code-verified write-up. Do not add claims,
 * store links, or GitHub URLs that are not already in this file.
 */

export type ProjectFeature = {
  title: string
  detail: string
}

export type ProjectTier = {
  name: string
  price: string
  detail: string
  image?: string
}

export type ProjectVideo = {
  src: string
  poster: string
  label: string
}

export type ProjectShot = {
  src: string
  alt: string
}

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
  features?: ProjectFeature[]
  challenges?: ProjectFeature[]
  tiers?: ProjectTier[]
  videos?: ProjectVideo[]
  gallery?: ProjectShot[]
  /** Card and featured still. Root-relative public path. */
  cover?: string
  /** Small logo shown beside the case-study eyebrow. */
  mark?: string
  /** Shown on the case study when the write-up still needs Levi's own story. */
  placeholder: boolean
  /** Short status such as a version or "In progress". */
  status?: string
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
    slug: "dancingsrq",
    title: "DancingSRQ",
    caption: "Sarasota's dance-scene app. Events, classes, and studios, and RSVP in a tap.",
  },
  work: {
    index: "02",
    title: "Selected work",
    lede: "A dance app, desktop tools, a browser, games, and the studio.",
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

const dance = "/media/dancingsrq"

export const projects: Project[] = [
  {
    slug: "dancingsrq",
    title: "DancingSRQ",
    titleLines: ["DancingSRQ"],
    eyebrow: "Flagship",
    summary:
      "Sarasota's dance-scene app. Find salsa, bachata, swing, country, and ballroom events, classes, and studios, and RSVP in a tap.",
    year: null,
    platform: "iOS & Android",
    status: "v1.0.24 · Vividiance LLC",
    stack: [
      "Expo SDK 54",
      "React Native 0.81",
      "React 19",
      "expo-router",
      "TypeScript",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Cloud Functions",
      "Square",
      "StoreKit",
      "expo-notifications",
      "expo-location",
      "Reanimated 4",
      "Puppeteer",
    ],
    cover: `${dance}/frames/preview1-8s.jpg`,
    mark: `${dance}/logo.png`,
    videos: [
      {
        src: `${dance}/videos/01-discover-home.mp4`,
        poster: `${dance}/frames/preview1-2s.jpg`,
        label: "Discover and home",
      },
      {
        src: `${dance}/videos/02-explore-classes.mp4`,
        poster: `${dance}/frames/preview2-2s.jpg`,
        label: "Explore and classes",
      },
      {
        src: `${dance}/videos/03-events-studios.mp4`,
        poster: `${dance}/frames/preview3-2s.jpg`,
        label: "Events and studios",
      },
    ],
    gallery: [
      { src: `${dance}/frames/preview1-2s.jpg`, alt: "DancingSRQ App Store preview still, discover and home" },
      { src: `${dance}/frames/p1-5s.jpg`, alt: "DancingSRQ App Store preview still, home" },
      { src: `${dance}/frames/preview1-8s.jpg`, alt: "DancingSRQ App Store preview still, home, later in the clip" },
      { src: `${dance}/frames/preview1-15s.jpg`, alt: "DancingSRQ App Store preview still, home, near the end of the clip" },
      { src: `${dance}/frames/preview2-2s.jpg`, alt: "DancingSRQ App Store preview still, explore and classes" },
      { src: `${dance}/frames/preview2-8s.jpg`, alt: "DancingSRQ App Store preview still, explore and classes, mid clip" },
      { src: `${dance}/frames/preview2-15s.jpg`, alt: "DancingSRQ App Store preview still, explore and classes, late clip" },
      { src: `${dance}/frames/preview3-2s.jpg`, alt: "DancingSRQ App Store preview still, events and studios" },
      { src: `${dance}/frames/preview3-8s.jpg`, alt: "DancingSRQ App Store preview still, events and studios, mid clip" },
      { src: `${dance}/frames/preview3-15s.jpg`, alt: "DancingSRQ App Store preview still, events and studios, late clip" },
      { src: `${dance}/tablet/01-home.png`, alt: "DancingSRQ Google Play tablet screenshot, home" },
      { src: `${dance}/tablet/02-events.png`, alt: "DancingSRQ Google Play tablet screenshot, events" },
      { src: `${dance}/tablet/03-classes.png`, alt: "DancingSRQ Google Play tablet screenshot, classes" },
      { src: `${dance}/tablet/04-studios.png`, alt: "DancingSRQ Google Play tablet screenshot, studios" },
    ],
    paragraphs: [
      "DancingSRQ is Sarasota's dance-scene app. It lists salsa, bachata, swing, country, and ballroom events, classes, and studios, and an RSVP is one tap.",
      "Version 1.0.24 is published by Vividiance LLC. One Expo codebase ships to iOS and Android. The previews on this page are the App Store videos and review stills, plus Google Play tablet screenshots.",
    ],
    features: [
      {
        title: "Home",
        detail: "A welcome screen with live counts, Tonight's Events, and Featured Events & Classes.",
      },
      {
        title: "Explore",
        detail: "Search, with filters for dance style, skill level, and day.",
      },
      {
        title: "Events",
        detail:
          "Create and edit events with an image, a cost or free, an external ticket link, in-person or online, a map location picker with preview, and a dance type. Events can recur. RSVP includes a people-going list.",
      },
      {
        title: "Classes",
        detail:
          "Title, instructor, studio, location, time, duration, max students, and price. A class can be one-time, weekly, monthly, or yearly.",
      },
      {
        title: "Studios",
        detail: "Profiles with address, phone, description, photos, and a Classes Offered list. Instructors can be linked to studios.",
      },
      {
        title: "Profile",
        detail:
          "Notification preferences for new-event alerts and RSVP reminder timing, contact and support, a privacy page, in-app Delete Account, Upgrade Membership, and role applications for instructor or studio.",
      },
      {
        title: "Roles",
        detail:
          "User, Premium, Instructor, Studio, and Admin. Premium can post 3 events a month. Instructor, Studio, and Admin get unlimited events and classes. Free accounts and guests see a 14-day schedule. Paid roles see the full calendar.",
      },
      {
        title: "Push",
        detail:
          "A Cloud Function notifies opted-in users when a new event is posted. An hourly job sends RSVP reminders at each person's chosen lead time, default 24 hours, and skips anyone who already got that reminder. Delivery uses the Expo Push API in batches of 100. Event times are Eastern wall-clock time.",
      },
      {
        title: "Smart import",
        detail:
          "Built and tested, currently behind a feature flag. Paste a link or text, including Facebook-style posts. It reads schema.org JSON-LD, microdata, and Open Graph, then scores and merges candidates into an event draft. An optional LLM fallback (Gemini or an OpenAI-compatible model) can read flyer images. The image is re-hosted to Firebase Storage. Fixture tests cover Eventbrite, Meetup, and Facebook.",
      },
      {
        title: "Admin",
        detail:
          "Manage users, approve or flag listings, handle content reports, feature content, review instructor requests, and an analytics dashboard. Includes a preview-listing seeder.",
      },
      {
        title: "Trust and safety",
        detail: "An age gate, a report button, a moderation queue, and a subscription legal disclosure.",
      },
      {
        title: "On-device storage",
        detail:
          "AES-256 encrypted storage. The master key lives in the iOS Keychain or Android EncryptedSharedPreferences. Legacy plaintext data is migrated automatically.",
      },
      {
        title: "Marketing tooling",
        detail:
          "Puppeteer scripts render the App Store preview videos and the subscription-tier screenshots. There is also a marketing website.",
      },
    ],
    tiers: [
      {
        name: "Premium",
        price: "$14.99/mo or $149.99/yr",
        detail: "Post 3 events a month. Paid roles see the full calendar.",
        image: `${dance}/tiers/com.vividiance.dancingsrq.premium.monthly.png`,
      },
      {
        name: "Instructor",
        price: "$29.99/mo or $299.99/yr",
        detail: "Unlimited events and classes.",
        image: `${dance}/tiers/com.vividiance.dancingsrq.instructor.monthly.png`,
      },
      {
        name: "Studio",
        price: "$49.99/mo or $499.99/yr",
        detail: "Unlimited events and classes.",
        image: `${dance}/tiers/com.vividiance.dancingsrq.studio.monthly.png`,
      },
    ],
    challenges: [
      {
        title: "Apple and Square",
        detail:
          "iOS uses Apple In-App Purchase, with server-side App Store Server Notifications for production and sandbox, verified against bundled Apple root certificates. Other platforms use Square payment links, an HMAC-SHA256-verified webhook, and a cancel flow.",
      },
      {
        title: "Roles on the server",
        detail: "Role checks run server-side, including on the import path. Each user is limited to 20 imports an hour.",
      },
      {
        title: "Reminders that do not double-send",
        detail:
          "The hourly reminder job respects each user's lead time and deduplicates so nobody gets the same reminder twice. Pushes go out through Expo in batches of 100.",
      },
      {
        title: "An import that cannot be aimed inward",
        detail:
          "The SSRF guard blocks private IPs, including encoded IPv4 tricks, pins the DNS lookup, and caps the fetch at 3 redirects, 1.5 MB, and an 8 second timeout.",
      },
    ],
    placeholder: false,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "notch-media",
    title: "notch-media",
    titleLines: ["notch-", "media"],
    eyebrow: "Desktop",
    summary:
      "A Dynamic Island-style glass media bar for Windows. Hover the top-center of the screen and it drops down with music, lyrics, and volume.",
    year: null,
    platform: "Windows",
    stack: ["Electron", "TypeScript", ".NET 8", "C#", "WinRT GSMTC", "Core Audio", "koffi", "LRCLIB"],
    paragraphs: [
      "notch-media is a glass media bar for Windows. Hover the top-center of the screen and it drops down with the current track, lyrics, and volume controls.",
      "It works with any app that reports to Windows media controls, including Spotify, Apple Music, and browsers. The frame on this page is a drawn preview. There is no screen recording in the repo.",
    ],
    features: [
      {
        title: "Transport",
        detail: "Play and pause, skip 10 seconds, a seek bar, next and previous, master volume, and per-app volume.",
      },
      {
        title: "Synced lyrics",
        detail:
          "Karaoke lyrics from LRCLIB, with word-by-word highlighting where enhanced-LRC timing exists. YouTube and Apple Music titles are cleaned up. Songs match by duration within 8 seconds either way. Hits stay in an on-disk cache. Misses are cached for 7 days.",
      },
      {
        title: "Game mode",
        detail:
          "Native user32 calls through koffi detect a fullscreen foreground window with a hidden cursor. During gameplay the notch moves to another monitor or hides. It comes back in menus.",
      },
      {
        title: "Lid-cam, experimental",
        detail:
          "Estimates how far a laptop lid is closing from the webcam image, using picture slide and darkening. It frosts, dims, and tilts a snapshot of the desktop as the lid closes. Ctrl+Alt+L pressed twice frosts the screen and shuts down. A tray item previews the animation.",
      },
    ],
    challenges: [
      {
        title: "A media bridge that stays on the right thread",
        detail:
          "A C# bridge uses Windows Runtime APIs. It fixes COM threading (RPC_E_WRONG_THREAD) by fetching fresh media objects per thread.",
      },
      {
        title: "Players that report late",
        detail: "Playback position is extrapolated for Apple Music, which reports it infrequently. Album art is cached per track.",
      },
      {
        title: "Volume per app",
        detail: "Master volume uses Core Audio. Audio sessions are mapped to app names.",
      },
    ],
    placeholder: false,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "vela",
    title: "Vela",
    titleLines: ["Vela"],
    eyebrow: "Browser",
    summary: "A Chromium desktop browser with a chat sidebar whose agent can see the page and do the task.",
    year: null,
    platform: "Desktop",
    status: "Tabs only · desktop control is planned",
    stack: ["Electron", "electron-vite", "React", "TypeScript", "Gemini API"],
    paragraphs: [
      "Vela is Levi's AI browser. It has normal tabs and an address bar, with logins saved in a persistent session, plus a chat sidebar whose agent can see the page and do the task.",
      "Version 1 drives browser tabs only. Desktop control is planned. The window on this page is drawn. The repo has no screenshots, and the app icon is still the default Electron icon.",
    ],
    features: [
      {
        title: "Agent loop",
        detail:
          "Observe a screenshot plus a compact list of visible buttons, links, and fields with stable IDs. Ask the model. Run a safety gate. Act. Repeat until done, Stop, or the step limit. The default limit is 10. The max is 20.",
      },
      {
        title: "Tools",
        detail:
          "Navigate, click, type, scroll, open, switch, or close a tab, back, forward, wait, ask_user, and done. It acts through the Chrome DevTools Protocol on webContents.debugger, with an injected-script fallback. It never moves the real mouse.",
      },
      {
        title: "Safety",
        detail:
          "It asks before submitting forms, clicking pay, buy, checkout, subscribe, or send, opening sites the task did not mention, or entering payment paths. It refuses to type into password fields. Page text is wrapped as untrusted content. Stop cancels immediately, even mid-confirmation.",
      },
      {
        title: "Models",
        detail:
          "Gemini Flash by default, with vision, function calling, and Gemini 3 thought-signature handling. A pluggable ModelProvider also supports any OpenAI-compatible API, such as xAI Grok.",
      },
    ],
    challenges: [
      {
        title: "The key stays out of the page",
        detail:
          "The API key is encrypted with Electron safeStorage (DPAPI on Windows). It is never sent back to the renderer or exposed to pages.",
      },
      {
        title: "A sandboxed UI",
        detail: "The UI runs in a sandboxed renderer. Tabs are isolated WebContentsViews with no Node and no preload.",
      },
      {
        title: "Tests",
        detail: "Unit tests cover the agent loop, the safety gates, and model parsing.",
      },
    ],
    placeholder: false,
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "clear-web-studio",
    title: "Clear Web Studio",
    titleLines: ["Clear Web", "Studio"],
    eyebrow: "Studio",
    summary: "Freelance web design for small businesses. A flat $500 to launch, then $75 a month for care.",
    year: null,
    platform: "Web",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    paragraphs: [
      "Clear Web Studio is Levi's freelance web-design studio. The offer is a clean, fast small-business website for a flat $500, plus $75 a month for care and maintenance.",
      "The public site is a single page with pricing, a process section, a PayPal option, and a contact form. There is also a printable one-pager. Contact is levi@srqcoding.club. The repo also holds about 22 concept mockups for local businesses. Those mockups use photos that are not shown here.",
    ],
    features: [
      {
        title: "The studio site",
        detail: "Pricing, process, a PayPal payment option, a contact form, and a printable one-pager.",
      },
      {
        title: "Concept mockups",
        detail:
          "About 22 concept mockups for local businesses, mostly Sarasota and Venice cafes, trades, groomers, and shops. They stay off this page because the photos are not cleared to republish.",
      },
    ],
    placeholder: false,
    liveUrl: "https://jollymreiscream.github.io/clear-web-studio/",
    repoUrl: "https://github.com/JollyMrEiscream/clear-web-studio",
  },
  {
    slug: "halloween-manhunt",
    title: "Halloween Manhunt",
    titleLines: ["Halloween", "Manhunt"],
    eyebrow: "Live game",
    summary: "Hide-and-seek across downtown Sarasota, played live on a 3D map in the phone browser.",
    year: null,
    platform: "Web",
    status: "Live",
    stack: ["Vite", "React", "TypeScript", "Firebase", "Mapbox GL"],
    paragraphs: [
      "Halloween Manhunt is a real-world hide-and-seek game across downtown Sarasota, played on a 3D map in the phone browser.",
      "The mark on this page is the project's favicon. The map scene is drawn here. There are no gameplay screenshots in the repo.",
    ],
    features: [
      {
        title: "Rooms",
        detail: "Join with a room code, then split into hiders and seekers.",
      },
      {
        title: "A shrinking zone",
        detail: "The play zone shrinks as sectors lock every 15 minutes. The sectors are GeoJSON over downtown Sarasota and UTC.",
      },
      {
        title: "Pings and rules",
        detail: "Hider locations ping to seekers every 5 minutes. There is a transit corridor rule, and host or referee controls.",
      },
    ],
    challenges: [
      {
        title: "Realtime on a map",
        detail: "Game state is realtime in Firebase. The board is a Mapbox GL 3D map.",
      },
    ],
    placeholder: false,
    liveUrl: "https://halloween-manhunt-srq.web.app",
    repoUrl: null,
  },
  {
    slug: "lockscreen-rotator",
    title: "LockScreenRotator",
    titleLines: ["LockScreen", "Rotator"],
    eyebrow: "Shipped",
    summary: "A Windows app that sets a fresh lock-screen image every time you sign in or unlock.",
    year: null,
    platform: "Windows",
    status: "Shipped · v1.0.0",
    stack: ["C#", "WPF", ".NET 8"],
    paragraphs: [
      "LockScreenRotator is a shipped Windows app, version 1.0.0. It gives you a fresh lock-screen image every time you sign in or unlock.",
      "The page links to the itch.io release, not the private repo. Only the logo is in the repo, so the window around it is drawn.",
    ],
    features: [
      {
        title: "Four tabs",
        detail: "Library, Design (an image editor with overlays, layers, and undo), Settings, and Diagnostics.",
      },
      {
        title: "Install and sign-in",
        detail:
          "A Task Scheduler trigger and a helper exe, an Inno Setup installer, and Authenticode signing scripts. Repo notes describe it as ready for Steam.",
      },
    ],
    placeholder: false,
    liveUrl: "https://jollymreiscream.itch.io",
    repoUrl: null,
  },
  {
    slug: "church-bell-tower-watch",
    title: "Church Bell Tower Watch",
    titleLines: ["Church Bell", "Tower Watch"],
    eyebrow: "In progress",
    summary: "A PSX-style horror prototype. Keep watch in a bell tower for five nights while something climbs the walls.",
    year: null,
    platform: "Game",
    status: "In progress",
    stack: ["Unreal Engine 5.8", "C++", "Blender"],
    paragraphs: [
      "Church Bell Tower Watch is a PSX-style horror game prototype in Unreal Engine 5.8 and C++. You keep watch in a bell tower over five nights, ringing the hours by the moon while something climbs the walls.",
      "The picture on this page is drawn for the portfolio. Menu images from the repo are not used.",
    ],
    features: [
      {
        title: "The loop",
        detail: "Watch, ring, ward.",
      },
      {
        title: "Systems in the prototype",
        detail:
          "A hidden-presence dread model, a shotgun, clock duty, hatch and slit mechanics, a Night-1 tutorial, story beats, and a textured main menu.",
      },
      {
        title: "Art pipeline",
        detail: "A procedural Blender pipeline for the tower, the village, and the creature, plus a sculpted climber with a baked texture.",
      },
    ],
    placeholder: false,
    liveUrl: null,
    repoUrl: null,
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
