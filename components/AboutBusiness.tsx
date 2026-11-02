import { BUSINESS, LIMITS } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

const PRINCIPLES = [
  {
    title: 'Systems over signals',
    body: 'Every product starts with explicit rules: entries, invalidation, targets and risk. If a rule cannot be stated, it is not ready to be automated or offered.',
  },
  {
    title: 'One record, honestly labelled',
    body: 'Official engine outcomes, execution results and personal account results are kept separate. A member’s profit or loss never rewrites the official record.',
  },
  {
    title: 'Status before marketing',
    body: 'Live, in development and planned are different things. Unreleased products are not presented as available, and no release date is invented.',
  },
  {
    title: 'Risk is part of the product',
    body: 'Position sizing, execution differences and the possibility of loss are documented before checkout, not buried after it.',
  },
]

export default function AboutBusiness() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal scroll-mt-20">
      <div className="card">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">About the business</p>
            <h2 className="text-lg sm:text-xl font-bold mt-1">
              A software development company that builds the tools — you keep the controls.
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              L2 Signals Services is a software development business working in trading technology. We build
              software, provide IT support, develop algorithmic trading tools — signal engines, Expert Advisors,
              indicators, backtests, execution automation — and advise on technology decisions. The business is a
              sole proprietorship and grows by taking on client work, not by selling a single product.
            </p>
            <p className="text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed">
              To show the work rather than describe it, the company runs L2 Signals: a rule-based intraday XAU/USD
              engine with a deterministic rule set, a published exit playbook and an official record measured from
              the engine. It is private and invite-only, operated for members who accept a written risk disclosure
              before paying. Around it, L2 EA and L2 Indicator are in development or planned, the member
              application stays a private build, and the same team takes on custom systems, API integrations and
              software work for clients.
            </p>

            <div className="grid gap-2 sm:grid-cols-2 mt-4">
              {PRINCIPLES.map((item) => (
                <div key={item.title} className="rounded-xl p-3" style={CARD}>
                  <p className="text-xs font-semibold">{item.title}</p>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-3">
            <div className="rounded-xl p-4" style={CARD}>
              <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">What we do</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                <li className="flex gap-2"><span className="text-accent-gold">•</span>Develop software — web, mobile, APIs, dashboards and internal tools</li>
                <li className="flex gap-2"><span className="text-accent-gold">•</span>Support IT systems, integrations and day-to-day infrastructure</li>
                <li className="flex gap-2"><span className="text-accent-gold">•</span>Build algorithmic trading tools — engines, MT5 EAs and indicators</li>
                <li className="flex gap-2"><span className="text-accent-gold">•</span>Advise on technology, architecture and product decisions</li>
                <li className="flex gap-2"><span className="text-accent-gold">•</span>Operate one private product of our own — L2 Signals — as proof of work</li>
              </ul>
            </div>

            <div className="rounded-xl p-4" style={{ background: 'rgba(var(--status-warn-rgb),0.06)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}>
              <p className="text-[10px] tracking-[0.16em] uppercase text-status-warn">What we do not do</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed">
                {LIMITS.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-status-warn">•</span>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl p-4" style={CARD}>
              <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">Contact</p>
              <a href={`mailto:${BUSINESS.email}`} className="block text-[11px] font-semibold text-accent-gold hover:underline break-all mt-1">
                {BUSINESS.email}
              </a>
              <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener" className="block text-[11px] font-semibold text-accent-gold hover:underline mt-1">
                Telegram — {BUSINESS.telegramSupportHandle}
              </a>
              <a href={BUSINESS.telegramChannel} target="_blank" rel="noopener" className="block text-[11px] text-text-muted hover:text-accent-gold mt-1">
                Public channel — @l2signals
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
