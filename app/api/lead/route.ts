// Next.js App Router API Route: /api/lead
// Handles both Contact Form submissions and Strategy Booking requests
import { validateContactForm, validateBookingForm } from '../../../src/lib/validation';

// Rate limiting in-memory map (or Redis in enterprise scale)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 min window
    return false;
  }

  if (entry.count >= 5) { // 5 submissions per minute max
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    // Server-side validation
    if (type === 'booking') {
      const validation = validateBookingForm(data);
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({ error: 'Validation failed', errors: validation.errors }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } else {
      const validation = validateContactForm(data || body);
      if (!validation.isValid) {
        return new Response(
          JSON.stringify({ error: 'Validation failed', errors: validation.errors }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // CRM / Email Webhook dispatch architecture
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    const crmToken = process.env.CRM_API_KEY;

    if (crmWebhookUrl) {
      try {
        await fetch(crmWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(crmToken ? { Authorization: `Bearer ${crmToken}` } : {})
          },
          body: JSON.stringify({
            source: 'brightmenti_web_lead',
            payload: body,
            receivedAt: new Date().toISOString()
          })
        });
      } catch (webhookErr) {
        console.error('[CRM Webhook Forwarding Error]', webhookErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Lead received and queued for review.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[Lead API Route Error]', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error processing lead submission.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
