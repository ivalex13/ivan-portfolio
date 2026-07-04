# Ivan Aleksić · Portfolio

Personal portfolio, built with Next.js 15, Tailwind CSS v4, and Motion.

## Editing content

**Everything on the site is rendered from one file: [`src/lib/content.ts`](src/lib/content.ts).**
You never need to touch a component to change copy.

- `profile`, name, headline, sub, email, links, availability line
- `stats`, the four animated numbers under the hero
- `caseStudies`, each case study: card copy, meta grid, hero stats, TL;DR,
  and the body as a list of typed blocks (`heading`, `text`, `list`, `image`,
  `quote`, `stat-row`, `callout`)
- `products`, `principles`, `experience`, `education`

Text in `[brackets]` marks the spots to fill in with your own detail.

### Adding real images

Drop files into `public/work/<slug>/…` and set `src` on any `image` block:

```ts
{ type: "image", src: "/work/sonas/hero.png", alt: "…", caption: "…" }
```

Until `src` is set, blocks render as styled placeholders with drop-in guidance.

### Adding a case study

Add an object to `caseStudies` in `content.ts`, the card on the home page,
the `/work/<slug>` page, section nav, and next-project footer all generate
automatically.

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Design system

- **Type**: Geist Sans (UI + display), Geist Mono (labels/meta). Display
  accents use two treatments: `.text-iridescent` (gradient fill, reserved
  for AI-moment phrases) and `.text-outline` (hollow stroked text for
  secondary heading words)
- **Palette**: near-black canvas, warm ivory ink, iridescent gradient
  (`glow-1 → glow-2 → glow-3`) reserved for AI moments
- Tokens live in `src/app/globals.css` under `@theme`
