# SEO & AI Discoverability Audit — ivanportfolio.com

**Date:** July 2026 · **Scope:** full codebase review (`main` @ `9f3fea8`) + external footprint research.
**Stack:** Next.js 15 (App Router, RSC), Tailwind 4, Motion, Vercel hosting + Analytics.

> Live-site checks (rendered HTML, headers, CWV field data) could not be run from the audit
> environment because the sandbox network policy blocks the domain. Everything below is verified
> against the source code, which fully determines the served HTML for this static site, plus web
> search for off-page signals.

---

## Executive summary

The site has a **strong technical foundation** — statically rendered React Server Components,
clean URLs, a sitemap, robots.txt, a Person JSON-LD block, per-page metadata, self-hosted fonts,
and a generated OG image. For a portfolio this is well above average.

The problems are concentrated in four places, and they matter more than any missing meta tag:

1. **The only published case study page is orphaned** — no internal link on the entire site
   points to `/work/zendesk-ai-scheduling`, because the home-page card renders a Figma iframe
   instead of a link whenever `embed` is set.
2. **Unfinished placeholder copy ships to production** — bracketed notes like
   `[Add outcome metrics when available]` and `Team: [PM, EM, N engineers, researcher…]` render
   publicly on the published Zendesk case study. This is the single biggest E-E-A-T and
   AI-summarization risk on the site.
3. **The site is thin: two indexable pages.** Two of the three case studies are `draft: true`,
   so the entire crawlable corpus is the home page plus one (unfinished) study.
4. **Entity ambiguity.** "Ivan Aleksić" is contested by a University of Belgrade professor
   (who owns `linkedin.com/in/ivanaleksic`), a professional footballer, and a well-known
   Unsplash photographer. The domain itself currently has near-zero presence in search results.
   Without stronger disambiguation signals, both Google and LLMs will struggle to attach this
   site to the right entity.

Fixing #1–#3 requires no new infrastructure — it's content completion plus a one-component
change — and would do more for both search and AI visibility than everything else in this
document combined.

---

## Implementation status (this branch)

Decisions and fixes applied after review of this audit:

**Domain correction:** the audit was originally written against `ivanaleksic.com` (the
hardcoded base URL in the repo at the time); the owner confirmed the real production domain is
**`ivanportfolio.com`**. All references in this document and every hardcoded URL in the code
(`metadataBase`, canonical, robots.txt sitemap pointer, sitemap base, JSON-LD, llms.txt) have
been updated. Off-page note: the exact-match query for `ivanportfolio.com` also returns no
direct result for the site, so the "not yet established in the index" finding (§1.1) stands.
Entity note: since the domain no longer contains the name "Aleksić", the JSON-LD `sameAs`
cluster and profile backlinks (§4.2, §5) matter even more for tying the site to the person.

**Implemented (no content/UI changes):**
- Case-study detail pages unpublished for now (`pageDraft` flag): the site is intentionally a
  one-pager until study copy is finished. This removes the orphaned-page issue (§1.1) and takes
  the placeholder copy (§2.3) out of the public site — the home-page embed card is unchanged.
- Canonical URLs on the home page and (future) study pages (§1.1).
- Person JSON-LD expanded into an `@graph`: `@id`, `image`, Belgrade address,
  `disambiguatingDescription`, fuller `sameAs`, plus `WebSite`, `ProfilePage`, and
  `SoftwareApplication` entries for Sonas / UX Copilot / AI Design Review (§4.2, §4.3).
- Explicit AI-crawler allowances in robots.txt (§1.2).
- `lastModified` in the sitemap (§1.1).
- `loading="lazy"` on the Figma embed iframe (§1.3).
- `public/llms.txt` with a factual site summary (§4.4).

**Clarified — not a defect:** the ARR figures (§2.3) are both correct: **$0 → $16M** during the
founding-designer years specifically; **$0 → $30M** across the full 13-year Instapage tenure.
Recommendation downgraded: optionally make the timeframe explicit next to each figure so readers
and LLMs don't have to infer it.

**Remaining (needs owner action / content work):** Search Console + Bing Webmaster registration,
backlinks from LinkedIn/Dribbble/Figma/aisonas.com, finishing and publishing the case studies,
real imagery, on-domain resume, FAQ, and the long-term content roadmap (§6).

---

## 1. Technical SEO

### 1.1 Crawlability & indexing

| Check | Status |
|---|---|
| robots.txt (`src/app/robots.ts`) | ✅ Allows all agents, points to sitemap |
| XML sitemap (`src/app/sitemap.ts`) | ✅ Present, home + published studies |
| Static generation (`generateStaticParams`) | ✅ All routes pre-rendered |
| Canonical URLs | ❌ Not emitted |
| Internal linking to deep pages | ❌ Case study page is orphaned |
| Sitemap `lastModified` | ❌ Missing |

#### 🔴 HIGH — Orphaned case study page

**What:** `CaseCard.tsx` renders the card as a non-linking `<div>` whenever `study.embed` is set
(`src/components/CaseCard.tsx:82-88`). The one published study (`zendesk-ai-scheduling`) has an
`embed`, so **no page on the site links to `/work/zendesk-ai-scheduling`**. It exists only in the
sitemap.

**Why it matters:** Sitemap-only pages get crawled but receive no internal PageRank and are
often indexed reluctantly or ranked poorly ("Crawled — currently not indexed" is the classic
symptom). AI crawlers building a picture of the site by following links will simply never see
the page — and it's the deepest, most quotable content you have. Users can't reach it either.

**Impact:** High — your richest content page is invisible to link-following crawlers and humans.

**Fix:** Keep the embedded deck on the card, but always link to the study page — e.g. wrap the
text portion in `<Link href={`/work/${study.slug}`}>` and leave the iframe outside the link, or
add an explicit "Read the case study →" link under the embed. Also link studies from the
footer or a "next study" style block on the home page.

#### 🟠 MEDIUM — No canonical URLs

**What:** `metadataBase` is set in `layout.tsx`, but no page declares
`alternates: { canonical: … }`, and Next.js does not emit `<link rel="canonical">` on its own.

**Why it matters:** Vercel serves the same content on `*.vercel.app` preview/production domains
(previews get `X-Robots-Tag: noindex`, but the production `.vercel.app` alias does not), and
URL variants (trailing slash, query params like `?utm_source=…` from LinkedIn shares) create
duplicate-URL risk. Canonicals consolidate signals to one URL.

**Impact:** Medium — a real but silent leak of ranking signal, especially once the site starts
getting shared with tracking parameters.

**Fix:** In `layout.tsx` add `alternates: { canonical: "/" }`; in `work/[slug]/page.tsx`
`generateMetadata`, add `alternates: { canonical: `/work/${slug}` }`. Both resolve against
`metadataBase`. Also verify the Vercel domain config 308-redirects `www.ivanportfolio.com` and
`ivan-portfolio*.vercel.app` → `ivanportfolio.com`.

#### 🟠 MEDIUM — Site not (yet) established in the index

**What:** A search for `"ivanportfolio.com"` returns domain-tools listings only — the site itself
doesn't surface. There is no evidence of Search Console/Bing Webmaster registration in the repo.

**Why it matters:** New domains sit in a cold-start limbo; without explicit submission and a few
inbound links, indexing can take weeks and rankings months.

**Impact:** High for time-to-visibility, low effort.

**Fix:**
- Register the domain in **Google Search Console** and **Bing Webmaster Tools** (Bing powers
  ChatGPT browsing and much of the AI-search ecosystem — do not skip it), submit the sitemap.
- Enable **IndexNow** (trivial on Vercel: a static key file) so Bing/Yandex pick up changes
  instantly.
- Add the site URL to LinkedIn, Dribbble, and Figma Community profiles today (see §5).

#### 🟡 LOW — Sitemap lacks `lastModified`

`changeFrequency`/`priority` are largely ignored by Google; `lastModified` is the field that
actually gets used (when it's trustworthy). Add a per-study `updated` date in `content.ts` and
emit it. Impact: low, effort: trivial.

### 1.2 Rendering & AI-crawler access

**Good news:** the entire content is server-rendered. Case-study text, experience bullets, and
the bio are all present in the initial HTML — non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot,
CCBot — none of which execute JavaScript) can read everything. This is the single most important
AI-discoverability property, and the site already has it.

**Caveat (🟡 LOW):** Motion's `Reveal`/`Stagger` components server-render their initial state as
inline `opacity:0` styles. The text is still in the DOM and extractable, and Google renders JS so
it sees the final state — but ultra-conservative HTML parsers may down-weight text styled as
hidden. `useReducedMotion` is already respected, which helps. If you want to be maximally safe,
switch the reveal pattern to CSS-only animation (`@starting-style` / animation-timeline or a
`.js`-gated class) so raw HTML has no `opacity:0`. Not urgent.

**robots.txt and AI crawlers (✅ / recommendation):** `userAgent: "*", allow: "/"` already admits
GPTBot, ClaudeBot, Google-Extended, PerplexityBot, etc. For a portfolio, being ingested into
training data and answer indexes is pure upside — keep it open. Consider explicitly listing the
major AI agents as allowed rules so a future blanket rule change can't silently exclude them.

### 1.3 Performance / Core Web Vitals

The base is excellent: static HTML, no client data fetching, self-hosted fonts via
`geist` (no layout-shifting font swap from third-party origins), `next/image` for the portrait
with `priority` on the LCP-adjacent hero image, and a light dependency graph.

#### 🟠 MEDIUM — Figma iframe on the home page is not lazy-loaded

**What:** the Zendesk card renders `<iframe src="https://embed.figma.com/deck/…">`
(`CaseCard.tsx:53-59`) with no `loading="lazy"`. Figma's embed pulls a multi-megabyte JS app.

**Why it matters:** it competes with your own content for bandwidth/CPU during initial load,
inflating LCP/TBT/INP on the page that matters most. CWV is a (modest) ranking signal, but slow
first paint also hurts every human recruiter on hotel Wi-Fi.

**Impact:** Medium on mobile CWV.

**Fix:** add `loading="lazy"` at minimum. Better: render a static poster image with a
click-to-load facade so the Figma runtime only loads on interaction.

#### 🟡 LOW — Home page fetches third-party OG images at render time

`page.tsx` awaits `getOgImage()` for each product (aisonas.com + two figma.com pages, 8 s
timeout each, 24 h cache). On a cold revalidation this can add seconds of TTFB, and the visuals
break silently whenever Figma changes its bot handling (the code already anticipates this).
**Fix:** commit static screenshots to `/public/products/` and set `image:` — faster, more
reliable, and you control the art. Bonus: images on your own domain can rank in image search.

#### 🟡 LOW — Heavy blur/animation effects

`blur-[120px]` washes and continuous ping animations are GPU-cheap on desktop but can cost
paint time on low-end mobiles. Fine to keep; just verify with Lighthouse once deployed.

### 1.4 Mobile-friendliness

✅ Responsive layout throughout, proper viewport handling via Next defaults, `min-h-svh` (svh, not
vh — nice), mobile menu with scroll-lock and Escape handling, tap targets are generous. No issues
found in code review. Run Lighthouse mobile once to confirm.

### 1.5 Structured data (technical placement)

The Person JSON-LD is injected in `<body>` — valid (Google explicitly accepts body placement).
Content gaps are covered in §4. One technical note: keep JSON-LD, don't move to microdata; and
add `id`/`@id` anchors so multiple schema blocks can reference each other (see §4.2).

---

## 2. On-page SEO

### 2.1 Titles & meta descriptions

| Page | Title | Verdict |
|---|---|---|
| Home | `Ivan Aleksić · AI Product Designer` | ✅ Strong: entity + role |
| Study | `One event definition that keeps every system in sync · Ivan Aleksić` | ⚠️ Poetic, zero query terms |
| 404 | falls back to default | ✅ fine |

#### 🟠 MEDIUM — Case-study titles carry no searchable terms

**Why it matters:** "One event definition that keeps every system in sync" contains neither
company, domain, nor role. Nobody — human or LLM — queries those words. Recruiters search things
like "Zendesk WFM design case study", "AI scheduling UX case study", "enterprise AI product
designer portfolio".

**Impact:** Medium — titles are still the strongest on-page relevance signal.

**Fix:** keep the display headline on the page, but give the `<title>`/meta a descriptive
variant, e.g. `Zendesk WFM: AI-assisted scheduling design case study · Ivan Aleksić`. Add a
`seoTitle`/`seoDescription` field to `CaseStudy` in `content.ts` so display copy and metadata can
diverge.

**Meta descriptions:** home description is excellent (concrete numbers, entities). Study
descriptions reuse `summary` — fine, but the current Zendesk summary is one long clause; tighten
to outcome-first ("Led design for Zendesk WFM scheduling… shipped X, Y, Z across ~700 enterprise
accounts").

### 2.2 Headings

- One `<h1>` per page ✅. Hierarchy is sane ✅.
- 🟡 The home `<h1>` ("I design AI products people actually adopt.") is great brand copy but the
  page never states "Ivan Aleksić — AI Product Designer based in Belgrade" in body text near the
  top. The name appears only in the nav, image alt, and the About paragraph. For entity
  association (name ↔ role ↔ location ↔ companies in one extractable sentence), add one plain
  descriptive sentence in the hero or make the About section's first paragraph begin with the
  full name (it currently starts "I'm Ivan, …" — change to "I'm Ivan Aleksić, …" — trivial and
  genuinely useful for both Google and LLM entity linking).
- 🟡 Section `<h2>`s ("Fourteen years, every stage", "Not just designing AI: shipping it") are
  stylistic. Acceptable for a portfolio; the kicker labels ("Case studies", "About") partially
  compensate. Don't sacrifice the voice — fix relevance in titles/descriptions instead.

### 2.3 Content quality

#### 🔴 HIGH — Placeholder copy ships on the published case study

**What:** the *published* (non-draft) Zendesk study renders, verbatim, on production:

- `Team: [PM, EM, N engineers, researcher…]` (meta grid)
- `[Add outcome metrics when available]` (TL;DR outcome)
- `[Drop in a verbatim customer quote from research, the one that made the room go quiet.]` (a styled blockquote!)
- `[N%] adoption lift`, `[N] churn-risk accounts retained` (impact stat row)
- Four more bracketed editorial notes in body paragraphs, plus every image is a placeholder
  frame containing meta-instructions like "The money shot: AI validation concept UI."

**Why it matters:** this is the worst kind of content-quality signal. Humans read it as an
abandoned site. Google's helpful-content signals read it as thin/unfinished. And it's actively
dangerous for AI discoverability: an LLM summarizing this page may reproduce the placeholders
("his team consisted of [PM, EM, N engineers…]") or, worse, conclude the claims are unverified.
The blockquote placeholder is styled as a real customer quote — that pattern-matches to
fabricated testimony.

**Impact:** High — affects the only deep page on the site, on every dimension (rankings, E-E-A-T,
AI summaries, conversion).

**Fix:** either complete the copy or cut the unfinished blocks — a shorter, finished study beats
a longer scaffold. Then add a safety net: a build-time check (or a filter in `content.ts`) that
fails/strips any published study containing `[` placeholder markers.

#### ✅ RESOLVED (clarified) — ARR figures

`profile.sub` says Instapage grew "**0 → $30M ARR**"; the meta description, `stats`, and the
founding-designer study say "**$0 → $16M**". **Clarification from the owner: both are correct** —
$16M is the growth during the founding-designer role specifically; $30M is where the company
got to across the full 13-year tenure.

**Residual recommendation (low):** LLMs cross-reference claims within a page, and two different
numbers for "Instapage ARR" without an explicit timeframe still invite misquoting. Where space
allows, qualify each figure ("$0 → $16M during my founding-designer years", "$30M by the end of
my tenure") so the distinction is machine-readable, not inferred.

#### 🟡 LOW — Unused content

`stats` and `capabilities` arrays in `content.ts` are defined but never rendered. The
capabilities list ("AI-assisted workflows", "Prompt & interaction design", "Enterprise UX"…) is
exactly the keyword surface the page currently lacks — rendering it (e.g. as a skills row in
About) is free relevance.

### 2.4 Internal linking & URL structure

- URLs: ✅ clean, hierarchical, hyphenated, stable (`/work/zendesk-ai-scheduling`).
- Internal links: ❌ see the orphan issue (§1.1). Also: the footer contains contact links only —
  add case-study and section links; the "Next case study" block currently cycles to itself when
  only one study is published (links to its own page — harmless but odd; hide it when
  `caseStudies.length < 2`).

### 2.5 Images

- Portrait: 112 KB progressive JPEG at 1000×1250 via `next/image` ✅ (auto-AVIF/WebP + srcset).
- Alt texts exist everywhere, including placeholders ✅.
- ❌ There are **no real work images anywhere on the site** — a design portfolio with zero
  product imagery forfeits Google Images entirely (a real discovery channel for designers) and
  weakens every E-E-A-T "evidence of work" signal. When adding them: descriptive filenames
  (`zendesk-wfm-schedule-validation-ai.png`), specific alts ("AI schedule validation panel in
  Zendesk WFM showing conflict explanations"), and `caption` fields — captioned images are
  disproportionately quoted by multimodal AI answers.

---

## 3. Content strategy

### 3.1 Corpus depth — 🔴 the core constraint

Two indexable URLs cannot build topical authority. The immediate lever is already written:
the two draft studies (`instapage-ai-content` — the 4× GPT-4 adoption story, and
`instapage-founding` — 0→$16M) just need their placeholder blocks completed and `draft`
flipped. That triples the corpus with your two most differentiated stories. The "4× adoption"
claim is currently in the *meta description of the whole site* while the page substantiating it
is hidden — publish it.

### 3.2 Content gaps & topical authority — 🟠 MEDIUM (long-term: the biggest AI-visibility lever)

People don't ask AI assistants "show me Ivan's portfolio". They ask things like:

- "How do you design AI features users actually adopt?"
- "Examples of AI decision-support UX in enterprise software"
- "How should scheduling tools use AI?"
- "Best AI-powered Figma plugins for UX work"

The case studies contain real answers to these, but locked inside a personal narrative. A small
`/notes` or `/writing` section (even 4–6 short, opinionated posts distilled from work you've
already done: "Designing prompting away", "AI as decision-support, not autopilot", "What 4×-ing
AI feature adoption actually took") would:

1. Target question-shaped queries that search and AI answers actually receive.
2. Give AI systems quotable, generic-context passages that cite *you* as the source.
3. Earn links (portfolios rarely do; essays sometimes do).

This is the highest-leverage long-term initiative in this audit. Each product (Sonas, UX
Copilot, AI Design Review) also deserves a thin on-site page — you currently send all brand-query
traffic for your own products to figma.com and aisonas.com without any on-domain page to rank
for "UX Copilot" or "Sonas AI personas".

### 3.3 E-E-A-T signals

Strong raw material: 14 years of first-hand experience, shipped products, named employers,
real metrics. Gaps:

- 🟠 **Resume is a Google Drive link** (`profile.links.resume`). Drive URLs are frequently
  permission-gated, uncrawlable, and can silently break. Host `/resume` on-domain (HTML page +
  downloadable PDF). An on-domain HTML resume is also one of the most LLM-legible documents you
  can publish.
- 🟠 **No third-party validation on-site**: the Startit interview
  (startit.rs/kreatori-i-alati-ivan-aleksic-dizajner-proizvoda) exists but isn't referenced;
  no testimonials/peer quotes. Add a short "mentioned in / said about" strip with outbound links
  — corroboration is what E-E-A-T and LLM fact-checking actually consume.
- ✅ Real name, real photo, contact info, location, honest NDA handling ("details in interview")
  — all good authenticity signals. Complete the placeholder metrics to keep them credible.

---

## 4. AI discoverability

### 4.1 What's already working

- Full server-side rendering — content readable without JS ✅ (the #1 requirement).
- All AI crawlers allowed in robots.txt ✅.
- **TL;DR blocks (problem / role / outcome)** on case studies — this is *exactly* the structure
  extraction models love. Keep and extend this pattern ✅.
- Person JSON-LD with `knowsAbout` ✅ (needs enrichment, below).
- Meta description written in complete, factual sentences with numbers ✅.

### 4.2 Entity recognition — 🔴 HIGH

"Ivan Aleksić" is ambiguous: a University of Belgrade geodesy professor (who holds
`linkedin.com/in/ivanaleksic`), a footballer, and a popular photographer all compete for the
name. Also note your LinkedIn displays "Ivan Aleks" while the site says "Ivan Aleksić" — keep
the canonical form identical everywhere you control.

Strengthen the Person entity in `layout.tsx`:

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ivanportfolio.com/#ivan",
  "name": "Ivan Aleksić",
  "alternateName": "Ivan Aleksic",
  "jobTitle": "AI Product Designer",
  "description": "AI product designer with 14 years in SaaS; founding designer at Instapage, senior product designer at Zendesk; builder of Sonas, UX Copilot and AI Design Review.",
  "disambiguatingDescription": "Product designer (not the University of Belgrade professor or the footballer of the same name)",
  "image": "https://ivanportfolio.com/portrait.jpg",
  "url": "https://ivanportfolio.com",
  "email": "mailto:ivanaleksic@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Belgrade", "addressCountry": "RS" },
  "sameAs": [
    "https://www.linkedin.com/in/ivalex/",
    "https://dribbble.com/ivalex13",
    "https://www.figma.com/@…",            // Figma Community profile
    "https://aisonas.com/",                 // if it has an about/author page
    "https://startit.rs/kreatori-i-alati-ivan-aleksic-dizajner-proizvoda/"
  ],
  "worksFor": { "@type": "Organization", "name": "Zendesk", "url": "https://www.zendesk.com" },
  "knowsAbout": ["AI product design", "Enterprise UX", "Design systems",
                 "0-to-1 product design", "Prompt design", "Workforce management software"]
}
```

The `sameAs` cluster is the single strongest entity-disambiguation signal for both Google's
Knowledge Graph and LLM retrieval — every profile you control should also link back to
ivanportfolio.com (bidirectional confirmation).

### 4.3 Missing structured data — 🟠 MEDIUM

- **`WebSite`** schema on the root (name + url) — helps sitelinks and site-name display.
- **`ProfilePage`** on home with `mainEntity` → the Person `@id`.
- **Case studies:** `Article`/`CreativeWork` JSON-LD per study (`headline`, `author` → Person
  `@id`, `about` → Organization Zendesk/Instapage, `datePublished`/`dateModified`) +
  **`BreadcrumbList`** (Home → Work → Study). Generate it in `work/[slug]/page.tsx` from the
  existing `content.ts` data — zero content duplication.
- **Products:** `SoftwareApplication` schema for Sonas / UX Copilot / AI Design Review with
  `author` → Person `@id`. This formally ties your products to your entity — currently that
  connection exists only in prose.

### 4.4 Answer-shaped content — 🟠 MEDIUM

- **FAQ block** (About or footer): 4–6 real questions with 2–3 sentence factual answers —
  "What kind of roles is Ivan open to?", "What AI products has Ivan built?", "Where is Ivan
  based / does he work remotely?", "What did Ivan do at Instapage/Zendesk?". Mark up with
  `FAQPage` schema. Rich-result eligibility for FAQ is now restricted for most sites, but the
  *format* is what AI answer engines extract most reliably — the schema is a bonus.
- **llms.txt** (`public/llms.txt`): the emerging convention — a markdown index of the site
  (who you are, key facts, links to case studies/products). Cheap, no downside, and some
  AI crawlers already consume it. Optionally add markdown mirrors of case studies.
- Keep facts **atomic and self-contained**: sentences like "At Zendesk, I led design for WFM
  scheduling used by ~700 enterprise accounts" survive chunking; multi-paragraph buildup to an
  unstated conclusion does not. The TL;DR pattern already does this — extend it to the home page
  (the unused `stats` array rendered as a labeled fact row would be perfect).

### 4.5 Formatting for extraction — 🟡 LOW

Already good: semantic HTML (`<article>`, `<dl>` meta grid, real lists, blockquotes). Two
touches: give the impact stat rows accessible labels tying value→metric→context in one element
(they're already `<div>` pairs, fine), and make sure every case study ends with a completed
"Impact" section — extraction heavily favors sections whose heading promises the conclusion.

---

## 5. Off-page SEO

**Current state:** effectively zero. The domain doesn't surface for its own exact-match query;
the only discovered assets are the LinkedIn profile ("Ivan Aleks", /in/ivalex), a Dribbble
profile (ivalex13), and one strong earned-media piece (the Startit interview, in Serbian).

#### 🟠 MEDIUM–HIGH impact, low effort — claim the links you already control

1. **LinkedIn**: set website field → ivanportfolio.com; align display name with the site.
2. **Dribbble**: add the site URL; re-activate if dormant.
3. **Figma Community**: the UX Copilot and AI Design Review plugin pages + your Figma profile
   should link to ivanportfolio.com — these are high-authority figma.com pages *about your own
   products* and currently (as far as detectable) send you nothing.
4. **aisonas.com**: add a visible "Built by Ivan Aleksić" footer link → ivanportfolio.com, with
   matching Person schema on that site. Cross-domain entity confirmation between your own
   properties is cheap and powerful.
5. **Startit interview**: ask for the profile link to be updated/added; link to the article
   from your site (bidirectional corroboration).

#### 🟡 Longer-term authority building

- Plugin directories, Product Hunt (Sonas), AI-tool directories (There's An AI For That etc.) —
  each listing is a brand mention + link that LLMs ingest.
- Guest posts / podcasts on AI-UX topics; conference or meetup talks (Belgrade has an active
  scene — Startit already knows you). These generate the third-party corroboration that both
  Google E-E-A-T and AI answer engines weight most.
- Note: LLM visibility is heavily *mention*-driven, not just link-driven — being named in
  crawlable text ("AI product designer Ivan Aleksić, who built UX Copilot…") on other domains
  is what makes a model "know" you.

---

## 6. Prioritized roadmap

### 🚀 Quick wins (this week — hours of work, highest ROI)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | Link the case study from the home card (fix the `embed` orphan) | High | ~30 min |
| 2 | Remove/complete every bracketed placeholder on the published study; add a build check | High | 1–3 h |
| 3 | Resolve the $16M vs $30M contradiction everywhere | High | 10 min |
| 4 | Add canonical URLs (`alternates.canonical`) to layout + study pages | Med | 15 min |
| 5 | Register Google Search Console + Bing Webmaster, submit sitemap | High | 30 min |
| 6 | Enrich Person JSON-LD (`image`, `address`, `disambiguatingDescription`, full `sameAs`) | High | 30 min |
| 7 | Update LinkedIn / Dribbble / Figma / aisonas.com to link back to the domain | High | 1 h |
| 8 | `loading="lazy"` on the Figma iframe | Med | 5 min |
| 9 | "I'm Ivan, …" → "I'm Ivan Aleksić, …" in About; render the unused `capabilities` list | Med | 20 min |
| 10 | Descriptive `seoTitle`/`seoDescription` fields for case studies | Med | 45 min |

### 🏗️ Medium-term (2–6 weeks)

1. **Finish and publish the two draft case studies** — triples the indexable corpus with your
   best stories (the 4× GPT-4 adoption study is the crown jewel for "AI product designer" queries).
2. **Add real imagery** with descriptive filenames, alts, and captions; replace runtime OG
   scraping with committed screenshots.
3. **Structured data build-out**: `WebSite`, `ProfilePage`, per-study `Article` + `BreadcrumbList`,
   `SoftwareApplication` for the three products — all generated from `content.ts`.
4. **On-domain resume page** (`/resume`, HTML + PDF) replacing the Google Drive link.
5. **FAQ section** with FAQPage schema; **llms.txt**; sitemap `lastModified`.
6. **Per-study OG images** (dynamic `opengraph-image.tsx` under `work/[slug]` reusing the
   existing generator with the study's headline metric).
7. Hide the self-referencing "Next case study" block while only one study is published.

### 🌱 Long-term (quarter+)

1. **`/notes` writing section** — 4–6 opinionated short essays distilled from the case studies,
   targeting question-shaped AI/UX queries. The single biggest lever for being *cited* by AI
   assistants rather than merely summarized.
2. **On-site product pages** for Sonas, UX Copilot, AI Design Review to own your product brand
   queries, cross-linked with the product properties.
3. **Authority campaign**: directories, Product Hunt, podcasts/talks, one guest post per
   quarter; cultivate crawlable third-party *mentions* of "Ivan Aleksić" + "AI product designer"
   in the same sentence.
4. **Measure**: Search Console queries, Vercel Analytics referrers, and periodic spot-checks of
   what ChatGPT/Claude/Perplexity say for "Ivan Aleksić AI product designer" and "who built
   UX Copilot" — the practical KPI for AI discoverability.

---

## Appendix — what's already good (don't break it)

- Static RSC rendering: all content in initial HTML (the #1 AI-crawler requirement).
- Clean semantic HTML: single h1, `<article>`, `<dl>`, lists, blockquotes, skip-link, reduced-motion support.
- robots.txt open to all agents + sitemap wired up.
- Title template + `metadataBase` correctly configured.
- TL;DR problem/role/outcome blocks — a model-extraction-friendly pattern worth extending.
- Self-hosted fonts, `next/image`, tiny dependency footprint.
- Honest content instincts: NDA-locking, draft-gating, real contact info.
