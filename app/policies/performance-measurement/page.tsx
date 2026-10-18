import type { Metadata } from 'next'
import PolicyShell from '../../../components/PolicyShell'
import { POLICIES } from '../../../data/policies'

export const metadata: Metadata = {
  title: 'Performance Measurement Policy — L2 Signals',
  description: 'How L2 Signals records official signal outcomes, calculates calendar-month net R in WAT (UTC+1), and determines founding-member extension eligibility.',
}

const pdf = POLICIES.find(p => p.slug === 'performance-measurement')?.pdf
const row = (label: string, value: string, accent = false) => (
  <>
    <div className="p-2.5 border-t" style={{ borderColor: 'var(--glass-border)' }}>{label}</div>
    <div className={`p-2.5 border-t ${accent ? 'text-accent-gold font-semibold' : ''}`} style={{ borderColor: 'var(--glass-border)' }}>{value}</div>
  </>
)

export default function PerformanceMeasurementPage() {
  return (
    <PolicyShell
      title="Performance Measurement Policy"
      pdf={pdf}
      intro={
        <>
          This policy establishes how L2 Signals records official signal outcomes, calculates monthly net R, and
          determines eligibility for the founding-member subscription extension. Performance is measured
          consistently from the signal engine — never from individual trading account results or discretionary
          trading decisions.
        </>
      }
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. Purpose</h2>
        <p>The policy keeps performance measurement consistent and engine-based. Official net R is determined by the signal engine&apos;s recorded outcomes, not by trades in the founder&apos;s or members&apos; accounts. This separation is intentional: manual interventions and discretionary management must not determine reported performance.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Official performance measurement</h2>
        <p>Official performance uses the outcomes recorded by the signal engine under its predefined strategy rules, following its documented entry conditions, stop-loss, take-profit and trade-management rules. Any corrections must be supported by the official signal records and relevant market data.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. Understanding R</h2>
        <p>R represents the initial risk of a signal, based on its predefined entry and stop-loss. A result is measured relative to that initial risk, not a fixed monetary amount:</p>
        <ul className="list-disc ml-4 space-y-1 mt-1">
          <li>A loss equal to the initial risk is recorded as −1R.</li>
          <li>A profit equal to twice the initial risk is recorded as +2R.</li>
          <li>A profit equal to half the initial risk is recorded as +0.5R.</li>
          <li>A breakeven result is recorded as 0R.</li>
        </ul>
        <p className="mt-2">Two members can obtain different monetary results from the same signal while the official result remains unchanged.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Monthly measurement cycle</h2>
        <p>Each period runs from 00:00 on the first day to 23:59:59 on the final day of the calendar month, using West Africa Time (WAT, UTC+1). Monthly net R resets to zero at the start of each new month; the previous month&apos;s result remains in the historical record but does not carry forward.</p>
        <p className="mt-2">The measurement calendar is independent of individual subscription dates and payment timing. A member who subscribes mid-month falls under that month&apos;s calculation; renewing early or paying late does not shift the period or create a separate personal calculation. The same official monthly result applies to all members assessed under that calendar month, subject to the applicable subscription and payment terms.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Month-end calculation and finalisation</h2>
        <p>The monthly calculation begins at the end of the final calendar day of the month. Signals still open at the cutoff continue to be tracked under the engine&apos;s trade-management rules until their outcomes are finalised — a signal is not arbitrarily classified as a win or loss just because the month ended. The result remains provisional while relevant signals are unresolved, and is confirmed once outcomes are finalised.</p>
        <p className="mt-2">Signals are attributed to the month in which they were officially published, according to their published timestamps. A signal published in one month does not move to the next month merely because its outcome is finalised later.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. Calculating monthly net R</h2>
        <p>Monthly net R is the sum of the official R outcomes of all eligible signals attributed to that calendar month.</p>
        <p className="mt-2 font-mono text-[11px] sm:text-xs text-accent-gold">Monthly Net R = Σ official R outcomes of eligible signals attributed to the month</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--glass-border)' }}>
            <div className="grid grid-cols-2 text-xs">
              <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Example A</div>
              <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Outcome</div>
              {row('Signal 1', '+2R')}
              {row('Signal 2', '−1R')}
              {row('Signal 3', '+1.5R')}
              {row('Signal 4', '−2R')}
              {row('Signal 5', '+1R')}
              {row('Monthly net R', '+1.5R', true)}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--glass-border)' }}>
            <div className="grid grid-cols-2 text-xs">
              <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Example B</div>
              <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Outcome</div>
              {row('Signal 1', '+1R')}
              {row('Signal 2', '−2R')}
              {row('Signal 3', '−1R')}
              {row('Signal 4', '+0.5R')}
              {row('Monthly net R', '−1.5R', true)}
            </div>
          </div>
        </div>
        <p className="mt-2">The calculation is based on R outcomes, not simply the number of winning and losing signals.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Eligible and ineligible signal outcomes</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li><b className="text-text-primary">Completed</b> — a signal with a final outcome under the engine&apos;s rules is included in monthly net R.</li>
          <li><b className="text-text-primary">Unfilled</b> — a signal whose entry conditions were never met is recorded as unfilled; not automatically a loss and contributes no completed-trade R.</li>
          <li><b className="text-text-primary">Cancelled</b> — a signal officially cancelled before entry conditions are met is recorded as cancelled and excluded from completed results, with the reason retained.</li>
          <li><b className="text-text-primary">Breakeven</b> — a completed signal whose official outcome is breakeven contributes 0R.</li>
          <li><b className="text-text-primary">Unresolved</b> — a signal whose outcome is not finalised is recorded as unresolved until determined, handled under the month-end procedure.</li>
          <li><b className="text-text-primary">Partial outcomes / trade management</b> — where the engine permits partial exits or stop adjustments, the official outcome reflects those predefined rules, applied consistently and never changed after a result becomes known.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Member execution responsibility</h2>
        <p>Members are expected to follow published instructions and updates — direction, entry conditions, stop-loss, take-profit, trade-management instructions, cancellations and subsequent updates. Members remain responsible for their own execution. Deviations such as entering at a different price or time, widening or removing a stop, moving the take-profit, closing early, or ignoring updates may cause a personal result to differ — but do not change the official R. If the engine records a signal reaching its take-profit or stop-loss under the applicable rules, that official outcome is the basis of the platform record, and individual account performance is never used to determine official net R or extension eligibility.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. No-signal periods</h2>
        <p>L2 Signals operates according to predefined strategy conditions and filters, and may go days or weeks without a valid signal. Signals are not generated simply to maintain activity. Days without eligible completed signals add no R; if no eligible completed signals are recorded for a month, the official monthly net R is 0R (subject to unresolved signals). Under the current extension rule, a confirmed 0R qualifies for the one-time extension.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. Founding-member extension eligibility</h2>
        <p>Eligibility is determined using the official net R for the applicable first paid subscription month, finalised under the month-end procedure. It is governed by the Founding Members Programme and the Founding Member Extension Policy.</p>
        <div className="mt-2 overflow-hidden rounded-xl" style={{ border: '1px solid var(--glass-border)' }}>
          <div className="grid grid-cols-2 text-xs">
            <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Official monthly net R</div>
            <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Extension eligibility</div>
            {row('Below 0R', 'Eligible', true)}
            {row('Exactly 0R', 'Eligible', true)}
            {row('Above 0R', 'Not eligible')}
          </div>
        </div>
        <p className="mt-2">The extension is available once, applies after the first paid subscription month, does not recur, provides additional service access, is not a cash refund, and does not guarantee future profitability. If a member&apos;s account is profitable while the official net R is zero or negative, the official result governs; if a member personally loses money while the official net R is positive, that individual loss does not establish eligibility.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Performance records and auditability</h2>
        <p>L2 Signals maintains an official record sufficient to substantiate reported outcomes and monthly net R calculations — including unique signal IDs, publication timestamps, instrument and direction, published entry conditions, stop-loss and take-profit, official updates and cancellations, final status, official R outcome, monthly attribution, and calculation and correction records. Where practical, a monthly net R result can be traced back to the individual signal outcomes that produced it. Corrections must be supported by the official record, applied consistently, and never made merely to alter extension eligibility.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">12. Limitations of official performance</h2>
        <p>The official record measures the signal engine under its defined rules and does not guarantee that members obtain identical results. Differences may arise from broker pricing and execution, spread and slippage, order delays or rejections, fees and commissions, sizing and leverage, personal trade-management decisions, and differences between the engine&apos;s reference data and a member&apos;s broker feed. L2 Signals must accurately distinguish backtested, forward-tested and live-market results when presenting performance, and the official record must not be represented as proof of personal profits guaranteed to members.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">13. Policy changes and consistency</h2>
        <p>This policy is read alongside the Founding Members Programme, Founding Member Extension Policy, Subscription Terms &amp; Conditions, Signal Access &amp; Delivery Policy, and Trading Risk Disclosure. Calculation rules are applied consistently; material changes to methodology are documented and communicated, and are not applied retroactively to change a previously determined extension outcome.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">14. Member acknowledgement</h2>
        <p>By subscribing, members acknowledge that official performance is calculated from the engine&apos;s recorded outcomes; monthly net R resets each calendar month; the measurement period is independent of individual subscription and payment timing; signals open at month-end remain subject to finalisation; members are responsible for their own execution and trade management; personal deviations do not alter official outcomes; a confirmed 0R or below qualifies for the extension only under the eligibility rules; signal generation is conditional on market conditions and the strategy rules; and official performance does not guarantee that every member obtains the same result in their own account.</p>
      </section>
    </PolicyShell>
  )
}
