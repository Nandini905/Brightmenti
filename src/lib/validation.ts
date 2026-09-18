export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  needType: string;
  budget: string;
  details: string;
}

export interface BookingFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  goal: string;
  budget: string;
  preferredTime: string;
}

export const NEED_TYPE_OPTIONS = [
  'Full Digital Growth Ecosystem',
  'Custom Web Development',
  'Shopify Storefront & Architecture',
  'WhatsApp Automation Engine',
  'Custom SaaS / Web Application',
  'iOS / Android Mobile App',
  'Digital Marketing & Performance Ads',
  'Brand Identity & Creative Direction',
  'Conversion Rate Optimization (CRO)',
  'Production House (Photo & Video)',
  'Cloud Infrastructure & DevOps',
  'Workflow Automation & AI',
  'Enterprise Technology Consultation'
] as const;

export const BUDGET_OPTIONS = [
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+'
] as const;

export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 16;
}

export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Please specify your company or organization name.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please provide a valid phone or WhatsApp number with country code.';
  }

  if (!data.needType || !NEED_TYPE_OPTIONS.includes(data.needType as any)) {
    errors.needType = 'Please select a service requirement from the list.';
  }

  if (!data.budget || data.budget.trim().length === 0) {
    errors.budget = 'Please select your anticipated investment budget range.';
  }

  if (!data.details || data.details.trim().length < 10) {
    errors.details = 'Please provide brief details about your project goals (minimum 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateBookingForm(data: Partial<BookingFormData>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Please specify your company name.';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid business email.';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid contact number.';
  }

  if (!data.industry || data.industry.trim().length === 0) {
    errors.industry = 'Please select or enter your industry.';
  }

  if (!data.goal || data.goal.trim().length < 5) {
    errors.goal = 'Please describe your primary objective for this session.';
  }

  if (!data.budget || data.budget.trim().length === 0) {
    errors.budget = 'Please select an estimated budget range.';
  }

  if (!data.preferredTime || data.preferredTime.trim().length === 0) {
    errors.preferredTime = 'Please select a preferred meeting timeframe.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
