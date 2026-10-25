import Hero from '../components/Hero'
import AboutBusiness from '../components/AboutBusiness'
import Products from '../components/Products'
import SignalsSpotlight from '../components/SignalsSpotlight'
import ProofSection from '../components/ProofSection'
import Methodology from '../components/Methodology'
import HowItWorks from '../components/HowItWorks'
import Why from '../components/Why'
import Roadmap from '../components/Roadmap'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Founder from '../components/Founder'
import Link from 'next/link'
import { BUSINESS } from '../data/business'

export default function Page() {
  return (
    <div className="space-y-2">
      <Hero />
      <AboutBusiness />
      <Founder />
      <Products />
      <SignalsSpotlight />
      <ProofSection />
      <Methodology />
      <HowItWorks />
      <Why />
      <Roadmap />
      <Pricing />
      <FAQ />

      <section id="contact" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal scroll-mt-20">
        <div className="card">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div>
              <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Contact the business</p>
              <h3 className="text-base sm:text-lg font-bold mt-1">Questions before you join — or a project to scope?</h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Ask about L2 Signals, access or a payment, or talk to us about an EA, indicator, API or custom
                software project. Messages are answered by a person.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center break-all"
                >
                  {BUSINESS.email}
                </a>
                <a
                  href={BUSINESS.telegramSupport}
                  target="_blank"
                  rel="noopener"
                  className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center"
                >
                  Telegram — {BUSINESS.telegramSupportHandle}
                </a>
                <Link href="/quote" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
                  Request a quote
                </Link>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <a
                href={BUSINESS.telegramChannel}
                target="_blank"
                rel="noopener"
                className="rounded-xl p-3 hover:border-accent-gold/40 transition"
                style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Public channel</p>
                <p className="text-[11px] font-semibold text-accent-gold mt-1">t.me/l2signals</p>
                <p className="text-[10px] text-text-muted mt-1">Results and release updates.</p>
              </a>
              <a
                href={BUSINESS.x}
                target="_blank"
                rel="noopener"
                className="rounded-xl p-3 hover:border-accent-gold/40 transition"
                style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">X</p>
                <p className="text-[11px] font-semibold text-accent-gold mt-1">@l2signals</p>
                <p className="text-[10px] text-text-muted mt-1">Public posts and updates.</p>
              </a>
              <Link
                href="/services"
                className="rounded-xl p-3 hover:border-accent-gold/40 transition sm:col-span-2"
                style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Build with us</p>
                <p className="text-[11px] font-semibold text-accent-gold mt-1">Services &amp; API</p>
                <p className="text-[10px] text-text-muted mt-1">Scoped custom work.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
