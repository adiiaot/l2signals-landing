import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services — Signals API, Trading Systems, Apps | L2 Signals',
  description: 'Signals API access, custom trading systems built on your strategy or ours, business websites & mobile apps (crypto, broker, wallet, fintech). Plus hire & partnerships. Contact for a custom quote.',
}

const cardStyle = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
      {/* Hero */}
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Services • Contact for a custom quote</p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">One team. Four ways to work with us.</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">L2 Signals is our live product — the ledger below is the portfolio. Plug into our signals via API, get a trading system built on your strategy or ours, ship your business site or app, or hire and partner with us.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
          <Link href="/quote" className="btn-primary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Get a custom quote →</Link>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Email us</a>
        </div>
        <p className="text-[11px] text-text-muted mt-3 break-words">Response within 24h • <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Telegram</a> • <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">l2signalslab@gmail.com</a></p>
      </div>

      {/* Track 1 — Signals API */}
      <div id="api" className="card scroll-mt-20">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Track 01 — Signals API access</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">Plug L2 signals into your own stack</h2>
        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">Live signals, results, trade history, spot price and proof endpoints — for bots, dashboards, and execution tools (UTrading/3Commas-style webhooks included). Access is issued manually: contact us, we scope your use case and onboard you by hand. No self-serve keys yet — custom quote per integration.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="rounded-xl p-3" style={cardStyle}>
            <p className="text-xs font-semibold">What you get</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Signals + outcomes (entry, SL/TP, hybrid legs, confidence)</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Trade history + proof ledger feed</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Spot price + account/prop snapshots</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Webhook delivery for your bot or dashboard</li>
            </ul>
          </div>
          <div className="rounded-xl p-3 overflow-x-auto" style={cardStyle}>
            <p className="text-xs font-semibold">Sample payload</p>
            <pre className="mt-2 text-[10px] sm:text-[11px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`{
  "signal": "XAUUSD LONG",
  "entry": 4388.22,
  "stopLoss": 4364.30,
  "takeProfit": 4448.02,
  "confidence": 0.82,
  "closeBy": "21:00 UTC"
}`}</pre>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
          <Link href="/quote?type=api" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Request API access →</Link>
          <a href="mailto:l2signalslab@gmail.com?subject=Signals%20API%20access%20—%20L2%20Signals" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Email us about API</a>
        </div>
      </div>

      {/* Track 2 — Custom trading systems */}
      <div id="systems" className="card scroll-mt-20">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Track 02 — Custom trading systems</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">Your strategy, systematized — or one built for you</h2>
        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">Two ways in: bring your own rules and we code, backtest and ship them — or tell us your goals and risk and we design the system. Either way you get an engine, verified backtest, live ledger, and Telegram + MT5 EA delivery.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="rounded-xl p-3" style={cardStyle}>
            <p className="text-xs font-semibold">A — Code my strategy</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li className="flex gap-2"><span className="text-accent-gold">•</span>You bring the rules — entries, filters, exits</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Dukascopy backtest + scoring + auto-scorer</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Journal, prop-sim, Telegram + MT5 EA</li>
            </ul>
            <Link href="/quote?type=system-code" className="text-xs font-semibold text-accent-gold hover:underline mt-3 inline-block">Get a quote for my strategy →</Link>
          </div>
          <div className="rounded-xl p-3" style={cardStyle}>
            <p className="text-xs font-semibold">B — Build one for me</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Designed from your markets, capital and risk</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Market-data workers, caching, PC-free uptime</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Docs, handoff, optional ongoing tuning</li>
            </ul>
            <Link href="/quote?type=system-built" className="text-xs font-semibold text-accent-gold hover:underline mt-3 inline-block">Get a quote for a full build →</Link>
          </div>
        </div>
      </div>

      {/* Track 3 — Websites & mobile apps */}
      <div id="apps" className="card scroll-mt-20">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Track 03 — Websites & mobile apps</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">Business sites and fintech apps, shipped by the L2 team</h2>
        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">The same team that ships L2 daily builds your product: business websites, dashboards, and mobile apps — crypto, broker, wallet, fintech and beyond. This site and its live ledger are the portfolio.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Business websites</p><p className="text-text-muted mt-1">Landing pages, docs, blogs — fast, responsive, SEO-ready.</p></div>
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Crypto / broker / wallet / fintech</p><p className="text-text-muted mt-1">Dashboards, auth, payments, admin panels, real-time data.</p></div>
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Mobile apps</p><p className="text-text-muted mt-1">iOS + Android from one codebase, store-ready.</p></div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
          <Link href="/quote?type=app" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Get an app quote →</Link>
        </div>
      </div>

      {/* Track 4 — Hire & partnerships (folded section) */}
      <div id="hire" className="card scroll-mt-20">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Track 04 — Hire & partnerships</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">Work with the team, not just the product</h2>
        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">L2 Signals is built to compound — winning high-ticket client work, growing a trading community whose signal access sustains the engine, and earning long-term partnerships and sponsorships with brokers, prop firms and investors. If you&apos;re hiring or want to build together — here&apos;s how.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="rounded-xl p-3" style={cardStyle}>
            <p className="text-xs font-semibold">Hire us — engineering led by AOT</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Trading systems, full-stack apps, AI tooling</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Proof of work: this ledger, shipped daily</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Team scales with scope — engineers added as needed</li>
            </ul>
            <a href="mailto:l2signalslab@gmail.com?subject=Hire%20inquiry%20—%20L2%20Signals" className="text-xs font-semibold text-accent-gold hover:underline mt-3 inline-block">Email about hiring →</a>
          </div>
          <div className="rounded-xl p-3" style={cardStyle}>
            <p className="text-xs font-semibold">Trading partnerships</p>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Prop firms & desks — custom risk, reporting, tools</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Strategy licensing & joint ventures</li>
              <li className="flex gap-2"><span className="text-accent-gold">•</span>Sponsorships & integrations</li>
            </ul>
            <a href="mailto:l2signalslab@gmail.com?subject=Partnership%20—%20L2%20Signals" className="text-xs font-semibold text-accent-gold hover:underline mt-3 inline-block">Email about partnering →</a>
          </div>
        </div>
      </div>

      {/* Who we build for */}
      <div className="card">
        <h2 className="text-sm sm:text-base font-bold">Who we build for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Traders & desks</p><p className="text-text-muted mt-1">Need a deterministic system, ledger, and playbook — not discretion.</p></div>
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Funds & prop firms</p><p className="text-text-muted mt-1">API access, custom risk, prop-sim, reporting, internal tools.</p></div>
          <div className="rounded-xl p-3" style={cardStyle}><p className="font-semibold">Teams & founders</p><p className="text-text-muted mt-1">Websites, fintech apps, dashboards, AI assistants — shipped fast.</p></div>
        </div>
      </div>

      {/* How we work */}
      <div className="card">
        <h2 className="text-sm sm:text-base font-bold">How we work</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {[
            { n: '01', t: 'Discovery', d: 'Goals, constraints, data, risk. We map the system — not just features.' },
            { n: '02', t: 'Prototype', d: 'Clickable prototype + data stub in days. You see it before we scale it.' },
            { n: '03', t: 'Build', d: 'Ship to staging → production. Tests, logs, monitoring. Weekly demos.' },
            { n: '04', t: 'Scale', d: 'Docs, handoff, optional ongoing work. We stay if you want us to.' },
          ].map(p => (
            <div key={p.n} className="rounded-xl p-2.5 sm:p-3 text-center" style={cardStyle}>
              <p className="text-base sm:text-lg font-bold font-mono text-accent-gold">{p.n}</p>
              <p className="text-xs font-semibold mt-1">{p.t}</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 sm:mt-5">
          <Link href="/quote" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Start with a custom quote</Link>
          <Link href="/legal" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">See legal & risk</Link>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="card text-center">
        <h3 className="text-sm font-bold">Not sure which track fits?</h3>
        <p className="text-xs text-text-muted mt-1">Describe your problem — we’ll point you at the simplest track and quote it custom.</p>
        <a href="mailto:l2signalslab@gmail.com?subject=Custom%20quote%20—%20L2%20Signals&body=Hi%20L2%20Signals%20team%2C%0A%0ATrack%20(API%20%2F%20trading%20system%20%2F%20app%20%2F%20hire)%3A%0ATimeline%3A%0A%0ADetails%3A" className="btn-primary rounded-full px-4 sm:px-6 py-2.5 text-xs mt-4 inline-flex w-full sm:w-auto justify-center break-all">Email us — l2signalslab@gmail.com</a>
      </div>
    </div>
  )
}
