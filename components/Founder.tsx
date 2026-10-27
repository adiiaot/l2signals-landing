import { BUSINESS } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const
const LINK = 'text-[11px] px-3 py-1.5 rounded-full border hover:border-accent-gold transition'
const BULLET = 'flex gap-2'

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
              GM, I&apos;m AOT.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              I&apos;m a Cross-Asset Quant and Product Engineer building at the intersection of financial markets,
              software engineering, automation, and AI.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              I&apos;m building and scaling L2 Signals, an intraday Signal-as-a-Service system designed to bring
              systematic trading infrastructure and data-driven market insights to retail traders.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              My work focuses on turning complex ideas into practical, reliable, and scalable systems.
            </p>

            <div className="grid gap-2 sm:grid-cols-2 mt-4">
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">What I build</p>
                <p className="text-xs font-semibold mt-1">Trading Systems &amp; Quantitative Development</p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                  <li className={BULLET}><span className="text-accent-gold">•</span>Algorithmic trading systems and intraday signal engines</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>MetaTrader 5 Expert Advisors (EAs) and custom indicators</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>MQL5 development, debugging, testing, and optimization</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>Strategy implementation, backtesting, and performance analysis</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>Trading automation, execution systems, and integrations</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>Technical analysis and structured risk management</li>
                </ul>
              </div>
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">What I build</p>
                <p className="text-xs font-semibold mt-1">Software &amp; Product Engineering</p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                  <li className={BULLET}><span className="text-accent-gold">•</span>Full-stack web and cross-platform mobile applications</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>Backend systems, APIs, databases, and real-time services</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>AI-powered products and LLM integrations</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>Automation, internal tools, and system architecture</li>
                  <li className={BULLET}><span className="text-accent-gold">•</span>MVP development, product strategy, and production delivery</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl p-3 mt-2" style={CARD}>
              <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">Building L2 Signals</p>
              <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                L2 Signals is my trading technology initiative focused on systematic intraday trading, signal
                generation, and quantitative trading tools.
              </p>
              <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                I develop and refine signal engines that combine technical analysis, market conditions, strategy
                rules, and structured risk management to identify qualified trading opportunities.
              </p>
              <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                Beyond signal generation, I work on the infrastructure, delivery workflows, testing, performance
                documentation, and product experience needed to make systematic trading tools accessible to retail
                traders.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 mt-2">
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">My engineering philosophy</p>
                <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                  My strongest skill isn&apos;t a particular framework or programming language. It&apos;s breaking
                  complex problems into their underlying systems and turning them into functional solutions.
                </p>
                <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                  I use modern AI models to accelerate research, prototyping, development, and iteration while
                  prioritizing sound architecture, reliable implementation, testing, and scalability.
                </p>
                <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                  I don&apos;t just build features. I build systems that solve problems.
                </p>
                <p className="text-xs font-semibold text-accent-gold mt-2">If it&apos;s thinkable, it&apos;s buildable.</p>
              </div>
              <div className="rounded-xl p-3" style={CARD}>
                <p className="text-[10px] font-mono tracking-[0.16em] text-text-muted uppercase">Let&apos;s connect</p>
                <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">
                  Algorithmic Trading • Quantitative Systems • MQL5 • Product Engineering • AI • FinTech • Web3
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
