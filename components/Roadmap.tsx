import Link from 'next/link'

const STEPS = [
  {
    phase: 'Now',
    title: 'L2 Signals — early access',
    desc: 'The signal service is live for the founding cohort. Official performance is recorded monthly from engine outcomes.',
    tone: 'live',
  },
  {
    phase: 'Target',
    title: 'Official launch — 1 January 2027',
    desc: 'The published launch target for L2 Signals. A target, not a guarantee; changes will be announced in the channel.',
    tone: 'target',
  },
  {
    phase: 'In development',
    title: 'L2 EA — MetaTrader 5',
    desc: 'Rule-based execution with independent risk controls, hybrid orders and detailed logs. Not yet for sale.',
    tone: 'build',
  },
  {
    phase: 'Planned',
    title: 'L2 Indicator — TradingView',
    desc: 'Visualise the conditions behind the rule set on your own chart. Intended scope only; no release date.',
    tone: 'plan',
  },
  {
    phase: 'Planned',
    title: 'L2 Signals App',
    desc: 'Member access, performance reporting, journals, trade logs and analytics. Intended scope only.',
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
                  className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                  style={{ color: tone.color, background: 'rgba(0,0,0,0.16)', border: `1px solid ${tone.border}` }}
                >
                  {step.phase}
                </span>
                <p className="text-xs font-bold text-text-primary mt-4 pr-16">{step.title}</p>
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
