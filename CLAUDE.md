# Lots of Trip — Project Guide & Plan

A premium tours & trips website for the Indian Himalayas, covering **Uttarakhand** and **Himachal Pradesh**.
The goal is an editorial, photography-led site with Apple-grade motion. It must feel crafted by a design studio, never like an AI template.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest stable, App Router) | Server Components by default, `"use client"` only where motion/interaction needs it |
| Language | TypeScript (strict) | No `any`; shared types live in `src/types` |
| Styling | Tailwind CSS v4 + CSS Modules | Tailwind for layout/spacing/tokens; CSS Modules for complex, bespoke pieces (masks, clip-paths, keyframes) |
| Scroll motion | GSAP + ScrollTrigger | Pinned sections, scrubbed timelines, image reveals |
| UI motion | Motion (`motion/react`) | Hover, layout transitions, page transitions, menus |
| Smooth scroll | Lenis | Synced with GSAP ticker |
| Fonts | `next/font` (self-hosted) | No layout shift |
| Images | `next/image`, local AVIF/WebP | Blur placeholders, explicit sizes |
| Forms | React Hook Form + Zod | Enquiry / trip planner |
| Lint/Format | ESLint + Prettier | |
| Package manager | npm | |

### Commands
```bash
npm run dev      # local dev
npm run build    # production build
npm run start    # serve build
npm run lint     # lint
```

---

## 2. Coding Rules (mandatory)

1. No comments in CSS files.
2. No unnecessary comments in code. Code should explain itself through naming.
3. No inline styles (`style={{}}`). Use Tailwind classes, CSS Modules, or CSS variables set via classes. The only exception is a GSAP/Motion runtime value that cannot be expressed otherwise.
4. Never put a whole feature in one file. Split into components, hooks, utils, data, and types.
5. Before writing anything new, search the codebase for an existing component, hook, util, or style and reuse it.
6. One component per file, PascalCase filenames, co-located `Component.module.css` when needed.
7. Content (destinations, tours, copy) lives in `src/content` as typed data — never hard-coded inside components.
8. Every animation must respect `prefers-reduced-motion` (via the shared `useReducedMotion` hook).
9. Animate only `transform`, `opacity`, `clip-path`, and `filter`. Never animate layout properties.
10. Every GSAP setup is wrapped in `useGSAP` (or a `gsap.context`) and cleaned up on unmount.

---

## 3. Design Direction — "Editorial Himalaya"

### What to avoid (the "AI look")
- Purple/blue gradients, neon glows, glassmorphism cards everywhere
- Emoji icons, generic 3-column feature cards with icons on top
- Centered hero with a stock headline like "Explore the World" + two pill buttons
- Overuse of rounded-2xl cards and drop shadows
- Stock "smiling tourist" photos; only landscapes, culture, texture, real places

### What to do instead
- **Photography is the hero.** Full-bleed, large-format images; let mountains breathe.
- **Editorial typography.** Big serif display headlines against a clean grotesk for body text.
- **Asymmetric grids,** generous whitespace, magazine-style layouts, numbered sections (01 / 02 / 03).
- **Small details:** coordinates and altitudes as typographic accents (e.g. `30.7352° N · 79.0669° E · 3,583 m`), thin rules, subtle film grain overlay, custom cursor on media.
- **Restraint.** One accent color, used sparingly.

### Palette (CSS variables in `src/styles/tokens.css`, exposed to Tailwind via `@theme`)
| Token | Hex | Use |
|---|---|---|
| `--color-snow` | `#F4F1EA` | Main background (warm paper) |
| `--color-ink` | `#14171A` | Primary text |
| `--color-pine` | `#1F3A2E` | Deep forest, dark sections |
| `--color-slate` | `#5B6670` | Secondary text |
| `--color-glacier` | `#C9D6DC` | Cool tints, dividers |
| `--color-saffron` | `#D9822B` | Single accent (prayer flags / temple saffron) |
| `--color-stone` | `#A39887` | Muted warm neutral |

### Typography
- Display: **Fraunces** or **Instrument Serif** (high-contrast serif, italic for emphasis)
- Body/UI: **Inter Tight** or **Geist**
- Mono accents (coordinates, altitude, labels): **JetBrains Mono** or **Geist Mono**
- Fluid type scale with `clamp()`; hero headlines 8–14vw on desktop

---

## 4. Motion System (Apple-level)

Shared constants in `src/lib/motion/` (easings, durations, presets). No magic numbers in components.

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out) for reveals; `cubic-bezier(0.65, 0, 0.35, 1)` for scrubbed/in-out moves
- **Durations:** micro 0.2s · UI 0.45s · reveal 0.9–1.2s

### Signature moments
1. **Preloader → Hero:** counter 0→100, then a mountain image expands from a small frame to full-bleed (clip-path), headline lines rise from a mask.
2. **Hero parallax:** layered foreground/background (ridge cutout over sky) moving at different speeds on scroll.
3. **Pinned "Two States" story:** section pins; scroll scrubs from Uttarakhand to Himachal with a crossfading map outline and changing stats.
4. **Horizontal destination gallery:** vertical scroll drives a horizontal track (ScrollTrigger pin + scrub).
5. **Image scale reveal:** images start at `scale(1.25)` inside a clipped frame and settle to 1 as they enter.
6. **Split-text headlines:** line/word reveals with stagger (GSAP SplitText).
7. **Altitude counter:** numbers count up as a trek's elevation profile line draws (SVG `stroke-dashoffset`).
8. **Magnetic buttons & media cursor:** cursor turns into a "View" disc over cards.
9. **Page transitions:** shared image morph from a card into the destination detail hero (Motion `layoutId` / View Transitions API).
10. **Sticky itinerary:** day-by-day timeline where the image panel stays sticky and swaps per day.

### Performance budget
- LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-range mobile
- Lazy-load GSAP-heavy sections; dynamic import non-critical client components
- Simplified motion on touch / small screens; full motion on desktop

---

## 5. Destinations

### Uttarakhand — "Devbhoomi"
| Destination | Type | Best season | Highlight |
|---|---|---|---|
| Rishikesh | Spiritual / Adventure | Sep–Jun | Ganga Aarti, rafting, Laxman Jhula |
| Kedarnath | Pilgrimage / Trek | May–Jun, Sep–Oct | One of the Char Dham, ~3,583 m |
| Badrinath | Pilgrimage | May–Jun, Sep–Oct | Char Dham, Mana village |
| Valley of Flowers | Trek / UNESCO | Jul–Sep | Alpine meadows, Hemkund Sahib |
| Auli | Snow / Ski | Dec–Mar | Skiing, Nanda Devi views, ropeway |
| Chopta – Tungnath – Chandrashila | Trek | Apr–Jun, Sep–Dec | Highest Shiva temple |
| Kedarkantha | Winter trek | Dec–Apr | Classic snow summit trek |
| Har Ki Dun | Trek | Apr–Jun, Sep–Nov | "Valley of Gods" |
| Nainital | Hill station / Lakes | Mar–Jun, Oct–Dec | Naini Lake, Kumaon hills |
| Mussoorie | Hill station | Mar–Jun, Sep–Nov | "Queen of the Hills" |
| Jim Corbett | Wildlife | Nov–Jun | Tiger safaris |
| Munsiyari | Offbeat | Mar–Jun, Oct–Nov | Panchachuli peaks |
| Kausani | Offbeat | Oct–Jun | 300 km Himalayan panorama |

### Himachal Pradesh — "Dev Bhoomi of the West"
| Destination | Type | Best season | Highlight |
|---|---|---|---|
| Manali | Hill station / Adventure | Oct–Jun | Solang, Old Manali, Atal Tunnel |
| Spiti Valley (Kaza) | High-altitude desert | Jun–Oct | Key Monastery, Langza, Hikkim |
| Chandratal | Lake / Camping | Jun–Sep | Moon Lake, ~4,300 m |
| Kasol & Parvati Valley | Backpacking | Mar–Jun, Sep–Nov | Tosh, Malana, Kheerganga trek |
| Shimla | Hill station | Mar–Jun, Dec–Jan | Colonial Mall Road, toy train |
| Dharamshala / McLeod Ganj | Culture | Mar–Jun, Sep–Nov | Tibetan culture, Triund trek |
| Bir Billing | Paragliding | Mar–May, Oct–Nov | World-class paragliding |
| Kinnaur (Kalpa, Chitkul) | Offbeat | Apr–Oct | Kinner Kailash, last village on the Indo-Tibet road |
| Jibhi & Tirthan Valley | Offbeat | Mar–Jun, Sep–Nov | Great Himalayan National Park |
| Dalhousie & Khajjiar | Hill station | Mar–Jun | "Mini Switzerland of India" |
| Hampta Pass | Trek | Jun–Sep | Green Kullu to barren Lahaul crossover |

> Verify seasons, altitudes, and temple opening dates (they change every year) before publishing.

### Image sourcing
- Sources: **Unsplash** and **Pexels** (free for commercial use), **Wikimedia Commons** (check each image's license; attribution is required for CC-BY / CC-BY-SA).
- Research real photos of each actual place. Never use a photo of a different location, and never use AI-generated images.
- Download locally to `public/images/destinations/<slug>/` (hero, 3–6 gallery images), convert to AVIF/WebP, max 2400px wide.
- Record every image in `src/content/credits.ts` (`src`, `photographer`, `source`, `license`, `url`) and show the credits on a `/credits` page.
- Generate blur placeholders at build time (`plaiceholder` or a script in `scripts/`).

---

## 6. Brand, Social & Contact

All business details live in `src/content/site.ts`. Use **dummy placeholder values for now**; replace them before launch.

| Field | Value |
|---|---|
| Brand | Lots of Trip |
| Instagram | https://www.instagram.com/lotsoftrip_/ (real) |
| WhatsApp | `+91 98765 43210` (dummy) → link `https://wa.me/919876543210?text=<prefilled message>` |
| Phone | `+91 98765 43210` (dummy) |
| Email | `hello@lotsoftrip.com` (dummy) |
| Address | `Dehradun, Uttarakhand, India` (dummy) |

### Contact flows
1. **Contact / trip planner form** (`/contact` and the tour detail enquiry). Fields: name, phone, email, destination/tour, travel dates, group size, message. Validated with React Hook Form + Zod. For now it submits to a dummy server action that logs and returns success. A real email/CRM integration comes later.
2. **Direct WhatsApp.** A floating WhatsApp button on every page, plus "Chat on WhatsApp" CTAs on tour and destination pages. Each opens `wa.me` with a prefilled message naming the tour or destination (built by a `buildWhatsAppLink` util).
3. **Instagram.** Linked in the header/menu and footer, plus an "On the trail with us" Instagram section on the home page (dummy grid of local images linking to the profile; no API for now).

Everything else (tour prices, testimonials, journal posts, team) is also dummy content for now, clearly kept in `src/content` so it is easy to replace.

---

## 7. Information Architecture

```
/                         Home
/destinations             All destinations (filter: state, type, season)
/destinations/[slug]      Destination detail
/tours                    Curated tour packages
/tours/[slug]             Tour detail + day-wise itinerary + enquiry
/journeys/uttarakhand     State landing page
/journeys/himachal        State landing page
/journal                  Travel stories / guides
/journal/[slug]           Article
/about                    Story, team, values
/contact                  Contact + trip planner form
/credits                  Photo credits
```

### Home page sections
1. Preloader + full-bleed hero (headline: something like *"Where the Himalaya begins"*)
2. Intro manifesto — large serif paragraph, words revealed on scroll
3. "Two States" pinned story (Uttarakhand ↔ Himachal)
4. Horizontal destination gallery
5. Featured tours — editorial asymmetric layout
6. Seasons — a scroll-driven 12-month strip showing where to go each month
7. Experience types (Treks · Pilgrimage · Snow · Wildlife · Offbeat) as large typographic list with hover image previews
8. Testimonials — quiet, typographic, no avatars-in-cards
9. Journal teaser
10. Instagram strip "On the trail with us" → links to @lotsoftrip_
11. Big CTA "Plan your journey" (form + WhatsApp) + footer with large wordmark

---

## 8. Folder Structure

```
src/
  app/
    layout.tsx
    page.tsx
    destinations/
      page.tsx
      [slug]/page.tsx
    tours/
      page.tsx
      [slug]/page.tsx
    journeys/[state]/page.tsx
    journal/...
    about/page.tsx
    contact/page.tsx
    credits/page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/        Header, Footer, MobileMenu, Preloader, SmoothScroll
    ui/            Button, MagneticButton, Cursor, Tag, Divider, Marquee, WhatsAppFloat
    motion/        RevealText, ImageReveal, Parallax, HorizontalScroll, Counter, PageTransition
    sections/      home/, destination/, tour/ section components
    cards/         DestinationCard, TourCard, JournalCard
  content/         destinations.ts, tours.ts, journal.ts, credits.ts, site.ts
  hooks/           useReducedMotion, useLenis, useMediaQuery, useIsTouch
  lib/
    motion/        easings.ts, durations.ts, presets.ts, gsap.ts (register plugins once)
    utils/         cn.ts, format.ts, seo.ts, whatsapp.ts
  styles/
    globals.css
    tokens.css
  types/           destination.ts, tour.ts, journal.ts
public/
  images/destinations/<slug>/
  images/tours/<slug>/
  fonts/ (only if not using next/font/google)
scripts/           image optimisation, blur placeholder generation
```

---

## 9. Data Models (initial)

```ts
type State = "uttarakhand" | "himachal";
type TripType = "trek" | "pilgrimage" | "snow" | "wildlife" | "hill-station" | "offbeat" | "adventure" | "culture";

interface Destination {
  slug: string;
  name: string;
  state: State;
  region: string;
  tagline: string;
  description: string;
  altitudeM: number;
  coordinates: { lat: number; lng: number };
  types: TripType[];
  bestMonths: number[];
  highlights: string[];
  heroImage: ImageAsset;
  gallery: ImageAsset[];
}

interface Tour {
  slug: string;
  title: string;
  destinations: string[];
  durationDays: number;
  difficulty: "easy" | "moderate" | "challenging";
  priceFromINR: number;
  itinerary: { day: number; title: string; description: string; image?: ImageAsset }[];
  inclusions: string[];
  exclusions: string[];
}

interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  creditId: string;
}
```

---

## 10. Roadmap

### Phase 0 — Setup
- [ ] Scaffold Next.js + TS + Tailwind v4 + ESLint/Prettier
- [ ] Install GSAP, Lenis, Motion, React Hook Form, Zod
- [ ] Tokens, fonts, globals, `cn` util, GSAP plugin registration, Lenis provider

### Phase 1 — Content & Images
- [ ] Types + content files for all destinations above
- [ ] Research and download real photos per destination, fill `credits.ts`
- [ ] Image optimisation + blur placeholder script

### Phase 2 — Foundation Components
- [ ] Header (hides on scroll down, shows on scroll up), mobile menu, footer
- [ ] Motion primitives: RevealText, ImageReveal, Parallax, HorizontalScroll, Counter, MagneticButton, Cursor
- [ ] Preloader + page transition

### Phase 3 — Home Page
- [ ] All 11 sections from §7, tuned for desktop and mobile

### Phase 4 — Destinations & Tours
- [ ] Destinations index with animated filtering
- [ ] Destination detail (hero morph, facts strip, gallery, map, best-season chart, related tours)
- [ ] Tours index + tour detail with sticky itinerary and enquiry form

### Phase 5 — Supporting Pages
- [ ] State landing pages, journal, about, contact/trip planner, credits

### Phase 6 — Polish & Launch
- [ ] SEO metadata, OG images, sitemap, JSON-LD (`TouristDestination`, `TouristTrip`)
- [ ] Accessibility pass (keyboard, focus states, alt text, contrast, reduced motion)
- [ ] Lighthouse/performance pass, cross-browser + mobile testing
- [ ] Deploy (Vercel)
