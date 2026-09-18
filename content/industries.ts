export interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'founders-startups',
    name: 'Founders & Venture Startups',
    tagline: 'From 0 to 1 with institutional-grade technical velocity',
    description: 'We partner with visionary founders to build production-grade MVPs, scalable web platforms, and automated acquisition loops without the overhead of massive internal engineering teams.',
    capabilities: ['Rapid Technical Prototyping', 'Next.js Web Applications', 'Go-To-Market Automation']
  },
  {
    id: 'd2c-brands',
    name: 'D2C Consumer Brands',
    tagline: 'High-converting storefronts and compounding retention loops',
    description: 'Bespoke Shopify Plus storefronts engineered for sub-second page loads, integrated with WhatsApp conversational commerce and automated retention systems.',
    capabilities: ['Shopify Plus Architecture', 'WhatsApp Commerce Engines', 'Full-Funnel Paid Acquisition']
  },
  {
    id: 'ecommerce-operations',
    name: 'High-Volume E-Commerce',
    tagline: 'Headless infrastructure built for peak promotional velocity',
    description: 'Custom inventory synchronization, headless checkouts, ERP connectors, and automated customer lifetime value optimization designed to scale under extreme traffic surges.',
    capabilities: ['Headless Next.js Commerce', 'ERP & Inventory Middleware', 'Checkout CRO Optimization']
  },
  {
    id: 'professional-services',
    name: 'Professional Services & Advisory',
    tagline: 'Authority-commanding digital presence and client qualification',
    description: 'Elevate your firm with precision digital positioning, high-converting discovery funnels, and automated client intake workflows that filter and qualify high-ticket accounts.',
    capabilities: ['Authority Brand Architecture', 'Automated Lead Qualification', 'Client Portal Engineering']
  },
  {
    id: 'enterprise-technology',
    name: 'Mid-Market & Enterprises',
    tagline: 'Modernizing legacy bottlenecks with robust custom software',
    description: 'Replace fragmented internal tools and legacy manual processes with secure, scalable web applications, robust APIs, and multi-system automation architectures.',
    capabilities: ['Custom SaaS & Microservices', 'Cloud Infrastructure & DevOps', 'Enterprise RBAC & Security']
  }
];
