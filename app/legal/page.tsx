import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Legal & Risk Disclosure — L2 Signals', description: 'Risk warnings, disclaimers and legal conditions for L2 Signals.' }

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">For traders who want an edge, not a gamble</p>
        <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">Legal & Risk Disclosure</h1>
        <p className="text-xs text-text-muted mt-2 leading-relaxed break-words">Read this before using signals or trading live. Not financial advice. Contact: <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">l2signalslab@gmail.com</a>.</p>

        <div className="prose prose-sm max-w-none mt-4 sm:mt-6 space-y-4 sm:space-y-5 text-xs sm:text-[13px] leading-relaxed text-text-secondary break-words">
          <section className="rounded-xl p-3" style={{ background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.15)' }}>
            <p className="text-sm font-bold text-status-loss">Trading Risk Warning</p>
            <p className="mt-1">Trading spot XAU/USD (gold) and similar instruments involves substantial risk of loss and is not suitable for all investors. Leverage magnifies losses. You can lose more than your deposit with some providers. Only trade with capital you can afford to lose. Past performance is not indicative of future results.</p>
          </section>

          <section><h2 className="text-sm font-bold text-text-primary">1. No financial advice</h2><p>L2 Signals provides informational signal levels, education and tooling. We are not a licensed broker, CTA, or investment adviser. Our content does not constitute a recommendation, solicitation or personal advice. Make your own decisions and consider seeking independent professional advice.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">2. Performance & backtests</h2><p>Results shown (e.g. demo $100→$1,007, backtest PF/WR, ledger R) are based on historical, demo or paper trading under specific conditions (ATR SL, 1–2% risk, 21:00 UTC close). They are not typical, may be one-directional market windows, and may not repeat. We log every trade in the proof ledger — wins and losses — but that ledger is not a promise of future profit. Execution quality, spreads, swaps, slippage and psychology affect real results.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">3. Not a managed account</h2><p>We don’t manage funds, access your broker, or guarantee fills. You remain fully responsible for execution, sizing and risk. Any “funded” or prop context refers to your own external prop firm — we are not affiliated unless stated.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">4. Earnings & marketing</h2><p>Any earnings, compounding or balance projections are illustrative, depend on your own risk and discipline (e.g. 50% @ +1R → BE playbook) and are not guarantees.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">5. Intellectual property & fair use</h2><p>All trademarks, content, signals and code are owned by L2 Signals / AOT or licensors. Don’t republish signals or scrape market-data beyond fair personal use.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">6. Cookies & analytics</h2><p>We use minimal cookies/localStorage for theme and session. Hosting analytics (Vercel) may log anonymized requests. See <a href="/privacy" className="text-accent-gold hover:underline">Privacy</a>.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">7. Limitation of liability</h2><p>To the extent permitted by law, L2 Signals and its founder exclude liability for trading losses, indirect or consequential damages. Total liability is limited as set in <a href="/terms" className="text-accent-gold hover:underline">Terms</a>.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">8. Contact & governing law</h2><p>For questions: <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline">l2signalslab@gmail.com</a> • <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Telegram</a>. Unless a custom contract says otherwise, these notices are interpreted under applicable local law.</p></section>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 sm:mt-6">
          <a href="/terms" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Terms</a>
          <a href="/privacy" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Privacy</a>
          <a href="/quote" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">DM for a quote</a>
        </div>
      </div>
    </div>
  )
}
