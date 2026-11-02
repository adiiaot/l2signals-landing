"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const FAQS: { q: string; a: React.ReactNode; highlight?: boolean }[] = [
  {
    q: 'What does L2 Signals Services do?',
    a: (
      <>
        We are a software development business working in trading technology. We build software, provide IT
        support, develop algorithmic trading tools — signal engines, MetaTrader Expert Advisors, indicators,
        backtests, execution automation — and advise on technology decisions. Work is scoped and quoted per
        project. See the{' '}
        <Link href="/services" className="text-accent-gold hover:underline">services page</Link> or{' '}
        <Link href="/quote" className="text-accent-gold hover:underline">request a quote</Link>.
      </>
    ),
    highlight: true,
  },
  {
    q: 'Why does a software company run its own trading product?',
    a: (
      <>
        Because a claim about building signal engines is worth very little without one running. L2 Signals is the
        business&rsquo;s proof of work: an engine, a private community and an application, operated in public view,
        with a record that includes the losses. When a client wants a system built, that record is what they can
        check first.
      </>
    ),
  },
  {
    q: 'Is L2 Signals for sale to the public?',
    a: (
      <>
        No. L2 Signals is one private product of the business, offered by invitation to a small group of aligned
        members, each of whom reads and accepts a written risk disclosure before any payment. It is not marketed
        as a public signal service, and the member application is a private build that has not been released.
      </>
    ),
  },
  {
    q: 'How is L2 Signals and its private app operated?',
    a: (
      <>
        L2 Signals&rsquo; signal engine and its private app are operated by L2 Signals Services, as a service within
        the business. Members trade their own accounts; the business does not take custody of funds and does not
        execute trades for members.
      </>
    ),
  },
  {
    q: 'What is the engine and how does it work?',
    a: (
      <>
        It is a rules-based intraday XAU/USD engine using three complementary strategy types — EMA bounce,
        consolidation breakout and trend continuation — with direction-aware routing. Each setup states one order
        type, market or pending, with the entry, stop, target and expiry. Trades run to the daily close window at
        21:00 UTC. The 4.25-year broker-data study covered 20,237 signals at 64.8% WR and +0.69R per signal; that
        is a <span className="font-semibold text-text-primary">back-test</span>, not a live result and not a
        promise.
      </>
    ),
  },
  {
    q: 'How are results reported?',
    a: (
      <>
        As data, never as an income claim. The live execution ledger lists wins, partial wins, losses and unfilled
        setups, with R where the record supports it, and it is labelled LIVE. The 4.25-year study is labelled
        BACK-TESTED. The two are never merged into one figure, and the business does not publish only the wins.
      </>
    ),
  },
  {
    q: 'Can I follow the work without joining?',
    a: (
      <>
        Yes. The{' '}
        <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">
          public channel
        </a>{' '}
        carries updates, general results and occasional example setups posted so interested people can study the
        method. It is not the private service and nothing in it is a recommendation to trade.
      </>
    ),
  },
  {
    q: 'What does it cost, and when do I see the price?',
    a: (
      <>
        The business does not publish the fee. Once an invitation is agreed, the payment page shows the fee, the
        period and the payment methods — but only after you have read the Terms, the Trading Risk Disclosure and
        the subscription documents and accepted them. The acceptance is recorded with the date, time and document
        versions, and the amount is set server-side, never by the browser.
      </>
    ),
  },
  {
    q: 'Do you manage money, run accounts or give financial advice?',
    a: (
      <>
        No. We never take custody of member funds, never ask for a broker or MT5 password, and never execute trades
        on a member&rsquo;s account. You size and execute your own trades. Nothing on this site is personal
        financial, investment, legal or tax advice.
      </>
    ),
  },
  {
    q: 'What happens after a payment?',
    a: (
      <>
        The payment is verified — online payments against Paystack, crypto and bank transfers by hand. Only then is
        a personal, single-use invitation issued. A browser success page is never treated as proof of payment.
        Access is personal and must not be shared, forwarded or resold.
      </>
    ),
  },
  {
    q: 'Can I cancel? What about refunds?',
    a: (
      <>
        Nothing renews automatically, so you can simply choose not to pay again; access ends at the close of the
        paid period, subject to any stated grace period. Duplicate or erroneous payments are corrected. Refund
        requests are reviewed individually and in good faith, without removing any statutory right. Details are in
        the Legal &amp; Trust Centre.
      </>
    ),
  },
  {
    q: 'How is my data handled?',
    a: (
      <>
        We collect what is needed to verify a payment, apply access, keep a consent record and support you. We do
        not sell data or store card details. Payment providers, hosting and Telegram process specific data as
        described in the{' '}
        <Link href="/legal" className="text-accent-gold hover:underline">Legal &amp; Trust Centre</Link>. You can ask
        for access, correction or deletion of your data, subject to legal retention requirements.
      </>
    ),
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal scroll-mt-20">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-bold">Questions, answered plainly</h2>
          <Link href="/legal" className="text-[11px] font-semibold text-accent-gold hover:underline">
            Legal &amp; trust centre →
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
          <Link href="/services" className="btn-primary rounded-full px-5 py-2 text-xs justify-center">
            See our services
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
