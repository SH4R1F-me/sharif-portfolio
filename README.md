# Sharif Madber — 3D Portfolio

Premium cybersecurity portfolio built with **Astro + Three.js**.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 4 (static output) |
| Language | TypeScript (strict) |
| Styling | Vanilla CSS with design tokens |
| 3D | Three.js + React Three Fiber |
| Animation | CSS-first + GSAP for complex sequences |
| Content | TypeScript data files with publication-state filtering |

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

## Content Updates

All content lives in `src/data/`. To add content:

1. Open the relevant file (e.g., `src/data/projects.ts`)
2. Add your entry with `status: 'draft'`
3. Test the build
4. Change `status: 'published'` after owner approval
5. Run `npm run build` and deploy

### Owner input checklist

See `memory/CONTENT_GAPS.md` for required information.

## Deployment

Recommended: **Cloudflare Pages**

- Build command: `npm run build`
- Output directory: `dist`
- No server adapter needed — pure static

## Project Structure

```
src/
├── components/
│   ├── layout/      — Header, Footer, SEOHead
│   ├── sections/    — Hero, About, Expertise, Projects, Contact
│   ├── terminal/    — PortfolioTerminal
│   └── three/       — HeroScene (3D)
├── data/            — TypeScript content files
├── layouts/         — BaseLayout
├── pages/           — index, 404, projects/[slug]
└── styles/          — global.css, tokens.css
```
