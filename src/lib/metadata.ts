export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
}

export const BASE_URL = 'https://brightmenti.com';

export const SITE_DEFAULTS: PageMetadata = {
  title: 'Brightmenti — Build. Automate. Market. Scale.',
  description: 'Premium digital growth, technology, automation, and creative engineering partner for founders, D2C, e-commerce, and modern enterprises.',
  canonical: BASE_URL,
  ogType: 'website',
  ogImage: BASE_URL + '/og/brightmenti-share.png'
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    title: 'Brightmenti — Build. Automate. Market. Scale. | Digital Growth & Technology Agency',
    description: 'We engineer unified digital ecosystems: high-converting web applications, Shopify architectures, WhatsApp automations, performance growth campaigns, and commercial production.',
    canonical: BASE_URL + '/'
  },
  about: {
    title: 'About Brightmenti — Engineering-Led Growth & Technology Partner',
    description: 'Learn about Brightmenti core philosophy, engineering-first principles, and unified ecosystem methodology built for ambitious founders and scale-ups.',
    canonical: BASE_URL + '/about'
  },
  services: {
    title: 'Services — Full-Stack Technology, Automation & Growth Hub | Brightmenti',
    description: 'Explore our 10 specialized engineering and growth disciplines: Web development, Shopify Plus, WhatsApp automation, custom SaaS, performance marketing, and studio production.',
    canonical: BASE_URL + '/services'
  },
  portfolio: {
    title: 'Work & Architecture Portfolio | Brightmenti',
    description: 'Selected architectures, headless commerce storefronts, custom web software platforms, and automated revenue systems engineered by Brightmenti.',
    canonical: BASE_URL + '/portfolio'
  },
  contact: {
    title: 'Start a Project — Connect with Brightmenti Engineers & Strategists',
    description: 'Submit your project requirements, tech stack challenges, or growth goals. Receive a detailed technical roadmap and strategic breakdown within 24 hours.',
    canonical: BASE_URL + '/contact'
  },
  booking: {
    title: 'Book a Strategy Call — Architecture & Growth Consultation | Brightmenti',
    description: 'Schedule a direct strategic session with Brightmenti technical leads to diagnose bottlenecks, map ecosystem architectures, and accelerate high-velocity execution.',
    canonical: BASE_URL + '/book-a-strategy-call'
  }
};
