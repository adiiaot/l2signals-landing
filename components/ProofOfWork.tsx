import Link from 'next/link'
import { POSITIONING, RISK_NOTICE } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const EVIDENCE = [
  {
    k: 'A running engine',
    d: 'A rules-based intraday XAU/USD engine with three strategy types, direction-aware routing, published order types, stop-loss and target logic, and a daily close window.',
  },
  {
    k: 'A private community',
    d: 'Delivery, membership, access control and payment verification built and operated in-house — the plumbing a paid product needs, not a mock-up.',
  },
  {
    k: 'A published record',
    d: 'A live execution ledger and a back-tested study, labelled separately, including the losses and the unfilled setups.',
  },
  {
    k: 'A member application',
    d: 'Signal history, official outcomes against a personal execution record, journals, trade logs and strategy analytics.',
  },
]

export default function ProofOfWork() {
  return (
    <section id="proof-of-work" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
              Proof of work · not a product pitch
            </p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">
              We build the systems, then we run one of our own.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">{POSITIONING}</p>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              Access to L2 Signals is by invitation and is not open to the public. It is described here because a
              claim to build signal engines should be checkable, not because the business is selling subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
              <Link href="/signals" className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center">
                View L2 Signals
              </Link>
              <Link href="/services" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
                See what we build for clients
              </Link>
              <Link href="/quote" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
                Request a quote
              </Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {EVIDENCE.map((item) => (
              <div key={item.k} className="rounded-xl p-3" style={CARD}>
                <p className="text-[11px] font-semibold">{item.k}</p>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{item.d}</p>
              </div>
            ))}
            <p
              className="rounded-xl p-3 sm:col-span-2 text-[10px] text-text-muted leading-relaxed"
              style={{ background: 'rgba(var(--status-warn-rgb),0.05)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}
            >
              {RISK_NOTICE}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
