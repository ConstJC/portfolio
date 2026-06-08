# Portfolio Next.js — Implementation Gameplan

> **Source:** `portfolio.html` → Next.js 16 (App Router) + TypeScript + Tailwind CSS v4  
> **Status:** Scaffold exists (`app/`, `next.config.ts`). No components yet.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Icons | Lucide React |
| Animations | Framer Motion |
| State (UI only) | Zustand |
| Forms | React Hook Form + Zod |
| Data | JSON files in `/store` |
| Deploy | Vercel |

---

## Folder Structure

```
my-website/
├── app/
│   ├── layout.tsx                  # Root layout — fonts, metadata, ThemeProvider
│   ├── page.tsx                    # Home page — assembles all section components
│   └── globals.css                 # Tailwind directives + design tokens (CSS vars)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # Sticky nav, dropdown, theme toggle, CTA buttons
│   │   └── Footer.tsx              # 4-column footer, socials, legal links
│   │
│   ├── sections/
│   │   ├── Hero.tsx                # Hero split layout, pill badge, floating tags
│   │   ├── Ways.tsx                # "4 Ways I Can Help You" card grid
│   │   ├── Stats.tsx               # "By the Numbers" stat row
│   │   ├── Steps.tsx               # "How We Work Together" 3-step process
│   │   ├── Projects.tsx            # Selected work project cards
│   │   ├── Experience.tsx          # Work experience + education cards
│   │   ├── Services.tsx            # 6-service offering grid
│   │   ├── Testimonials.tsx        # 3-column testimonial cards
│   │   ├── Faq.tsx                 # Accordion FAQ
│   │   └── Cta.tsx                 # CTA box with glow, email + calendar buttons
│   │
│   └── ui/                         # shadcn/ui auto-generated components
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       └── accordion.tsx
│
├── store/                          # All content data — edit here, never in components
│   ├── site.json                   # Global meta: name, tagline, location, email, socials
│   ├── navigation.json             # Nav links + dropdown items
│   ├── hero.json                   # Hero headline, description, pill text, badges
│   ├── ways.json                   # "4 Ways" cards (icon, tag, title, desc)
│   ├── stats.json                  # Stat items (label, value, description)
│   ├── steps.json                  # Process steps (number, title, description)
│   ├── projects.json               # Project cards (title, desc, tech tags, links)
│   ├── experience.json             # Work & education cards (role, org, period, desc)
│   ├── services.json               # Service cards (icon, title, description)
│   ├── testimonials.json           # Testimonial cards (quote, person, role, initials)
│   └── faq.json                    # FAQ items (question, answer)
│
├── lib/
│   ├── utils.ts                    # cn() Tailwind merge helper
│   └── types.ts                    # TypeScript interfaces for every store shape
│
├── hooks/
│   └── useTheme.ts                 # Dark/light toggle logic (Zustand store)
│
└── public/
    └── pc.png                      # Profile photo used in Hero
```

---

## Design Tokens (globals.css)

Migrate the CSS custom properties from `portfolio.html` into Tailwind v4 theme variables. Define both `dark` and `light` themes.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Primary */
  --color-primary:        #2C94DE;
  --color-primary-hover:  #247BB8;
  --color-primary-light:  rgba(59,130,246,0.12);
  --color-primary-border: rgba(59,130,246,0.28);

  /* Dark theme (default) */
  --color-bg:    #0E162A;
  --color-bg2:   #0E162A;
  --color-card:  #1a2030;
  --color-card2: #212838;
  --color-text:  #eef0f7;
  --color-text2: #8b9ab3;
  --color-text3: #4a5e7a;

  /* Font */
  --font-sans: 'Plus Jakarta Sans', sans-serif;
}
```

Light theme overrides go in a `.light` class toggled by the Zustand theme store.

---

## Data Store (JSON files)

All personal content lives here. Add or edit entries without touching any component.

### `store/site.json`
```json
{
  "name": "Jay Clark Anore",
  "handle": "JCode",
  "initials": "JC",
  "tagline": "Full-Stack Developer & Designer",
  "location": "Cebu City, Philippines",
  "locationFlag": "🇵🇭",
  "email": "jc.anore09@gmail.com",
  "availableForFreelance": true,
  "currentEmployer": "CODY Web Dev",
  "resumeUrl": "/resume.pdf",
  "bookingUrl": "#",
  "socials": {
    "github": "#",
    "linkedin": "#",
    "facebook": "#",
    "twitter": "#",
    "instagram": "#",
    "tiktok": "#"
  }
}
```

### `store/projects.json`
```json
[
  {
    "id": "linque",
    "emoji": "🔢",
    "badge": "Queue System",
    "title": "LinQue",
    "description": "Smart queuing system with multiple category support — Inquiries, Transactions, and more. Real-time queue updates powered by SignalR for seamless client flow management.",
    "techs": ["C# .NET", "SignalR", "SQL Server", "jQuery"],
    "caseStudyUrl": "#",
    "thumbVariant": "pt-1"
  },
  {
    "id": "emr",
    "emoji": "🏥",
    "badge": "Healthcare",
    "title": "EMR Web App",
    "description": "Electronic Medical Records system for patient management. Covers admission, outpatient, billing, and clinical records with an intuitive interface for clinic staff.",
    "techs": ["Next.js", "NestJS", "TypeORM", "TypeScript"],
    "caseStudyUrl": "#",
    "thumbVariant": "pt-2"
  },
  {
    "id": "renthub",
    "emoji": "🏠",
    "badge": "PropTech",
    "title": "RentHub",
    "description": "Cross-platform rental management system for boarding houses and apartments. Features unit tracking, billing, tenant management, and a mobile app for landlords on the go.",
    "techs": ["Next.js", "Flutter", "NestJS", "TypeORM"],
    "caseStudyUrl": "#",
    "thumbVariant": "pt-5"
  }
]
```

### `store/experience.json`
```json
[
  {
    "id": "cody",
    "emoji": "💻",
    "role": "Software Engineer",
    "org": "CODY Web Development Inc.",
    "location": "Cebu, PH",
    "period": "2024 — Present",
    "description": "Building full-stack web and mobile applications using Next.js, NestJS, Flutter, and C#. Working with AI coding tools (Claude Code, Cursor, Codex) for accelerated development with proper planning, TypeORM for DB management, and WebSockets for real-time features."
  },
  {
    "id": "prince-retail",
    "emoji": "🏢",
    "role": "Full Stack Developer (OJT)",
    "org": "Prince Retail Group of Companies",
    "location": "Cebu, PH",
    "period": "Feb 2024 — Nov 2024",
    "description": "10-month internship designing and developing internal systems including a Queuing System and Asset Management platform. Worked with C#, .NET Core, SQL Server, jQuery, SignalR for real-time updates, and Figma for UI design."
  },
  {
    "id": "usc",
    "emoji": "🎓",
    "role": "Certificate of Computer Technology",
    "org": "University of San Carlos",
    "location": "Talamban Campus, Cebu",
    "period": "2022 — 2025",
    "description": "Major in Software Development. Capstone: Paanakan sa Mandaue — Clinic Management System covering admission, outpatient, billing, and patient records. Served as Team Lead and Full Stack Developer."
  }
]
```

### `store/faq.json`
```json
[
  {
    "id": "project-types",
    "question": "What types of projects do you take on?",
    "answer": "I work on web apps, mobile apps (React Native), SaaS platforms, e-commerce stores, and AI-powered tools. I'm also happy to jump into existing codebases for feature work or performance improvements.",
    "defaultOpen": true
  },
  {
    "id": "gcash-maya",
    "question": "Can my clients pay with GCash or Maya?",
    "answer": "Absolutely. I build GCash, Maya, and local bank transfer integrations into every project that needs payments. I'm familiar with PayMongo, Xendit, and direct API integrations."
  },
  {
    "id": "project-payments",
    "question": "How do you handle project payments?",
    "answer": "I typically structure projects in milestones: 30% upfront, 40% at mid-project review, and 30% on launch. I accept GCash, Maya, bank transfer, and PayPal."
  },
  {
    "id": "timeline",
    "question": "What is your typical timeline for a project?",
    "answer": "A landing page or simple site takes 1–2 weeks. A full web application or mobile app typically takes 6–12 weeks depending on scope. I always provide a detailed timeline before we start."
  },
  {
    "id": "ownership",
    "question": "Do I own the code and design after the project?",
    "answer": "Yes — 100%. Once the final payment is made, all code, assets, and design files are yours. I'll hand over everything including source code, Figma files, and credentials."
  }
]
```

> **Other store files** (`ways.json`, `stats.json`, `steps.json`, `services.json`, `testimonials.json`, `navigation.json`, `hero.json`) follow the same pattern — extract the matching HTML section's content into a typed JSON array.

---

## TypeScript Types (`lib/types.ts`)

```typescript
export interface Project {
  id: string
  emoji: string
  badge: string
  title: string
  description: string
  techs: string[]
  caseStudyUrl: string
  thumbVariant: string
}

export interface Experience {
  id: string
  emoji: string
  role: string
  org: string
  location: string
  period: string
  description: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  initials: string
  name: string
  role: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  defaultOpen?: boolean
}

export interface Stat {
  label: string
  value: string
  description: string
}

export interface Step {
  number: number
  eyebrow: string
  title: string
  description: string
}

export interface WayCard {
  icon: string
  tag: string
  title: string
  description: string
}

export interface SiteConfig {
  name: string
  handle: string
  initials: string
  tagline: string
  location: string
  locationFlag: string
  email: string
  availableForFreelance: boolean
  currentEmployer: string
  resumeUrl: string
  bookingUrl: string
  socials: Record<string, string>
}
```

---

## Theme Store (`hooks/useTheme.ts`)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface ThemeStore {
  theme: Theme
  toggle: () => void
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      toggle: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.setAttribute('data-theme', next)
      },
    }),
    { name: 'portfolio-theme' }
  )
)
```

---

## Page Assembly (`app/page.tsx`)

```typescript
import Hero        from '@/components/sections/Hero'
import Ways        from '@/components/sections/Ways'
import Stats       from '@/components/sections/Stats'
import Steps       from '@/components/sections/Steps'
import Projects    from '@/components/sections/Projects'
import Experience  from '@/components/sections/Experience'
import Services    from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Faq         from '@/components/sections/Faq'
import Cta         from '@/components/sections/Cta'

// Data is imported at the module level — zero client-side fetching
import projects    from '@/store/projects.json'
import experience  from '@/store/experience.json'
import faq         from '@/store/faq.json'
// ...etc

export default function Home() {
  return (
    <>
      <Hero />
      <Ways />
      <Stats />
      <Steps />
      <Projects items={projects} />
      <Experience items={experience} />
      <Services />
      <Testimonials />
      <Faq items={faq} />
      <Cta />
    </>
  )
}
```

---

## Implementation Phases

### Phase 1 — Foundation
- [ ] Install missing dependencies: `shadcn/ui`, `lucide-react`, `framer-motion`, `zustand`, `react-hook-form`, `zod`
- [ ] Init shadcn: `npx shadcn@latest init`
- [ ] Migrate design tokens from `portfolio.html` CSS variables → `globals.css` Tailwind theme
- [ ] Set up `lib/utils.ts` (cn helper), `lib/types.ts`
- [ ] Create all `store/*.json` files with real content extracted from `portfolio.html`
- [ ] Update `app/layout.tsx`: Plus Jakarta Sans font (next/font/google), metadata, `data-theme` attribute

### Phase 2 — Layout Components
- [ ] `Navbar.tsx`: sticky header, nav links, dropdown (About), theme toggle (Zustand), Resume + Hire Me buttons
- [ ] `Footer.tsx`: 4-column grid, social icon buttons, legal links

### Phase 3 — Section Components (top → bottom)
- [ ] `Hero.tsx`: grid layout, pill badge, animated role text, h1 with accent, photo with floating tags + badge
- [ ] `Ways.tsx`: 4-card grid from `ways.json`
- [ ] `Stats.tsx`: horizontal stat row from `stats.json`
- [ ] `Steps.tsx`: 3-step grid with connector lines from `steps.json`
- [ ] `Projects.tsx`: 3-column project cards from `projects.json`, thumb gradients, hover case study link
- [ ] `Experience.tsx`: 2-column experience/education cards from `experience.json`
- [ ] `Services.tsx`: 3-column service cards from `services.json`
- [ ] `Testimonials.tsx`: 3-column testimonial cards from `testimonials.json`
- [ ] `Faq.tsx`: shadcn Accordion driven by `faq.json`, first item open by default
- [ ] `Cta.tsx`: centered box with radial glow, email + booking buttons

### Phase 4 — Animations
- [ ] Wrap section entry with `framer-motion` `useInView` fade-up variants
- [ ] Stagger card grids on entry
- [ ] Smooth theme transition (CSS `transition` on `body`)

### Phase 5 — Polish & Deploy
- [ ] Responsive breakpoints: match HTML (`@media max-width: 1024px` and `640px`)
- [ ] `generateMetadata` in `layout.tsx`: OG image, description, canonical URL
- [ ] Lighthouse audit (target: 95+ Performance, 100 Accessibility)
- [ ] Deploy to Vercel: connect GitHub repo, set `NEXT_PUBLIC_*` env vars if needed

---

## Key Decisions

| Decision | Rationale |
|---|---|
| JSON in `/store`, not a CMS | Zero infra cost, version-controlled, trivially editable |
| Server Components for data | Import JSON directly — no `useEffect`, no loading states for content |
| Zustand only for theme | Theme toggle is the only runtime UI state needed |
| shadcn Accordion for FAQ | Replaces the vanilla JS `toggleFaq()` from the HTML cleanly |
| Tailwind CSS v4 `@theme` | Replaces the CSS custom property system already in the HTML |

---

## Dependency Install Command

```bash
# Core additions (shadcn, icons, animation, state, forms)
pnpm add lucide-react framer-motion zustand react-hook-form zod

# shadcn init (interactive — choose dark theme, CSS variables on)
npx shadcn@latest init

# Add required shadcn components
npx shadcn@latest add button badge card accordion
```

---

## Notes

- `portfolio.html` stays in place as a reference — do not delete it
- The `pc.png` image should be added to `/public/pc.png`
- Email address: `jc.anore09@gmail.com` (decoded from the Cloudflare-obfuscated href in the HTML)
- The dot-grid background pattern is a CSS `radial-gradient` on `body::before` — replicate in `globals.css`
- Framer Motion `"use client"` wrapper is needed for any animated section; keep Server Components for static content sections
