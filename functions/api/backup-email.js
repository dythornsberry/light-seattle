/**
 * Cloudflare Pages Function: Backup Email via Resend
 * Sends lead notification email to dythornsberry@gmail.com
 * Independent of Zapier — acts as safety net for lead capture.
 *
 * Environment variable required:
 *   RESEND_API_KEY — set in Cloudflare Pages dashboard (Settings > Environment Variables)
 */

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const {
      lead_name,
      lead_phone,
      lead_email,
      lead_address,
      lead_zip,
      lead_city,
      lead_state,
      lead_full_address,
      lead_timeline,
      lead_submitted_at,
    } = await context.request.json();

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const safeLeadName = escapeHtml(lead_name || 'N/A');
    const safeLeadPhone = escapeHtml(lead_phone || 'N/A');
    const safeLeadEmail = escapeHtml(lead_email || 'N/A');
    const safeLeadAddress = escapeHtml(lead_full_address || lead_address || 'N/A');
    const safeLeadCityState = escapeHtml(
      `${lead_city || ''}${lead_city && lead_state ? ', ' : ''}${lead_state || ''}` || 'N/A'
    );
    const safeLeadZip = escapeHtml(lead_zip || 'N/A');
    const safeLeadTimeline = escapeHtml(lead_timeline || 'N/A');
    const safeSubmittedAt = escapeHtml(
      lead_submitted_at
        ? new Date(lead_submitted_at).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        : 'N/A'
    );
    const safePhoneHref = lead_phone ? escapeHtml(`tel:${lead_phone}`) : '';
    const safeEmailHref = lead_email ? escapeHtml(`mailto:${lead_email}`) : '';

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a5276; border-bottom: 2px solid #2ecc71; padding-bottom: 10px;">
          🎄 New Quote Request — Seattle Christmas Lights
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #f8f9fa;">
            <td style="padding: 10px; font-weight: bold; width: 140px;">Name</td>
            <td style="padding: 10px;">${safeLeadName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone</td>
            <td style="padding: 10px;">${safePhoneHref ? `<a href="${safePhoneHref}">${safeLeadPhone}</a>` : safeLeadPhone}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 10px; font-weight: bold;">Email</td>
            <td style="padding: 10px;">${safeEmailHref ? `<a href="${safeEmailHref}">${safeLeadEmail}</a>` : safeLeadEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Address</td>
            <td style="padding: 10px;">${safeLeadAddress}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 10px; font-weight: bold;">City / State</td>
            <td style="padding: 10px;">${safeLeadCityState}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">ZIP Code</td>
            <td style="padding: 10px;">${safeLeadZip}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 10px; font-weight: bold;">Timeline</td>
            <td style="padding: 10px;">${safeLeadTimeline}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Submitted</td>
            <td style="padding: 10px;">${safeSubmittedAt}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; padding: 12px; background: #e8f8f5; border-radius: 6px; font-size: 14px;">
          ⚡ This is a backup email sent independently of Zapier. Call this lead ASAP!
        </p>
        <p style="color: #999; font-size: 12px; margin-top: 10px;">
          Source: lightseattle.com | Backup via Resend
        </p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Seattle Christmas Lights <onboarding@resend.dev>',
        to: ['dythornsberry@gmail.com'],
        subject: `🎄 New Quote Request from ${lead_name || 'Website Visitor'}`,
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', result);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: result }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (err) {
    console.error('Backup email function error:', err);
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
