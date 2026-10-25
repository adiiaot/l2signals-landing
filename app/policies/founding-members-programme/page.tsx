import type { Metadata } from 'next'
import PolicyShell from '../../../components/PolicyShell'
import { POLICIES } from '../../../data/policies'

export const metadata: Metadata = {
  title: 'Founding Members Programme',
  description: 'The L2 Signals Founding Members Programme: an early-access membership open ahead of the 2027 launch target, capped at 50 members, with details on pricing, access and the performance-based extension.',
}

const pdf = POLICIES.find(p => p.slug === 'founding-members-programme')?.pdf
const box = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

export default function FoundingMembersProgrammePage() {
  return (
    <PolicyShell
      slug="founding-members-programme"
      title="Founding Members Programme"
      pdf={pdf}
      intro={
        <>
          The Founding Members Programme is an early-access membership for traders who want access to the platform&apos;s
          systematic intraday signals while L2 Signals continues to develop its technology, validate its strategies and
          improve delivery infrastructure. It is open while places remain, with an official launch target of 1 January 2027.
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="rounded-xl p-3" style={box}><p className="text-[10px] tracking-[0.14em] text-text-muted uppercase">Programme status</p><p className="text-sm font-bold mt-1">Early access — places open</p></div>
        <div className="rounded-xl p-3" style={box}><p className="text-[10px] tracking-[0.14em] text-text-muted uppercase">Membership capacity</p><p className="text-sm font-bold mt-1">50 members maximum</p></div>
        <div className="rounded-xl p-3" style={box}><p className="text-[10px] tracking-[0.14em] text-text-muted uppercase">Service</p><p className="text-sm font-bold mt-1">Premium access to L2 Signals</p></div>
      </div>

      <section>
        <h2 className="text-sm font-bold text-text-primary mt-4">1. Programme overview</h2>
        <p>L2 Signals is being developed to provide a structured, rules-based approach to intraday trading through a deterministic signal engine that identifies opportunities using predefined market conditions and technical filters. The founding programme introduces a limited group of members to the service while the platform continues to develop. Founding members receive access to the designated signal group and the benefits expressly described in this document and the applicable policies.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Membership capacity</h2>
        <p>Founding membership is limited to a maximum of 50 members. Availability is determined by the number of places remaining. Joining the waitlist or expressing interest does not constitute a paid subscription or guarantee membership — a place is confirmed only after the applicable payment is verified. L2 Signals may close registration when capacity is reached.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. Subscription pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="rounded-xl p-3" style={box}><p className="text-[10px] tracking-[0.14em] text-text-muted uppercase">Naira payments</p><p className="text-lg font-bold font-mono text-accent-gold mt-1">₦50,000</p><p className="text-[11px] text-text-muted">per 31-day access period</p></div>
          <div className="rounded-xl p-3" style={box}><p className="text-[10px] tracking-[0.14em] text-text-muted uppercase">US dollar payments</p><p className="text-lg font-bold font-mono text-accent-gold mt-1">US$40</p><p className="text-[11px] text-text-muted">per 31-day access period</p></div>
        </div>
        <p className="mt-2">The payment page shows the exact amount and currency for the method you select before you pay. Accepted methods may include Nigerian naira, US dollars and supported cryptocurrencies. Where crypto is accepted, the amount, supported network, address and requirements are communicated through official instructions — members must ensure payments use the correct asset, network and details.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Membership access</h2>
        <p>A confirmed founding member receives access to the designated L2 Signals signal group for the duration of their active subscription. The service may include the instrument and direction, proposed entry price or zone, stop-loss, take-profit level(s), signal status and updates, and other trading information made available. The exact signal format and delivery process are described before payment and in the private group.</p>
        <p className="mt-2">Membership provides access to the signal service. It does not automatically include unrestricted access to the underlying application, source code, internal strategy parameters, administrative tools or signal-generation infrastructure. Additional features are included only where expressly stated in the applicable membership offer.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Founding member performance-based extension</h2>
        <p>L2 Signals will provide eligible founding members with a one-time additional month of access if the eligible signals recorded during the calendar month in which their first paid subscription period begins produce a cumulative net result of zero R or below, measured in R-multiples. Conditions:</p>
        <ol className="list-decimal ml-4 space-y-1 mt-1">
          <li>The member must hold an eligible first paid subscription.</li>
          <li>The calendar month in which that first paid period begins must have concluded.</li>
          <li>The eligible signals must have been evaluated under the Performance Measurement Policy.</li>
          <li>The cumulative net result for that period must be zero R or below.</li>
          <li>The member receives one additional month of access without an additional subscription charge.</li>
        </ol>
        <p className="mt-2">A result above zero R does not qualify. The extension is available only once per founding member, applies exclusively in relation to the calendar month in which the first paid subscription period begins, and is not provided for subsequent paid months.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. Nature of the extension</h2>
        <p>The extension is an additional service-access benefit. It is not a cash refund, reimbursement of trading losses, compensation for losses in a personal account, or a guarantee that future signals will be profitable, and it does not guarantee recovery of previous losses or a positive result during the additional month. Members remain responsible for their own decisions, execution, sizing and risk management. Eligibility is based on official L2 Signals records, not individual account profit or loss.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Subscription continuation and cancellation</h2>
        <p>After the initial paid period, members may continue under the applicable renewal terms. Members who qualify retain access for the extension period without an additional charge; after it ends they may renew or discontinue. Members who do not qualify may cancel under the applicable cancellation terms. Cancellation does not automatically entitle a member to a refund for a completed period; refund requests are handled under the Refunds &amp; Cancellations policy, and nothing excludes a right you have under applicable law.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Trading risk and performance limitations</h2>
        <p>Trading involves risk, including the possibility of losing some or all of the capital allocated to trading. Historical results, backtests, forward tests and previously profitable signals do not guarantee future performance. Actual results may differ from published outcomes because of spreads, slippage, execution delays, broker conditions, volatility and individual practices. L2 Signals does not promise a specific win rate, profit factor, monthly return or profit amount, and the performance-based extension must not be interpreted as a guarantee of profitability.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Application access and service security</h2>
        <p>Founding membership grants access to the designated signal service, not unrestricted access to the underlying application or internal infrastructure. Members must not bypass access controls, interfere with the signal-generation system, access administrative functions without authorisation, exploit vulnerabilities, redistribute restricted content, or share private credentials without authorisation.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. Programme updates</h2>
        <p>L2 Signals may refine service delivery, technical infrastructure and procedures as development progresses. Material changes affecting the agreed price, membership benefits or extension eligibility are communicated in accordance with the applicable terms and consumer-protection requirements. No change retroactively removes an extension benefit a member has already qualified for.</p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Acceptance of terms</h2>
        <p>Participation is subject to the Subscription Terms and Conditions, Performance Measurement Policy, Founding Member Extension Policy, Trading Risk Disclosure, and other applicable service policies. Members are expected to review and accept the applicable terms before their subscriptions are activated.</p>
      </section>
    </PolicyShell>
  )
}
