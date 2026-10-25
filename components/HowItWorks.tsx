import Link from 'next/link'
import { JOURNEY } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">From browsing to execution</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">How it works</h2>
          </div>
          <p className="text-[10px] font-mono text-text-muted">No pressure, no auto-renewal</p>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY.map((step) => (
            <div key={step.step} className="rounded-xl p-3 relative overflow-hidden" style={CARD}>
              <p className="text-lg font-bold font-mono text-accent-gold leading-none">{step.step}</p>
              <p className="text-[11px] font-semibold mt-2 leading-tight">{step.title}</p>
              <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Link href="#proof" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
            Check the record
          </Link>
          <Link href="/pay" className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center">
            Start membership
          </Link>
        </div>

        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          Membership gives access to the signal service for the paid period. It does not buy ownership of the
          software, the strategy or the brand, and it does not grant a right to redistribute signals or
          private-group content.
        </p>
      </div>
    </section>
  )
}
