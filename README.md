# L2 Signals — Business Website (L2signal_page)

Standalone Next.js 14 business site — **separate repo** from `l2signal_web` (private dashboard) and `l2signal_bot`. Built for public prospects to see proof, then join Telegram.

- **Live URL (Vercel)**: import this folder as `l2signals-landing` → `https://…vercel.app` → TinyURL
- **Telegram (waitlist)**: `https://t.me/l2signals` — every CTA = *Join Our Channel on Telegram — Stay Updated on Progress & App Release*
- **X**: `https://x.com/l2signals` · **Founder AOT**: `https://www.linkedin.com/in/aotayo` · `https://x.com/aot_ayo` · `https://aot-network-portfolio.vercel.app/` · `l2signalslab@gmail.com`

## What’s inside

- **Hero**: Demo milestone `$100 → $1,007.41 in 37 days` (July 29 → Sept 4, 0.01 lot, systematic)
- **About / Problem / Who For / Services** (Custom Trading Bots, Signal Systems, Business Websites, Mobile Apps)
- **How It Works**: 3 strategies (EMA bounce · consolidation breakout · trend continuation) + hybrid `limit + stop` to 21:00 UTC, real MT5 broker feed (Dukascopy fallback) + 4.25-yr backtest `20,237 signals · 64.8% WR · +0.69R avg`, 2-month current config `152 fills · 74.2% WR · PF 5.12 · +103R`
- **Roadmap, Pricing (access open — `/pay`), Proof, FAQ, Founder**
- **Proof**: pill `Demo | Prop` — **Demo** = L2 card + metrics + X links (public), **Prop $10k** = 11 private screenshots (`public/prop/prop-*.jpg`) with `Private — will publish when funded` badge (no X to avoid copy-trade)
- **FAQ #1 disclaimer**: *Not an investment service. We don’t manage funds unless signed agreement. No investment advice. Users only pay for signal access in private Telegram + upcoming web app.*

Design mirrors `l2signal_web`: dark `10 14 20` / gold `0 201 120`, glass `card`, `btn::after` shine, `scroll-reveal`, light/dark toggle, premium motion.

## Data

- **Ledger truth**: same Firestore as private app (`l2-signals` project) — reads `trades`/`signals` live. This site currently uses static `data/tweets.ts` + `data/stats.ts` for proof; Firestore wiring is via `lib/firebase.ts` + `/api/tweets` fallback.
- **Tweet wall**: `data/tweets.ts` (`demoTweets` 10 incl. milestone, `propTweets` 11 private). Demo keeps `tweetUrl`, prop has `''` (private).
- **Images**: `public/images/l2signals_logo.jpg`, `l2signals_cover_banner.jpg` + `public/prop/prop-*.jpg` (kebab, no `$`/spaces for Vercel).

## Dev

```bash
# from C:\l2page (junction avoids My Workspace spaces)
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npx tsc --noEmit
npm run build
```

## Neon (optional — static fallback works)

```bash
# .env already has DATABASE_URL (pooler, sslmode=require&channel_binding=require)
npx prisma generate
npx prisma db push   # if P1001, check Neon IP allow / try direct host (remove -pooler)
npx tsx prisma/seed.ts  # seeds demo+prop tweets (uses data/tweets.ts)
# Or keep using static data — no DB required for deploy.
```

Update flow for years (zero stress):
1. Log trades in private `l2signal_web` as now — ledger auto live (when Firestore wiring enabled).
2. After posting on X (demo only), add row to `data/tweets.ts` + drop jpg to `public/prop/` (prop) → `git push` → Vercel auto. Later migrate to Neon via seed.

## Deploy (separate repo)

```bash
cd C:\l2page
git init
git add .
git commit -m "L2 Signals business site — demo $1007.41 milestone + prop private wall"
git branch -M main
git remote add origin https://github.com/<you>/l2signals-landing.git
git push -u origin main
# Vercel → Import l2signals-landing → Env: DATABASE_URL, NEXT_PUBLIC_* → Deploy → TinyURL
```

Env on Vercel: `DATABASE_URL`, `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_FIREBASE_*` (for future live ledger).

## Notes

- Prop tweets intentionally have `tweetUrl: ''` — UI shows *Private — will publish when funded*, not a broken X link (anti copy-trade).
- No system internals disclosed (ATR/ADX thresholds etc remain in `l2signal_web/lib/signal-engine/config.ts` only).
- `.env` is gitignored; share `...-pooler` URL only via Vercel env.
