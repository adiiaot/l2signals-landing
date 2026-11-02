import Link from 'next/link'
import { BUSINESS, REGISTRATION, RISK_NOTICE, registrationLine } from '@/data/business'

const CARD_LINK = 'block text-xs text-text-muted hover:text-accent-gold transition'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 text-sm">
        <div className="space-y-3 sm:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/images/l2signals_logo.jpg" alt="L2 Signals Services" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-accent-gold">{BUSINESS.name}</p>
              <p className="text-[10px] tracking-[0.18em] text-text-muted uppercase">Software development &amp; trading technology</p>
            </div>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            L2 Signals Services is a software development business. We build trading systems, signal engines,
            Expert Advisors, indicators, dashboards, websites and mobile applications, and we support the systems
            we build. L2 Signals is one private product of the business and its proof of work.
          </p>
          <p className="text-[10px] text-text-muted leading-relaxed">
            We do not manage member funds and we do not trade on a member&rsquo;s account.
          </p>
          {REGISTRATION.registered && (
            <p className="text-[10px] text-text-muted leading-relaxed">{registrationLine()}</p>
          )}
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Services</p>
          <div className="space-y-2">
            <Link href="/services#apps" className={CARD_LINK}>Software development</Link>
            <Link href="/services#support" className={CARD_LINK}>IT support services</Link>
            <Link href="/services#systems" className={CARD_LINK}>Algorithmic trading tools</Link>
            <Link href="/services#advisory" className={CARD_LINK}>Technology consultancy</Link>
            <Link href="/quote" className={CARD_LINK}>Request a quote</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Products</p>
          <div className="space-y-2">
            <Link href="/signals" className={CARD_LINK}>L2 Signals — private</Link>
            <Link href="/#products" className={CARD_LINK}>L2 EA — in development</Link>
            <Link href="/#products" className={CARD_LINK}>L2 Indicator — planned</Link>
            <Link href="/#products" className={CARD_LINK}>L2 Signals App — private</Link>
            <Link href="/services#api" className={CARD_LINK}>Signals API</Link>
            <Link href="/#roadmap" className={CARD_LINK}>Roadmap</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Legal</p>
          <div className="space-y-2">
            <Link href="/legal" className={CARD_LINK}>Legal &amp; trust centre</Link>
            <Link href="/policies/trading-risk-disclosure" className={CARD_LINK}>Trading risk disclosure</Link>
            <Link href="/terms" className={CARD_LINK}>Terms of service</Link>
            <Link href="/privacy" className={CARD_LINK}>Privacy policy</Link>
          </div>
          <p className="text-[10px] text-text-muted mt-2 leading-relaxed">
            Terms, privacy, risk, subscription, performance and refund documents are all kept in one place.
          </p>
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Contact</p>
          <div className="space-y-2">
            <a href={`mailto:${BUSINESS.email}`} className="block text-xs text-accent-gold hover:underline break-all">
              {BUSINESS.email}
            </a>
            <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener" className={CARD_LINK}>
              Telegram — {BUSINESS.telegramSupportHandle}
            </a>
            <a href={BUSINESS.telegramChannel} target="_blank" rel="noopener" className={CARD_LINK}>
              Public channel — @l2signals
            </a>
            <a href={BUSINESS.x} target="_blank" rel="noopener" className={CARD_LINK}>
              X — @l2signals
            </a>
          </div>

          <p className="font-bold text-text-primary mt-5 mb-2">Founder</p>
          <p className="text-xs text-text-muted">{BUSINESS.founder} — {BUSINESS.founderRole}</p>
          <div className="mt-2 space-y-1">
            <a href="https://www.linkedin.com/in/aotayo" target="_blank" rel="noopener" className={CARD_LINK}>LinkedIn</a>
            <a href="https://x.com/aot_ayo" target="_blank" rel="noopener" className={CARD_LINK}>X — @aot_ayo</a>
            <a href="https://github.com/adiiaot" target="_blank" rel="noopener" className={CARD_LINK}>GitHub</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-6">
        <p
          className="rounded-xl p-3 text-[10px] sm:text-[11px] text-text-muted leading-relaxed"
          style={{ background: 'rgba(var(--status-warn-rgb),0.05)', border: '1px solid rgba(var(--status-warn-rgb),0.2)' }}
        >
          {RISK_NOTICE}
        </p>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 py-4 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-text-muted"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/services" className="hover:text-accent-gold">Services</Link>
          <Link href="/signals" className="hover:text-accent-gold">L2 Signals</Link>
          <Link href="/legal" className="hover:text-accent-gold">Legal</Link>
          <a href={`mailto:${BUSINESS.email}`} className="hover:text-accent-gold">Contact</a>
        </div>
        <p className="text-center md:text-right leading-relaxed">
          © {year} {BUSINESS.name}. All rights reserved. Not financial advice.
        </p>
      </div>
    </footer>
  )
}
