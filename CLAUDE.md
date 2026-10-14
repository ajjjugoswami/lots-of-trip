# Lots of Trip — Project Guide & Plan

A premium tours & trips website for the Indian Himalayas, covering **Uttarakhand** and **Himachal Pradesh**.
The goal is a clean, photography-led site with Apple-level clarity and restrained motion. It must feel crafted by a design studio, never like an AI template.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest stable, App Router) | Server Components by default, `"use client"` only where motion/interaction needs it |
| Language | TypeScript (strict) | No `any`; shared types live in `src/types` |
| Styling | Tailwind CSS v4 + CSS Modules | Tailwind for layout/spacing/tokens; CSS Modules for complex, bespoke pieces (masks, clip-paths, keyframes) |
| Motion | Motion (`motion/react`) | Subtle fade-up reveals, hover states, segmented controls. No scroll-jacking |
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
3. No inline styles (`style={{}}`). Use Tailwind classes, CSS Modules, or CSS variables set via classes. The only exception is a Motion runtime value that cannot be expressed otherwise.
4. Never put a whole feature in one file. Split into components, hooks, utils, data, and types.
5. Before writing anything new, search the codebase for an existing component, hook, util, or style and reuse it.
6. One component per file, PascalCase filenames, co-located `Component.module.css` when needed.
7. Content (destinations, tours, copy) lives in `src/content` as typed data — never hard-coded inside components.
8. Every animation must respect `prefers-reduced-motion` (handled by `MotionConfig` in `MotionProvider`).
9. Animate only `transform`, `opacity`, `clip-path`, and `filter`. Never animate layout properties.
10. No scroll-jacking, pinned sections, smooth-scroll overrides, preloaders or custom cursors. Native scrolling only.
11. Text must never sit directly on a busy photo. Put headlines on solid backgrounds; images go in rounded frames.

---

## 3. Design Direction — Apple-level clarity

- **Look:** clean white (`#ffffff`) and light grey (`#f5f5f7`) sections, near-black text (`#1d1d1f`), secondary text `#6e6e73`. Black sections (hero, testimonials) for rhythm.
- **Accent:** logo blue `#0071e3` for buttons/links, logo orange `#f5820b` for small labels. Headline emphasis uses a blue→orange gradient (`<em>` inside h1–h3).
- **Typography:** Inter (fallback SF Pro / system). Headlines semibold with tight tracking; fluid sizes via `text-display-*` tokens in `src/styles/tokens.css`.
- **Components:** rounded image frames (20–36px radius), pill buttons, soft shadows on hover, Apple-style carousel with arrow buttons, segmented controls.
- **Header/footer:** modelled on the quantalog-lp reference — slim frosted header with mega menu and pill CTAs; rounded gradient footer card with a giant fading wordmark.
- **Logo:** `public/logo-light.png` on light backgrounds, `public/logo-dark.png` on dark. Favicons in `src/app/icon.png` and `src/app/apple-icon.png`.
- **Avoid:** text over bright photos, purple gradients, glassmorphism everywhere, emoji icons, serif/editorial gimmicks, heavy animation.

---

## 4. Motion

- One primitive: `components/motion/Reveal` (fade-up on enter, optional stagger via `RevealItem`). Tokens in `src/lib/motion/tokens.ts`.
- `MotionConfig reducedMotion="user"` in the root layout handles accessibility.
- Hover micro-interactions are CSS transitions (image scale 1.04–1.05, chevron nudge).
- Performance: LCP < 2.5s, CLS < 0.1. Animate only transform and opacity.

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
1. Hero — centred headline on black, framed photo below
2. Manifesto — short statement + stats grid
3. "Two States" — two cards (Uttarakhand, Himachal)
4. Destination carousel (native scroll + arrow buttons)
5. Featured tours — card grid
6. Seasons — month segmented control → destinations in season
7. Ways to travel — image tile grid
8. Testimonials — black section, centred quote, dot navigation
9. Instagram strip "On the trail with us" → links to @lotsoftrip_
10. Plan-your-journey CTA card (form + WhatsApp)

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
    layout/        header/, footer/, MotionProvider, WhatsAppFloat
    ui/            ButtonLink, AppImage, Carousel, SectionIntro, Logo, icons
    motion/        Reveal (+ RevealItem)
    sections/      home/, shared/, destination/, tour/ section components
    cards/         DestinationCard, TourCard
  content/         destinations.ts, tours.ts, states.ts, experiences.ts, testimonials.ts, site.ts, generated/images.json
  lib/
    data/          destinations.ts, tours.ts, images.ts, navigation.ts
    motion/        tokens.ts
    utils/         cn.ts, format.ts, whatsapp.ts
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
