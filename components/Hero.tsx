"use client"

import { motion, useReducedMotion } from 'framer-motion'
import QuantBackground from './QuantBackground'
import { BUSINESS } from '../data/business'

const CTAS = [
  { label: 'Explore products', href: '#products', primary: true },
  { label: 'See the signal service', href: '#signals', primary: false },
  { label: 'View performance', href: '#proof', primary: false },
  {
    label: 'Contact the business',
    href: 'mailto:l2signalslab@gmail.com?subject=L2%20Signals%20Services%20enquiry',
    primary: false,
    external: true,
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
            {BUSINESS.name} · signal provider
            <span className="hidden sm:inline">&nbsp;&amp; trading technology</span>
          </div>

          <h1 className="text-[30px] sm:text-[38px] md:text-[46px] font-bold leading-[1.03] tracking-tight text-white">
            Software for Firms, Retail Traders and Businesses
            <br />
            <span className="font-mono font-light tracking-tight" style={{ color: 'var(--accent-gold)' }}>
              who want a system or product.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] leading-relaxed text-white/80 max-w-2xl mx-auto">
            L2 Signals Services is a signal provider and trading-technology business. Our flagship service,{' '}
            <span className="text-white font-medium">L2 Signals</span>, publishes rule-based XAU/USD setups to a
            private group for interested members — with a stated entry, invalidation, target and expiry, so members
            can act with structure, context and a repeatable process.
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
              4.25-yr backtest · 20,237 signals · 64.8% WR
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
          className="mt-10 grid gap-2 sm:grid-cols-3 max-w-3xl mx-auto"
        >
          {[
            { k: 'Live', label: 'L2 Signals early access', d: 'Signals delivered; members execute on their own accounts.' },
            { k: 'In development', label: 'L2 EA for MetaTrader 5', d: 'Rule-based execution with independent risk controls.' },
            { k: 'Planned', label: 'L2 Indicator & member app', d: 'Analysis and analytics tools, not yet released.' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
              className="rounded-xl p-3 text-left backdrop-blur"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.16em]" style={{ color: 'var(--accent-gold)' }}>
                {item.k}
              </p>
              <p className="text-xs font-semibold text-white mt-1">{item.label}</p>
              <p className="text-[10px] text-white/65 mt-1 leading-relaxed">{item.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
