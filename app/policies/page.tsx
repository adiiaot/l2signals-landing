import type { Metadata } from 'next'
import Link from 'next/link'
import { POLICIES, POLICY_TAGLINE, POLICY_VERSION, POLICY_EFFECTIVE } from '../../data/policies'

export const metadata: Metadata = {
  title: 'Policies & Member Documents',
  description: 'The L2 Signals member framework: subscription terms, signal access & delivery, performance measurement, founding members programme, extension policy, acceptable use, refunds and trading risk disclosure.',
}

const cardStyle = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const FACTS = [
  { k: '2%', label: 'Max risk per signal', d: 'A ceiling, never a target — size to your own account and stop-loss distance.' },
  { k: '21:00 UTC', label: 'Daily cutoff', d: 'Close open trades and cancel unfilled pendings by the applicable cutoff.' },
  { k: 'Calendar month', label: 'Official measurement cycle', d: 'Monthly net R in West Africa Time (UTC+1) and resets at the start of each month.' },
  { k: '₦50,000 / US$40', label: '31-day subscription', d: 'Naira or US dollar payment, depending on the method. The checkout shows the exact amount before payment.' },
  { k: '50 members', label: 'Founding programme cap', d: 'Open during early access ahead of official launch — limited to 50 founding members.' },
  { k: '≤ 0R', label: 'One-time extension', d: 'Official net R of zero or below for the calendar month in which the first paid period begins qualifies for one additional month.' },
]

export default function PoliciesPage() {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">L2 Signals · Member Documents</p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">Policies &amp; Member Documents</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
          The rules that govern signal delivery, official performance and subscription access for L2 Signals.
          Written to be read before you subscribe — the setup is ours, the execution and risk are yours.
        </p>
        <p className="text-[11px] text-text-muted mt-2">{POLICY_TAGLINE}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="badge-info">Version {POLICY_VERSION}</span>
          <span className="badge-gold">Effective {POLICY_EFFECTIVE}</span>
          <span className="badge-warn">Applies to all subscribers, incl. founding members</span>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mt-4 sm:mt-5">
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-primary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Free public channel</a>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Ask a question</a>
        </div>
      </div>

      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Framework at a glance</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">The key numbers in one place</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {FACTS.map(f => (
            <div key={f.label} className="rounded-xl p-3" style={cardStyle}>
              <p className="text-sm sm:text-base font-bold font-mono text-accent-gold break-words">{f.k}</p>
              <p className="text-xs font-semibold mt-1">{f.label}</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-4 leading-relaxed">
          The L2 Signals service is live in early access, ahead of official launch. Official performance is
          measured from the L2 Signals signal engine — never from the founder&apos;s or any member&apos;s
          personal trading account. Personal results may differ from the official outcome. Nothing here is
          personalised financial advice.
        </p>
      </div>

      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">All member policies</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">{POLICIES.length} member policies, one framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          {POLICIES.map((p, i) => (
            <div key={p.slug} className="rounded-xl p-4 flex flex-col" style={cardStyle}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-mono text-text-muted">DOC {String(i + 1).padStart(2, '0')}</p>
                <span className="text-[9px] font-mono text-text-muted">v{p.version}</span>
              </div>
              <h3 className="text-sm font-bold mt-1">{p.title}</h3>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed flex-1">{p.short}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Link href={`/policies/${p.slug}`} className="text-xs font-semibold text-accent-gold hover:underline">Read policy →</Link>
                {p.pdf ? (
                  <a href={p.pdf} target="_blank" rel="noopener" className="text-xs text-text-muted hover:text-accent-gold">PDF copy</a>
                ) : (
                  <span className="text-[10px] font-mono text-text-muted">Current HTML</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-4 leading-relaxed">
          Every document is published as HTML at the version shown. An older downloaded copy is not the current
          text — the page at this address is authoritative.
        </p>
      </div>

      <div className="card">
        <h2 className="text-sm sm:text-base font-bold">Website terms at a glance</h2>
        <p className="text-xs text-text-muted mt-1">The public site is also governed by our general terms — read them alongside the member documents above.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          <Link href="/terms" className="rounded-xl p-3 hover:border-accent-gold transition block" style={cardStyle}><p className="font-semibold">Terms &amp; Conditions</p><p className="text-text-muted mt-1">Use of the website, services and custom work.</p></Link>
          <Link href="/privacy" className="rounded-xl p-3 hover:border-accent-gold transition block" style={cardStyle}><p className="font-semibold">Privacy Policy</p><p className="text-text-muted mt-1">What we collect, why, and your rights.</p></Link>
          <Link href="/legal" className="rounded-xl p-3 hover:border-accent-gold transition block" style={cardStyle}><p className="font-semibold">Legal &amp; Risk</p><p className="text-text-muted mt-1">Risk warnings and disclaimers.</p></Link>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
          <Link href="/policies/trading-risk-disclosure" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Read the risk disclosure first →</Link>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Email us</a>
        </div>
      </div>
    </div>
  )
}
