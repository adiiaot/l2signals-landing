import Link from 'next/link'
import { OFFER } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const SIGNAL_FIELDS = [
  { k: 'Direction', d: 'Long or short, with the strategy that produced the setup.' },
  { k: 'Order type', d: 'Market or pending — and the exact limits, because they are not interchangeable.' },
  { k: 'Entry', d: 'The price or conditions the setup is valid at.' },
  { k: 'Stop-loss', d: 'The invalidation level. Widening it changes the trade.' },
  { k: 'Take-profit', d: 'The reference target, plus the applicable partial and breakeven guidance.' },
  { k: 'Expiry', d: 'The daily close window: signals do not carry into the next trading day.' },
]

const FACTS = [
  { k: '20,237', label: 'signals in a 4.25-year broker-data study', d: '64.8% WR · +0.69R per signal. Backtested, not a promise.' },
  { k: '21:00 UTC', label: 'daily close', d: 'Open trades exit and unfilled pendings cancel by the end of the trading day.' },
  { k: 'XAU/USD', label: 'one instrument', d: 'Intraday gold setups only — no managed accounts or copy trading.' },
]

export default function SignalsSpotlight() {
  return (
    <section id="signals" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="card">
          <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Flagship service · live in early access</p>
          <h2 className="text-lg sm:text-xl font-bold mt-1">L2 Signals — a rule set you can actually follow</h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
            L2 Signals is a signal service for interested traders. We publish rule-based intraday XAU/USD setups
            to a private group. The engine decides from predefined conditions — not discretion, not a hunch. Each
            setup is published with the information needed to execute it, and the daily close window is stated
            up front.
          </p>
          <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
            Membership is access to the service. It is not a managed account, a copy-trading product or a
            transfer of the software. You place the orders, choose the size and keep control of your funds.
          </p>

          <div className="grid gap-2 sm:grid-cols-2 mt-4">
            {[
              { t: 'Three-tier strategy stack', d: 'EMA bounce, consolidation breakout and trend continuation, with direction-aware routing.' },
              { t: 'One order type per setup', d: 'Each setup states market or pending, with the exact entry, stop and target.' },
              { t: 'Published exit playbook', d: 'At +1R: take partial, move to breakeven, let the rest run to target. When the target is under 1R, the card says exit at target instead.' },
              { t: 'Engine-measured record', d: 'Official outcomes come from the engine and market data, never from a member’s broker balance.' },
            ].map((item) => (
              <div key={item.t} className="rounded-xl p-3" style={CARD}>
                <p className="text-[11px] font-semibold">{item.t}</p>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.18)' }}>
            <p className="text-[10px] tracking-[0.14em] uppercase text-accent-gold">What every signal states</p>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {SIGNAL_FIELDS.map((field) => (
                <p key={field.k} className="text-[11px] text-text-secondary leading-relaxed">
                  <span className="font-semibold text-text-primary">{field.k}:</span> {field.d}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
            <Link href="/pay" className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center">
              Start membership
            </Link>
            <Link href="#how" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
              See how it works
            </Link>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="card">
            <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">At a glance</p>
            <div className="mt-2 space-y-2">
              {FACTS.map((fact) => (
                <div key={fact.k} className="rounded-xl p-3" style={CARD}>
                  <p className="text-lg font-bold font-mono text-accent-gold leading-none">{fact.k}</p>
                  <p className="text-[11px] font-semibold mt-1">{fact.label}</p>
                  <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{fact.d}</p>
                </div>
              ))}
            </div>
            <Link href="#proof" className="mt-3 inline-block text-[11px] font-semibold text-accent-gold hover:underline">
              Open the performance ledger →
            </Link>
          </div>

          <div className="card">
            <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Membership</p>
            <p className="text-sm font-bold mt-1">₦{OFFER.ngn.toLocaleString('en-NG')} / {OFFER.days} days</p>
            <p className="text-[11px] text-text-muted mt-0.5">
              or US${OFFER.usd} / {OFFER.days} days — the payment page shows the amount for your method
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-text-secondary leading-relaxed">
              <li>• {OFFER.days} days of access from a verified payment</li>
              <li>• No automatic renewal — you choose to pay again</li>
              <li>• Verification before a single-use invite is issued</li>
              <li>• Founding cohort capped at {OFFER.foundingCap} members · official launch planned</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}
