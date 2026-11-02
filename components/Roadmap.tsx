import Link from 'next/link'

const STEPS = [
  {
    phase: 'Live',
    title: 'Services — build work for clients',
    desc: 'Software development, IT support, algorithmic trading tools and technology consultancy. Scoped and quoted per project.',
    tone: 'live',
    href: '/services',
  },
  {
    phase: 'Live',
    title: 'L2 Signals — private, by invitation',
    desc: 'The business runs its own engine and publishes the record. Access is by invitation; the fee is shown at checkout after the documents are accepted.',
    tone: 'live',
    href: '/signals',
  },
  {
    phase: 'In development',
    title: 'L2 EA — MetaTrader 5',
    desc: 'Rule-based execution with independent risk controls, clear order handling and detailed logs. Not yet for sale; custom EA work is quoted per project.',
    tone: 'build',
    href: '/quote?type=system-built',
  },
  {
    phase: 'Planned',
    title: 'L2 Indicator',
    desc: 'Visualise the conditions behind a rule set on the chart. Intended scope only; no release date.',
    tone: 'plan',
  },
  {
    phase: 'Private',
    title: 'L2 Signals App',
    desc: 'Member application for access, journals and analytics. A private build — not publicly released and not offered for sale.',
    tone: 'plan',
  },
  {
    phase: 'Available',
    title: 'Signals API & custom systems',
    desc: 'Scoped integrations, trading systems, dashboards and apps. Quoted per project.',
    tone: 'live',
    href: '/services',
  },
]

const TONE: Record<string, { border: string; background: string; color: string }> = {
  live: { border: 'rgba(var(--status-win-rgb),0.28)', background: 'rgba(var(--status-win-rgb),0.06)', color: 'var(--status-win)' },
  target: { border: 'rgba(var(--accent-gold-rgb),0.3)', background: 'rgba(var(--accent-gold-rgb),0.07)', color: 'var(--accent-gold)' },
  build: { border: 'rgba(var(--status-warn-rgb),0.28)', background: 'rgba(var(--status-warn-rgb),0.06)', color: 'var(--status-warn)' },
  plan: { border: 'var(--glass-border)', background: 'rgb(var(--surface-overlay-rgb))', color: 'var(--text-muted)' },
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Product roadmap</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">What is live, what is being built, what is planned</h2>
          </div>
          <span className="text-[10px] font-mono text-text-muted">No release dates are promised for unreleased products</span>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => {
            const tone = TONE[step.tone]
            const inner = (
              <>
                <span
                  className="inline-flex sm:absolute sm:top-3 sm:right-3 text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                  style={{ color: tone.color, background: 'rgba(0,0,0,0.16)', border: `1px solid ${tone.border}` }}
                >
                  {step.phase}
                </span>
                <p className="text-xs font-bold text-text-primary mt-2 sm:mt-4 sm:pr-20">{step.title}</p>
                <p className="text-[10px] text-text-muted mt-1 leading-relaxed">{step.desc}</p>
              </>
            )
            const style = { background: tone.background, border: `1px solid ${tone.border}` } as const
            return step.href ? (
              <Link
                key={step.title}
                href={step.href}
                className="rounded-xl p-3 relative overflow-hidden block hover:brightness-110 transition min-h-[104px]"
                style={style}
              >
                {inner}
              </Link>
            ) : (
              <div key={step.title} className="rounded-xl p-3 relative overflow-hidden min-h-[104px]" style={style}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
