export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="/images/l2signals_logo.jpg" alt="L2 Signals" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-accent-gold">L2 Signals</p>
              <p className="text-[10px] tracking-[0.18em] text-text-muted uppercase">Intraday Trading</p>
            </div>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Systematic XAU/USD signals for disciplined traders. Not an investment service. We don&apos;t manage funds unless signed agreement.
          </p>
        </div>
        <div>
          <p className="font-bold text-text-primary mb-3">Business</p>
          <div className="space-y-2 text-xs text-text-muted">
            <a href="/#proof" className="block hover:text-accent-gold">Proof of Execution</a>
            <a href="/services" className="block hover:text-accent-gold">Services</a>
            <a href="/services#api" className="block hover:text-accent-gold">Signals API</a>
            <a href="/services#systems" className="block hover:text-accent-gold">Trading Systems</a>
            <a href="/services#apps" className="block hover:text-accent-gold">Websites & Apps</a>
            <a href="/services#hire" className="block hover:text-accent-gold">Hire & Partnerships</a>
            <a href="/quote" className="block hover:text-accent-gold">Get a Quote</a>
            <a href="/#faq" className="block hover:text-accent-gold">FAQ</a>
          </div>
        </div>
        <div>
          <p className="font-bold text-text-primary mb-3">Community</p>
          <div className="space-y-2 text-xs">
            <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="block text-accent-gold hover:underline">Join Our Channel on Telegram</a>
            <a href="https://x.com/l2signals" target="_blank" rel="noopener" className="block text-text-muted hover:text-accent-gold">Follow @l2signals on X</a>
            <a href="mailto:l2signalslab@gmail.com" className="block text-text-muted hover:text-accent-gold">l2signalslab@gmail.com</a>
          </div>
        </div>
        <div>
          <p className="font-bold text-text-primary mb-3">Founder</p>
          <p className="text-xs text-text-muted">AOT — Cross Asset Quant</p>
          <div className="mt-2 space-y-1 text-xs">
            <a href="https://www.linkedin.com/in/aotayo" target="_blank" rel="noopener" className="block text-accent-gold hover:underline">LinkedIn</a>
            <a href="https://x.com/aot_ayo" target="_blank" rel="noopener" className="block text-accent-gold hover:underline">X @aot_ayo</a>
            <a href="https://aot-network-portfolio.vercel.app/" target="_blank" rel="noopener" className="block text-accent-gold hover:underline">Portfolio</a>
            <a href="https://github.com/adiiaot" target="_blank" rel="noopener" className="block text-text-muted hover:text-accent-gold">GitHub</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-4 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-text-muted" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="flex flex-wrap gap-3">
          <a href="/terms" className="hover:text-accent-gold">Terms</a>
          <a href="/privacy" className="hover:text-accent-gold">Privacy</a>
          <a href="/legal" className="hover:text-accent-gold">Legal & Risk</a>
          <a href="/services" className="hover:text-accent-gold">Services</a>
          <a href="/quote" className="hover:text-accent-gold">Quote</a>
        </div>
        <p>© {new Date().getFullYear()} L2 Signals — Systematic XAU/USD • Not financial advice</p>
      </div>
    </footer>
  )
}
