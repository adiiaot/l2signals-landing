import { AlertTriangle, Users, TrendingDown, Brain } from 'lucide-react'

const PROBLEMS = [
  { icon: Brain, title: 'Emotional trading', desc: 'No system → revenge trades, over-leverage, blowing accounts on gold volatility.' },
  { icon: TrendingDown, title: 'No edge', desc: 'Guessing entries, no backtest, no valid R:R — winners don’t cover losers.' },
  { icon: Users, title: 'Trading alone', desc: 'No community, no accountability, repeating the same mistakes in isolation.' },
  { icon: AlertTriangle, title: 'Inconsistent execution', desc: 'Chasing price, missing fills, no hybrid fallback — moves missed daily.' },
]

export default function Problem() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-sm font-bold text-text-primary mb-3">Problem we solve</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map(p => (
              <div key={p.title} className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
                <p.icon className="w-4 h-4 text-status-loss mb-2" />
                <p className="text-xs font-bold text-text-primary">{p.title}</p>
                <p className="text-[11px] text-text-muted leading-relaxed mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-gold-rgb),0.08), rgba(0,0,0,0.0))' }}>
          <h3 className="text-sm font-bold text-accent-gold mb-3">Our solution</h3>
          <ul className="space-y-2 text-xs text-text-secondary">
            <li className="flex gap-2"><span className="text-status-win">✓</span> Deterministic signals — same 3 strategies every time, no discretion.</li>
            <li className="flex gap-2"><span className="text-status-win">✓</span> Hybrid limit + stop (whichever fills, same SL/TP, cancel other) → never miss the move.</li>
            <li className="flex gap-2"><span className="text-status-win">✓</span> Risk-first sizing (0.01 lot · 1–2% · to 21:00 UTC close), exit playbook 50%@+1R → BE, TP-first when the target is under 1R.</li>
            <li className="flex gap-2"><span className="text-status-win">✓</span> Every trade logged — Firestore ledger + X posts + Telegram daily → verifiable.</li>
            <li className="flex gap-2"><span className="text-status-win">✓</span> Community channel — daily results, accountability, education, not isolation.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
