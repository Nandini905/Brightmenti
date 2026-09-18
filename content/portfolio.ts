export interface PortfolioProject {
  slug: string;
  title: string;
  industry: string;
  categories: ('Websites' | 'Shopify' | 'E-commerce' | 'Software' | 'Mobile Apps' | 'Automation' | 'Marketing' | 'Creative')[];
  thumbnail: string;
  shortDescription: string;
  servicesProvided: string[];
  isPlaceholder: boolean;
  challenge?: string;
  approach?: string;
  whatWeBuilt?: string;
  solution?: string;
  result?: string;
  gallery?: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'lumina-luxury-retail',
    title: 'High-Volume Headless Commerce Architecture',
    industry: 'E-commerce & Luxury Fashion',
    categories: ['Websites', 'Shopify', 'E-commerce'],
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Scalable headless Shopify storefront paired with sub-second page loads, automated inventory sync, and multi-currency checkout.',
    servicesProvided: ['Shopify Plus Architecture', 'Headless Next.js Build', 'Performance Optimization'],
    isPlaceholder: true,
    challenge: 'Legacy monolithic architecture suffered from sluggish checkout experiences, high bounce rates on mobile devices, and inventory synchronization lags during promotional flash drops.',
    approach: 'Engineered a decoupled headless architecture leveraging Next.js on the edge, caching dynamic product variants while connecting directly to Shopify Storefront API.',
    whatWeBuilt: 'Custom modular design system, micro-frontend cart drawer, and low-latency algorithmic search with real-time stock availability indicators.',
    solution: 'Integrated an event-driven webhook pipeline that instantly balances inventory across brick-and-mortar locations and online distribution hubs.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  },
  {
    slug: 'pulse-fintech-crm',
    title: 'Automated WhatsApp Customer Retention Engine',
    industry: 'Financial Technology',
    categories: ['Automation', 'Software'],
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Enterprise WhatsApp Cloud API integration orchestrating automated lead qualification, compliance tracking, and instant customer notifications.',
    servicesProvided: ['WhatsApp Business API', 'CRM Webhook Automation', 'Custom Middleware'],
    isPlaceholder: true,
    challenge: 'Customer support teams were overwhelmed by repetitive compliance questions and manual document intake, creating an average response delay of over 4 hours.',
    approach: 'Constructed an automated conversational pipeline connected to their PostgreSQL core and banking verification APIs with rigorous token encryption.',
    whatWeBuilt: 'Conversational AI routing matrix, automated verification document OCR upload, and a custom agent dashboard for seamless human escalation.',
    solution: 'Designed end-to-end webhook architecture with automated fallback mechanisms and rate-limit buffering for peak financial market periods.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  },
  {
    slug: 'strata-ops-platform',
    title: 'Internal Logistics & Resource Planning Portal',
    industry: 'Supply Chain & Operations',
    categories: ['Software', 'Automation'],
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Custom multi-tenant web application centralizing warehouse dispatch, fleet telemetry, and real-time SLA reporting.',
    servicesProvided: ['Custom SaaS Engineering', 'Real-time Telemetry APIs', 'Role-Based Access Control'],
    isPlaceholder: true,
    challenge: 'Fragmented spreadsheets and outdated ERP exports resulted in missed dispatch windows and zero unified visibility across regional distribution nodes.',
    approach: 'Developed a purpose-built React application backed by Node.js microservices and WebSockets for sub-second telemetry tracking.',
    whatWeBuilt: 'Dynamic dispatch matrix, automated carrier billing calculation engine, and visual route bottleneck analytics.',
    solution: 'Deployed containerized microservices on high-availability cloud infrastructure with granular role permissions.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  },
  {
    slug: 'apex-d2c-growth',
    title: 'Performance Acquisition & Paid Growth Engine',
    industry: 'D2C Consumer Brands',
    categories: ['Marketing', 'Creative', 'E-commerce'],
    thumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Full-funnel digital acquisition program combining high-velocity creative testing, landing page personalization, and cohort analytics.',
    servicesProvided: ['Paid Acquisition (Meta/Google)', 'Creative Production', 'Funnel CRO'],
    isPlaceholder: true,
    challenge: 'Rising customer acquisition costs and ad fatigue eroded product margins across paid channels.',
    approach: 'Combined studio-grade video production with targeted landing page variants engineered for friction-free conversion.',
    whatWeBuilt: 'Over 40 modular video creative angles, responsive Lander templates, and server-side Conversion API tracking.',
    solution: 'Established iterative weekly creative testing sprints tied to strict contribution margin thresholds.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  },
  {
    slug: 'zenith-health-app',
    title: 'Cross-Platform Mobile Patient Care Experience',
    industry: 'Digital Health & Wellness',
    categories: ['Mobile Apps', 'Software'],
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Cross-platform iOS and Android application with offline health telemetry sync, secure practitioner chat, and automated appointment reminders.',
    servicesProvided: ['React Native Mobile App', 'HIPAA-Compliant Sync', 'Push Notification Architecture'],
    isPlaceholder: true,
    challenge: 'Patients missed scheduled follow-ups and lacked a unified interface to view treatment timelines and communicate securely.',
    approach: 'Engineered a lightweight React Native application featuring biometric authentication and secure local device caching.',
    whatWeBuilt: 'Interactive health calendar, encrypted real-time messaging channel, and deep-linked telemetry review.',
    solution: 'Configured end-to-end encrypted messaging channels and background synchronization routines.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  },
  {
    slug: 'solis-brand-system',
    title: 'Modular Brand Identity & Production Media Suite',
    industry: 'Clean Energy & Sustainable Tech',
    categories: ['Creative', 'Websites'],
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=520',
    shortDescription: 'Complete corporate visual identity, design tokens, studio editorial production, and interactive investor presentation site.',
    servicesProvided: ['Brand Identity', 'Production House Media', 'Interactive Web Presence'],
    isPlaceholder: true,
    challenge: 'A cutting-edge cleantech company lacked visual authority and a cohesive brand narrative ahead of institutional capital raises.',
    approach: 'Constructed an architectural design system rooted in technical minimalism, clarity, and bold typographic rhythm.',
    whatWeBuilt: 'Comprehensive brand handbook, 4K executive cinematography reel, and responsive corporate web platform.',
    solution: 'Synchronized visual identity across digital touchpoints, investor decks, and trade exhibition collateral.',
    result: 'Case study results coming soon.',
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500'
    ]
  }
];
