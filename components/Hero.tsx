"use client"

import { motion, useReducedMotion } from 'framer-motion'
import QuantBackground from './QuantBackground'
import { BUSINESS } from '../data/business'

const CTAS = [
  { label: 'See our services', href: '/services', primary: true },
  { label: 'Explore products', href: '#products', primary: false },
  { label: 'See the signal service', href: '#signals', primary: false },
  {
    label: 'Contact the business',
    href: 'mailto:l2signalslab@gmail.com?subject=L2%20Signals%20Services%20enquiry',
    primary: false,
    external: true,
  },
]

const SERVICES = [
  {
    label: 'Software development',
    d: 'Web, mobile, APIs, dashboards and internal tools — scoped, built and shipped.',
  },
  {
    label: 'IT support services',
    d: 'Setup, maintenance, integrations and troubleshooting for teams that need uptime.',
  },
  {
    label: 'Algorithmic trading tools',
    d: 'Signal engines, MT5 expert advisors, indicators, backtests and execution automation.',
  },
  {
    label: 'Technology consultancy',
    d: 'Architecture, product and systems advice before you commit budget or headcount.',
  },
]

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      <QuantBackground />

      <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center space-y-5"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur"
            style={{ background: 'rgba(0,0,0,0.28)', borderColor: 'rgba(255,255,255,0.14)', color: '#fff' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
            {BUSINESS.name} · software, IT support &amp; trading technology
          </div>

          <h1 className="text-[30px] sm:text-[38px] md:text-[46px] font-bold leading-[1.03] tracking-tight text-white">
            Software, IT support and algorithmic
            <br />
            <span className="font-mono font-light tracking-tight" style={{ color: 'var(--accent-gold)' }}>
              trading tools for firms and traders.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] leading-relaxed text-white/80 max-w-2xl mx-auto">
            L2 Signals Services builds software and systems for{' '}
            <span className="text-white font-medium">
              retail traders, hedge and prop firms, fintechs and businesses
            </span>
            . We develop software, support the systems it runs on, build algorithmic trading tools and advise on
            technology decisions. Our flagship product,{' '}
            <span className="text-white font-medium">L2 Signals</span>, is our own proof of work: a live,
            rule-based XAU/USD signal engine.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 pt-1">
            {CTAS.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                {...(cta.external ? { target: '_blank', rel: 'noopener' } : {})}
                className={
                  cta.primary
                    ? 'inline-flex items-center justify-center rounded-full bg-accent-gold text-white text-xs font-semibold px-6 py-2.5 min-h-[44px] w-full sm:w-auto hover:opacity-90 transition'
                    : 'inline-flex items-center justify-center rounded-full border text-xs font-medium px-6 py-2.5 min-h-[44px] w-full sm:w-auto backdrop-blur hover:border-white/40 transition'
                }
                style={
                  cta.primary
                    ? undefined
                    : { borderColor: 'rgba(255,255,255,0.22)', color: '#fff', background: 'rgba(255,255,255,0.06)' }
                }
              >
                {cta.label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2 font-mono text-[10px]">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">
              L2 Signals · 4.25-yr backtest · 20,237 signals · 64.8% WR
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">
              No profit is guaranteed
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.06, duration: 0.4 }}
              className="rounded-xl p-3 text-left backdrop-blur"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: 'var(--accent-gold)' }}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="text-xs font-semibold text-white mt-1">{service.label}</p>
              <p className="text-[10px] text-white/65 mt-1 leading-relaxed">{service.d}</p>
            </motion.div>
          ))}

          <motion.a
            href="/quote"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + SERVICES.length * 0.06, duration: 0.4 }}
            className="rounded-xl p-3 text-left backdrop-blur hover:border-white/40 transition sm:col-span-2"
            style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: 'var(--accent-gold)' }}>
              {String(SERVICES.length + 1).padStart(2, '0')}
            </p>
            <p className="text-xs font-semibold text-white mt-1">Have something to build?</p>
            <p className="text-[10px] text-white/70 mt-1 leading-relaxed">
              Tell us the problem — we scope it and quote per project. Start with a quote →
            </p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
