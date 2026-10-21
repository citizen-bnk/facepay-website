import 'server-only';
import Stripe from 'stripe';
import { randomBytes } from 'node:crypto';
import { developerDb, DeveloperError, type DeveloperAccount } from './account';

export const ANNUAL_AMOUNT = 10_000;
export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new DeveloperError(503, 'billing_unavailable', 'Subscription billing is not configured.');
  return new Stripe(key, { maxNetworkRetries: 2, timeout: 15000 });
}
export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://facepay-website.vercel.app';
export function paidSubscription(subscription: Stripe.Subscription, expectedPrice: string) {
  const item = subscription.items.data.find(i => i.price.id === expectedPrice);
  const invoice = subscription.latest_invoice;
  const paid = typeof invoice === 'object' && invoice !== null && !('deleted' in invoice) && invoice.status === 'paid';
  return Boolean(item && item.quantity === 1 && item.price.unit_amount === ANNUAL_AMOUNT && item.price.currency === 'usd' && item.price.recurring?.interval === 'year' && item.price.recurring.interval_count === 1 && subscription.status === 'active' && paid && item.current_period_end * 1000 > Date.now());
}
export async function reconcileAccount(account: DeveloperAccount): Promise<DeveloperAccount> {
  if (!account.stripe_customer_id) return account;
  const stripe = stripeClient();
  const expectedPrice = process.env.STRIPE_DEVELOPER_PRICE_ID;
  if (!expectedPrice) throw new DeveloperError(503, 'price_unavailable', 'The developer subscription price is not configured.');
  const subscriptions = await stripe.subscriptions.list({ customer: account.stripe_customer_id, status: 'all', limit: 100, expand: ['data.latest_invoice'] });
  const own = subscriptions.data.filter(s => s.metadata.facepay_user_id === account.user_id && s.items.data.some(i => i.price.id === expectedPrice));
  const subscription = own.find(s => paidSubscription(s, expectedPrice)) || own.sort((a,b) => b.created - a.created)[0];
  const active = subscription ? paidSubscription(subscription, expectedPrice) : false;
  const item = subscription?.items.data.find(i => i.price.id === expectedPrice);
  const rows = await developerDb()`UPDATE developer_accounts SET stripe_subscription_id=${subscription?.id || null},subscription_status=${active ? 'active' : subscription?.status === 'active' ? 'unpaid' : subscription?.status || 'inactive'},subscription_expires_at=${item ? new Date(item.current_period_end * 1000).toISOString() : null},cancel_at_period_end=${subscription?.cancel_at_period_end || false},billing_mode=${subscription?.livemode ? 'live' : 'test'},updated_at=now() WHERE user_id=${account.user_id} RETURNING *`;
  return rows[0] as DeveloperAccount;
}
export async function requireMembership(account: DeveloperAccount) {
  const updated = await reconcileAccount(account);
  if (updated.subscription_status !== 'active' || !updated.subscription_expires_at || Date.parse(updated.subscription_expires_at) <= Date.now()) throw new DeveloperError(402, 'subscription_required', 'An active, paid US$100/year developer subscription is required.');
  return updated;
}
export async function checkout(account: DeveloperAccount) {
  const stripe = stripeClient(); const db = developerDb();
  let customerId = account.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: account.email, name: account.name, metadata: { facepay_user_id: account.user_id } }, { idempotencyKey: 'facepay-customer-' + account.user_id });
    customerId = customer.id;
    await db`UPDATE developer_accounts SET stripe_customer_id=${customerId} WHERE user_id=${account.user_id}`;
  }
  const current = await reconcileAccount({ ...account, stripe_customer_id: customerId });
  if (current.subscription_status === 'active') throw new DeveloperError(409, 'already_subscribed', 'Your subscription is active. Use Manage billing.');
  // Reuse an open Checkout to avoid duplicate subscriptions from double clicks or refreshes.
  const sessions = await stripe.checkout.sessions.list({ customer: customerId, status: 'open', limit: 20 });
  const ownOpen = sessions.data.filter(s => s.metadata?.facepay_user_id === account.user_id && s.mode === 'subscription');
  const open = ownOpen.find(s => s.currency === 'usd' && s.adaptive_pricing?.enabled === false);
  // Retire checkouts created before the fixed-USD pricing policy.
  for (const session of ownOpen) if (session !== open) await stripe.checkout.sessions.expire(session.id);
  if (open?.url) return open.url;
  const attempt = await db`INSERT INTO developer_checkout_attempts(user_id,attempt_id) VALUES(${account.user_id},${randomBytes(16).toString('hex')}) ON CONFLICT(user_id) DO UPDATE SET attempt_id=CASE WHEN developer_checkout_attempts.started_at < now()-interval '31 minutes' THEN EXCLUDED.attempt_id ELSE developer_checkout_attempts.attempt_id END,started_at=CASE WHEN developer_checkout_attempts.started_at < now()-interval '31 minutes' THEN now() ELSE developer_checkout_attempts.started_at END RETURNING attempt_id,started_at`;
  const price = process.env.STRIPE_DEVELOPER_PRICE_ID;
  if (!price) throw new DeveloperError(503, 'price_unavailable', 'Developer subscription price is not configured.');
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription', adaptive_pricing: { enabled: false },
    branding_settings: { display_name: 'FACEPAY', background_color: '#0B0B0B', button_color: '#D4AF37', border_style: 'rounded', logo: { type: 'url', url: siteUrl() + '/brand/facepay_logo_compact_dark.png' } },
    customer: customerId, line_items: [{ price, quantity: 1 }],
    client_reference_id: account.user_id, metadata: { facepay_user_id: account.user_id },
    subscription_data: { metadata: { facepay_user_id: account.user_id } },
    success_url: siteUrl() + '/developers/console?checkout=success', cancel_url: siteUrl() + '/developers/console?checkout=cancelled',
    integration_identifier: 'facepay_developers_' + String(attempt[0].attempt_id).slice(0,8).split('').map(n=>String.fromCharCode(97+parseInt(n,16))).join(''),
    expires_at: Math.floor(Date.parse(attempt[0].started_at)/1000) + 7200,
  }, { idempotencyKey: 'facepay-checkout-usd-v2-' + attempt[0].attempt_id });
  if (!session.url) throw new DeveloperError(503, 'checkout_failed', 'Stripe did not return a checkout URL.');
  return session.url;
}
