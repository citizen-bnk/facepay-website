# Developer registration and billing verification

Run `npm run test:developers` explicitly from this project. It exercises the hosted FACEPAY sandbox, creates one temporary test identity and subscription, then removes its own test records. It does not run during a normal build.

Required configuration is read from the ignored `.env.local`: Clerk test keys, Stripe test secret, and the developer Neon database URL. Both provider keys must start with `sk_test_`; the test refuses live credentials. Never commit an environment file or browser session state.

The runner uses Playwright Core and an installed Chromium browser. On Windows the default is the existing Playwright Chromium 1248 installation. Set `FACEPAY_E2E_CHROMIUM_PATH` to use a different executable.

Verification covers automated Clerk signup and email verification, rejection of key creation before payment, hosted annual subscription checkout, exactly USD 100 billing with no adaptive currency conversion, paid key issuance and hash storage, merchant isolation, immediate key revocation, and a real Stripe sandbox cancellation webhook removing API access.

Clerk's reserved `+clerk_test` addresses suppress email delivery and accept its documented test verification code. Stripe's documented test card is used only in its hosted sandbox checkout form. No real card or personal identity is used. Reference: [Clerk testing](https://clerk.com/docs/guides/development/testing/test-emails-and-phones), [Stripe testing](https://docs.stripe.com/testing).

Real payment collection remains separate: the Stripe business account must be claimed and activated, then live credentials, a matching USD 100 annual price and a live signed webhook must be configured. The FACEPAY payment API itself remains a simulated sandbox.
## Verified result — 21 October 2026

The hosted end-to-end run passed automated signup and email verification, unpaid key issuance rejection (402), a completed USD 100 annual Stripe test payment with a paid invoice, API key issuance with hash-only storage, own-merchant request acceptance (201), cross-merchant rejection (403), immediate revoked-key rejection (401), and cancellation webhook delivery removing API access (402). The test used the actual production URL with provider sandbox credentials.

Checkout is fixed to USD, retires older sessions that use currency conversion, and uses the official FACEPAY logo, black background and gold button. Stripe's hosted font choices do not include Poppins; the FACEPAY website, app, portal and API reference use Poppins.
