import Link from 'next/link'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const INCLUDED = [
  'Access to the private L2 Signals group for the paid period',
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
    <section id="access" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Access</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">Private, by invitation — and agreed before money moves</h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              The business does not publish a price for L2 Signals. Access is offered to invited members only, and
              the fee, period and payment methods are shown on the payment page{' '}
              <span className="font-semibold text-text-primary">after</span> you have read the risk disclosure and
              accepted the terms. Nothing is charged to browse, and no payment page is reachable by guesswork.
            </p>

            <div className="mt-3 rounded-xl p-3" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.18)' }}>
              <p className="text-[11px] font-semibold text-accent-gold">The order of events</p>
              <ol className="mt-1.5 space-y-1 text-[11px] text-text-secondary leading-relaxed list-decimal ml-4">
                <li>You request an invitation and speak to the business directly.</li>
                <li>You read the Terms, the Trading Risk Disclosure and the subscription documents.</li>
                <li>You accept them. The acceptance is recorded with the date, time and document versions.</li>
                <li>Only then is the fee shown, and only then can a payment be made.</li>
                <li>The payment is verified before a personal, single-use invitation is issued.</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
              <a
                href="mailto:l2signalslab@gmail.com?subject=L2%20Signals%20invitation%20request"
                className="btn-primary rounded-full px-6 py-2.5 text-xs justify-center"
              >
                Request an invite
              </a>
              <Link href="/pay" className="btn-secondary rounded-full px-6 py-2.5 text-xs justify-center">
                Already invited? Activate access
              </Link>
            </div>

            <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
              No automatic renewal. A new payment is required for another period. Access is personal and is
              activated after verification — never from a success redirect alone.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl p-3" style={CARD}>
              <p className="text-[10px] tracking-[0.14em] uppercase text-accent-gold">What access includes</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-accent-gold">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3" style={CARD}>
              <p className="text-[10px] tracking-[0.14em] uppercase text-status-warn">What it does not include</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-status-warn">•</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-3 sm:col-span-2" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.18)' }}>
              <p className="text-[11px] font-semibold text-accent-gold">Founding-member condition</p>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">
                A founding member with an eligible first paid period may receive one additional month of access if
                the official cumulative Net R for the calendar month in which that period begins is below zero. It
                is a one-time access benefit, not a cash refund, it does not recur, and it is measured from the
                official engine record — not your account. Full conditions are in the Founding Members Programme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
