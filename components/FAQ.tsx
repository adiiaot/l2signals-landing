"use client"
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PAYSTACK_STOREFRONT_URL } from '@/lib/payments/links'

const FAQS = [
  {
    q: 'Disclaimer — Is L2 Signals an investment service? Do you manage funds?',
    a: 'No. L2 Signals is not a financial investment service and we do not manage or trade funds for anyone unless there is a signed agreement. We do not offer investment advice or take users money to trade. Users only pay for signal access in the private Telegram group and access to features in the upcoming web app as the business scales. Trade your own account, manage your own risk.',
    highlight: true,
  },
  {
    q: 'What is L2 Signals and how does it work?',
    a: 'L2 Signals is a systematic XAU/USD intraday product built for disciplined retail traders. It uses three complementary strategies that each handle a different market regime and hybrid pending orders — limit + stop with the same SL/TP, whichever touches first fills and the other is cancelled — to 21:00 UTC close. The system is deterministic: same rules every time, no discretion, no chasing. It has been backtested over 4.25 years of broker gold data (20,237 signals · 64.8% WR · +0.69R per signal, profitable in every year) and is forward validated on a live demo ledger, with every trade, R and date logged.',
  },
  {
    q: 'Do I need trading experience to use it?',
    a: 'Yes, basic experience is needed. You should understand stop loss, take profit, lot sizing and risk per trade (we use 1–2% per trade). L2 provides the system, the entry/SL/TP, the exit playbook — 50% off at +1R, stop to breakeven, rest to TP; or a full exit at TP when the target is under 1R — and the ledger. You execute on your own broker or prop firm. If you are new, paper trade first and follow the free channel to learn the workflow before paying for private access.',
  },
  {
    q: 'How are signals delivered?',
    a: 'Signals and daily results are posted in the free public channel for transparency. Paid members get the private Telegram group for intraday signals, and the web app mirrors the same signals with extra tooling as it rolls out. No email list is needed — the Telegram channel is the update channel.',
  },
  {
    q: 'Why hybrid limit + stop entries?',
    a: 'Gold often either retraces to a good limit or runs away without retracing. Every L2 signal ships both: a limit order at the ideal price and a stop fallback behind the entry with the same stop loss and take profit. Whichever level touches first fills and we cancel the other. If price is already past both at generation, it becomes a market order. This cuts missed moves while keeping risk fixed at 1–2% per trade.',
  },
  {
    q: 'How can I verify the results are real?',
    a: 'Two separate records. The backtest covers 20,237 signals over 4.25 years (Jul 2022 – Oct 2026) with the same rules and cost model the engine runs today — 64.8% WR and +0.69R per signal across that whole period, not a hand-picked sample. The demo ledger — $100 to $1,007.41 in 37 days (Jul 29 – Sep 4, 2026) — is logged trade by trade, with each one posted on X and linked in the Demo ledger below. Live prop trades are verified privately with screenshots and account statements, and published after the challenge is completed to avoid copy-trading from others using the same firm. The ledger on this site is the single source of truth and updates as new trades are logged.',
  },
  {
    q: 'When will the web app and private group launch?',
    a: 'The private group is open now and access is sold on the payment page. The multi-user web app (auth, subscriptions, extra tooling) ships alongside it as the member base grows, and paid members get it as it lands. You can still join the free channel first and watch the ledger before paying — nothing is charged until you check out.',
  },
  {
    q: 'How do I pay for access?',
    a: 'Three rails on the payment page: card via Paystack (Verve, Mastercard, Visa, bank USSD/transfer), USDT or USDC on TRON (TRC20) or BNB Chain (BEP20), or Nigerian bank transfer in NGN. Card is instant to pay. Every payment is then checked by hand — send the reference (or crypto transaction hash) plus a screenshot to @aot_ayo on Telegram, or email l2signalslab@gmail.com if you prefer, and you are added to the private group with a single-use invite, usually within a few hours. No Telegram is needed to join: email works. Stablecoins only — the amount is always 1:1 with the USD price, so it never changes between checkout and confirmation.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary">FAQ & Disclaimer</h2>
        <div className="mt-4 space-y-2">
          {FAQS.map((f, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ background: f.highlight ? 'rgba(var(--accent-gold-rgb),0.06)' : 'rgb(var(--surface-overlay-rgb))', border: `1px solid ${f.highlight ? 'rgba(var(--accent-gold-rgb),0.2)' : 'var(--glass-border)'}` }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left">
                <span className={`text-xs font-bold ${f.highlight ? 'text-accent-gold' : 'text-text-primary'}`}>{f.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition ${open === i ? 'rotate-180' : ''} text-text-muted`} />
              </button>
              {open === i && <div className="px-4 pb-3 text-xs leading-relaxed text-text-secondary">{f.a}</div>}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <a href="/pay" className="btn-primary rounded-full px-5 py-2 text-xs">Pay for access</a>
          <a
            href={PAYSTACK_STOREFRONT_URL}
            target="_blank"
            rel="noopener"
            className="btn-secondary rounded-full px-5 py-2 text-xs"
          >
            Card on Paystack
          </a>
        </div>
      </div>
    </section>
  )
}
