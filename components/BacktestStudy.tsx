import { RISK_NOTICE } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const YEARS = [
  { y: '2022 (H2)', n: '1,767', wr: '66.2%', pf: '3.63', r: '+0.77' },
  { y: '2023', n: '4,713', wr: '59.6%', pf: '2.70', r: '+0.55' },
  { y: '2024', n: '4,921', wr: '64.5%', pf: '3.39', r: '+0.70' },
  { y: '2025', n: '4,757', wr: '65.6%', pf: '3.55', r: '+0.72' },
  { y: '2026', n: '4,079', wr: '69.8%', pf: '4.28', r: '+0.77' },
]

const POOLED = [
  { k: '20,237', label: 'signals studied' },
  { k: '64.8%', label: 'win rate on decided' },
  { k: '+0.69R', label: 'per signal' },
  { k: '4.25 yrs', label: 'Jul 2022 → Oct 2026' },
]

/**
 * The back-tested study, published separately from the live ledger.
 *
 * Everything here is back-test data. It is never combined with the live
 * execution ledger, and it is never presented as a live result or as a promise.
 */
export default function BacktestStudy() {
  return (
    <section id="backtest" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
              Back-tested study · separate from the live ledger
            </p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">4.25 years of broker data</h2>
          </div>
          <span className="badge-info text-[9px]">BACK-TESTED — not a live result</span>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
          The engine was replayed over native M15, H1, H4 and D1 data exported from a MetaTrader 5 broker feed
          (Exness, XAU/USD) covering July 2022 to October 2026. Every signal in the window was taken — the study
          was not capped — and each year was measured separately so a single good period could not carry the
          result.
        </p>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {POOLED.map((item) => (
            <div key={item.k} className="rounded-xl p-2.5" style={CARD}>
              <p className="text-base font-bold font-mono text-accent-gold leading-none">{item.k}</p>
              <p className="text-[10px] text-text-muted mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-[11px] font-mono min-w-[520px]">
            <thead>
              <tr className="text-text-muted text-[10px] uppercase tracking-[0.1em]">
                <th className="text-left py-1.5">Year</th>
                <th className="text-right py-1.5">Signals</th>
                <th className="text-right py-1.5">Win rate</th>
                <th className="text-right py-1.5">Profit factor</th>
                <th className="text-right py-1.5">Avg R</th>
              </tr>
            </thead>
            <tbody>
              {YEARS.map((row) => (
                <tr key={row.y} className="border-t" style={{ borderColor: 'var(--glass-border)' }}>
                  <td className="py-1.5 text-text-primary">{row.y}</td>
                  <td className="py-1.5 text-right text-text-secondary">{row.n}</td>
                  <td className="py-1.5 text-right text-text-secondary">{row.wr}</td>
                  <td className="py-1.5 text-right text-text-secondary">{row.pf}</td>
                  <td className="py-1.5 text-right text-accent-gold">{row.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          Win rate is measured on decided signals only (14,239 of the 20,237). Unfilled pending orders are
          recorded but count as neither a win nor a loss. The data came from a demo broker server; it is
          directionally trustworthy but is not an audited statement, and the study has not been repeated on a live
          account. Back-test results are the product of a fixed rule set applied to historical data — they cannot
          be reproduced on demand and do not predict what the engine will do next. Different windows of the same
          engine have produced materially different numbers, and those are published rather than hidden.
        </p>

        <p
          className="mt-3 rounded-xl p-3 text-[10px] text-text-muted leading-relaxed"
          style={{ background: 'rgba(var(--status-warn-rgb),0.05)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}
        >
          {RISK_NOTICE}
        </p>
      </div>
    </section>
  )
}
