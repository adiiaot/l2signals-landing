const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const PILLARS = [
  {
    tag: 'The record',
    title: 'Every outcome is logged, including the losses',
    body: 'The ledger is not a highlight reel. Official wins, partial results, losses and unfilled signals are recorded and labelled. A broken rule does not get quietly deleted.',
  },
  {
    tag: 'The execution',
    title: 'The order type matters — and it is published',
    body: 'Market and pending orders are not interchangeable. Signals state the order type, entry, stop, target and expiry, and the exit playbook changes when the target is below 1R.',
  },
  {
    tag: 'The boundary',
    title: 'You get access, not control of your account',
    body: 'You keep your funds, your broker and your decisions. We do not take custody, ask for passwords, or promise a return. That boundary is stated before checkout.',
  },
  {
    tag: 'The process',
    title: 'Payments and access are verified, not assumed',
    body: 'A success redirect is not proof of payment. Server-side verification and manual review precede a single-use invite, and one transaction reference cannot back two memberships.',
  },
]

export default function Why() {
  return (
    <section id="why" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Why the structure matters</p>
        <h2 className="text-lg sm:text-xl font-bold mt-1">Trust is built from things you can check</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div key={pillar.tag} className="rounded-xl p-3" style={CARD}>
              <p className="text-[9px] font-mono tracking-[0.16em] text-text-muted uppercase">{pillar.tag}</p>
              <p className="text-[11px] font-semibold mt-1 leading-tight">{pillar.title}</p>
              <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
