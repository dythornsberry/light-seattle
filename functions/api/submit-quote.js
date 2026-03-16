/**
 * Cloudflare Pages Function: Zapier Webhook Proxy
 * Forwards form data to Zapier webhook server-side to avoid CORS issues.
 * Browser → this function → Zapier (server-to-server, no CORS).
 *
 * Environment variable required:
 *   ZAPIER_WEBHOOK_URL — set in Cloudflare Pages dashboard (Settings > Environment Variables)
 */

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const fallbackWebhookUrl = 'https://hooks.zapier.com/hooks/catch/24075201/udrmfac/';

  try {
    const payload = await context.request.json();
    const ZAPIER_WEBHOOK_URL = context.env.ZAPIER_WEBHOOK_URL || fallbackWebhookUrl;

    if (!context.env.ZAPIER_WEBHOOK_URL) {
      console.warn('ZAPIER_WEBHOOK_URL not configured in Cloudflare Pages; using fallback webhook URL');
    }

    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const resultText = await response.text();

    if (!response.ok) {
      console.error('Zapier webhook error:', response.status, resultText);
      return new Response(JSON.stringify({ error: 'Webhook failed', status: response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (err) {
    console.error('Submit quote function error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
