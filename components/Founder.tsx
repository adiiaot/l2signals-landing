import { BUSINESS } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const
const LINK = 'text-[11px] px-3 py-1.5 rounded-full border hover:border-accent-gold transition'

export default function Founder() {
  return (
    <section id="founder" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card overflow-hidden">
        <div className="grid gap-5 md:grid-cols-5 md:items-start">
          <div className="md:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--glass-border)' }}>
              <img
                src="/images/founder-aot.jpg"
                alt="AOT, founder and builder of L2 Signals Services"
                loading="lazy"
                className="w-full h-[340px] sm:h-[420px] md:h-auto md:aspect-[4/5] object-cover object-top"
              />
              <div
                className="absolute inset-x-0 bottom-0 p-3"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(8,12,18,0.88))' }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-accent-gold">Founder &amp; builder</p>
                <p className="text-base font-bold text-white leading-tight">AOT</p>
                <p className="text-[10px] text-white/75">L2 Signals Services</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <a href="https://www.linkedin.com/in/aotayo" target="_blank" rel="noopener" className={LINK} style={{ borderColor: 'var(--glass-border)' }}>LinkedIn</a>
              <a href="https://x.com/aot_ayo" target="_blank" rel="noopener" className={LINK} style={{ borderColor: 'var(--glass-border)' }}>X — aot_ayo</a>
              <a href="https://aot-network-portfolio.vercel.app/" target="_blank" rel="noopener" className={LINK} style={{ borderColor: 'var(--glass-border)' }}>Portfolio</a>
              <a href="https://github.com/adiiaot" target="_blank" rel="noopener" className={LINK} style={{ borderColor: 'var(--glass-border)' }}>GitHub</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-text-muted uppercase">Behind L2 Signals</p>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary mt-1 leading-tight">
              I&apos;m AOT. I built L2 Signals — and I stand behind it.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              I&apos;m not hiding behind a brand. I&apos;m the person who designed the engine, the execution rules,
              the performance record and the delivery. L2 Signals is the product I wanted as a trader: a
              deterministic process that states the entry, invalidation, target and expiry — and keeps an honest
              record of every outcome.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              I&apos;m a cross-asset quant and product engineer. I build trading systems, automation, dashboards
              and the infrastructure behind them. L2 Signals is the flagship; L2 EA, L2 Indicator and the member
              app are the next builds. If you want to know who is behind the service, this is me.
            </p>

            <div className="grid gap-2 sm:grid-cols-2 mt-4">
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">What I build</p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                  <li>• <a href="/services#systems" className="hover:text-accent-gold hover:underline">Systematic &amp; algorithmic trading infrastructure</a></li>
                  <li>• <a href="/services#api" className="hover:text-accent-gold hover:underline">Intraday systems, automation &amp; data tools</a></li>
                  <li>• <a href="/services#apps" className="hover:text-accent-gold hover:underline">Full-stack web &amp; mobile apps, APIs, real-time services</a></li>
                  <li>• <a href="/services" className="hover:text-accent-gold hover:underline">AI products, LLM integrations &amp; internal tooling</a></li>
                </ul>
              </div>
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">Focus</p>
                <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                  Product engineering • Quantitative trading • Trading systems • AI • Web3
                </p>
                <a href={`mailto:${BUSINESS.email}`} className="btn-primary w-full mt-3 justify-center text-xs py-2 rounded-full break-all">
                  {BUSINESS.email}
                </a>
                <a href={BUSINESS.telegramChannel} target="_blank" rel="noopener" className="text-[11px] font-mono text-accent-gold hover:underline mt-2 block text-center">
                  Public channel — stay updated
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
