import { RISK_NOTICE } from '../data/business'
import StudyChart from './StudyChart'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

// Measured by scripts/pooled-study-stats.cjs from the per-year audit runs.
// Combined book (directional + mean reversion), live cadence, spread and
// slippage deducted, a full win credited its OWN target.
const YEARS = [
  { y: '2021 (H2)', n: '422', wr: '50.8%', pf: '1.29', r: '+0.12', net: '+51.5R' },
  { y: '2022', n: '910', wr: '52.5%', pf: '1.42', r: '+0.17', net: '+155.9R' },
  { y: '2023', n: '1,048', wr: '47.5%', pf: '1.10', r: '+0.04', net: '+46.9R' },
  { y: '2024', n: '1,194', wr: '51.3%', pf: '1.34', r: '+0.14', net: '+168.3R' },
  { y: '2025', n: '1,201', wr: '51.3%', pf: '1.42', r: '+0.17', net: '+201.8R' },
  { y: '2026', n: '1,035', wr: '48.1%', pf: '1.33', r: '+0.13', net: '+139.2R' },
]

// Same figures as the table above, cumulative, for the chart. Kept beside the
// table rather than derived from it so a typo in one is visible in the other.
const STUDY_POINTS = [
  { label: '’21 H2', netR: 51.5, cumulativeR: 51.5 },
  { label: '’22', netR: 155.9, cumulativeR: 207.4 },
  { label: '’23', netR: 46.9, cumulativeR: 254.3 },
  { label: '’24', netR: 168.3, cumulativeR: 422.6 },
  { label: '’25', netR: 201.8, cumulativeR: 624.4 },
  { label: '’26', netR: 139.2, cumulativeR: 763.5 },
]

const POOLED = [
  { k: '5,810', label: 'trades studied' },
  { k: '50.2%', label: 'win rate on decided' },
  { k: '+0.13R', label: 'per trade' },
  { k: '5.4 yrs', label: 'Jul 2021 → Nov 2026' },
]

/**
 * The back-tested study, published separately from the live ledger.
 *
 * Everything here is back-test data. It is never combined with the live
 * execution ledger, and it is never presented as a live result or as a promise.
 *
 * The figures are what the CURRENT rule set produces when it is scored the way
 * the live ledger scores it: a full win pays the trade's own target (typically
 * 1.3R) rather than a fixed number, and costs are deducted. That is why they are
 * lower than a fixed-payoff run of the same engine would report — and why they
 * are the ones worth publishing.
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
            <h2 className="text-lg sm:text-xl font-bold mt-1">Five and a half years of broker data</h2>
          </div>
          <span className="badge-info text-[9px]">BACK-TESTED — not a live result</span>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
          The engine was replayed over native M15, H1, H4 and D1 data exported from a MetaTrader 5 broker feed
          (Exness, XAU/USD), July 2021 to November 2026 — a rally, a bear market and two years of chop, with every
          year measured separately so a single good period cannot carry the result. Trades were taken at the same
          cadence the live engine uses (30-minute cooldown, eight a day), so what is counted is the daily working
          book rather than every setup the rules could theoretically fire.
        </p>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {POOLED.map((item) => (
            <div key={item.k} className="rounded-xl p-2.5" style={CARD}>
              <p className="text-base font-bold font-mono text-accent-gold leading-none">{item.k}</p>
              <p className="text-[10px] text-text-muted mt-1">{item.label}</p>
            </div>
          ))}
        </div>

        <StudyChart points={STUDY_POINTS} />

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-[11px] font-mono min-w-[560px]">
            <thead>
              <tr className="text-text-muted text-[10px] uppercase tracking-[0.1em]">
                <th className="text-left py-1.5">Year</th>
                <th className="text-right py-1.5">Trades</th>
                <th className="text-right py-1.5">Win rate</th>
                <th className="text-right py-1.5">Profit factor</th>
                <th className="text-right py-1.5">Avg R</th>
                <th className="text-right py-1.5">Net R</th>
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
                  <td className="py-1.5 text-right text-text-secondary">{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 rounded-xl p-3" style={CARD}>
          <p className="text-[10px] uppercase tracking-[0.12em] text-text-muted mb-1.5">How these are measured</p>
          <ul className="text-[11px] text-text-secondary leading-relaxed space-y-1">
            <li>
              <span className="text-text-primary">A win pays its own target.</span> A full win is credited the R
              multiple the trade was actually planned for — typically 1.3R — not a fixed figure. A loss is −1.00R.
            </li>
            <li>
              <span className="text-text-primary">Costs are deducted.</span> $0.40 spread and $0.10 slippage come out
              of every entry. On 15-minute gold that is roughly a tenth of each unit of risk, and it is why the
              numbers are what they are.
            </li>
            <li>
              <span className="text-text-primary">Unfilled setups are not trades.</span> A pending order that never
              triggers is recorded and excluded from the win rate, never scored as a win.
            </li>
            <li>
              <span className="text-text-primary">Two books, not one.</span> A directional book plus a
              mean-reversion book that only trades when directional energy is low. They are measured together
              because they are traded together.
            </li>
          </ul>
        </div>

        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          The edge is in the payoff ratio, not the hit rate: at a 1.25:1 average payoff the break-even win rate is
          44%, so a 50% book earns and a 44% book does not. The worst period in the table is 2023 — 47.5% win rate,
          a 31-loss run, a 66R drawdown — and it still finished +47R, because the book was sized to sit through it.
          That is the operating shape: long flat stretches, small average gains, and a drawdown deep enough that
          position size determines survival. The data is native history from a demo broker server — real bars and
          real cadence, but not an audited statement, and it has not been repeated on a live account. A fixed rule
          set applied to historical data cannot be reproduced on demand and does not predict the next month.
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
