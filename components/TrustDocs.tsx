import Link from 'next/link'
import { BUSINESS } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const DOCS = [
  { title: 'Terms of Service', d: 'The contract for the website, products and permitted use.', href: '/terms' },
  { title: 'Trading Risk Disclosure', d: 'The risk of loss, leverage, execution and what is not guaranteed.', href: '/policies/trading-risk-disclosure' },
  { title: 'Subscription Terms', d: 'Price, payment, activation, renewal, cancellation and refunds.', href: '/policies/subscription-terms' },
  { title: 'Privacy Policy', d: 'Data collected, processors, retention, security and your rights.', href: '/privacy' },
  { title: 'Performance Measurement', d: 'How official Net R is calculated and finalised.', href: '/policies/performance-measurement' },
  { title: 'Acceptable Use', d: 'No sharing, resale, redistribution, bypass or abuse.', href: '/policies/acceptable-use' },
  { title: 'Refunds & Cancellations', d: 'How to stop, when access ends and how payment issues are handled.', href: '/policies/refunds-and-cancellations' },
  { title: 'Founding Members', d: 'The 50-member cohort and the one-time extension condition.', href: '/policies/founding-members-programme' },
]

export default function TrustDocs() {
  return (
    <section id="docs" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Trust, documentation &amp; contact</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">Read before you pay — and know where to ask</h2>
          </div>
          <Link href="/legal" className="text-[11px] font-semibold text-accent-gold hover:underline">
            Legal &amp; trust centre →
          </Link>
        </div>

        <p className="text-[11px] text-text-muted mt-2 leading-relaxed max-w-3xl">
          These documents are not fine print hidden after checkout. They state the product, the price, the
          risks, the limits of the service and your responsibilities. If anything is unclear, ask before you
          pay.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {DOCS.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="rounded-xl p-3 transition hover:border-accent-gold/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold"
              style={CARD}
            >
              <p className="text-[11px] font-semibold">{doc.title}</p>
              <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{doc.d}</p>
              <p className="text-[10px] font-mono text-accent-gold mt-2">Read →</p>
            </Link>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Support</p>
            <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener" className="block text-[11px] font-semibold text-accent-gold hover:underline mt-1">
              Telegram — {BUSINESS.telegramSupportHandle}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="block text-[11px] text-accent-gold hover:underline break-all mt-1">
              {BUSINESS.email}
            </a>
          </div>
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Public updates</p>
            <a href={BUSINESS.telegramChannel} target="_blank" rel="noopener" className="block text-[11px] font-semibold text-accent-gold hover:underline mt-1">
              t.me/l2signals
            </a>
            <a href={BUSINESS.x} target="_blank" rel="noopener" className="block text-[11px] text-text-muted hover:text-accent-gold mt-1">
              X — @l2signals
            </a>
          </div>
          <div className="rounded-xl p-3" style={CARD}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Business</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              {BUSINESS.name} · trading technology &amp; software. No registration number or regulatory licence
              is claimed on this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
