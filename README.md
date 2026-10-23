# Levi Szantosi

Personal portfolio for Levi Szantosi — a developer and aspiring game designer in Sarasota, Florida. Dark, editorial, and built to be edited from one file.

## Stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript and Tailwind CSS
- [GSAP](https://gsap.com/) with ScrollTrigger for pinned horizontal work, text reveals, parallax, and scale-on-scroll
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth inertial scrolling on desktop
- A shadcn-style `Button` (`components/ui/button.tsx`) for actions

Motion is lighter on small screens and on touch devices: no custom cursor, no magnetic pull, native scrolling instead of Lenis, and the project reel stacks vertically instead of pinning. `prefers-reduced-motion` skips the intro, the page wipe, smooth scrolling, and scroll-linked animation. The Cayenne credential then shows its poster instead of playing the clip.

## Run it

```bash
npm install
npm run dev
```

The dev server is [http://127.0.0.1:43123](http://127.0.0.1:43123).

```bash
npm run lint
npm run build
```

`npm run build` writes a static site to `out/`, served from `/`. This app does not use `next start`.

## Edit the content

Everything visitors read is in [`content/site.ts`](content/site.ts): name, bio, navigation, marquee, the Atlanta track credential, skills, contact, and the six projects.

- Set `email` and flip `emailIsPlaceholder` to `false` when the address is real.
- Fill `year`, `liveUrl`, `repoUrl`, and `stack` on each project. Use `null` or an empty stack until you have them.
- Set `placeholder: false` on a project after you replace the starter paragraphs.
- Add social links to `socials`. They render in the contact section and the footer.
- Add tools only after you’re happy putting them on the site. A few ideas are commented near the skills list in that file.
- Visuals without a photo live in [`components/mockups.tsx`](components/mockups.tsx). DancingSRQ stills in `public/media/dancingsrq` are 1179×2556 WebP files with a 590-wide srcset variant. The three preview clips are muted 590×1280 H.264. The Cayenne credential plays the muted full-viewport line-art clip in `public/media/cayenne` once, then loops the front three-quarter still in `public/media/cayenne/front2`. Credit for both is in [`CREDITS.md`](CREDITS.md). Logos for the studio and LockScreenRotator are in `public/media`.

There are no API keys and no `.env` file. Don’t commit secrets.

## Deploy

The production build is a static export (`output: 'export'` in `next.config.ts`). Cache Components and partial prefetching are off, because they need a server. Local dev and a plain `npm run build` leave `NEXT_PUBLIC_BASE_PATH` empty, so the site stays at `/`.

GitHub Pages should serve the public site at [https://jollymreiscream.github.io/levi-portfolio/](https://jollymreiscream.github.io/levi-portfolio/) from [github.com/JollyMrEiscream/levi-portfolio](https://github.com/JollyMrEiscream/levi-portfolio). [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main`. It builds with the Pages base path (`/levi-portfolio` for that repo name) and deploys the `out` folder with `actions/upload-pages-artifact` and `actions/deploy-pages`. `public/.nojekyll` is copied into `out` so Pages does not run Jekyll. Each `/work/[slug]` page is prebuilt by `generateStaticParams`.

One-time setup on GitHub, signed in as **JollyMrEiscream**:

1. Create a **public** empty repository named `levi-portfolio` (no README, no .gitignore). There are no secrets in this project.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**. Save.
3. From this project, push `main` to that repo as well as Origin:

```bash
git remote add github https://github.com/JollyMrEiscream/levi-portfolio.git
git push -u origin main
git push -u github main
```

4. Open the Actions tab. The “Deploy to GitHub Pages” workflow should finish green. The site is then at the URL above. If the first run fails because Pages was not switched to GitHub Actions yet, fix the source and use **Re-run all jobs**.

To preview the project-site build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/levi-portfolio npm run build
```

Serve `out` under a `/levi-portfolio/` prefix. A server that only mounts `out/` at `/` will not match those asset paths. One way:

```bash
mkdir -p /tmp/pages-root
ln -sfn "$(pwd)/out" /tmp/pages-root/levi-portfolio
python3 -m http.server 43124 --directory /tmp/pages-root
```

Then open [http://127.0.0.1:43124/levi-portfolio/](http://127.0.0.1:43124/levi-portfolio/).

Anywhere else that can serve static files, run `npm run build` with no base path and publish `out/`. No environment variables and no Node server are required for that root-hosted build.

## What’s still Levi’s

The project write-ups follow the code-verified notes. Still open, if you want them public:

- A public store link for DancingSRQ, if you want one on the case study
- Screen recordings for notch-media and Vela. Those pages use drawn frames until then
- Years, and any stack that isn’t already named (Expo for DancingSRQ, Electron for notch-media)
- Client names and outcomes for Clear Web Studio, if they should be public
- A fuller story for Vela
- Photos, if you want them — the site ships without stock or copyrighted images
- Any extra tools, and social profiles beyond GitHub and LinkedIn
