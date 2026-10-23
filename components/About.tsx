export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-10 scroll-reveal">
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(var(--accent-gold-rgb),0.12)' }}>
            <span className="text-accent-gold font-bold text-sm">⟁</span>
          </div>
          <h2 className="text-lg font-bold text-text-primary">What is L2 Signals?</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">L2 Signals</span> is a systematic XAU/USD intraday service for disciplined retail traders. We don&apos;t sell a bot that doubles capital. We generate deterministic signals — same rules every time — from real broker gold candles (MT5 feed, Dukascopy fallback), with a hybrid pending-order engine that catches the move whether price retraces to our limit or runs away to our stop. The long-run test is <span className="text-accent-gold font-semibold">4.25 years · 20,237 signals · 64.8% WR · +0.69R per signal</span> — profitable in every year, 2022 through 2026. On the current config over the last 2 months (Jun 18 – Aug 18, 2026): <span className="text-accent-gold font-semibold">152 fills · 74.2% WR · PF 5.12 · +103R</span>.
        </p>
        <p className="text-sm text-text-secondary leading-relaxed mt-3">
          Built by <span className="font-semibold text-accent-gold">AOT — Cross Asset Quant</span>. Every signal, R, date and outcome is logged. Nothing hidden, nothing cherry-picked. The ledger on this page pulls the same Firestore trades the private dashboard uses, so it updates here as new trades are logged.
        </p>
      </div>
    </section>
  )
}
