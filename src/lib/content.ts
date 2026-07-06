/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF CONTENT
 *  Everything on the site is rendered from this file. Edit copy here;
 *  no component changes needed. Text in [brackets] marks spots to fill in
 *  with your own detail; replace image placeholders by dropping files into
 *  /public/work/… and setting `src` on the image blocks.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Ivan Aleksić",
  role: "AI Product Designer",
  email: "ivanaleksic@gmail.com",
  headline: {
    lead: "I design AI products",
    accent: "people actually adopt.",
  },
  sub: "Fourteen years designing and scaling SaaS, from founding designer at Instapage (0 → $16M ARR) to AI-assisted enterprise tools at Zendesk. On the side, I build and ship my own AI products.",
  companies: ["Zendesk", "Instapage"], // logomarks shown in the hero (must exist in CompanyLogo.tsx)
  availability: "Open to Senior / Lead AI Product Design roles",
  links: {
    linkedin: "https://www.linkedin.com/in/ivalex/",
    resume: "https://drive.google.com/file/d/1ChjIg8PgQZ3s9LIXSxerN3th2rNt6_oj/view?usp=sharing",
    sonas: "https://aisonas.com/",
    uxcopilot:
      "https://www.figma.com/community/plugin/1461484151701868163/ux-copilot-ai-assistant",
  },
};

export const stats = [
  { value: 14, suffix: " yrs", label: "designing & scaling SaaS products" },
  { value: 16, prefix: "$", suffix: "M", label: "ARR grown from $0 as founding designer at Instapage" },
  { value: 4, suffix: "×", label: "AI-feature adoption after redesigning GPT-powered workflows" },
  { value: 700, prefix: "~", suffix: "", label: "enterprise accounts using scheduling tools I designed at Zendesk" },
];

export const capabilities = [
  "AI-assisted workflows",
  "0 → 1 product design",
  "Enterprise UX",
  "Design vision & strategy",
  "Prompt & interaction design",
  "Design systems",
  "Cross-team leadership",
  "Prototyping with code",
  "UX research",
  "Growth & adoption",
];

/* ───────────────────────────── Case studies ───────────────────────────── */

export type Block =
  | { type: "heading"; id: string; text: string }
  | { type: "text"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stat-row"; stats: { value: string; label: string }[] }
  | { type: "quote"; text: string; attribution?: string }
  | {
      type: "image";
      src?: string; // when set, renders from /public; otherwise a styled placeholder
      alt: string;
      caption?: string;
      aspect?: "wide" | "video" | "square" | "tall";
      note?: string; // guidance shown inside the placeholder
    }
  | { type: "callout"; title: string; text: string };

export type CaseStudy = {
  slug: string;
  company: string; // shown on the home-page card; logomark comes from CompanyLogo.tsx
  kicker: string; // e.g. "Zendesk · 2024–2026" (used on the study page)
  title: string;
  accent: string; // emphasized part of the title
  tint: string; // accent hue for this project's visuals (any CSS color)
  summary: string; // shown on the study page hero
  hook: string; // one calm sentence on the home-page card
  tags: string[]; // kept for future use; not rendered on cards
  metric: { value: string; label: string }; // headline metric on the card
  meta: { label: string; value: string }[];
  heroStats: { value: string; label: string }[];
  tldr: { problem: string; role: string; outcome: string };
  locked?: boolean; // true → "NDA: details in interview" treatment
  sections: Block[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "zendesk-ai-scheduling",
    company: "Zendesk",
    kicker: "Zendesk · 2024 – 2026",
    title: "Rethinking enterprise scheduling",
    accent: "with AI decision-support",
    tint: "#5b8cff",
    summary:
      "Leading the design response after ~80% of WFM's top adoption blockers traced back to scheduling, defining a long-term AI-assisted vision and shipping the wedge toward it.",
    hook: "The vision and first shipped steps for AI-assisted scheduling at enterprise scale.",
    tags: ["Enterprise SaaS", "AI decision-support", "Design vision", "Workforce management"],
    metric: { value: "~700", label: "enterprise accounts, up to 1,000 agents each" },
    meta: [
      { label: "Role", value: "Senior Product Designer · design lead, scheduling area" },
      { label: "Timeline", value: "July 2024 – April 2026" },
      { label: "Team", value: "[PM, EM, N engineers, researcher…]" },
      { label: "Platform", value: "Zendesk WFM · web" },
    ],
    heroStats: [
      { value: "~80%", label: "of top adoption blockers traced to the scheduling area I owned" },
      { value: "~700", label: "enterprise accounts on the tools I designed" },
      { value: "1,000", label: "agents managed in a single account" },
    ],
    tldr: {
      problem:
        "Zendesk WFM had an adoption and retention problem. Analysis traced roughly 80% of the top blockers to scheduling configuration, the area I owned.",
      role:
        "I led design: defined a long-term, AI-assisted scheduling-configuration vision, aligned a short-term roadmap toward it, and designed the first shipped steps.",
      outcome:
        "Shipped agent personal-availability settings, Holidays & Closures, and bulk task actions, each closing a specific adoption gap, and set the direction for AI decision-support across scheduling. [Add outcome metrics when available]",
    },
    sections: [
      { type: "heading", id: "context", text: "Context" },
      {
        type: "text",
        text: "Zendesk WFM helps support organizations forecast demand and schedule agents. Enterprise customers run it at serious scale (up to 1,000 agents in a single account), and scheduling configuration is where the product wins or loses them. [Add 2–3 sentences on how you came to own this area.]",
      },
      {
        type: "image",
        alt: "The scheduling area of Zendesk WFM before the redesign",
        aspect: "wide",
        note: "Product context shot: the scheduling area as customers saw it. Blur real data if needed.",
      },
      { type: "heading", id: "problem", text: "The problem" },
      {
        type: "text",
        text: "A cross-functional analysis of churn and adoption blockers put a number on the pain: ~80% of the top blockers pointed at scheduling. Managers couldn't express real-world constraints (personal availability, public holidays, one-off closures), so schedules came out wrong, and trust in the product eroded.",
      },
      {
        type: "quote",
        text: "[Drop in a verbatim customer quote from research, the one that made the room go quiet.]",
        attribution: "WFM manager, enterprise customer",
      },
      { type: "heading", id: "vision", text: "Vision first, then the wedge" },
      {
        type: "text",
        text: "Instead of patching blockers one by one, I defined where scheduling configuration should land long-term (including where AI genuinely helps versus where it adds noise), then worked backwards to a short-term roadmap where every shipped step also closed a known adoption gap.",
      },
      {
        type: "image",
        alt: "North-star vision framework for scheduling configuration",
        aspect: "video",
        note: "Vision artifact: the north-star map / storyboard you aligned leadership around.",
      },
      {
        type: "callout",
        title: "AI as decision-support, not autopilot",
        text: "Schedules are high-stakes: a bad one means missed SLAs and angry agents. I designed AI concepts around validation and explanation (including an internal tool that helps support managers validate schedules quickly) rather than opaque auto-generation. [Expand with 1–2 concrete interaction details.]",
      },
      {
        type: "image",
        alt: "AI-assisted schedule validation concept",
        aspect: "wide",
        note: "The money shot: AI validation concept UI. This is the image recruiters will remember.",
      },
      { type: "heading", id: "shipped", text: "What shipped" },
      {
        type: "list",
        items: [
          "Agent personal-availability settings: schedules finally respect individual working patterns. [Add adoption/usage numbers]",
          "Holidays & Closures: public holidays and one-off closures modeled as first-class objects. [Add impact]",
          "Bulk task actions: cut the grind of editing schedules at 1,000-agent scale. [Add time-saved metric]",
        ],
      },
      {
        type: "image",
        alt: "Shipped features: availability, Holidays & Closures, bulk actions",
        aspect: "wide",
        note: "Triptych of the three shipped features: final polished UI.",
      },
      { type: "heading", id: "leadership", text: "Leading beyond the feature" },
      {
        type: "text",
        text: "In parallel, I led a cross-team initiative to overhaul time-off tracking accuracy across Zendesk WFM, used by support and WFM managers in ~700 enterprise accounts. [Describe how you drove alignment across teams: rituals, artifacts, decisions you brokered.]",
      },
      { type: "heading", id: "impact", text: "Impact" },
      {
        type: "stat-row",
        stats: [
          { value: "[N%]", label: "adoption lift on shipped features" },
          { value: "[N]", label: "churn-risk accounts retained" },
          { value: "~700", label: "enterprise accounts served" },
        ],
      },
      {
        type: "text",
        text: "[Close with 2–3 sentences: what changed for customers, what changed for the business, and what the AI vision unlocked next.]",
      },
      { type: "heading", id: "reflections", text: "Reflections" },
      {
        type: "text",
        text: "[One honest paragraph. What you'd do differently, what you learned about designing AI for high-stakes enterprise workflows. Hiring managers read this section first more often than you'd think.]",
      },
    ],
  },
  {
    slug: "instapage-ai-content",
    company: "Instapage",
    kicker: "Instapage · 2023 – 2024",
    title: "4× adoption:",
    accent: "redesigning GPT-4 content generation",
    tint: "#22d3ee",
    summary:
      "The AI feature existed. People just didn't use it. Rebuilding the workflow around the user's moment of need lifted adoption 4×.",
    hook: "The redesign that took GPT-4 content generation from ignored to indispensable.",
    tags: ["AI UX", "GPT-4", "Growth", "Marketing SaaS"],
    metric: { value: "4×", label: "AI-feature adoption after the redesign" },
    meta: [
      { label: "Role", value: "Principal Product Designer" },
      { label: "Timeline", value: "[Month] 2023 – [Month] 2024" },
      { label: "Team", value: "[PM, N engineers…]" },
      { label: "Platform", value: "Instapage landing-page builder · web" },
    ],
    heroStats: [
      { value: "4×", label: "feature adoption after redesign" },
      { value: "20k+", label: "customers on the platform" },
      { value: "GPT-4", label: "powering generation workflows" },
    ],
    tldr: {
      problem:
        "Instapage shipped GPT-powered content generation early, but it sat in a side panel, disconnected from how marketers actually write landing pages. Usage flatlined.",
      role:
        "I owned the redesign end-to-end: research into where generation fit the real workflow, interaction design for prompting without 'prompting', and the rollout with the growth team.",
      outcome: "4× adoption of AI features. [Add retention / content-quality / revenue signals if you have them.]",
    },
    sections: [
      { type: "heading", id: "context", text: "Context" },
      {
        type: "text",
        text: "[Set the scene: Instapage's position, the pressure to ship AI in 2023, what v1 looked like and why it made sense at the time.]",
      },
      {
        type: "image",
        alt: "The original AI content generation UI",
        aspect: "wide",
        note: "Before: the v1 generation panel. Honest 'before' shots build credibility.",
      },
      { type: "heading", id: "insight", text: "The insight" },
      {
        type: "text",
        text: "Marketers don't sit down to 'use AI'. They sit down to ship a page. Generation only earns adoption when it appears inside the moment of need (a blank headline, a weak CTA, a variant to test), not as a destination feature. [Back this with the research that got you there.]",
      },
      {
        type: "quote",
        text: "[User quote that captures the mismatch between the v1 feature and the real workflow.]",
        attribution: "[Participant, research round]",
      },
      { type: "heading", id: "design", text: "Designing prompting away" },
      {
        type: "text",
        text: "The core move: replace the blank prompt box with structured, context-aware generation. The system already knows the industry, the page section, the brand voice, so the UI asks only for what it can't infer. [Walk through 2–3 key interaction decisions with rationale.]",
      },
      {
        type: "image",
        alt: "Redesigned in-context generation flow",
        aspect: "wide",
        note: "The redesigned flow: ideally an animated GIF/video of generation in context.",
      },
      {
        type: "callout",
        title: "Trust mechanics",
        text: "[Describe how you handled AI trust: previews, regeneration, editing affordances, tone controls, the details that separate AI designers from designers who added AI.]",
      },
      { type: "heading", id: "impact", text: "Impact" },
      {
        type: "stat-row",
        stats: [
          { value: "4×", label: "AI-feature adoption" },
          { value: "[N%]", label: "of new pages using generation" },
          { value: "[N]", label: "[other metric]" },
        ],
      },
      { type: "heading", id: "reflections", text: "Reflections" },
      {
        type: "text",
        text: "[What this taught you about AI adoption, the lesson you now apply everywhere, including at Zendesk.]",
      },
    ],
  },
  {
    slug: "sonas",
    company: "Sonas",
    kicker: "Founder & designer · 2024 – now",
    title: "Sonas:",
    accent: "AI personas that think like real users",
    tint: "#3ee6a8",
    summary:
      "My own product, designed and shipped end-to-end: AI personas for running interviews and usability tests when you can't get twenty users in a room.",
    hook: "My own AI research tool, taken from idea to shipped product solo.",
    tags: ["0 → 1", "Founder", "AI product", "UX research"],
    metric: { value: "0 → 1", label: "designed, built, and shipped solo" },
    meta: [
      { label: "Role", value: "Founder · design, product, build" },
      { label: "Timeline", value: "2024 – ongoing" },
      { label: "Team", value: "Solo, AI-assisted" },
      { label: "Platform", value: "Web app" },
    ],
    heroStats: [
      { value: "100%", label: "designed and built by me, end-to-end" },
      { value: "[N]", label: "users / teams running research with Sonas" },
      { value: "[N]", label: "interviews simulated" },
    ],
    tldr: {
      problem:
        "Early-stage teams skip research because recruiting is slow and expensive, so they ship on guesswork.",
      role:
        "Everything: positioning, UX, UI, prompt architecture, evaluation of persona realism, and the build itself.",
      outcome:
        "A shipped product in users' hands. Proof that I can take an AI product from idea to production alone, the same muscle I bring to teams. [Add traction numbers]",
    },
    sections: [
      { type: "heading", id: "why", text: "Why I built it" },
      {
        type: "text",
        text: "[The origin story: the moment in your own practice where you needed users and couldn't get them. Founder case studies live or die on authentic motivation.]",
      },
      {
        type: "image",
        alt: "Sonas persona interview interface",
        aspect: "wide",
        note: "Hero product shot of Sonas: the interview view.",
      },
      { type: "heading", id: "hard-parts", text: "The hard parts" },
      {
        type: "list",
        items: [
          "Persona fidelity: [how you engineered personas that push back and surprise, instead of agreeable LLM mush]",
          "Trust boundaries: [how the product communicates what synthetic research is and isn't good for]",
          "Session design: [how interviews flow, how insights get captured and synthesized]",
        ],
      },
      {
        type: "image",
        alt: "Prompt and persona architecture behind Sonas",
        aspect: "video",
        note: "A systems diagram: persona architecture / prompt pipeline. Shows technical depth.",
      },
      { type: "heading", id: "design-decisions", text: "Design decisions" },
      {
        type: "text",
        text: "[Pick 2–3 decisions with real trade-offs. E.g. chat vs. structured interview formats, how much AI 'personality' to expose, pricing/packaging choices.]",
      },
      { type: "heading", id: "traction", text: "Where it stands" },
      {
        type: "stat-row",
        stats: [
          { value: "[N]", label: "active users" },
          { value: "[N]", label: "interviews run" },
          { value: "[N]", label: "[revenue / retention signal]" },
        ],
      },
      { type: "heading", id: "reflections", text: "What shipping alone taught me" },
      {
        type: "text",
        text: "[The founder-to-team translation: what building with AI end-to-end changed about how you design, estimate, and collaborate with engineers.]",
      },
    ],
  },
  {
    slug: "instapage-founding",
    company: "Instapage",
    kicker: "Instapage · 2011 – 2024",
    title: "Founding designer:",
    accent: "0 → $16M ARR",
    tint: "#4ade80",
    summary:
      "Thirteen years, one company, every stage: first design hire to Principal. The long arc: landing-page builder from scratch, a design team from 1 to 10+, and a product from zero to tens of thousands of customers.",
    hook: "Thirteen years at one company, from first design hire to Principal.",
    tags: ["Founding designer", "Design leadership", "Product strategy", "Growth"],
    metric: { value: "$16M", label: "ARR grown from $0" },
    meta: [
      { label: "Role", value: "Founding Designer → Senior PD → PM → Principal PD" },
      { label: "Timeline", value: "September 2011 – July 2024" },
      { label: "Team", value: "Design team grown from 1 (me) to 10+" },
      { label: "Platform", value: "Instapage · web" },
    ],
    heroStats: [
      { value: "$0 → $16M", label: "ARR across the growth years" },
      { value: "20k+", label: "customers on the dashboard I redesigned" },
      { value: "1 → 10+", label: "product & design team growth" },
    ],
    tldr: {
      problem:
        "In 2011, building landing pages meant developers, templates, or pain. Instapage bet on a builder anyone could use, and needed its first designer to define what that meant.",
      role:
        "First design hire. Owned product strategy, UX, and core architecture from 0 → 1, then kept re-earning the seat as the company scaled: senior IC, PM for a year and a half, then Principal.",
      outcome:
        "The original builder adopted by thousands of businesses; growth from $0 to $16M ARR; an experimentation platform, a Zapier integration spanning 1,000+ tools, and a redesigned dashboard for 20k+ customers.",
    },
    sections: [
      { type: "heading", id: "arc", text: "The arc" },
      {
        type: "text",
        text: "This isn't a single-feature case study; it's the closest thing I have to a career in miniature. Every stage of a SaaS company, seen from the inside: scrappy 0→1, product-market fit, scale, and the org-building that comes with it.",
      },
      {
        type: "image",
        alt: "Evolution of Instapage from 2011 to 2024",
        aspect: "wide",
        note: "A timeline visual: screenshots of the product across eras. Extremely effective for a longevity story.",
      },
      { type: "heading", id: "zero-to-one", text: "0 → 1: the original builder" },
      {
        type: "text",
        text: "I designed and launched the original landing-page builder, the drag-and-drop core the company was built on, adopted by thousands of businesses. [Add: 1–2 foundational design decisions that survived a decade.]",
      },
      { type: "heading", id: "pm-detour", text: "The PM detour" },
      {
        type: "text",
        text: "For a year and a half I switched seats: PM for Integrations, Leads, and Experimentation. I launched the Zapier integration (1,000+ tools) and led the experimentation platform enabling scalable A/B testing. Sitting in the PM chair permanently changed how I design: roadmaps, trade-offs, and business cases stopped being someone else's job.",
      },
      { type: "heading", id: "principal", text: "Principal: multiplying, not just making" },
      {
        type: "list",
        items: [
          "Owned the redesign of the core dashboard used by 20k+ customers, improving feature discovery. [Add metric]",
          "Led the Heatmaps analytics redesign, improving usability and adoption for marketing teams.",
          "Partnered with leadership on pricing & packaging strategy during a key growth phase.",
          "Mentored designers and helped grow the product design function from 1 to 10+.",
        ],
      },
      { type: "heading", id: "reflections", text: "Reflections" },
      {
        type: "text",
        text: "[Why staying 13 years was a feature, not a bug, and what founding-stage ownership looks like when you bring it into an enterprise org.]",
      },
    ],
  },
];

/* ───────────────────────────── AI products ───────────────────────────── */

export const products = [
  {
    name: "Sonas",
    tagline: "AI personas that think and react like real users, for interviews and usability tests.",
    status: "Web app",
    href: "https://aisonas.com/",
    external: true,
    tint: "#3ee6a8",
    image: undefined as string | undefined, // set to override the fetched OG image, e.g. "/products/sonas.png"
    ogSource: "https://aisonas.com/", // card's visual falls back to this page's og:image
    imageAlt: "Sonas interface",
  },
  {
    name: "UX Copilot",
    tagline: "AI assistant for UX work inside Figma: copy generation, personas, design feedback.",
    status: "Figma plugin",
    href: "https://www.figma.com/community/plugin/1461484151701868163/ux-copilot-ai-assistant",
    external: true,
    tint: "#5b8cff",
    image: undefined as string | undefined, // set to override the fetched OG image, e.g. "/products/ux-copilot.png"
    ogSource:
      "https://www.figma.com/community/plugin/1461484151701868163/ux-copilot-ai-assistant",
    imageAlt: "UX Copilot plugin in Figma",
  },
  {
    name: "AI Design Review",
    tagline: "Fast, practical design critique without leaving the Figma canvas.",
    status: "Figma plugin",
    href: "https://www.figma.com/community/plugin/1542867863199350817/ai-design-review",
    external: true,
    tint: "#22d3ee",
    image: undefined as string | undefined, // set to override the fetched OG image, e.g. "/products/ai-design-review.png"
    ogSource:
      "https://www.figma.com/community/plugin/1542867863199350817/ai-design-review",
    imageAlt: "AI Design Review plugin in Figma",
  },
];

/* ───────────────────────────── About ───────────────────────────── */

export const about = {
  portrait: "/portrait.jpg" as string | undefined,
  paragraphs: [
    "I'm Ivan, an AI product designer with fourteen years of building and scaling SaaS products. I was the first design hire at Instapage, where I owned the product from 0 → 1 and stayed through the growth to $16M ARR, a 10+ person product team, and tens of thousands of customers. Along the way I spent a year and a half as a product manager, which permanently rewired how I design.",
    "What makes me different from most designers “doing AI”: I ship it myself. Sonas, UX Copilot, and AI Design Review are products I designed, built, and operate. That hands-on loop (model behavior, prompts, latency, cost, trust) is the fastest design education I've ever had, and it shows up in every product decision I make.",
    "I'm based in Belgrade, and people I work with would tell you I'm collaborative to a fault. Off-screen you'll find me by the sea with my family, usually with a good glass of wine nearby and one eye on a watch I probably don't need.",
  ],
  portraitNote: "Portrait: a real photo, well lit. It matters more than designers admit.",
};

/* ───────────────────────────── Experience ───────────────────────────── */

export const experience = [
  {
    company: "Zendesk",
    role: "Senior Product Designer",
    period: "July 2024 – April 2026",
    bullets: [
      "Led the design response to WFM's adoption and retention problems after analysis traced ~80% of the top blockers to the scheduling area I owned. Defined a long-term scheduling-configuration vision (AI included) and a short-term roadmap building toward it.",
      "Designed AI-assisted scheduling concepts, including an internal tool that helps support managers validate schedules quickly, and explored how AI decision-support could work across scheduling more broadly.",
      "Shipped the first steps of that vision: agent personal-availability settings, Holidays & Closures, and bulk task actions, each closing a specific adoption gap.",
      "Led a cross-team initiative to overhaul time-off tracking accuracy across Zendesk WFM, used by support and WFM managers (~700 enterprise accounts, up to 1,000 agents each).",
    ],
  },
  {
    company: "Instapage",
    role: "Principal Product Designer",
    period: "January 2020 – July 2024",
    bullets: [
      "Redesigned AI-powered content generation (GPT-4), lifting feature adoption 4×.",
      "Owned the redesign of the core product dashboard used by 20k+ customers, improving feature discovery.",
      "Led the redesign of Heatmaps analytics, improving usability and adoption for marketing teams.",
      "Partnered with leadership on pricing and packaging strategy during a key growth phase.",
      "Mentored designers and helped grow the product design function.",
    ],
  },
  {
    company: "Instapage",
    role: "Product Manager",
    period: "May 2018 – December 2019",
    bullets: [
      "Owned roadmap for Integrations, Leads, and Experimentation used by thousands of customers.",
      "Launched Zapier integration (1,000+ tools), significantly expanding the product ecosystem.",
      "Led redesign and launch of experimentation platform enabling scalable A/B testing workflows.",
    ],
  },
  {
    company: "Instapage",
    role: "Founding Product Designer → Senior Product Designer",
    period: "September 2011 – April 2018",
    bullets: [
      "First design hire at Instapage. Owned product strategy, UX, and core architecture from 0 → 1.",
      "Designed and launched the original landing-page builder, adopted by thousands of businesses.",
      "Contributed to growth from $0 to $16M ARR through rapid product and customer expansion.",
      "Helped scale the product team from 1 to 10+ across design and product.",
    ],
  },
];

export const education = [
  { name: "Reforge · Mastering Product Management", year: "2022" },
  { name: "Reforge · Retention + Engagement", year: "2018" },
];
