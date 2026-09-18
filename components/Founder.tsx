export default function Founder() {
  return (
    <section id="founder" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <img src="/images/l2signals_logo.jpg" alt="AOT" className="w-10 h-10 rounded-xl object-cover border" style={{ borderColor: 'var(--glass-border)' }} />
          <div>
            <p className="text-[11px] tracking-[0.16em] text-text-muted uppercase">Behind L2 Signals</p>
            <h3 className="text-base font-bold text-text-primary font-mono">AOT — Cross-Asset Quant & Product Engineer</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs text-text-secondary leading-relaxed">
              I&apos;m a Cross-Asset Quant and Product Engineer building and scaling <span className="font-semibold text-text-primary">L2 Signals</span> — an intraday trading system designed to bring systematic trading infrastructure to retail traders. I built L2 because retail gold trading is mostly discretion and emotion: no system, no ledger, no accountability. I wanted the opposite — a deterministic product that logs every trade, every R, every date, and compounds with 1–2% risk.
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Alongside trading systems, I build software products that turn complex workflows into practical, scalable systems. My work sits at the intersection of product engineering, financial markets, automation, AI and trading infrastructure. I use modern AI models to prototype, build, test and iterate faster — while focusing on architecture, data, UX, reliability and long-term scalability.
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              My strongest skill isn&apos;t a framework. It&apos;s taking a complex problem, breaking it into its underlying systems, and shipping something that actually works — from MVP to production, docs, and go-to-market.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="https://www.linkedin.com/in/aotayo" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border hover:border-accent-gold transition" style={{ borderColor: 'var(--glass-border)' }}>LinkedIn</a>
              <a href="https://x.com/aot_ayo" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border hover:border-accent-gold transition" style={{ borderColor: 'var(--glass-border)' }}>X — aot_ayo</a>
              <a href="https://aot-network-portfolio.vercel.app/" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border hover:border-accent-gold transition" style={{ borderColor: 'var(--glass-border)' }}>Portfolio</a>
              <a href="https://github.com/adiiaot" target="_blank" rel="noopener" className="text-xs px-3 py-1.5 rounded-full border hover:border-accent-gold transition" style={{ borderColor: 'var(--glass-border)' }}>GitHub</a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
              <p className="text-[11px] font-mono tracking-[0.16em] text-text-muted uppercase">What I build</p>
              <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
                <li>• <a href="/services#systems" className="hover:text-accent-gold hover:underline">Systematic & algorithmic trading infrastructure</a></li>
                <li>• <a href="/services#api" className="hover:text-accent-gold hover:underline">Intraday systems, automation & data tools for traders</a></li>
                <li>• <a href="/services#apps" className="hover:text-accent-gold hover:underline">Full-stack web & mobile apps, APIs, real-time services</a></li>
                <li>• <a href="/services" className="hover:text-accent-gold hover:underline">AI products & LLM integrations, internal tooling</a></li>
              </ul>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
              <p className="text-[11px] font-mono tracking-[0.16em] text-text-muted uppercase">Focus</p>
              <p className="text-xs text-text-secondary mt-1">Product Engineering • Quantitative Trading • Trading Systems • AI • Web3</p>
              <a href="mailto:l2signalslab@gmail.com" className="btn-primary w-full mt-3 justify-center text-xs py-2 rounded-full">l2signalslab@gmail.com</a>
              <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-[11px] font-mono text-accent-gold hover:underline mt-2 block text-center">Join Channel — stay updated</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
