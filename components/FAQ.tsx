"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FAQS: { q: string; a: React.ReactNode; highlight?: boolean }[] = [
  {
    q: 'Is L2 Signals an investment service? Do you manage funds?',
    a: (
      <>
        No. L2 Signals is a subscription to a systematic signal service, not an investment service or a
        managed account. Under the subscription we do not take custody of member funds or execute trades on a
        member&apos;s behalf. You trade your own account, choose your own size and keep control of your own
        money. Nothing on this site is personal financial, investment, legal or tax advice.
      </>
    ),
    highlight: true,
  },
  {
    q: 'What is L2 Signals Services?',
    a: (
      <>
        L2 Signals Services is the parent trading-technology and software business. L2 Signals is its first
        product. The ecosystem also includes L2 EA (an Expert Advisor in development), L2 Indicator (planned),
        L2 Signals App (planned) and custom systems or Signals API work (available by quote). Live, in
        development and planned products are labelled separately — an unreleased product is never presented as
        available.
      </>
    ),
  },
  {
    q: 'What is L2 Signals and how does it work?',
    a: (
      <>
        L2 Signals is a rules-based intraday XAU/USD service. The engine uses three complementary strategy
        types — EMA bounce, consolidation breakout and trend continuation — with direction-aware routing.
        Where applicable, a setup ships a limit entry and a stop-fallback leg with the same stop and target;
        whichever touches first fills and the other is cancelled. Trades run to the daily close window at
        21:00 UTC. The 4.25-year broker-data study covered 20,237 signals at 64.8% WR and +0.69R per signal;
        that is a backtest, not a promise of future results.
      </>
    ),
  },
  {
    q: 'Do I need trading experience?',
    a: (
      <>
        Yes. The service is intended for experienced traders who already understand stop-losses, take-profit,
        lot sizing and risk per trade. The published ceiling is 2% of account balance per signal — a cap, not
        a target. Position sizing must account for your balance, stop distance, broker contract
        specifications and execution costs. If you are new, paper trade first and follow the free channel
        before paying for private access.
      </>
    ),
  },
  {
    q: 'How are signals delivered?',
    a: (
      <>
        Paid members receive a personal, single-use invitation to the private Telegram group after payment is
        verified. The public channel carries updates and general results, not the paid service. Access is
        personal and must not be shared, forwarded or resold. See the{' '}
        <Link href="/policies/signal-access-and-delivery" className="text-accent-gold hover:underline">
          Signal Access &amp; Delivery Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Why hybrid limit + stop entries?',
    a: (
      <>
        Gold often either retraces to a good limit or runs away without retracing. Where the engine specifies
        a hybrid setup, both levels are published with the same stop-loss and take-profit. Whichever level
        touches first fills, and the other is cancelled. If price is already beyond both at generation, the
        setup becomes a market order. This is an execution rule, not a guarantee that an order will fill.
      </>
    ),
  },
  {
    q: 'How is performance measured?',
    a: (
      <>
        Official performance is measured from the signal engine&apos;s recorded outcomes, not from a member&apos;s
        broker balance. Monthly Net R is the sum of eligible decided outcomes attributed to the calendar month
        in West Africa Time (UTC+1). Unfilled signals are reported but excluded. A month stays provisional
        while eligible signals are unresolved. Read the{' '}
        <Link href="/policies/performance-measurement" className="text-accent-gold hover:underline">
          Performance Measurement Policy
        </Link>{' '}
        and the <Link href="/legal" className="text-accent-gold hover:underline">legal index</Link>.
      </>
    ),
  },
  {
    q: 'What am I actually buying?',
    a: (
      <>
        You buy access to the L2 Signals service for the paid period. You do not buy the software, the
        strategy, the brand, the signal engine or the right to redistribute signals or private-group content.
        The subscription does not renew automatically; a new payment is needed for another period. See the{' '}
        <Link href="/policies/subscription-terms" className="text-accent-gold hover:underline">
          Subscription Terms
        </Link>
        .
      </>
    ),
  },
  {
    q: 'What is the Founding Members Programme?',
    a: (
      <>
        It is the limited early-access cohort, capped at a maximum of 50 members, with an official L2 Signals
        launch target of 1 January 2027. A founding member with an eligible first paid subscription may qualify
        for one additional month of access if the official cumulative Net R for the calendar month in which that
        period begins is zero or below. It is a one-time service-access benefit — not a cash refund, not based
        on your personal account, and not available again in later months. Read the{' '}
        <Link href="/policies/founding-members-programme" className="text-accent-gold hover:underline">
          programme
        </Link>{' '}
        and{' '}
        <Link href="/policies/founding-member-extension" className="text-accent-gold hover:underline">
          extension policy
        </Link>
        .
      </>
    ),
  },
  {
    q: 'When will L2 EA, L2 Indicator and the L2 Signals App be available?',
    a: (
      <>
        L2 EA is in development. L2 Indicator and the L2 Signals App are planned. No release date or
        performance claim is made for an unreleased product, and nothing on this site is an offer to sell one.
        For L2 EA, you can register interest by email; product updates are posted in the public channel.
      </>
    ),
  },
  {
    q: 'How do I pay, and what happens after?',
    a: (
      <>
        The <Link href="/pay" className="text-accent-gold hover:underline">payment page</Link> shows the price,
        period, access, risks and the legal documents. You must actively accept the Terms, the Trading Risk
        Disclosure and — while the founding offer applies — the Founding Members conditions before a payment
        can start. A consent record is stored server-side with the accepted document versions. Online payments
        are verified with Paystack; crypto and bank transfers are matched and reviewed manually. After
        verification you receive a single-use invite. A browser success page is never treated as proof of
        payment.
      </>
    ),
  },
  {
    q: 'Can I cancel? What about refunds?',
    a: (
      <>
        Yes. The subscription does not renew automatically, so you can choose not to pay again. Access ends at
        the end of the paid period (subject to any stated grace period). Duplicate or erroneous payments are
        corrected. The final commercial refund policy is still pending owner confirmation, so requests are
        reviewed individually and in good faith without removing any statutory right. See{' '}
        <Link href="/policies/refunds-and-cancellations" className="text-accent-gold hover:underline">
          Refunds &amp; Cancellations
        </Link>
        .
      </>
    ),
  },
  {
    q: 'How is my data handled?',
    a: (
      <>
        We collect what is needed to verify a payment, apply access, keep a consent record and support you.
        We do not sell data or store full card details. Payment providers, hosting and Telegram process
        specific data as described in the{' '}
        <Link href="/privacy" className="text-accent-gold hover:underline">Privacy Policy</Link>. You can ask
        for access, correction or deletion of your data, subject to legal retention requirements.
      </>
    ),
  },
  {
    q: 'Is L2 Signals regulated or approved?',
    a: (
      <>
        We do not claim that L2 Signals Services or L2 Signals is approved, licensed, registered or exempt by
        the Nigerian Securities and Exchange Commission or any other regulator. A disclaimer does not by
        itself remove a regulatory obligation. The product is described as it operates: you receive signals,
        keep control of your own funds and make your own execution decisions. See the{' '}
        <Link href="/legal" className="text-accent-gold hover:underline">legal index</Link> for the current
        position.
      </>
    ),
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold">Questions, answered plainly</h2>
          <Link href="/legal" className="text-[11px] font-semibold text-accent-gold hover:underline">
            All legal documents →
          </Link>
        </div>

        <div className="mt-4 space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = open === index
            return (
              <div
                key={faq.q}
                className="rounded-xl overflow-hidden"
                style={{
                  background: faq.highlight ? 'rgba(var(--accent-gold-rgb),0.06)' : 'rgb(var(--surface-overlay-rgb))',
                  border: `1px solid ${faq.highlight ? 'rgba(var(--accent-gold-rgb),0.2)' : 'var(--glass-border)'}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left min-h-[44px]"
                >
                  <span className={`text-xs font-bold ${faq.highlight ? 'text-accent-gold' : 'text-text-primary'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition ${isOpen ? 'rotate-180' : ''} text-text-muted`}
                    aria-hidden
                  />
                </button>
                {isOpen && <div className="px-4 pb-3 text-xs leading-relaxed text-text-secondary">{faq.a}</div>}
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2">
          <Link href="/pay" className="btn-primary rounded-full px-5 py-2 text-xs justify-center">
            Payment page
          </Link>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-5 py-2 text-xs justify-center">
            Email the business
          </a>
          <a
            href="https://t.me/l2signals"
            target="_blank"
            rel="noopener"
            className="btn-secondary rounded-full px-5 py-2 text-xs justify-center"
          >
            Public channel
          </a>
        </div>
      </div>
    </section>
  )
}
