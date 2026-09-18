import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Services — L2 Signals',
  description: 'Bespoke trading systems, automation, full-stack apps & AI products. From idea to production — we architect, build and ship.',
}

const SERVICES = [
  { title: 'Systematic Trading Infrastructure', desc: '15M/1H/4H signal stacks, hybrid limit+stop execution, backtesting (Dukascopy), Firestore ledger, Telegram MT5 EA delivery. Built for XAU/USD, portable to any market.', bullets: ['Signal engine (EMA / breakout / trend)', 'Backtester + scoring + auto-scorer', 'Journal, prop-sim, Telegram + EA'] },
  { title: 'Automation & Data Pipelines', desc: 'Market-data workers (Render), Dukascopy + gold-api fallback, distributed Firestore cache, cooldowns — no 429 storms, PC-free uptime.', bullets: ['Render market-data worker', 'Caching, freshness & FEED_BUSY guard', 'Price, chart, signal pipelines'] },
  { title: 'Full-Stack Web & Dashboards', desc: 'Next.js 14 dashboards, real-time candles, proof ledger, auth, admin, payments (Neon + Prisma). Glass UI, dark/light, responsive.', bullets: ['Landing + dashboard + proof pages', 'Auth, subscriptions, admin panel', 'Chart, ledger, trade logger'] },
  { title: 'AI Products & LLM Integrations', desc: 'NVIDIA NIM + custom trainers, ML bias (log-only/decommissioned pattern), RAG, internal tooling — prototype → production with evals.', bullets: ['Retrain pipeline, monitoring', 'Prompt → tool → deploy', 'Docs + ops handoff'] },
]

const PROCESS = [
  { n: '01', t: 'Discovery', d: 'Goals, constraints, data, risk. We map the system — not just features. Fixed-price audit option.' },
  { n: '02', t: 'Prototype', d: 'Clickable prototype + data stub in days. You see it before we scale it.' },
  { n: '03', t: 'Build', d: 'Ship to staging → production. Tests, logs, monitoring. Weekly demos.' },
  { n: '04', t: 'Scale', d: 'Docs, handoff, optional retainer. We stay if you want us to.' },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Custom builds • Partnerships • Sponsorships</p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">We build systems, not just screens</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">L2 Signals is our product. We also build bespoke systems for traders, funds and teams — trading infra, automation, dashboards and AI tools — from MVP to production.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
          <Link href="/quote" className="btn-primary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Get a quote →</Link>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">DM the founder</a>
        </div>
        <p className="text-[11px] text-text-muted mt-3 break-words">Response within 24h • <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Telegram</a> • <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">l2signalslab@gmail.com</a></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
        {SERVICES.map(s => (
          <div key={s.title} className="card">
            <h3 className="text-sm font-bold">{s.title}</h3>
            <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{s.desc}</p>
            <ul className="mt-3 space-y-1 text-xs text-text-secondary">
              {s.bullets.map(b => <li key={b} className="flex gap-2"><span className="text-accent-gold">•</span>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-sm sm:text-base font-bold">Who we build for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          <div className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Traders & desks</p><p className="text-text-muted mt-1">Need a deterministic system, ledger, and playbook — not discretion.</p></div>
          <div className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Funds & prop firms</p><p className="text-text-muted mt-1">Custom risk, prop-sim, reporting, and internal tools.</p></div>
          <div className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Teams & founders</p><p className="text-text-muted mt-1">Marketplaces, SaaS, dashboards, AI assistants — shipped fast.</p></div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-sm sm:text-base font-bold">How we work</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {PROCESS.map(p => (
            <div key={p.n} className="rounded-xl p-2.5 sm:p-3 text-center" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
              <p className="text-base sm:text-lg font-bold font-mono text-accent-gold">{p.n}</p>
              <p className="text-xs font-semibold mt-1">{p.t}</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 sm:mt-5">
          <Link href="/quote" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Start with a quote</Link>
          <Link href="/legal" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">See legal & risk</Link>
        </div>
      </div>

      <div className="card text-center">
        <h3 className="text-sm font-bold">Not sure what you need?</h3>
        <p className="text-xs text-text-muted mt-1">Describe your problem — we’ll propose the simplest system that solves it.</p>
        <a href="mailto:l2signalslab@gmail.com?subject=Custom%20build%20inquiry%20—%20L2%20Signals&body=Hi%20AOT%2C%0A%0AProject%3A%0ABudget%3A%0ATimeline%3A%0A%0ADetails%3A" className="btn-primary rounded-full px-4 sm:px-6 py-2.5 text-xs mt-4 inline-flex w-full sm:w-auto justify-center break-all">DM the developer — l2signalslab@gmail.com</a>
      </div>
    </div>
  )
}
