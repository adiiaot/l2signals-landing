"use client"

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Clock3, Sparkles } from 'lucide-react'
import { OFFER, PRODUCTS, type Product } from '../data/business'

const CARD = { background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' } as const

function statusClass(status: Product['status']): string {
  if (status === 'live' || status === 'early-access' || status === 'available') return 'badge-win'
  if (status === 'in-development') return 'badge-warn'
  return 'badge-info'
}

function isHttp(href: string): boolean {
  return href.startsWith('http')
}

function LinkButton({
  href,
  children,
  variant = 'secondary',
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external || isHttp(href) ? { target: '_blank', rel: 'noopener' } : {})}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} rounded-full px-4 py-2 text-[11px] justify-center min-h-[40px]`}
    >
      {children}
    </a>
  )
}

function CapabilityList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[11px] text-text-secondary leading-relaxed">
          <Check className="w-3 h-3 shrink-0 mt-0.5 text-accent-gold" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Products() {
  const reduce = useReducedMotion()

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">The product ecosystem</p>
          <h2 className="text-lg sm:text-xl font-bold mt-1">One business. Four products and a services track.</h2>
        </div>
        <span className="text-[10px] font-mono text-text-muted">Status is updated when it changes — not when it is marketed</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, index) => {
          const featured = Boolean(product.featured)
          return (
            <motion.article
              key={product.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className={`card group flex flex-col overflow-hidden ${
                featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {product.image && (
                <div className="relative -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-4 overflow-hidden border-b" style={{ borderColor: 'var(--glass-border)' }}>
                  <motion.img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    loading="lazy"
                    className="w-full h-[190px] sm:h-[220px] object-cover"
                    whileHover={reduce ? undefined : { scale: 1.035 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, transparent, rgba(10,14,20,0.72))' }}
                  />
                  <span
                    className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur"
                    style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.18)' }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: 'var(--accent-gold)' }} aria-hidden />
                    MetaTrader 5 · Expert Advisor
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold leading-tight">{product.name}</h3>
                  <p className="text-[11px] text-text-muted mt-0.5">{product.tagline}</p>
                </div>
                <span className={`${statusClass(product.status)} shrink-0 text-[9px] px-2 py-0.5`}>
                  {product.statusLabel}
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-text-secondary mt-2.5 leading-relaxed">{product.description}</p>

              {featured && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="rounded-lg p-2 text-center" style={CARD}>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Price</p>
                    <p className="text-[11px] font-bold font-mono mt-0.5">
                      ₦{Math.round(OFFER.ngn / 1000)}k / ${OFFER.usd}
                    </p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={CARD}>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Access</p>
                    <p className="text-[11px] font-bold font-mono mt-0.5">{OFFER.days} days</p>
                  </div>
                  <div className="rounded-lg p-2 text-center" style={CARD}>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Cohort</p>
                    <p className="text-[11px] font-bold font-mono mt-0.5">{OFFER.foundingCap} max</p>
                  </div>
                </div>
              )}

              <div className="mt-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-text-muted mb-1.5">For</p>
                <p className="text-[11px] text-text-secondary leading-relaxed">{product.audience}</p>
              </div>

              <div className="mt-3 flex-1">
                <p className="text-[9px] uppercase tracking-[0.14em] text-text-muted mb-1.5">
                  {product.status === 'planned' ? 'Intended scope' : 'Capabilities'}
                </p>
                <CapabilityList items={product.capabilities} />
              </div>

              {product.note && (
                <p className="mt-3 text-[10px] font-mono text-text-muted flex items-start gap-1.5 leading-relaxed">
                  <Clock3 className="w-3 h-3 shrink-0 mt-0.5" aria-hidden />
                  {product.note}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <LinkButton href={product.cta.href} variant={featured ? 'primary' : 'secondary'} external={product.cta.external}>
                  {product.cta.label}
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                </LinkButton>
                {product.secondary && (
                  <LinkButton href={product.secondary.href} external={product.secondary.external}>
                    {product.secondary.label}
                  </LinkButton>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>

      <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
        An L2 Signals membership gives access to the signal service for the paid period. It does not buy the
        software, the strategy, the brand or a right to redistribute signals. L2 EA, L2 Indicator and the L2
        Signals App are not currently for sale.
      </p>
    </section>
  )
}
