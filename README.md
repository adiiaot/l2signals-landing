# L2 Signals Services — business website (`l2signals-landing`)

Standalone Next.js 14 (App Router) site for **L2 Signals Services**, a software development business
working in trading technology: software, IT support, algorithmic trading tools (signal engines,
MetaTrader Expert Advisors, indicators, backtests, execution automation) and technology consultancy,
quoted per project.

**L2 Signals** is one private product of the business — rule-based XAU/USD setups delivered to an
invited group — and it is published as proof of work: a running engine, a private community, a member
application and a record that includes the losses. It is not a public signal service and the business
is not presented as a signal provider. **L2 EA** is in development, **L2 Indicator** is planned, and the
**L2 Signals App** is a private build that is not publicly released.

This repo is separate from `l2signal_web` (private dashboard / signal engine) and `l2signal_bot`
(payments and membership only).

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Business homepage: hero, about, products, proof of work, how we work, roadmap, FAQ, founder, contact |
| `/signals` | The private product: scope, live execution ledger, back-tested study, methodology, access terms, invite request |
| `/services` | Services tracks (Signals API, custom systems, apps, hire/partnership) |
| `/quote` | Scoped quote request (email draft; no server-side payment) |
| `/pay` | Checkout for an invited member: disclosure, mandatory consent, then the fee; Paystack / crypto / bank transfer |
| `/legal` | Legal & Trust Centre index |
| `/terms`, `/privacy` | Core website documents |
| `/policies` | Member-policy index |
| `/policies/subscription-terms` | Access period, payment, renewal, cancellation, refunds |
| `/policies/trading-risk-disclosure` | Risk disclosure |
| `/policies/signal-access-and-delivery` | Delivery, order types, cutoff, sizing |
| `/policies/performance-measurement` | Calendar-month Net R methodology |
| `/policies/founding-members-programme` | Founding cohort terms |
| `/policies/founding-member-extension` | Extension benefit |
| `/policies/acceptable-use` | Permitted use |
| `/policies/refunds-and-cancellations` | Interim refund/cancellation process |
| `/api/ledger` | Server-side proxy that reads the operator ledger; the browser never calls the private app origin |

`/legal/terms`, `/legal/refunds`, `/legal/risk-disclosure` and the other `/legal/*` aliases
redirect to the canonical routes in `next.config.js`. Do not duplicate the documents.

## Content and claims

- Business identity, positioning, risk notice, products and journey live in `data/business.ts`.
  `RISK_NOTICE` must appear in the footer and beside any results — never shorten it.
- Legal metadata, versions, effective dates and consent mapping live in `data/legal.ts`. Bumping
  `LEGAL_VERSION` invalidates older consent records by design.
- **No published price for the private service.** The fee is rendered only on `/pay`, and only after
  the three consent statements are ticked. `data/business.ts` `OFFER` mirrors the checkout defaults
  for display; `l2signal_web` → `config/payments` is authoritative for the amount charged.
- Results are data: wins, losses, unfilled setups and R. Never currency profit, never an income claim.
  Label every figure: the 4.25-year study (20,237 signals, 64.8% WR, +0.69R) is **BACK-TESTED**; the
  execution ledger is **LIVE** and is not merged with it.
- Do not state a release date, broker, address or integration that is not verified. Product statuses
  are deliberately conservative (“in development” ≠ “available”).
- **Registration is a verified fact** (business name registered with the CAC on 1 November 2026;
  certificate, status report, TIN and registration number held). It is published from
  `REGISTRATION` in `data/business.ts` — never type a number from memory, and never imply that a
  registered business name is a licence or an approval by any financial regulator. Nothing else about
  licensing or regulatory status is published.
- The execution ledger (`components/ProofSection.tsx`) reads `/api/ledger` and only shows realised R
  where the record supports it. Planned R is never substituted for realised R.

## Policy PDFs

The six downloadable policies in `public/policies/` are printed from the live policy pages, so the
PDF can never drift from the wording a reader accepts on screen. Two pieces make that work:

- `app/globals.css` carries an `@media print` block: A4 page margins, white canvas, no site chrome.
  It sets `color-scheme: light !important` on `<html>` because `next-themes` writes
  `style="color-scheme: dark"` inline, and Chrome then paints the whole PDF canvas `#121212` — the
  first generated set had a black border around every page.
- `components/PolicyShell.tsx` marks the breadcrumb, the download link and the sticky sidebar
  `.no-print` / `aside`, and renders the document version, effective date and registration line, so
  bumping `LEGAL_VERSION` updates every PDF automatically.

Regenerate after editing policy copy, `data/legal.ts` or `data/business.ts`:

1. `npm run build`
2. `npx next start -p 3100`
3. print each page to its file (headless Chrome, honours `@page`):

```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=12000 \
  --print-to-pdf=public/policies/l2-signals-subscription-terms-and-conditions.pdf \
  http://localhost:3100/policies/subscription-terms
```

| Page | File in `public/policies/` |
| --- | --- |
| `/policies/trading-risk-disclosure` | `l2-signals-trading-risk-disclosure.pdf` |
| `/policies/subscription-terms` | `l2-signals-subscription-terms-and-conditions.pdf` |
| `/policies/signal-access-and-delivery` | `l2-signals-signal-access-and-delivery-policy.pdf` |
| `/policies/performance-measurement` | `l2-signals-performance-measurement-policy.pdf` |
| `/policies/founding-members-programme` | `l2-signals-founding-members-programme.pdf` |
| `/policies/founding-member-extension` | `l2-signals-founding-member-extension-policy.pdf` |

Copy the same six files into `Documentations/L2 Signals Official Docs/` as `L2_Signals_*.pdf` (that
folder is gitignored and holds the signed source documents). Spot-check one rendered page before
committing: white background, dark text, no nav or footer, and the version badge on page 1.

## Payments and consent

Checkout is hosted on this site. The **storefront is deliberately not linked**: a hosted
`paystack.shop` page cannot show the pre-payment disclosures or record consent. `/pay` is not in the
nav or on the homepage — it is reached from the invitation message and the quiet "Already invited?"
link on `/signals`.

1. `/pay` fetches the plan from `l2signal_web` → `config/payments` (server-side, revalidated).
   The browser never supplies the price.
2. The fee and the payment rails stay hidden until the payer ticks the initially-unchecked boxes:
   Terms + Subscription Terms; Trading Risk Disclosure; Founding Members Programme (when
   `OFFER.foundingApplicable`).
3. `POST /api/pay/consent` recomputes the required documents and versions from `data/legal.ts`,
   stores a `payConsents` record (product, plan snapshot, versions, timestamp, salted IP hash,
   truncated user agent) and returns an id.
4. `/api/pay/paystack/init` and `/api/pay/submit` consume that id **once** in a Firestore
   transaction, re-check the current plan, and refuse if the price changed (`plan_changed`).
5. Paystack redirects are never proof. `/api/pay/paystack/verify` and the signed webhook re-check
   the charge with Paystack. Crypto and bank transfers are recorded as pending and reviewed.
6. Payment docs store `consentId`, `consentVersions` and `consentAcceptedAt`; duplicate
   references are refused by `txIndex`.
7. The success screen is manual-first: it lists the email, reference, member details and a
   screenshot to send to `@aotayoL2` or `l2signalslab@gmail.com`. `PAYMENTS_AUTO_VERIFY=false` by
   default.

The Paystack rail is labelled **“Pay online”** (it also handles bank transfer and USSD), never
“Card”. Card data never touches this site.

## Environment

Copy `.env.example` and set the values in Vercel. Required for real payments:

- `PAYSTACK_SECRET_KEY` — server-only; online checkout stays hidden without a valid key.
- `PAYSTACK_USD_ENABLED` — `true` charges USD, otherwise NGN.
- `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` — consent and payment records.
- `L2_WEB_API_URL` (or `NEXT_PUBLIC_L2_WEB_API`) — web dashboard origin used for plan config and the
  ledger proxy. If it is unset, `/api/ledger` returns `503 ledger_not_configured` rather than a
  fabricated record.
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
2. Deploy. Verify `/`, `/signals`, `/pay`, `/legal`, `/terms`, `/privacy`, `/policies`,
   `/api/ledger` and a `/legal/*` redirect.
3. Paystack dashboard → Webhook URL → `https://<domain>/api/pay/paystack/webhook`.
4. `l2signal_web` → `/dashboard/payments` → **Payment page URL** → `https://<domain>/pay`.
5. Bot env `PAY_PAGE_URL` → `https://<domain>/pay`.
6. Custom domain: set `NEXT_PUBLIC_SITE_URL`, then repeat steps 3–5 for the new origin.

## Known gaps

- `public/policies/*.pdf` (6 files) are older than the HTML pages and still contain the previous
  published prices, the 50-member cap and pre-launch wording. They are no longer linked from the
  site; regenerate or delete them before re-linking.
- The founding extension wording changed from “0R or below” to “strictly below 0R”
  (`LEGAL_VERSION 2026.11.1`). Members who accepted an older version were consenting to the wider
  trigger — treat that as a changed contractual term and handle any existing case individually.

## Legal/owner decisions still open

- Final commercial refund policy (the current page is an interim, case-by-case process and says
  so visibly).
- Specific judicial venue / consumer-dispute route (Terms currently flags it as subject to
  Nigerian counsel).
- Registration: **done** — business name registered with the CAC on 1 November 2026, **BN 9979030**,
  status Active, registered activity “software development, web design and intranet development”, published
  from `REGISTRATION` in `data/business.ts`. The TIN is **never published** and must not be added to any
  file in this repo. The principal place of business (a personal address) is not published either.
- The plan is **30 days** with a 5-day grace period. `l2signal_web` → `config/payments` is
  authoritative: if the access period is ever changed, change it there first, then update
  `OFFER.days` in `data/business.ts`, the fallback in `lib/payments/types.ts` and the “currently 30
  days” references in the legal pages together.
