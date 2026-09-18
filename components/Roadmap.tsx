const STEPS = [
  { phase: 'Milestone Achieved', title: 'Demo $100 → $1,007.41 in 37 Days', desc: 'July 29 → Sept 4, 2026 · Systematic, 1–2% risk · Proof complete', done: true },
  { phase: 'Now', title: 'Live Demo + Prop Parallel', desc: 'Both ledgers run for years — live validated, daily channel posts.', done: true },
  { phase: 'Validation', title: 'Prop Firm Live', desc: 'Any firm, any size — trades verified privately in L2 Signals Pro', done: false },
  { phase: 'Next', title: 'Private Signals + Web App', desc: 'Private group + web app when demand proves — channel is the waitlist for the Pro', done: false },
  { phase: 'Open now', title: 'API + Custom Builds', desc: 'Signals API access, trading systems, apps — contact for a custom quote.', done: false, href: '/services' },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary">Roadmap</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
          {STEPS.map(s => {
            const inner = (
              <>
                <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: s.done ? 'var(--accent-gold)' : 'var(--text-muted)' }}>{s.phase}</p>
                <p className="text-xs font-bold text-text-primary mt-1">{s.title}</p>
                <p className="text-[11px] text-text-muted mt-1">{s.desc}</p>
                {s.done && <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(var(--accent-gold-rgb),0.12)', color: 'var(--accent-gold)' }}>✓ Done</span>}
              </>
            )
            const cls = 'rounded-xl p-4 relative overflow-hidden block'
            const style = { background: s.done ? 'rgba(var(--accent-gold-rgb),0.08)' : 'rgb(var(--surface-overlay-rgb))', border: `1px solid ${s.done ? 'rgba(var(--accent-gold-rgb),0.2)' : 'var(--glass-border)'}` } as const
            return 'href' in s && s.href ? (
              <a key={s.phase} href={s.href as string} className={`${cls} hover:border-accent-gold transition`} style={style}>{inner}</a>
            ) : (
              <div key={s.phase} className={cls} style={style}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
