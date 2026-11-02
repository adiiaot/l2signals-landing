import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LEGAL_CATEGORIES,
  LEGAL_DOCS,
  LEGAL_EFFECTIVE,
  LEGAL_VERSION,
  LEGAL_LAST_REVIEWED,
  docsByCategory,
  type LegalCategory,
} from '@/data/legal'
import { BUSINESS, REGISTRATION, RESPONSIBILITIES, RISK_NOTICE, registrationLine } from '@/data/business'

export const metadata: Metadata = {
  title: 'Legal & Trust Centre',
  description:
    'Every L2 Signals Services legal document in one place: Terms of Service, Privacy Policy, Trading Risk Disclosure, Subscription Terms, Performance Measurement, Signal Access & Delivery, Acceptable Use, Refunds, the Founding Members Programme and the Extension Policy.',
}

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const ORDER: LegalCategory[] = ['core', 'trading', 'subscription', 'programme']

export default function LegalPage() {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-4">
      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
          L2 Signals Services · Legal &amp; trust centre
        </p>
        <h1 className="text-xl sm:text-3xl font-bold mt-2 leading-tight">
          The rules, the risks and the record — in one place
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed max-w-3xl">
          L2 Signals Services sells software and trading tools, including the L2 Signals subscription. These
          documents explain what you are buying, what is expected of you, how payments and access work, how
          performance is measured and how your data is handled. Read the documents that apply before you pay.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-mono">
          <span className="badge-gold">Version {LEGAL_VERSION}</span>
          <span className="badge-info">Effective {LEGAL_EFFECTIVE}</span>
          <span className="badge-warn">Last reviewed {LEGAL_LAST_REVIEWED}</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <Link href="/policies/subscription-terms" className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center">
            Subscription terms
          </Link>
          <Link href="/policies/trading-risk-disclosure" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
            Trading risk disclosure
          </Link>
          <Link href="/signals" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
            L2 Signals
          </Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="card p-4">
          <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">The product</p>
          <p className="text-sm font-bold mt-1">L2 Signals subscription</p>
          <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
            Intraday XAU/USD signals delivered to a private Telegram group. You execute on your own account.
          </p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Access</p>
          <p className="text-sm font-bold mt-1">By invitation, after the documents are accepted</p>
          <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
            The fee and period are shown on the payment page only after you accept the Terms, the Trading Risk
            Disclosure and the subscription documents. The amount is set server-side before payment.
          </p>
        </div>
        <div className="card p-4">
          <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">The guarantee</p>
          <p className="text-sm font-bold mt-1">None on returns</p>
          <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
            No profit, win rate, funding or withdrawal is guaranteed. Historical results do not predict future
            results.
          </p>
        </div>
        {REGISTRATION.registered && (
          <div className="card p-4">
            <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Business registration</p>
            <p className="text-sm font-bold mt-1">{registrationLine()}</p>
            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
              Status: {REGISTRATION.status}. Registered activity: {REGISTRATION.activity}. The registration
              can be checked against the public register using the number above.
            </p>
          </div>
        )}
      </div>

      {ORDER.map((category) => {
        const meta = LEGAL_CATEGORIES[category]
        const docs = docsByCategory(category)
        if (!docs.length) return null
        return (
          <section key={category} className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-base font-bold">{meta.label}</h2>
              <span className="text-[10px] font-mono text-text-muted">{docs.length} document{docs.length === 1 ? '' : 's'}</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">{meta.description}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={doc.href || '/legal'}
                  className="group rounded-xl p-3 transition hover:border-accent-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold"
                  style={CARD}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-semibold group-hover:text-accent-gold transition">{doc.title}</p>
                    <span className="shrink-0 text-[9px] font-mono text-text-muted">v{doc.version}</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{doc.short}</p>
                  <p className="text-[10px] font-mono text-text-muted mt-2">Effective {doc.effective} · Read →</p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <section className="card">
        <h2 className="text-base font-bold">The risks, in one minute</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-xs font-semibold text-accent-gold">You can lose money</p>
            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
              Trading forex, CFDs, gold and leveraged instruments carries substantial risk. You may lose some
              or all of the capital you allocate. Signals can be wrong and market conditions change.
            </p>
          </div>
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-xs font-semibold text-accent-gold">Execution differs</p>
            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
              Spread, slippage, commissions, latency, gaps, rejected orders and broker differences can make
              your result differ from the official signal outcome.
            </p>
          </div>
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-xs font-semibold text-accent-gold">You stay in control</p>
            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
              You use your own account and keep control of your funds. Under the signal subscription we do not
              take custody of funds or execute trades for you.
            </p>
          </div>
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-xs font-semibold text-accent-gold">Not personal advice</p>
            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
              The service is intended for experienced traders. It is not a substitute for trading education or
              individual financial advice, and it may not suit your circumstances.
            </p>
          </div>
        </div>
        <ul className="mt-3 grid gap-1.5 text-[11px] text-text-secondary sm:grid-cols-2">
          {RESPONSIBILITIES.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-accent-gold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link href="/policies/trading-risk-disclosure" className="mt-3 inline-block text-[11px] font-semibold text-accent-gold hover:underline">
          Read the full Trading Risk Disclosure →
        </Link>
      </section>

      <section className="card">
        <h2 className="text-base font-bold">What this business is, and what it is not</h2>
        <p className="text-xs text-text-secondary mt-2 leading-relaxed">
          L2 Signals Services is a software development business. It builds trading systems, signal engines,
          Expert Advisors, indicators, dashboards, websites and applications for clients, and it operates L2
          Signals — a private product of its own — as proof of work. It does not manage money, does not hold
          client funds, does not execute trades on a client or member account, and does not provide personal
          financial, investment, legal or tax advice.
        </p>
        <p className="mt-3 rounded-xl p-3 text-[10px] sm:text-[11px] text-text-muted leading-relaxed" style={{ background: 'rgba(var(--status-warn-rgb),0.05)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}>
          {RISK_NOTICE}
        </p>
      </section>

      <section className="card">
        <h2 className="text-base font-bold">Contact</h2>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
          Questions about a document, a payment, access or a refund are answered by a person.
        </p>
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <a href={`mailto:${BUSINESS.email}`} className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center break-all">
            {BUSINESS.email}
          </a>
          <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
            Telegram — {BUSINESS.telegramSupportHandle}
          </a>
          <Link href="/policies" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
            Member policy library
          </Link>
        </div>
        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          This index is maintained with the documents it links to. If an older downloaded copy differs from the
          HTML page at the effective version shown above, the HTML page is the current text.
        </p>
      </section>
    </div>
  )
}
