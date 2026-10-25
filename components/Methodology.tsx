import Link from 'next/link'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const RULES = [
  { t: 'What counts', d: 'A signal contributes only if it is eligible and its official outcome is final: full target, a positive result of at least +1R, a loss, or breakeven.' },
  { t: 'What does not count', d: 'An unfilled signal is recorded and reported, but contributes no R. A cancelled signal is excluded and the reason is retained.' },
  { t: 'Which month', d: 'Signals are attributed to the month they were published, in West Africa Time (UTC+1), even if the outcome is finalised later.' },
  { t: 'When it is final', d: 'A month stays provisional while eligible signals are unresolved. The result is confirmed only after those outcomes are finalised.' },
]

export default function Methodology() {
  return (
    <section id="methodology" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Performance &amp; methodology</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">How the record is measured</h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              Official performance is calculated from the signal engine&apos;s recorded outcomes and the market
              data used to score them. It is not calculated from the founder&apos;s account, a member&apos;s
              account or a broker statement. That separation is deliberate: it stops a single person&apos;s
              execution from rewriting the official record.
            </p>
            <div className="mt-3 rounded-xl p-3 font-mono text-[11px] sm:text-xs text-accent-gold" style={CARD}>
              Monthly Net R = Σ official R outcomes of eligible signals attributed to the month
            </div>
            <p className="text-[11px] text-text-muted mt-3 leading-relaxed">
              Win rate is reported on decided signals; profit factor is gross R won divided by gross R lost.
              Unfilled signals are shown separately and never counted as wins or losses. Backtest, forward-test
              and live results are labelled separately and are not merged into one figure.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Link href="/policies/performance-measurement" className="text-[11px] font-semibold text-accent-gold hover:underline">
                Full measurement policy →
              </Link>
              <Link href="/policies/founding-member-extension" className="text-[11px] font-semibold text-accent-gold hover:underline">
                Extension eligibility →
              </Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {RULES.map((rule) => (
              <div key={rule.t} className="rounded-xl p-3" style={CARD}>
                <p className="text-[11px] font-semibold">{rule.t}</p>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{rule.d}</p>
              </div>
            ))}
            <div className="rounded-xl p-3 sm:col-span-2" style={{ background: 'rgba(var(--status-warn-rgb),0.06)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}>
              <p className="text-[11px] font-semibold text-status-warn">Official ≠ your account</p>
              <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">
                Your entry price, spread, slippage, size, partials and broker can produce a different result
                from the official one. A personal loss does not change the official outcome, and an official
                win does not guarantee that you personally profited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
