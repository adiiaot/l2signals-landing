import Link from 'next/link'
import { OFFER } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const INCLUDED = [
  `${OFFER.days} days of access to the private L2 Signals Telegram group`,
  'Intraday XAU/USD setups with direction, order type, entry, stop and target',
  'Trade-management and expiry instructions where applicable',
  'Access to the official monthly performance record',
]

const NOT_INCLUDED = [
  'Ownership of the software, strategy or brand',
  'A managed account or custody of your funds',
  'A guaranteed win rate, income or funding outcome',
  'A right to share, resell or redistribute signals',
]

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">L2 Signals subscription</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">One product. One 31-day price.</h2>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <p className="text-2xl sm:text-3xl font-bold font-mono">₦{OFFER.ngn.toLocaleString('en-NG')}</p>
              <p className="text-sm text-text-muted mb-1">/ {OFFER.days} days · naira payments</p>
            </div>
            <p className="text-sm font-semibold font-mono text-accent-gold mt-1">US${OFFER.usd} / {OFFER.days} days · US dollar payments</p>
            <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
              The payment page shows the exact amount and currency for the method you choose and recalculates
              it from the configured plan before checkout. It is never taken from the browser. Online
              checkout, crypto and Nigerian bank transfer are shown only when the corresponding rail is
              configured.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
              <Link href="/pay" className="btn-primary rounded-full px-6 py-2.5 text-xs justify-center">
                Subscribe — go to payment
              </Link>
              <Link href="/policies/subscription-terms" className="btn-secondary rounded-full px-6 py-2.5 text-xs justify-center">
                Subscription terms
              </Link>
              <Link href="/policies/refunds-and-cancellations" className="btn-secondary rounded-full px-6 py-2.5 text-xs justify-center">
                Refunds &amp; cancellation
              </Link>
            </div>

            <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
              No automatic renewal. A new payment is required for another period. Access is personal and is
              activated after verification — never from a success redirect alone.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl p-3" style={CARD}>
              <p className="text-[10px] tracking-[0.14em] uppercase text-accent-gold">What you get</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-accent-gold">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3" style={CARD}>
              <p className="text-[10px] tracking-[0.14em] uppercase text-status-warn">What you do not get</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-status-warn">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3 sm:col-span-2" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.18)' }}>
              <p className="text-[11px] font-semibold text-accent-gold">Founding-member condition</p>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">
                Founding membership is capped at {OFFER.foundingCap} members. A founding member with an
                eligible first paid subscription may receive one additional month of access if the official
                cumulative Net R for the calendar month in which that period begins is zero or below. It is a
                one-time access benefit, not a cash refund, and it does not recur. It is measured from the
                official engine record, not your account.{' '}
                <Link href="/policies/founding-members-programme" className="font-semibold text-accent-gold hover:underline">
                  Read the conditions →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
