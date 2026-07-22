export interface Project {
  client: string;
  category: string;
  year: string;
  title: string;
  challenge: string;
  solution: string;
  highlights: string[];
  tech: string[];
  images: string[];
}

export const PROJECTS: Project[] = [
{
  client: 'Britelite Innovations',
  category: 'EdTech / Training',
  year: '2024',
  title: 'Elevating digital skills training',
  challenge:
  'Britelite needed a marketing site that could credibly present hands-on IT training, consulting, and digital-solutions services to working professionals, while clearly separating three distinct service lines without overwhelming visitors.',
  solution:
  'We designed a structured marketing site anchored by a confident hero statement, with dedicated Vision and Mission framing and a three-column services breakdown so prospective students can quickly find the right offering, backed by a course showcase to drive registrations.',
  highlights: ['Clear service segmentation', 'Course discovery section', 'Conversion-focused hero'],
  tech: ['React', 'Tailwind CSS', 'Framer Motion'],
  images: ['/images/work/britelite-innovations.png']
},
{
  client: 'NextCrib',
  category: 'PropTech / Real Estate',
  year: '2024',
  title: 'A cozier way to find your next home',
  challenge:
  'Property seekers needed a fast way to filter rentals and sales by budget, location, and room count without wading through cluttered listings, while the platform itself needed a distinctive look instead of a generic listings board.',
  solution:
  'We built a dark, editorial-style sidebar layout paired with a rich filtering search bar embedded directly in the hero, and a recommended-listings grid that surfaces high-quality photography first, giving the product a premium, boutique feel.',
  highlights: ['Advanced filter search', 'Localized currency support', 'Editorial-style listing cards'],
  tech: ['React', 'Tailwind CSS', 'Node.js'],
  images: ['/images/work/nextcrib.png']
},
{
  client: 'Amanda Malls',
  category: 'E-Commerce',
  year: '2023',
  title: 'A premium marketplace experience',
  challenge:
  'Amanda Malls wanted category landing pages that felt as premium as the designer and beauty brands it carries, capable of driving both flash-deal urgency and long-term category browsing.',
  solution:
  'We designed a full-bleed editorial hero for each category, paired with a clean shop-by-category grid and dual CTAs so merchandising teams can promote timely offers without disrupting the everyday browsing experience.',
  highlights: ['Category-first navigation', 'Flash-deals merchandising', 'Editorial hero imagery'],
  tech: ['Next.js', 'Tailwind CSS', 'Shopify'],
  images: ['/images/work/amanda-malls.png']
},
{
  client: 'Nexus AI Summit',
  category: 'Events / Conference',
  year: '2025',
  title: 'A bold identity for a global AI summit',
  challenge:
  'The organizers needed a landing page that felt as cutting-edge as the summit itself, capable of driving early-bird ticket sales while showcasing high-profile sponsors and a packed agenda across both desktop and mobile.',
  solution:
  'We built a high-contrast dark theme anchored by an oversized type treatment and a floating geometric mark for visual identity, with a responsive layout that carries the same energy from desktop through to mobile without losing hierarchy.',
  highlights: ['Bold typographic identity', 'Sponsor showcase', 'Fully responsive agenda layout'],
  tech: ['React', 'Tailwind CSS', 'Framer Motion'],
  images: ['/images/work/nexus-ai-summit.png', '/images/work/nexus-ai-summit-mobile.png']
},
{
  client: 'Statisda',
  category: 'SaaS / Productivity',
  year: '2024',
  title: 'Task management made effortless',
  challenge:
  "Statisda needed a marketing site that could visually demonstrate its Kanban-style workflow product to prospective teams, translating a data-dense dashboard into an approachable, benefit-led landing page.",
  solution:
  'We paired a confident hero statement with a live product preview docked directly beneath the fold, letting visitors see the real Kanban board in context immediately, backed by a trusted-by logo strip to build credibility.',
  highlights: ['Embedded live product preview', 'Trust-building social proof', 'Clear onboarding CTA'],
  tech: ['React', 'Tailwind CSS', 'PostgreSQL'],
  images: ['/images/work/statisda.png']
},
{
  client: 'Udemy Inter. School',
  category: 'EdTech / School Management',
  year: '2023',
  title: 'Streamlining school administration',
  challenge:
  'Administrative staff needed a single dashboard to manage teacher records, classes, billing, and exams, replacing scattered spreadsheets with one searchable, exportable system.',
  solution:
  "We designed a dense but scannable data table with instant search and filtering, CSV export for reporting, and a persistent sidebar covering the school's full administrative workflow from one place.",
  highlights: ['Searchable data tables', 'CSV export', 'Unified admin workflow'],
  tech: ['React', 'Tailwind CSS', 'PostgreSQL'],
  images: ['/images/work/udemy-inter-school.png']
}];
