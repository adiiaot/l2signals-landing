export default function WhoFor() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <h3 className="text-sm font-bold text-text-primary">Who it’s for</h3>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold">Retail gold traders</p>
            <p className="text-[11px] text-text-muted mt-1">1–5 years experience, knows SL/TP/RR, wants a rules-based system, not a gamble.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold">Systematic, not emotional</p>
            <p className="text-[11px] text-text-muted mt-1">Wants discipline: one or two eligible intraday setups, a fixed risk per trade and a written exit plan.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-bold">Global & async</p>
            <p className="text-[11px] text-text-muted mt-1">Telegram delivery, any timezone, no 1-minute chart staring. Works with prop firms.</p>
          </div>
        </div>
        <p className="text-[11px] text-text-muted mt-3">Not for: total beginners, or those wanting account management — we never touch your funds without a signed agreement.</p>
      </div>
    </section>
  )
}
