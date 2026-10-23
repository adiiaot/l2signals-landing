export default function HowItWorks() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <h2 className="text-lg font-bold text-text-primary">How it works</h2>
        <p className="text-xs text-text-muted mt-1">No IP spill — just what traders need to evaluate edge.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold text-accent-gold">3 Strategies</p>
            <p className="text-[11px] text-text-muted mt-1">EMA Bounce · Consolidation Breakout · Trend Continuation (+ ORB on opens). Each picks a different market regime.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold text-accent-gold">Hybrid Execution</p>
            <p className="text-[11px] text-text-muted mt-1">Every signal ships limit + stop (same SL/TP). Whichever touches first fills; we cancel the other. Market if already past both.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold text-accent-gold">Real Data</p>
            <p className="text-[11px] text-text-muted mt-1">Live MT5 broker feed as primary, Dukascopy as fallback. Each signal is tagged with the feed it came from — unvalidated feeds never enter the stats.</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl p-4 flex flex-wrap gap-2 text-[11px]" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.15)' }}>
          <span className="badge-gold">4.25-yr backtest · 20,237 signals · 64.8% WR · +0.69R avg</span>
          <span className="badge-win">2-month current config · 152 fills · 74.2% WR · PF 5.12</span>
          <span className="badge-info">Live demo · $100 → $1,007.41 in 37 days</span>
        </div>
      </div>
    </section>
  )
}
