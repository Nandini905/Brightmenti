export interface Service {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  strongStatement?: string;
}

export const SERVICES: Service[] = [
  {
    "id": "digital-marketing",
    "category": "01",
    "title": "Digital Marketing & Paid Growth",
    "shortDescription": "Performance campaigns, data-backed SEO, and full-funnel customer acquisition designed to compound enterprise revenue.",
    "bullets": [
      "Multi-channel performance ads (Meta, Google, LinkedIn)",
      "Technical and programmatic SEO for organic pipeline compounding",
      "Lifecycle marketing, automated email flows, and retention loops",
      "Cohort analytics, attribution modeling, and CAC/LTV optimization"
    ],
    "ctaLabel": "Book a Strategy Call →",
    "ctaHref": "/book-a-strategy-call"
  },
  {
    "id": "web-shopify",
    "category": "02",
    "title": "Web & Shopify Development",
    "shortDescription": "High-speed, conversion-engineered storefronts and websites built on Next.js, headless architectures, and modern Shopify Liquid.",
    "bullets": [
      "Bespoke Shopify Plus theme architecture and checkout optimization",
      "Next.js and headless commerce integrations with instant TTFB",
      "Mobile-first responsive UX with sub-second page loads",
      "Custom app integrations, ERP connectors, and subscription systems"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  },
  {
    "id": "whatsapp-automation",
    "category": "03",
    "title": "WhatsApp Automation & Conversational Commerce",
    "shortDescription": "Turn instant messaging into an automated revenue engine with official WhatsApp Business Cloud API workflows and intelligent CRM sync.",
    "bullets": [
      "Automated abandoned cart recovery and instant checkout links",
      "AI-assisted support triage and customer qualification routing",
      "Broadcast segmentation with hyper-personalized template triggers",
      "Bi-directional synchronization with Shopify, HubSpot, and custom databases"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact",
    "strongStatement": "Turn WhatsApp into your highest-converting conversational commerce and support channel."
  },
  {
    "id": "custom-software",
    "category": "04",
    "title": "Custom Software & SaaS Engineering",
    "shortDescription": "Enterprise web applications, internal operational tools, customer portals, and microservices engineered to your exact business logic.",
    "bullets": [
      "Full-stack TypeScript platforms with modern React and Node.js architectures",
      "Relational and document database design with strict multi-tenant isolation",
      "Scalable GraphQL and RESTful APIs with automated documentation",
      "Complex role-based access control (RBAC) and enterprise SSO"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact",
    "strongStatement": "Software built precisely to your workflow, eliminating operational bottlenecks and technical debt."
  },
  {
    "id": "mobile-apps",
    "category": "05",
    "title": "iOS & Android Mobile Applications",
    "shortDescription": "Native-grade iOS and Android experiences built with React Native and Expo, delivering fluid gesture response and offline synchronization.",
    "bullets": [
      "Cross-platform iOS and Android deployments from a unified codebase",
      "Offline-first data synchronization and real-time push notifications",
      "Native device hardware integration (biometrics, camera, haptics)",
      "App Store and Google Play compliance, submission, and OTA update pipelines"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  },
  {
    "id": "creative-branding",
    "category": "06",
    "title": "Brand Identity & Creative Systems",
    "shortDescription": "Distinct design systems, typographic rules, icon sets, and comprehensive brand guidelines that position your company as a category leader.",
    "bullets": [
      "Category positioning, brand narrative, and voice guidelines",
      "Comprehensive design tokens, typography scales, and component libraries",
      "High-impact vector identity, iconography, and digital collateral",
      "Figma design system handoff with exhaustive documentation"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  },
  {
    "id": "cro-optimization",
    "category": "07",
    "title": "Conversion Rate Optimization (CRO)",
    "shortDescription": "Rigorous quantitative and qualitative testing to eliminate user friction, increase funnel throughput, and maximize revenue per visitor.",
    "bullets": [
      "Full-funnel heatmapping, session recording analysis, and drop-off audits",
      "Statistical A/B and multivariate hypothesis testing",
      "Checkout friction reduction and micro-interaction refinements",
      "Continuous experimentation cycles with clear attribution reporting"
    ],
    "ctaLabel": "Book a Strategy Call →",
    "ctaHref": "/book-a-strategy-call"
  },
  {
    "id": "cloud-devops",
    "category": "08",
    "title": "Cloud Infrastructure & DevOps",
    "shortDescription": "Automated CI/CD pipelines, container orchestration, and multi-region cloud architectures engineered for 99.99% reliability and zero-downtime deploys.",
    "bullets": [
      "AWS, Google Cloud, and Vercel infrastructure as code (Terraform/Pulumi)",
      "Zero-downtime CI/CD deployment pipelines with automated regression testing",
      "Edge CDN caching, asset optimization, and global DDoS mitigation",
      "Observability, real-time APM telemetry, and 24/7 incident alert routing"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  },
  {
    "id": "workflow-ai",
    "category": "09",
    "title": "Workflow Automation & AI Integrations",
    "shortDescription": "Eliminate repetitive manual labor by connecting disparate tools and deploying intelligent LLM agents across your operational workflows.",
    "bullets": [
      "Complex multi-system webhook synchronization and data translation",
      "Custom LLM agents for customer lead scoring, enrichment, and drafting",
      "Zapier, Make, and custom node orchestrators connecting CRM, billing, and ops",
      "Automated financial reporting, inventory reconciliation, and invoice processing"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  },
  {
    "id": "production-house",
    "category": "10",
    "title": "Production House & Media Creation",
    "shortDescription": "Commercial-grade video production, product cinematography, studio photography, and high-fidelity 3D motion assets engineered for conversions.",
    "bullets": [
      "Brand films, commercial video spots, and founder documentary features",
      "High-resolution studio product photography and lifestyle imagery",
      "Short-form vertical video suites engineered specifically for social ad CTR",
      "3D product modeling, texturing, and photorealistic motion renders"
    ],
    "ctaLabel": "Start a Project →",
    "ctaHref": "/contact"
  }
];
