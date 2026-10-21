import type Stripe from 'stripe';
import { stripeClient, reconcileAccount } from '@/lib/developers/billing';
import { developerDb, type DeveloperAccount } from '@/lib/developers/account';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature'); const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return Response.json({ error: 'Webhook is not configured' }, { status: 503 });
  if (!signature) return Response.json({ error: 'Missing signature' }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripeClient().webhooks.constructEvent(await request.text(), signature, secret); }
  catch { return Response.json({ error: 'Invalid webhook signature' }, { status: 400 }); }
  try {
    const db = developerDb();
    const seen = await db`SELECT event_id FROM developer_billing_events WHERE event_id=${event.id}`;
    if (seen.length) return Response.json({ received: true, duplicate: true });
    const object = event.data.object as unknown as { customer?: string | { id: string } };
    const customer = typeof object.customer === 'string' ? object.customer : object.customer?.id;
    if (customer) {
      const accounts = await db`SELECT * FROM developer_accounts WHERE stripe_customer_id=${customer}`;
      if (accounts[0]) await reconcileAccount(accounts[0] as DeveloperAccount);
    }
    // Record only after successful reconciliation so failed deliveries remain retryable.
    await db`INSERT INTO developer_billing_events(event_id,event_type) VALUES(${event.id},${event.type}) ON CONFLICT DO NOTHING`;
    return Response.json({ received: true });
  } catch { console.error('Stripe webhook reconciliation failed', event.id); return Response.json({ error: 'Reconciliation failed' }, { status: 500 }); }
}
