# L2 Signals Services — business website (`l2signals-landing`)

Standalone Next.js 14 (App Router) site for **L2 Signals Services**, the trading-technology
business. **L2 Signals** is the live signal service (rule-based XAU/USD setups delivered to a private group);
**L2 EA** is in development; **L2 Indicator** and the **L2 Signals App** are planned. Signals API
access, custom systems, websites and apps are quoted per project.

This repo is separate from `l2signal_web` (private dashboard / signal engine) and `l2signal_bot`
(payments and membership only).

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Business homepage: hero, about, products, L2 Signals spotlight, execution ledger, methodology, how it works, roadmap, pricing, trust, FAQ, founder, contact |
| `/services` | Services tracks (Signals API, custom systems, apps, hire/partnership) |
| `/quote` | Scoped quote request (email draft; no server-side payment) |
| `/pay` | Checkout: disclosure, consent, Paystack / crypto / bank transfer |
| `/legal` | Legal & Trust Centre index |
| `/terms`, `/privacy` | Core website documents |
| `/policies` | Member-policy index |
| `/policies/subscription-terms` | Subscription, renewal, cancellation, refunds |
| `/policies/trading-risk-disclosure` | Risk disclosure |
| `/policies/signal-access-and-delivery` | Delivery, order types, cutoff, sizing |
| `/policies/performance-measurement` | Calendar-month Net R methodology |
| `/policies/founding-members-programme` | Founding cohort terms |
| `/policies/founding-member-extension` | Extension benefit |
| `/policies/acceptable-use` | Permitted use |
| `/policies/refunds-and-cancellations` | Interim refund/cancellation process |

`/legal/terms`, `/legal/refunds`, `/legal/risk-disclosure` and the other `/legal/*` aliases
redirect to the canonical routes in `next.config.js`. Do not duplicate the documents.

## Content and claims

- Business identity, offer, products and journey live in `data/business.ts`.
- Legal metadata, versions, effective dates and consent mapping live in `data/legal.ts`.
- Public figures must stay labelled: the 4.25-year study is **backtested**; the
  `$100 → $1,007.41` result is **demo**. No profit, win rate, funding or withdrawal is guaranteed.
  Short-window figures are deliberately not published.
- Do not state a release date, broker, licence, registration, address or integration that is not
  verified. Product statuses are deliberately conservative (“in development” ≠ “available”).
- The execution ledger (`components/ProofSection.tsx`) reads the public web API and only shows
  realised R where the record supports it. Planned R is never substituted for realised R.

## Payments and consent

Checkout is hosted on this site. The **storefront is deliberately not linked**: a hosted
`paystack.shop` page cannot show the pre-payment disclosures or record consent.

1. `/pay` fetches the plan from `l2signal_web` → `config/payments` (server-side, revalidated).
   The browser never supplies the price.
2. The payer must tick three initially-unchecked boxes: Terms + Subscription Terms; Trading Risk
   Disclosure; Founding Members Programme (when `OFFER.foundingApplicable`).
3. `POST /api/pay/consent` recomputes the required documents and versions from `data/legal.ts`,
   stores a `payConsents` record (product, plan snapshot, versions, timestamp, salted IP hash,
   truncated user agent) and returns an id.
4. `/api/pay/paystack/init` and `/api/pay/submit` consume that id **once** in a Firestore
   transaction, re-check the current plan, and refuse if the price changed (`plan_changed`).
5. Paystack redirects are never proof. `/api/pay/paystack/verify` and the signed webhook re-check
   the charge with Paystack. Crypto and bank transfers are recorded as pending and reviewed.
6. Payment docs store `consentId`, `consentVersions` and `consentAcceptedAt`; duplicate
   references are refused by `txIndex`.

The Paystack rail is labelled **“Pay online”** (it also handles bank transfer and USSD), never
“Card”. Card data never touches this site.

## Environment

Copy `.env.example` and set the values in Vercel. Required for real payments:

- `PAYSTACK_SECRET_KEY` — server-only; online checkout stays hidden without a valid key.
- `PAYSTACK_USD_ENABLED` — `true` charges USD, otherwise NGN.
- `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` — consent and payment records.
- `NEXT_PUBLIC_L2_WEB_API` — web dashboard origin used for plan config and the public ledger.
- `NEXT_PUBLIC_SITE_URL` — canonical origin, OG URLs and sitemap.
- `NEXT_PUBLIC_TELEGRAM_BOT_URL` — optional bot deep link for identity.
- `PAYMENTS_AUTO_VERIFY` — `false` by default; manual review.
- `BOT_API_URL` / `PAYMENT_VERIFY_SECRET` — bot verify bridge, when enabled.
- Proof channels: `NEXT_PUBLIC_TELEGRAM_PROOF_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` (defaults in
  `lib/payments/links.ts`).

## Dev checks

```bash
npm install --legacy-peer-deps
npm run dev
npx tsc --noEmit
npx tsx scripts/check-consent.ts   # pure consent/version contract check
npm run build
```

`npm run lint` is not configured in this repo (no ESLint config); `next build` still runs its
type checks. If ESLint is added, run it before shipping.

## Deploy

1. Vercel → project → Settings → Environment Variables: add the values above.
2. Deploy. Verify `/pay`, `/legal`, `/terms`, `/privacy`, `/policies` and a `/legal/*` redirect.
3. Paystack dashboard → Webhook URL → `https://<domain>/api/pay/paystack/webhook`.
4. `l2signal_web` → `/dashboard/payments` → **Payment page URL** → `https://<domain>/pay`.
5. Bot env `PAY_PAGE_URL` → `https://<domain>/pay`.
6. Custom domain: set `NEXT_PUBLIC_SITE_URL`, then repeat steps 3–5 for the new origin.

## Legal/owner decisions still open

- Final commercial refund policy (the current page is an interim, case-by-case process and says
  so visibly).
- Specific judicial venue / consumer-dispute route (Terms currently flags it as subject to
  Nigerian counsel).
- Regulatory status (no SEC approval, licence or exemption is claimed).
- The live `config/payments` plan is currently **31 days**; the site copy mirrors that. If 30
  days is intended, change the web config, then update `OFFER.days` in `data/business.ts`, the
  fallback in `lib/payments/types.ts`, and the “31-day” references in the legal pages together.
