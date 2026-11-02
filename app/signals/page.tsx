import type { Metadata } from 'next'
import Link from 'next/link'
import SignalsSpotlight from '@/components/SignalsSpotlight'
import ProofSection from '@/components/ProofSection'
import BacktestStudy from '@/components/BacktestStudy'
import Methodology from '@/components/Methodology'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import { BUSINESS, POSITIONING, RISK_NOTICE } from '@/data/business'

export const metadata: Metadata = {
  title: 'L2 Signals — private, by invitation',
  description:
    'L2 Signals is a private product of L2 Signals Services: rule-based intraday XAU/USD setups delivered to invited members, with a published execution ledger and a back-tested study. Access is by invitation.',
}

export default function SignalsPage() {
  return (
    <div className="space-y-2">
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-2">
        <div className="card text-center">
          <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
            A private product of {BUSINESS.name} · by invitation
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">
            L2 Signals — the engine the business built, run as proof of work.
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-2xl mx-auto leading-relaxed">{POSITIONING}</p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 mt-5">
            <Link href="/" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
              ← Back to the business
            </Link>
            <Link href="#proof" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
              The ledger
            </Link>
            <Link href="#backtest" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
              The back-test
            </Link>
            <a
              href={`mailto:${BUSINESS.email}?subject=L2%20Signals%20invitation%20request`}
              className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center break-all"
            >
              Request an invite
            </a>
          </div>

          <p className="text-[10px] text-text-muted mt-3">
            Nothing here is financial advice or a promise of profit. Results are shown as data: wins, losses,
            unfilled setups and R — labelled LIVE or BACK-TESTED.
          </p>
        </div>
      </section>

      <SignalsSpotlight />
      <ProofSection />
      <BacktestStudy />
      <Methodology />
      <HowItWorks />
      <Pricing />

      <section id="invite" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
        <div className="card">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
            <div>
              <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Request an invitation</p>
              <h2 className="text-lg sm:text-xl font-bold mt-1">Written request, human answer</h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                Tell the business who you are, how you trade and what you want from the record. Invitations are
                considered individually — there is no queue, no countdown and no public sign-up. If an invitation
                is not offered, that is the answer; nothing is owed and no fee is taken.
              </p>
              <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                Already invited? Access is activated on the payment page, after the risk disclosure and terms are
                read and accepted.
              </p>
            </div>

            <div className="grid gap-2">
              <a
                href={`mailto:${BUSINESS.email}?subject=L2%20Signals%20invitation%20request`}
                className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center break-all"
              >
                {BUSINESS.email}
              </a>
              <a
                href={BUSINESS.telegramSupport}
                target="_blank"
                rel="noopener"
                className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center"
              >
                Telegram — {BUSINESS.telegramSupportHandle}
              </a>
              <Link href="/pay" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
                Already invited? Activate access
              </Link>
              <p className="text-[10px] text-text-muted leading-relaxed">
                No card details are handled by this site. Payments are processed by Paystack or verified by hand
                from a transaction hash or bank reference.
              </p>
            </div>
          </div>

          <p
            className="mt-4 rounded-xl p-3 text-[10px] sm:text-[11px] text-text-muted leading-relaxed"
            style={{ background: 'rgba(var(--status-warn-rgb),0.05)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}
          >
            {RISK_NOTICE}
          </p>
        </div>
      </section>
    </div>
  )
}
