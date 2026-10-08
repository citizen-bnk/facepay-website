# facepay-website

Public marketing site for FACEPAY (Next.js 15 App Router, TypeScript, Tailwind, Montserrat).
Pages: Home, Personal, Solutions, Business, Pricing, Developers, Hardware, About, Contact, Privacy.

> Illustrative concept. Pricing, hardware and screens are unverified. The site makes no claim of banking licence or regulatory approval.

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | facepay-core base URL. Forms POST to `${NEXT_PUBLIC_API_URL}/v1/leads` (`kind`: demo, hardware, partner). When unset, forms show a success state and queue the lead in `localStorage`. |
| `NEXT_PUBLIC_APP_URL` | "Download the App" target (default https://app.facepay.com) |
| `NEXT_PUBLIC_PORTAL_URL` | Docs / portal links (default https://portal.facepay.com) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap (default https://facepay.com) |

## Deploy to Vercel

1. Import `citizen-bnk/facepay-website` in Vercel; Framework Preset: **Next.js** (build `next build`, no output dir).
2. Add env vars `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_PORTAL_URL` (and optionally `NEXT_PUBLIC_SITE_URL`) for Production and Preview.
3. Domains: add `facepay.com` (primary) and `facepay.africa`. `next.config.mjs` already permanently redirects `facepay.africa` / `www.facepay.africa` to `https://facepay.com`; alternatively set the redirect on the domain in Vercel.
4. Point DNS per Vercel instructions (A `76.76.21.21` for apex, CNAME `cname.vercel-dns.com` for `www`).

## Swapping placeholder photos

`PhotoBlock` (components/ui.tsx) renders gold gradient placeholders. Add an image under `public/` and pass `src="/your.jpg"`; no external hotlinks.

## Screenshots

`node scripts/shots.mjs http://localhost:3000 /,/pricing` (needs Chromium; uses playwright-core).
