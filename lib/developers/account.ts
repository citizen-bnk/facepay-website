import 'server-only';
import { auth, currentUser } from '@clerk/nextjs/server';
import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

export class DeveloperError extends Error { constructor(public status: number, public code: string, message: string) { super(message); } }
export function developerDb() {
  const url = process.env.DEVELOPER_DATABASE_URL;
  if (!url) throw new DeveloperError(503, 'storage_unavailable', 'Developer storage is not configured.');
  return neon(url);
}
export interface DeveloperAccount {
  user_id: string; email: string; name: string; email_verified: boolean; tenant_id: string; customer_id: string;
  stripe_customer_id: string | null; stripe_subscription_id: string | null; subscription_status: string;
  subscription_expires_at: string | null; cancel_at_period_end: boolean; billing_mode: string;
}
export async function requireDeveloper(verified = true): Promise<DeveloperAccount> {
  const session = await auth();
  if (!session.userId) throw new DeveloperError(401, 'unauthenticated', 'Sign in to your developer account.');
  const user = await currentUser();
  const email = user?.emailAddresses.find(e => e.id === user.primaryEmailAddressId);
  if (!user || !email) throw new DeveloperError(403, 'email_required', 'Add a primary email address to your account.');
  const emailVerified = email.verification?.status === 'verified';
  const hash = createHash('sha256').update(user.id).digest('hex').slice(0, 20);
  const db = developerDb();
  const rows = await db`INSERT INTO developer_accounts (user_id,email,name,email_verified,tenant_id,customer_id)
    VALUES (${user.id},${email.emailAddress},${user.fullName || user.firstName || 'Developer'},${emailVerified},${'devtenant_' + hash},${'devcustomer_' + hash})
    ON CONFLICT (user_id) DO UPDATE SET email=EXCLUDED.email,name=EXCLUDED.name,email_verified=EXCLUDED.email_verified,updated_at=now() RETURNING *`;
  if (verified && !emailVerified) throw new DeveloperError(403, 'email_unverified', 'Verify your primary email before subscribing or issuing API keys.');
  return rows[0] as DeveloperAccount;
}
export function mutationOrigin(request: Request) {
  const expected = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://facepay-website.vercel.app').origin;
  const origin = request.headers.get('origin');
  const current = new URL(request.url).origin;
  if (!origin || (origin !== expected && !(process.env.NODE_ENV !== 'production' && origin === current))) throw new DeveloperError(403, 'invalid_origin', 'Request origin is not allowed.');
}
export function developerError(error: unknown): Response {
  if (error instanceof DeveloperError) return Response.json({ error: { code: error.code, message: error.message } }, { status: error.status, headers: { 'Cache-Control': 'no-store' } });
  console.error('Developer request failed', error instanceof Error ? error.name : 'unknown');
  return Response.json({ error: { code: 'service_error', message: 'The developer service could not complete this request. Please retry.' } }, { status: 503 });
}
