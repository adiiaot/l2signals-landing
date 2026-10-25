import type { ReactNode } from 'react'
import Link from 'next/link'
import { getLegalDoc, docsByCategory, LEGAL_EFFECTIVE, LEGAL_VERSION } from '../data/legal'
import LegalToc from './LegalToc'

const cardStyle = {
  background: 'rgb(var(--surface-overlay-rgb))',
  border: '1px solid var(--glass-border)',
} as const

export default function PolicyShell({
  slug,
  title,
  intro,
  pdf,
  pdfLabel = 'Download PDF copy',
  reviewNote,
  children,
}: {
  slug?: string
  title: string
  intro: ReactNode
  pdf?: string
  pdfLabel?: string
  /** Renders a visible owner-review notice for decisions that are not final. */
  reviewNote?: string
  children: ReactNode
}) {
  const doc = slug ? getLegalDoc(slug) : undefined
  const version = doc?.version || LEGAL_VERSION
  const effective = doc?.effective || LEGAL_EFFECTIVE
  const pdfHref = pdf || doc?.pdf
  const related = doc
    ? docsByCategory(doc.category)
        .filter((item) => item.slug !== doc.slug)
        .slice(0, 4)
    : []

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="mb-3 text-[11px]">
        <Link href="/legal" className="text-text-muted hover:text-accent-gold">
          ← All legal &amp; policy documents
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div className="card min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
              L2 Signals Services · Legal
            </p>
            <span className="badge-info">Version {version}</span>
            <span className="badge-gold">Effective {effective}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">{title}</h1>
          <div className="text-xs text-text-muted mt-2 leading-relaxed break-words">{intro}</div>

          {reviewNote && (
            <div
              className="mt-4 rounded-xl border p-3"
              style={{ background: 'rgba(var(--status-warn-rgb), 0.08)', borderColor: 'rgba(var(--status-warn-rgb), 0.28)' }}
              role="note"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-status-warn">Owner review required</p>
              <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">{reviewNote}</p>
            </div>
          )}

          {pdfHref && (
            <div className="mt-3">
              <a
                href={pdfHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-gold hover:underline"
              >
                {pdfLabel} ↗
              </a>
            </div>
          )}

          <div id="legal-body" className="mt-4 sm:mt-6">
            <LegalToc />
            <div className="prose prose-sm max-w-none space-y-4 sm:space-y-5 text-xs sm:text-[13px] leading-relaxed text-text-secondary break-words [&_h2]:scroll-mt-24 [&_section]:space-y-1.5 [&_a]:text-accent-gold [&_a:hover]:underline">
              {children}
            </div>
          </div>

          <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--glass-border)' }}>
            <p className="text-[10px] text-text-muted leading-relaxed">
              This document is issued by L2 Signals Services. It is not legal advice to you, and it does not
              replace your own professional advice. Questions about this document:{' '}
              <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">
                l2signalslab@gmail.com
              </a>
              .
            </p>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-20">
          {related.length > 0 && (
            <div className="card p-4">
              <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Related documents</p>
              <div className="mt-2 space-y-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href || '/legal'}
                    className="block rounded-lg p-2 text-[11px] hover:text-accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold"
                    style={cardStyle}
                  >
                    <span className="font-semibold text-text-primary">{item.title}</span>
                    <span className="block text-[10px] text-text-muted mt-0.5">v{item.version}</span>
                  </Link>
                ))}
              </div>
              <Link href="/legal" className="mt-3 inline-block text-[11px] font-semibold text-accent-gold hover:underline">
                Legal index →
              </Link>
            </div>
          )}

          <div className="card p-4">
            <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Need help?</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              Payment, access or cancellation questions are handled by a person, not a bot.
            </p>
            <a
              href="https://t.me/aotayoL2"
              target="_blank"
              rel="noopener"
              className="mt-2 inline-block text-[11px] font-semibold text-accent-gold hover:underline"
            >
              Telegram — @aotayoL2
            </a>
            <a
              href="mailto:l2signalslab@gmail.com"
              className="block text-[11px] text-accent-gold hover:underline break-all mt-1"
            >
              l2signalslab@gmail.com
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
