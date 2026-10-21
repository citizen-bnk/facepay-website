import { requireDeveloper, mutationOrigin, developerError, DeveloperError } from '@/lib/developers/account';
import { siteUrl, stripeClient } from '@/lib/developers/billing';
export async function POST(request: Request) { try {
  mutationOrigin(request); const account = await requireDeveloper();
  if (!account.stripe_customer_id) throw new DeveloperError(409, 'no_billing_account', 'Subscribe before opening billing management.');
  const session = await stripeClient().billingPortal.sessions.create({ customer: account.stripe_customer_id, return_url: siteUrl() + '/developers/console' });
  return Response.json({ url: session.url }, { headers:{'Cache-Control':'no-store'} });
} catch(error) { return developerError(error); } }
