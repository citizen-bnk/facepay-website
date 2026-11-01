# Face Pay Digital Platform

Reviewed 1 November 2026. Vercel team: Smart My Company (`smart-my-co`).

## Release scope

Public website and platform preview only. Real-money payments and biometric authentication are not launched. The owner confirmed payment and biometric providers are not yet contracted. Keep the customer app, core API and staff portal behind their existing Vercel authentication.

## Components reviewed

| Repository | Vercel project | Implementation |
| --- | --- | --- |
| citizen-bnk/facepay-website | facepay-website | Next.js public website; Clerk developer accounts, Stripe developer membership sandbox, Neon developer database |
| citizen-bnk/facepay-app | facepay-app | Expo customer app; fixture wallet/payment data and simulated liveness |
| citizen-bnk/facepay-backoffice | facepay-backoffice | Next.js role-based customer, merchant, operations and super-user portal; fixture fallback |
| citizen-bnk/facepay-core | facepay-core | Hono API, Drizzle, JWT, mock payment and biometric providers; mobile verification/residence module exists in GitHub beyond the deployed API revision |

## Confirmed blockers to a transactional launch

- `facepay-core/src/context.ts` always selects mock payment and biometric providers. Implement contracted live providers, verify signed callbacks, settlement and refund reconciliation, and exercise failure/idempotency paths before accepting money.
- The app's liveness adapter is simulated. Replace it with the contracted SDK and enforce verification server-side.
- Core has no `DATABASE_URL` configured in Vercel. `DEVELOPER_DATABASE_URL` serves a separate purpose. The wallet API otherwise uses per-instance in-memory PGlite. Provision durable production storage, backups and a reviewed migration plan; disable demo seeding.
- The app has no Vercel environment variables configured; the backoffice lacks `NEXT_PUBLIC_API_URL`. Remove fixture fallbacks from real customer and operator flows, and remove demo sign-in paths.
- The latest GitHub core revision includes mobile verification and residence features that are not in the current production API build. Its Twilio settings and persistent storage are absent from the listed Vercel environment. Verify these separately before deployment.
- Implement privileged-user MFA, session revocation and shared rate limiting as identified by the core README.
- Enquiry submission is unavailable without a connected API and durable lead storage. The public form now explicitly reports this instead of claiming local-only requests were received.
- Verify live authentication configuration, billing mode, production webhook handling, privacy/consent operations and onboarding before enabling paid membership or real biometric/payment services.
- No website log drains are configured. Establish error alerting and a rollback/runbook before the transactional release.

## Public launch

Use the existing website production domain, `https://facepay-website.vercel.app`, with Standard Protection: public production domains; protected preview and generated deployment URLs. Keep other projects' protections unchanged. The platform's display name is **Face Pay Digital Platform**; existing repository and infrastructure identifiers are retained.

No custom domain was purchased or DNS ownership assumed.
