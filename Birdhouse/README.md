# Birdhouse Group

A single React + Vite + TypeScript + Tailwind site for the Birdhouse Group digital
product studio. Originally built as two separate Magic Patterns projects (a landing
page, and a Work/Services showcase), now merged into one multi-page app.

## Pages / routes

| Route       | Page        | Sections |
|-------------|-------------|----------|
| `/`         | Home        | Hero (animated bird particle field) · Selected Work · Services · Process · Testimonials · CTA |
| `/work`     | Work        | Hero · PayFlow Pro · Nexus Workspace · Aura Lifestyle case studies · CTA |
| `/services` | Services    | Hero · 4 service categories · Collaborative process · CTA |

Routing is handled by `react-router-dom`. A shared `Navbar` (glass, scroll-aware,
active-route aware) and `Footer` wrap every page.

## Project structure

```
src/
  App.tsx                 # BrowserRouter + routes + scroll-to-top
  pages/                  # HomePage, WorkPage, ServicesPage
  components/
    layout/               # Navbar, Footer (shared across all pages)
    ui/                   # Button, Badge, Input, PortfolioCard, TestimonialCard
    hero/                 # Home hero (Hero, LaptopMockup, ParticleField)
    sections/             # Home sections (FeaturedWork, Services, Process, ...)
    work/                 # Work page (WorkHero, ProjectOne/Two/Three)
    services/             # Services page (ServicesHero, ServicesList, ServicesProcess)
    shared/               # Mockups, CtaSection (used by Work + Services)
```

## Design system

One merged Tailwind config (`tailwind.config.js`):
- **Font:** Inter (site-wide)
- **Primary green:** `#0F9D58`, available as both `brand-green` and `emerald-500`
- **Surfaces:** named shades (`surface-primary/secondary/tertiary`) plus a numeric
  `surface-50…900` zinc scale — both sets coexist so components from either origin
  keep working.

## Getting Started

1. Run `npm install`
2. Run `npm run dev`
