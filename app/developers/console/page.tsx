import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { developerDb, requireDeveloper } from '@/lib/developers/account';
import { reconcileAccount } from '@/lib/developers/billing';
import { DeveloperConsole } from '@/components/developers/DeveloperConsole';

export const dynamic = 'force-dynamic';
export default async function ConsolePage() {
  await auth.protect();
  const account = await reconcileAccount(await requireDeveloper(false));
  const db = developerDb();
  const keys = await db`SELECT id,name,key_prefix,scopes,created_at,expires_at,revoked_at,last_used_at FROM developer_api_keys WHERE user_id=${account.user_id} ORDER BY created_at DESC LIMIT 30`;
  const usage = await db`SELECT coalesce(sum(u.requests),0)::int AS requests FROM developer_api_usage u JOIN developer_api_keys k ON u.key_id=k.id WHERE k.user_id=${account.user_id} AND u.window_start>=date_trunc('month',now())`;
  return <section className="dev-console container-x"><div className="dev-console-heading"><div><p className="dev-eyebrow">YOUR DEVELOPER WORKSPACE</p><h1>Welcome, {account.name}.</h1><p>{account.email} · {account.email_verified ? 'Email verified' : 'Email verification required'}</p></div><Link href="/developers/account" className="dev-button">Account & security</Link></div>
    {!account.email_verified && <p className="dev-notice">Verify your primary email in <Link href="/developers/account">Account & security</Link> before purchasing a subscription or creating keys.</p>}
    <div className="dev-stat-grid"><article><small>Subscription</small><strong>{account.subscription_status === 'active' ? 'Active' : 'Not active'}</strong><span>US$100 / year</span></article><article><small>Environment</small><strong>Sandbox</strong><span>{account.billing_mode === 'live' ? 'Live subscription billing' : 'Stripe test billing · no real charge'}</span></article><article><small>API requests this month</small><strong>{Number(usage[0]?.requests || 0).toLocaleString()}</strong><span>60 requests / minute per API key</span></article></div>
    <DeveloperConsole account={{status:account.subscription_status,expiresAt:account.subscription_expires_at,cancelAtPeriodEnd:account.cancel_at_period_end,verified:account.email_verified,hasCustomer:Boolean(account.stripe_customer_id),tenantId:account.tenant_id,customerId:account.customer_id}} keys={JSON.parse(JSON.stringify(keys))} />
    <div className="dev-resource-grid"><article><h2>Interactive API reference</h2><p>Search every endpoint, inspect schemas, send sandbox requests, and run JavaScript tests with assertions.</p><a href="https://facepay-core.vercel.app/" className="dev-button gold">Open API documentation ↗</a></article><article><h2>Your sandbox identifiers</h2><p>Use your own merchant ID when creating payment intents. Keys cannot access another developer’s merchant data.</p><label>Merchant ID</label><code>{account.tenant_id}</code><label>Test customer ID</label><code>{account.customer_id}</code><p>The test customer supports simulated PIN verification. It has no biometric consent or real funding instrument.</p></article></div>
  </section>;
}
