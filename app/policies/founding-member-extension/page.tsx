import type { Metadata } from 'next'
import PolicyShell from '../../../components/PolicyShell'
import { POLICIES } from '../../../data/policies'

export const metadata: Metadata = {
  title: 'Founding Member Extension Policy',
  description: 'The conditions under which an eligible founding member receives one additional month of L2 Signals access when the official monthly net R is zero or negative.',
}

const pdf = POLICIES.find(p => p.slug === 'founding-member-extension')?.pdf
const row = (label: string, value: string, accent = false) => (
  <>
    <div className="p-2.5 border-t" style={{ borderColor: 'var(--glass-border)' }}>{label}</div>
    <div className={`p-2.5 border-t ${accent ? 'text-accent-gold font-semibold' : ''}`} style={{ borderColor: 'var(--glass-border)' }}>{value}</div>
  </>
)

export default function FoundingMemberExtensionPage() {
  return (
    <PolicyShell
      slug="founding-member-extension"
      title="Founding Member Extension Policy"
      pdf={pdf}
      intro={
        <>
          This policy defines the conditions under which an eligible founding member may receive one additional month
          of L2 Signals subscription access. The extension is a defined service benefit based on the official
          performance of the signal engine during the applicable measurement period. It is not a cash refund,
          reimbursement of personal trading losses, or guarantee of future profitability.
        </>
      }
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. Purpose</h2>
        <p>The extension provides a defined service benefit based on the official performance of the L2 Signals signal engine during the applicable measurement period.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Eligibility</h2>
        <p>The extension is available exclusively to eligible participants in the Founding Members Programme, which is limited to a maximum of 50 founding members. To qualify, a member must have an eligible first paid subscription and comply with the applicable programme terms. It may be granted only once per member and does not apply to subsequent paid months.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. Performance measurement period</h2>
        <p>Official performance is measured using calendar months — each period runs from 00:00 on the first day to 23:59:59 on the final day of the month, using West Africa Time (WAT, UTC+1). Monthly net R resets to zero at the start of each new month.</p>
        <p className="mt-2">The measurement period does not shift according to an individual member&apos;s activation, renewal or payment date. A member who subscribes or pays partway through a month is assessed against the official performance for the applicable calendar month, subject to the programme&apos;s eligibility rules. The detailed methodology is in the Performance Measurement Policy.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Official performance determines eligibility</h2>
        <p>Eligibility is determined exclusively by the official cumulative net R recorded by the signal engine for the applicable period. Members&apos; personal account results — balances, monetary profit/loss, personal net R, win rates and execution outcomes — are not used. The official calculation is independent of the founder&apos;s personal trading account, ensuring decisions follow the systematic engine&apos;s recorded outcomes rather than discretionary decisions.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Eligibility thresholds</h2>
        <p>Once the monthly performance result has been finalised:</p>
        <div className="mt-2 overflow-hidden rounded-xl" style={{ border: '1px solid var(--glass-border)' }}>
          <div className="grid grid-cols-2 text-xs">
            <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Official monthly net R</div>
            <div className="p-2.5 font-semibold" style={{ background: 'rgb(var(--surface-overlay-rgb))' }}>Extension decision</div>
            {row('Below 0R', 'Eligible for one additional month', true)}
            {row('Exactly 0R', 'Eligible for one additional month', true)}
            {row('Above 0R', 'Not eligible')}
          </div>
        </div>
        <p className="mt-2">A confirmed official net R of zero or below qualifies. Eligibility is not determined by the number of winning or losing signals alone, but by the final official net R calculation. Examples: −3R qualifies; 0R qualifies; +2.5R does not; a month with no eligible completed signals gives 0R and qualifies (provided no unresolved signals could affect the calculation).</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. Month-end finalisation</h2>
        <p>The calculation begins at the end of the final calendar day of the month. Signals published during the period that remain open at the cutoff continue to be tracked until their outcomes are finalised, and the monthly result remains provisional while signals are unresolved. Eligibility is confirmed only after the official monthly result is finalised. Signals are attributed to the month in which they were published; an outcome finalised in the following month does not transfer the signal to that month&apos;s calculation. This prevents decisions being based on incomplete results.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Extension benefit</h2>
        <p>An eligible founding member receives one additional month of access to the designated members-only service. For clarity, that additional access period equals the current standard subscription period (currently 31 days), unless the applicable programme terms state otherwise. The extension provides additional access without an additional charge for that period, does not constitute a cash refund, does not reimburse personal trading losses, does not guarantee that future signals will be profitable, does not guarantee a minimum number of signals during the period, and does not create a recurring entitlement to additional free months.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Timing of the extension</h2>
        <p>Eligibility is determined after the official monthly net R is finalised. L2 Signals communicates the result to eligible members through the designated official channel, and the additional access period begins after eligibility is confirmed and the extension activated. If finalisation is delayed because signals remain unresolved, activation may also be delayed; material delays and expected arrangements are communicated to affected members. The activation and expiry dates are recorded in the subscription administration records.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Member execution responsibility</h2>
        <p>The extension is based on official performance, not on individual account outcomes. Members are responsible for following published entry conditions, stop-loss, take-profit and subsequent updates. If a member changes a take-profit, widens or removes a stop-loss, enters at a different price, ignores a cancellation, or otherwise deviates, the resulting personal outcome does not change the official signal result. A personal trading loss does not independently establish eligibility if the official monthly net R is positive. This applies consistently to all eligible founding members.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. No-signal periods</h2>
        <p>Signals are generated only when the predefined strategy conditions and filters are satisfied; the platform is not required to generate signals every day or to create trades to maintain activity. If no eligible completed signals are recorded during the month, the official net R is zero (provided no unresolved signals remain that could affect the calculation), which qualifies an eligible founding member for the one-time extension.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. No cash alternative</h2>
        <p>The extension is a service-access benefit with no cash alternative. A qualifying member cannot request a cash payment in place of the additional access month. It does not represent compensation for personal trading losses or an admission that an individual outcome should have matched the official signal outcome. Any rights that cannot lawfully be excluded remain unaffected.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">12. Cancellation and renewal</h2>
        <p>After the additional access month, the member may choose whether to renew at the applicable published price. The extension does not automatically entitle the member to further free access periods. If the member chooses not to renew, access may expire at the end of the extension period in accordance with the subscription terms. Cancellation does not change the official performance calculation or the eligibility determination.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">13. Records and disputes</h2>
        <p>L2 Signals maintains records supporting extension decisions — the applicable calendar-month measurement period, official signal outcomes and R values, the final monthly net R calculation, the eligibility decision, the date it was communicated, and the activation and expiry dates where applicable. A member who disputes a decision may request a review through the designated official contact channel. Reviews use the official signal records and applicable published policies, and any correction must be supported by the official records and applied consistently.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">14. Relationship with other policies</h2>
        <p>This policy is read alongside the Founding Members Programme, Subscription Terms &amp; Conditions, Performance Measurement Policy, Signal Access &amp; Delivery Policy, and Trading Risk Disclosure. If policies contain inconsistent provisions concerning extension eligibility or calculation, L2 Signals must resolve the inconsistency before relying on the affected provision.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">15. Acknowledgement</h2>
        <p>Participation in the Founding Members Programme constitutes acknowledgement that the extension is conditional and available only once; official monthly net R determines eligibility; a confirmed net R of zero or below qualifies an eligible founding member; individual account results do not determine eligibility; the measurement cycle follows calendar months regardless of individual payment timing; the final monthly calculation may be delayed until outstanding signals are resolved; the extension provides additional service access rather than cash compensation; and future signals and outcomes are not guaranteed.</p>
      </section>
    </PolicyShell>
  )
}
