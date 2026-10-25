import Link from 'next/link'
import { BUSINESS } from '@/data/business'

const CARD_LINK = 'block text-xs text-text-muted hover:text-accent-gold transition'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--glass-border)', background: 'var(--glass-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="/images/l2signals_logo.jpg" alt="L2 Signals Services" className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-accent-gold">{BUSINESS.name}</p>
              <p className="text-[10px] tracking-[0.18em] text-text-muted uppercase">Trading technology</p>
            </div>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            We build systematic trading tools, automation and market-analysis software. L2 Signals is our
            flagship signal service, live in early access. We do not manage member funds under the signal
            subscription.
          </p>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Trading involves substantial risk. No profit, win rate or funding outcome is guaranteed.
          </p>
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Products</p>
          <div className="space-y-2">
            <Link href="/#signals" className={CARD_LINK}>L2 Signals — live</Link>
            <Link href="/#products" className={CARD_LINK}>L2 EA — in development</Link>
            <Link href="/#products" className={CARD_LINK}>L2 Indicator — planned</Link>
            <Link href="/#products" className={CARD_LINK}>L2 Signals App — planned</Link>
            <Link href="/services#api" className={CARD_LINK}>Signals API</Link>
            <Link href="/services" className={CARD_LINK}>Custom systems &amp; apps</Link>
            <Link href="/quote" className={CARD_LINK}>Request a quote</Link>
            <Link href="/#roadmap" className={CARD_LINK}>Roadmap</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-text-primary mb-3">Legal &amp; policies</p>
          <div className="space-y-2">
            <Link href="/legal" className={CARD_LINK}>Legal &amp; trust centre</Link>
            <Link href="/terms" className={CARD_LINK}>Terms of Service</Link>
            <Link href="/privacy" className={CARD_LINK}>Privacy Policy</Link>
            <Link href="/policies/trading-risk-disclosure" className={CARD_LINK}>Trading Risk Disclosure</Link>
            <Link href="/policies/subscription-terms" className={CARD_LINK}>Subscription Terms</Link>
            <Link href="/policies/performance-measurement" className={CARD_LINK}>Performance Measurement</Link>
            <Link href="/policies/acceptable-use" className={CARD_LINK}>Acceptable Use</Link>
            <Link href="/policies/refunds-and-cancellations" className={CARD_LINK}>Refunds &amp; Cancellations</Link>
            <Link href="/policies/founding-members-programme" className={CARD_LINK}>Founding Members</Link>
          </div>
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
            <Link href="/pay" className={CARD_LINK}>Payment page</Link>
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

      <div
        className="max-w-6xl mx-auto px-4 py-4 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-text-muted"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/pay" className="hover:text-accent-gold">Pay</Link>
          <Link href="/terms" className="hover:text-accent-gold">Terms</Link>
          <Link href="/privacy" className="hover:text-accent-gold">Privacy</Link>
          <Link href="/legal" className="hover:text-accent-gold">Legal</Link>
          <Link href="/policies" className="hover:text-accent-gold">Policies</Link>
          <Link href="/services" className="hover:text-accent-gold">Services</Link>
        </div>
        <p className="text-center md:text-right leading-relaxed">
          © {year} {BUSINESS.name}. All rights reserved. Not financial advice.
        </p>
      </div>
    </footer>
  )
}
