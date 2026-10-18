import type { ReactNode } from 'react'
import Link from 'next/link'
import { POLICIES, POLICY_TAGLINE } from '../data/policies'

const cardStyle = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

export default function PolicyShell({
  title,
  intro,
  pdf,
  pdfLabel = 'Download PDF',
  children,
}: {
  title: string
  intro: ReactNode
  pdf?: string
  pdfLabel?: string
  children: ReactNode
}) {
  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-3 text-[11px]">
        <Link href="/policies" className="text-text-muted hover:text-accent-gold">← All L2 Signals policies</Link>
      </div>

      <div className="card">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">L2 Signals PRO · Member Document 2027</p>
          <span className="badge-warn">Draft — pending launch</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">{title}</h1>
        <div className="text-xs text-text-muted mt-2 leading-relaxed break-words">{intro}</div>
        <p className="text-[11px] text-text-muted mt-3">L2 Signals — {POLICY_TAGLINE}</p>

        <div className="prose prose-sm max-w-none mt-4 sm:mt-6 space-y-4 sm:space-y-5 text-xs sm:text-[13px] leading-relaxed text-text-secondary break-words">
          {children}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 sm:mt-6">
          {pdf && <a href={pdf} target="_blank" rel="noopener" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">{pdfLabel}</a>}
          <Link href="/policies" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">All policies</Link>
          <a href="mailto:l2signalslab@gmail.com" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Contact</a>
        </div>
      </div>

      <div className="card mt-3">
        <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Related policies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
          {POLICIES.map(p => (
            <Link
              key={p.slug}
              href={`/policies/${p.slug}`}
              className="rounded-xl p-3 hover:border-accent-gold transition block"
              style={cardStyle}
            >
              <p className="font-semibold">{p.title}</p>
              <p className="text-text-muted mt-1 leading-relaxed">{p.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
