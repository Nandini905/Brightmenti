export type AnalyticsEvent =
  | 'book_strategy_call_click'
  | 'start_project_click'
  | 'whatsapp_click'
  | 'contact_form_started'
  | 'contact_form_submitted'
  | 'contact_form_error'
  | 'portfolio_filter_used'
  | 'portfolio_project_viewed'
  | 'booking_started'
  | 'booking_completed';

export function trackEvent(eventName: AnalyticsEvent, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event: ' + eventName + ']', properties || {});
  }

  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, properties);
  }

  if (typeof (window as any).fbq === 'function') {
    (window as any).fbq('trackCustom', eventName, properties);
  }

  if (typeof (window as any).va === 'function') {
    (window as any).va('event', { name: eventName, data: properties });
  }
}
