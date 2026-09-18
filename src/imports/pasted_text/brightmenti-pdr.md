# BRIGHTMENTI — Product & Design Requirements Document (PDR)
**Version 1.0 — Implementation-ready**
**Project:** Multi-page premium agency website
**Positioning:** Build. Automate. Market. Scale.

---

## 1. PURPOSE OF THIS DOCUMENT

This PDR translates the Brightmenti brand/content brief into a buildable spec: tech stack, information architecture, design system, component inventory, page-by-page requirements, content model, SEO/performance/accessibility targets, and a sprint plan. It is the single source of truth an engineer or small team can execute against without re-reading the original brief.

---

## 2. PRODUCT SUMMARY

| | |
|---|---|
| **Product** | Marketing + lead-gen website for Brightmenti, a digital growth/technology/automation/creative agency |
| **Primary goal** | Convert visitors into qualified leads via "Book a Strategy Call" and "Start a Project" |
| **Secondary goal** | Establish premium technology-partner credibility (not "generic marketing agency") |
| **Audience** | Founders/decision-makers at D2C, e-commerce, startups, professional services, enterprises |
| **Tone** | Confident, technical, minimal — Apple × Stripe × Linear, agency warmth layered on top |
| **Non-negotiable content rule** | No fabricated clients, stats, testimonials, team bios, or years of experience. Everything unverified ships as a clearly labeled placeholder. |

---

## 3. RECOMMENDED TECH STACK

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG for SEO, file-based routing matches the required URL structure, image optimization built in |
| Styling | **Tailwind CSS** + CSS variables for theme tokens | Fast iteration, easy dark/light section switching, no bloat |
| Animation | **Framer Motion** (scroll reveals, hover, magnetic buttons) + native CSS for simple transitions | Framer Motion respects `prefers-reduced-motion` easily |
| CMS / content | **MDX or a simple JSON/Sanity-lite content layer** for services, portfolio items, case studies | Lets non-devs edit placeholder → real content without redeploying core code (Sanity/Contentful if budget allows; local JSON if not) |
| Forms | Native form + serverless API route → email (Resend/SendGrid) and/or CRM webhook | Contact + booking forms both post to one lead-capture endpoint |
| Booking | Cal.com or Calendly embed on `/book-a-strategy-call` | Avoids building a custom scheduler; swap in later if needed |
| Hosting | **Vercel** | Matches Next.js, fast global edge, fits Rishav's existing Vercel workflow |
| Analytics | Vercel Analytics / GA4 + Meta Pixel | Needed for the "measurable growth" positioning to be true of the site itself |
| Icons | Lucide (or a custom icon set — avoid generic Font Awesome look) | Keeps the "not-a-template" bar |
| Images | Next/Image, AVIF/WebP, lazy-loaded | Perf budget below |

**Explicitly avoid:** heavy UI kits (Bootstrap-style), stock illustration packs, particle.js-style crypto effects, unnecessary state libraries.

---

## 4. INFORMATION ARCHITECTURE

```
/                        Home
/about                   About Us
/services                Services (hub, all 10 categories)
/portfolio               Portfolio / Our Work (filterable grid)
/portfolio/[slug]        Case study detail (dynamic)
/contact                 Contact Us
/book-a-strategy-call    Booking page
/sitemap.xml             Auto-generated
/robots.txt              Static
```

Global persistent elements: sticky header (compacts on scroll), footer, mobile sticky CTA bar (`Start a Project | WhatsApp`), WhatsApp floating button (desktop + mobile).

---

## 5. DESIGN SYSTEM

### 5.1 Color tokens
```
--bg-primary:      #0A0A0B   /* near-black, not pure black */
--bg-secondary:    #121214
--bg-surface:      #17171A   /* cards */
--bg-light:        #FAFAF9   /* light-section background */
--text-primary:    #F5F5F4   /* on dark */
--text-primary-lt: #0A0A0B   /* on light */
--text-muted:      #9A9A9E
--border:           rgba(255,255,255,0.08)
--accent:          #5B7FFF   /* electric blue — placeholder, lock brand color before build */
--accent-soft:     rgba(91,127,255,0.12)
```
One accent color only. No secondary/tertiary "marketing gradient" palette. Glass/blur used only on nav-on-scroll and modal overlays — nowhere else.

### 5.2 Typography
- Display/headline font: a geometric or grotesk sans (e.g., **Inter Tight**, **Neue Montreal**, or **General Sans**) — large, tight tracking, weight 600–700.
- Body font: same family, weight 400, generous line-height (1.6+).
- Scale (desktop → mobile): H1 72px→40px, H2 48px→28px, H3 28px→20px, Body 18px→16px.
- Never more than 2 font families. No script/decorative fonts.

### 5.3 Grid & spacing
- 12-column grid, 1280px max content width, 24px gutter (desktop), 16px (mobile).
- Section vertical rhythm: 120–160px desktop padding, 64–80px mobile.
- 8px base spacing unit throughout.

### 5.4 Components (shared library — build once, reuse everywhere)
1. `Header` (sticky, compacting, mobile drawer)
2. `Footer`
3. `Button` (primary/secondary/ghost, includes magnetic hover variant)
4. `ServiceCard` (icon, title, 2-line description, hover elevation)
5. `SectionHeading` (eyebrow + H2 + subtitle, consistent across pages)
6. `StatCounter` (animated number, supports `XX+` placeholder state)
7. `ProcessStep` (numbered, scroll-progress indicator)
8. `PortfolioCard` (image, tags, category, CTA)
9. `CaseStudyLayout` (Challenge/Approach/Built/Solution/Result/Gallery template)
10. `EcosystemDiagram` (interactive connected-flow visual — SVG + Framer Motion, reused on Home §Connected Ecosystem)
11. `IndustryCard`
12. `ContactForm` / `BookingForm` (shared field components + validation)
13. `WhatsAppFloatingButton`
14. `StickyMobileCTA` (bottom bar: Start a Project | WhatsApp)
15. `PlaceholderBadge` — small dev-only visual flag (stripped in production build) marking unverified stats/case studies so nothing fake ships silently.

### 5.5 Motion rules
- Scroll reveals: opacity + 12–16px translate-Y, 400–600ms, staggered by 60–80ms per item.
- Respect `prefers-reduced-motion: reduce` — disable parallax/looping motion, keep only opacity fades.
- No auto-playing background video with audio; no more than one looping ambient animation per screen (e.g., the hero ecosystem lines).

---

## 6. PAGE-BY-PAGE REQUIREMENTS

Each page below lists: purpose, required sections (in order), and acceptance criteria. Full copy blocks are already written in the original brief — this PDR references section names rather than repeating copy, so content stays in one place (the CMS/content layer, §7).

### 6.1 Home (`/`)
1. Hero — headline, subhead, description, primary/secondary CTA, ecosystem visual, status strip
2. Trust/Capability strip (9 capability chips)
3. Problem section (9 pain points → "Brightmenti brings the pieces together")
4. What We Do (9–10 service cards → `/services`)
5. Connected Digital Ecosystem (interactive diagram)
6. Featured Work (3–6 portfolio cards, placeholder-safe → `/portfolio`)
7. Production House (gallery-style, visually distinct from card sections)
8. Why Brightmenti (5 pillars)
9. Process (5 steps, scroll-animated)
10. Final CTA (Book a Strategy Call / Chat on WhatsApp)

**Acceptance criteria:** loads with LCP < 2.5s on 4G; hero communicates full positioning without scrolling; every service card links to its `/services#anchor`; no fabricated client logos or numbers.

### 6.2 About (`/about`)
Hero → Our Story → Philosophy (3 statements) → Capabilities overview → How We Think (5 principles) → Final CTA.
**Acceptance criteria:** no invented founding date, team size, or years-in-business language unless supplied.

### 6.3 Services (`/services`)
Hero → 10 dedicated sections (01 Digital Marketing … 10 Production House), each with its own service-list and, where specified, its own CTA (Discuss Marketing →, Automate WhatsApp →). Use in-page anchor nav or a sticky sub-nav so a 10-section page doesn't feel like an endless scroll.
**Acceptance criteria:** each of the 10 categories from the brief is present with its full service list; WhatsApp Automation and Custom Software each keep their standalone strong-statement lines.

### 6.4 Portfolio (`/portfolio`)
Hero → filter bar (All/Websites/Shopify/E-commerce/Software/Mobile Apps/Automation/Marketing/Creative) → filtered card grid → CTA.
**Acceptance criteria:** filtering works client-side without full page reload; empty categories show a "Case studies coming soon" state rather than fake cards; every card links to a real or clearly-placeholder `/portfolio/[slug]`.

### 6.5 Case study template (`/portfolio/[slug]`)
Challenge → Approach → What We Built → Solution → Result (placeholder-safe) → Technology/Services list → Gallery → CTA.
**Acceptance criteria:** template renders correctly with zero real data (i.e., safe to launch with all placeholder projects, then swap content later without touching code).

### 6.6 Contact (`/contact`)
Hero → Contact form (Name, Company, Email, Phone/WhatsApp, dropdown need-type, Budget, Details) → Booking cross-link section → WhatsApp CTA.
**Acceptance criteria:** form validates required fields client + server side; submission triggers email/CRM webhook and a visible success state; dropdown matches the 13 options in the brief exactly.

### 6.7 Book a Strategy Call (`/book-a-strategy-call`)
Hero → booking form or embedded scheduler (Name, Company, Email, Phone/WhatsApp, Website, Industry, Goal, Budget, Preferred time).
**Acceptance criteria:** page has minimal nav distraction (still show header/footer, but no competing CTAs mid-page); works as a placeholder form if no scheduler is connected yet, with a note in code (not on the live page) marking where to embed Cal.com/Calendly.

---

## 7. CONTENT MODEL (for CMS / JSON layer)

```
Service {
  id, category (1-10), title, shortDescription,
  bullets[], ctaLabel, ctaHref, strongStatement?
}

PortfolioProject {
  slug, title, industry, categories[], thumbnail,
  shortDescription, servicesProvided[],
  isPlaceholder: boolean,          // true until real data supplied
  challenge?, approach?, whatWeBuilt?, solution?, result?, gallery[]
}

Stat {
  label, value, isPlaceholder: boolean   // renders "XX+" if true
}

Industry { name, description? }
```
Keeping `isPlaceholder` as a first-class field lets the front end render a subtle "Case study coming soon" or "XX+" state automatically, so nobody has to remember which numbers are real later.

---

## 8. SEO REQUIREMENTS

| Page | Title | Notes |
|---|---|---|
| Home | Brightmenti \| Digital Growth, Technology & Automation Agency | Primary keyword target |
| Services | Digital Marketing, Web Development & Automation Services \| Brightmenti | |
| Portfolio | Our Work \| Websites, Shopify, Software & Digital Solutions \| Brightmenti | |
| About | About Brightmenti \| Digital Growth & Technology Partner | |
| Contact | Contact Brightmenti \| Start Your Digital Project | |

Implementation checklist:
- One H1 per page, logical H2/H3 nesting per section above
- Open Graph + Twitter card meta on every page (auto-generated via Next.js `generateMetadata`)
- JSON-LD schema: `Organization` sitewide, `Service` on `/services`, `CreativeWork`/`Project` on case studies
- Canonical URLs, auto `sitemap.xml` and `robots.txt`
- Descriptive `alt` text on every image (no "image1.jpg" defaults)
- Clean URLs per §4, no query-string routing for primary pages

---

## 9. PERFORMANCE BUDGET

| Metric | Target |
|---|---|
| LCP | < 2.5s (4G, mobile) |
| CLS | < 0.1 |
| INP | < 200ms |
| JS payload (initial) | < 170KB gzipped |
| Images | AVIF/WebP, responsive `srcset`, lazy below the fold |
| Fonts | Self-hosted, `font-display: swap`, max 2 families / 4 weights total |
| Lighthouse (mobile) | 90+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO |

---

## 10. ACCESSIBILITY CHECKLIST

- Full keyboard navigation incl. mobile drawer and filter controls
- Visible focus states (not just default browser outline removed with nothing replacing it)
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text, verified against the dark-section palette specifically
- All form fields have associated `<label>`s and error messaging tied via `aria-describedby`
- `aria-label`/`aria-expanded` on nav toggle, filter buttons, accordion-style service sections
- `prefers-reduced-motion` respected sitewide
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, one `<h1>` per page

---

## 11. CONVERSION / CTA STRATEGY

- Two consistent CTA labels sitewide: **Book a Strategy Call →** (primary) and **Start a Project →** (secondary), plus **Chat on WhatsApp →** where noted. No ad-hoc CTA copy elsewhere.
- CTA placements: header, hero, post-problem section, post-portfolio, bottom-of-page, mobile sticky bar.
- Mobile sticky bar persists across all pages except the booking page itself (avoid competing CTAs there).

---

## 12. DEVELOPMENT PLAN (SUGGESTED SPRINTS)

**Sprint 0 — Foundation (2–3 days)**
Repo setup, Next.js + Tailwind + Framer Motion scaffold, design tokens, typography scale, shared `Header`/`Footer`/`Button` components, content model stubs.

**Sprint 1 — Home page (3–5 days)**
All 10 home sections, ecosystem diagram, scroll animations, mobile sticky CTA, WhatsApp float button.

**Sprint 2 — Services + About (2–3 days)**
Full 10-category services page with sub-nav, About page sections.

**Sprint 3 — Portfolio system (3–4 days)**
Filterable grid, case-study dynamic route + template, placeholder states.

**Sprint 4 — Contact + Booking + Forms backend (2 days)**
Form validation, serverless submit route, email/CRM webhook, booking embed or fallback form.

**Sprint 5 — SEO, performance, accessibility pass (2 days)**
Metadata, schema, sitemap/robots, image optimization audit, Lighthouse pass, a11y audit.

**Sprint 6 — QA + responsive polish (2 days)**
Cross-device testing, reduced-motion testing, copy proofread against the brief, placeholder audit (confirm zero fabricated content shipped).

Total: roughly 3–4 weeks for one developer working solo, less with content/design support in parallel.

---

## 13. FOLDER STRUCTURE (Next.js App Router)

```
/app
  /about/page.tsx
  /services/page.tsx
  /portfolio/page.tsx
  /portfolio/[slug]/page.tsx
  /contact/page.tsx
  /book-a-strategy-call/page.tsx
  /api/lead/route.ts
  layout.tsx
  page.tsx                (Home)
/components
  Header.tsx, Footer.tsx, Button.tsx, ServiceCard.tsx,
  SectionHeading.tsx, StatCounter.tsx, ProcessStep.tsx,
  PortfolioCard.tsx, CaseStudyLayout.tsx, EcosystemDiagram.tsx,
  IndustryCard.tsx, ContactForm.tsx, BookingForm.tsx,
  WhatsAppFloatingButton.tsx, StickyMobileCTA.tsx
/content
  services.ts, portfolio.ts, stats.ts, industries.ts
/lib
  metadata.ts, schema.ts, validation.ts
/public
  /images, /og
```

---

## 14. DEFINITION OF DONE

- [ ] All 6 pages live at the exact URLs in §4
- [ ] Header/footer identical and consistent across every page
- [ ] Zero fabricated clients, stats, testimonials, or team bios anywhere in shipped content
- [ ] All placeholder content visually/structurally distinct and easy to locate for later replacement
- [ ] Lighthouse targets in §9 met on mobile
- [ ] Accessibility checklist in §10 passed
- [ ] Contact and booking forms successfully deliver leads to a real inbox/CRM
- [ ] Site does not visually resemble a generic template — passes a "would I show this to a serious founder" gut check

---

*This PDR is intentionally implementation-focused; full section copy already exists in the original brief and should be pulled directly into the `/content` layer rather than rewritten.*