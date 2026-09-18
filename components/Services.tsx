export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card">
        <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">What you get</p>
        <h2 className="text-lg font-bold text-text-primary mt-1">Signals with discipline, not hype</h2>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-semibold">Intraday XAU/USD</p>
            <p className="text-[11px] text-text-muted mt-1">15M stack, to 21:00 UTC close. No 1-minute stare.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-semibold">Telegram delivery</p>
            <p className="text-[11px] text-text-muted mt-1">Exit playbook 50%@+1R → BE → TP + daily channel updates.</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
            <p className="text-xs font-semibold">Verifiable ledger</p>
            <p className="text-[11px] text-text-muted mt-1">Every R and date logged. Proof before promises.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mt-4 text-xs">
          <a href="/services#api" className="rounded-xl p-3 hover:border-accent-gold transition" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Signals API</p><p className="text-text-muted mt-1">Plug live signals into your bot or dashboard.</p></a>
          <a href="/services#systems" className="rounded-xl p-3 hover:border-accent-gold transition" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Custom trading systems</p><p className="text-text-muted mt-1">Your strategy coded — or one built for you.</p></a>
          <a href="/services#apps" className="rounded-xl p-3 hover:border-accent-gold transition" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Websites & mobile apps</p><p className="text-text-muted mt-1">Crypto, broker, wallet, fintech — shipped fast.</p></a>
          <a href="/services#hire" className="rounded-xl p-3 hover:border-accent-gold transition" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}><p className="font-semibold">Hire & partnerships</p><p className="text-text-muted mt-1">Work with the founder, not just the product.</p></a>
        </div>
        <p className="text-[11px] text-text-muted mt-4">Everything quoted custom — <a href="/services" className="text-accent-gold hover:underline">see services</a> or <a href="/quote" className="text-accent-gold hover:underline">get a quote →</a></p>
      </div>
    </section>
  )
}
