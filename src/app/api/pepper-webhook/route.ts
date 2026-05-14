import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Pepper Webhook → Pinterest Conversions API (Server-Side)
 *
 * Endpoint: POST /api/pepper-webhook
 *
 * Flow:
 * 1. Pepper sends a POST with transaction data
 * 2. We filter for approved sales only
 * 3. Hash the buyer's email (SHA-256, required by Pinterest)
 * 4. Forward the checkout event to Pinterest's Conversions API
 */

// Only allow POST
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // ── 1. Filter: only process approved sales ──
    const ignoredStatuses = ['abandoned', 'canceled', 'refunded', 'chargeback'];
    if (ignoredStatuses.includes(data.status)) {
      return NextResponse.json({ message: 'Event ignored', status: data.status }, { status: 200 });
    }

    // ── 2. Validate required fields ──
    if (!data.email) {
      return NextResponse.json({ error: 'Missing email in payload' }, { status: 400 });
    }

    // ── 3. Hash the email (Pinterest requirement: SHA-256, lowercase, trimmed) ──
    const hashedEmail = crypto
      .createHash('sha256')
      .update(data.email.toLowerCase().trim())
      .digest('hex');

    // ── 4. Build Pinterest event payload ──
    const pinterestEvent = {
      data: [
        {
          event_name: 'checkout',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'web',
          event_source_url: 'https://makeflow.site/obrigado',
          user_data: {
            em: [hashedEmail],
            // Add client IP and user agent if Pepper provides them
            ...(data.client_ip && { client_ip_address: data.client_ip }),
            ...(data.user_agent && { client_user_agent: data.user_agent }),
          },
          custom_data: {
            currency: 'BRL',
            value: String(data.value || data.amount || '197.00'),
            content_name: 'Protocolo Make Flow',
            num_items: 1,
          },
          // Use Pepper's transaction reference as event_id to prevent duplicates
          event_id: data.reference || data.transaction_id || `pepper_${Date.now()}`,
        },
      ],
    };

    // ── 5. Send to Pinterest Conversions API ──
    const adAccountId = process.env.PINTEREST_AD_ID;
    const accessToken = process.env.PINTEREST_ACCESS_TOKEN;

    if (!adAccountId || !accessToken) {
      console.error('[Pepper Webhook] Missing PINTEREST_AD_ID or PINTEREST_ACCESS_TOKEN env vars');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const pinterestResponse = await fetch(
      `https://api.pinterest.com/v5/ad_accounts/${adAccountId}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinterestEvent),
      }
    );

    const pinterestResult = await pinterestResponse.json();

    if (!pinterestResponse.ok) {
      console.error('[Pepper Webhook] Pinterest API error:', pinterestResult);
      return NextResponse.json(
        { error: 'Pinterest API error', details: pinterestResult },
        { status: 502 }
      );
    }

    console.log('[Pepper Webhook] ✓ Checkout event sent to Pinterest:', {
      email_hash: hashedEmail.slice(0, 8) + '...',
      event_id: pinterestEvent.data[0].event_id,
      value: pinterestEvent.data[0].custom_data.value,
    });

    return NextResponse.json({ success: true, pinterest: pinterestResult }, { status: 200 });
  } catch (error) {
    console.error('[Pepper Webhook] Unhandled error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Reject other methods
export async function GET() {
  return NextResponse.json({ message: 'Use POST' }, { status: 405 });
}
