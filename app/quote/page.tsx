"use client"
import { useState } from 'react'

const TIERS = [
  { name: 'Audit & Roadmap', price: 'From $500', sub: '2–3 days', bullets: ['System + data audit', 'Risk, gaps & quick wins', 'Roadmap + fixed quote'], cta: 'DM for audit', href: 'mailto:l2signalslab@gmail.com?subject=Audit%20request%20—%20L2%20Signals' },
  { name: 'Build', price: 'From $2,500', sub: '2–6 weeks', highlight: true, bullets: ['Signal engine / automation / dashboard', 'Prod deploy + docs + handoff', '7 days post-launch support'], cta: 'Get build quote', href: '#inquiry' },
  { name: 'Scale & Retainer', price: '$1,500 / mo', sub: 'Ongoing', bullets: ['New features, monitoring, tuning', 'Priority fixes & iterations', 'Cancel monthly'], cta: 'DM to discuss', href: 'mailto:l2signalslab@gmail.com?subject=Retainer%20—%20L2%20Signals' },
]

export default function QuotePage() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Trading system', budget: '$2.5k–$5k', message: '' })
  const [sent, setSent] = useState(false)
  const mailto = `mailto:l2signalslab@gmail.com?subject=Quote%20request%20—%20${encodeURIComponent(form.type)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`)}`

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Quoting • Fixed price where possible</p>
        <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">Get a quote — DM the developer</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-2xl mx-auto leading-relaxed">Every build is scoped. Pick a tier below or send details — we reply within 24h with a fixed price or a short call to scope.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center mt-4">
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Telegram — t.me/l2signals</a>
          <a href="mailto:l2signalslab@gmail.com" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto break-all">l2signalslab@gmail.com</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3">
        {TIERS.map(t => (
          <div key={t.name} className={`card text-center ${t.highlight ? 'card-glow' : ''}`}>
            <p className="text-xs font-bold">{t.name}</p>
            <p className="text-xl sm:text-2xl font-bold font-mono mt-1 break-words">{t.price}</p>
            <p className="text-[11px] text-text-muted">{t.sub}</p>
            <ul className="text-xs text-text-secondary mt-3 space-y-1.5 text-left">
              {t.bullets.map(b => <li key={b} className="flex gap-2"><span className="text-accent-gold">•</span>{b}</li>)}
            </ul>
            <a href={t.href} className={`mt-4 inline-flex w-full justify-center rounded-full px-5 py-2.5 text-xs font-semibold ${t.highlight ? 'btn-primary' : 'btn-secondary'}`}>{t.cta}</a>
          </div>
        ))}
      </div>

      <div id="inquiry" className="card scroll-mt-20">
        <h2 className="text-sm sm:text-base font-bold">Inquiry — tell us about your system</h2>
        <p className="text-xs text-text-muted mt-1">We use this to give you a fixed quote. Or <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">email directly</a>.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <label className="text-xs font-medium">Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="AOT" autoComplete="name" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium">Email<input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@fund.com" autoComplete="email" inputMode="email" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium">Project type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }}><option>Trading system</option><option>Automation / pipeline</option><option>Dashboard / web app</option><option>AI / LLM tool</option><option>Other</option></select></label>
          <label className="text-xs font-medium">Budget<select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }}><option>$500–$2k</option><option>$2.5k–$5k</option><option>$5k–$10k</option><option>$10k+</option><option>Retainer</option></select></label>
          <label className="text-xs font-medium md:col-span-2">Message<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="What should the system do? Data, markets, users, deadline..." className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[110px] resize-y" style={{ borderColor: 'var(--glass-border)' }} /></label>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
          <a href={mailto} onClick={() => setSent(true)} className="btn-primary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">Send via email →</a>
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-secondary rounded-full px-6 py-2.5 text-xs w-full sm:w-auto">DM on Telegram</a>
        </div>
        {sent && <p className="text-xs text-status-win mt-3">Email draft opened — send it and we’ll reply within 24h.</p>}
        <p className="text-[11px] text-text-muted mt-3">By sending you agree to our <a href="/terms" className="text-accent-gold hover:underline">Terms</a> and <a href="/privacy" className="text-accent-gold hover:underline">Privacy</a>.</p>
      </div>

      <div className="card text-xs text-text-muted leading-relaxed">
        <p className="font-semibold text-text-primary">How quoting works</p>
        <ul className="list-disc ml-4 mt-2 space-y-1">
          <li>Audit first if scope is unclear — credited to build if you proceed.</li>
          <li>Fixed price for defined scope, time & materials only if scope is open-ended (we’ll say so).</li>
          <li>50% upfront, 50% on delivery for builds; retainer billed monthly.</li>
          <li>Quotes valid 14 days. Timelines depend on data access and approvals.</li>
        </ul>
      </div>
    </div>
  )
}
