"use client"
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const TRACKS = [
  { key: 'api', name: 'Signals API access', desc: 'Live signals, results, history + webhooks for your bot or dashboard. Manual onboarding.', cta: 'Request API access' },
  { key: 'system-code', name: 'Trading system — code my strategy', desc: 'You bring the rules. We build, backtest and ship the engine + EA.', cta: 'Quote my strategy' },
  { key: 'system-built', name: 'Trading system — build one for me', desc: 'Designed from your markets, capital and risk. Full system + ledger.', cta: 'Quote a full build' },
  { key: 'app', name: 'Website / mobile app', desc: 'Business sites, crypto / broker / wallet / fintech apps. iOS + Android.', cta: 'Quote an app' },
  { key: 'hire', name: 'Hire / partnership', desc: 'Hire AOT or partner on trading, tooling and ventures.', cta: 'Start the conversation' },
] as const

type TrackKey = typeof TRACKS[number]['key'] | 'other'

const TYPE_LABEL: Record<string, string> = {
  api: 'Signals API access',
  'system-code': 'Trading system — code my strategy',
  'system-built': 'Trading system — build one for me',
  app: 'Website / mobile app',
  hire: 'Hire / partnership',
  other: 'Other',
}

const VALID_KEYS = new Set(['api', 'system-code', 'system-built', 'app', 'hire', 'other'])

function QuoteInner() {
  const params = useSearchParams()
  const initial = VALID_KEYS.has(params.get('type') || '') ? (params.get('type') as TrackKey) : ('system-built' as TrackKey)
  const [form, setForm] = useState({ name: '', email: '', telegram: '', type: initial as string, timeline: 'Flexible', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const subject = `Quote request — ${TYPE_LABEL[form.type] || form.type}`
  const bodyLines = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.telegram ? `Telegram: ${form.telegram}` : null,
    `Track: ${TYPE_LABEL[form.type] || form.type}`,
    `Timeline: ${form.timeline}`,
    form.budget ? `Budget (optional): ${form.budget}` : null,
    '',
    'Details:',
    form.message,
  ].filter((l): l is string => l !== null)
  const mailto = `mailto:l2signalslab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`

  const pick = (key: string) => {
    setForm(f => ({ ...f, type: key }))
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Custom quote • Reply within 24h</p>
        <h1 className="text-xl sm:text-2xl font-bold mt-2 leading-tight">Get a quote — DM the developer</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-2xl mx-auto leading-relaxed">No fixed prices — every engagement is scoped and quoted custom. Pick your track below or send details — we reply within 24h with a quote or a short call to scope.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center mt-4">
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-secondary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto">Telegram — t.me/l2signals</a>
          <a href="mailto:l2signalslab@gmail.com" className="btn-primary rounded-full px-5 py-2.5 text-xs w-full sm:w-auto break-all">l2signalslab@gmail.com</a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {TRACKS.map(t => (
          <div key={t.key} className={`card text-left ${form.type === t.key ? 'card-glow' : ''}`}>
            <p className="text-xs font-bold">{t.name}</p>
            <p className="text-[10px] font-mono tracking-[0.14em] text-accent-gold uppercase mt-1">Custom quote</p>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">{t.desc}</p>
            <button onClick={() => pick(t.key)} className={`mt-4 inline-flex w-full justify-center rounded-full px-5 py-2.5 text-xs font-semibold ${form.type === t.key ? 'btn-primary' : 'btn-secondary'}`}>{t.cta} →</button>
          </div>
        ))}
        <div className="card text-left">
          <p className="text-xs font-bold">Not sure which track?</p>
          <p className="text-[10px] font-mono tracking-[0.14em] text-accent-gold uppercase mt-1">Custom quote</p>
          <p className="text-xs text-text-muted mt-2 leading-relaxed">Describe the problem — we’ll point you at the simplest track and quote it.</p>
          <button onClick={() => pick('other')} className="mt-4 inline-flex w-full justify-center rounded-full px-5 py-2.5 text-xs font-semibold btn-secondary">Describe my project →</button>
        </div>
      </div>

      <div id="inquiry" className="card scroll-mt-20">
        <h2 className="text-sm sm:text-base font-bold">Inquiry — tell us about your project</h2>
        <p className="text-xs text-text-muted mt-1">We use this to give you a custom quote. Or <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline break-all">email directly</a>.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <label className="text-xs font-medium">Name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="AOT" autoComplete="name" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium">Email<input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@fund.com" autoComplete="email" inputMode="email" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium">Track<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }}>
            <option value="api">Signals API access</option>
            <option value="system-code">Trading system — code my strategy</option>
            <option value="system-built">Trading system — build one for me</option>
            <option value="app">Website / mobile app</option>
            <option value="hire">Hire / partnership</option>
            <option value="other">Other / not sure</option>
          </select></label>
          <label className="text-xs font-medium">Timeline<select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }}><option>ASAP</option><option>Within a month</option><option>Flexible</option></select></label>
          <label className="text-xs font-medium">Telegram (optional)<input value={form.telegram} onChange={e => setForm({ ...form, telegram: e.target.value })} placeholder="@username" autoComplete="off" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium">Budget — optional<input value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} placeholder="Rough range helps us scope (optional)" autoComplete="off" className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]" style={{ borderColor: 'var(--glass-border)' }} /></label>
          <label className="text-xs font-medium md:col-span-2">Details<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="What should we build? Data, markets, users, links to anything relevant..." className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[110px] resize-y" style={{ borderColor: 'var(--glass-border)' }} /></label>
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
          <li>Every engagement is scoped individually — no fixed prices, custom quote only.</li>
          <li>We reply within 24h with a quote, or a short call if scope needs it.</li>
          <li>Work starts from a written scope — what ships, timeline, payment terms.</li>
          <li>Timelines depend on data access and approvals on your side.</li>
        </ul>
      </div>
    </div>
  )
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-8 text-xs text-text-muted">Loading quote form…</div>}>
      <QuoteInner />
    </Suspense>
  )
}
