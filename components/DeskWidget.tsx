"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * A small, animated preview of the desk interface.
 *
 * What it is: the shape of the panel a member sees — instrument, timeframe,
 * live-ish price, depth of market, and the readouts underneath. What it is NOT:
 * a signal, a result, or a live feed. The price walks on a fixed seed and the
 * order book is generated, which is why the header says INTERFACE PREVIEW and
 * the footer says the numbers are sample data. Nothing here is scored, published
 * or counted anywhere, and no order is ever placed by the software.
 */

const BASE_PRICE = 4058.4

type Level = { price: number; size: number; pct: number }

function makeLevels(side: 'bid' | 'ask', count: number): Level[] {
  return Array.from({ length: count }, (_, i) => {
    const offset = (i + 1) * 0.12
    const size = 0.6 + ((i * 37) % 11) / 10
    return {
      price: side === 'bid' ? BASE_PRICE - offset : BASE_PRICE + offset,
      size,
      pct: Math.min(96, 26 + ((i * 53) % 70)),
    }
  })
}

const BIDS = makeLevels('bid', 6)
const ASKS = makeLevels('ask', 6)

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

export default function DeskWidget() {
  const reduce = useReducedMotion()
  const [price, setPrice] = useState(BASE_PRICE)
  const [dir, setDir] = useState<1 | -1 | 0>(0)
  const step = useRef(0)

  useEffect(() => {
    if (reduce) return
    const timer = setInterval(() => {
      step.current += 1
      // Deterministic wander: a sine pair, so it drifts without ever running away.
      const delta = Math.round((Math.sin(step.current * 0.9) * 0.42 + Math.cos(step.current * 0.31) * 0.18) * 100) / 100
      setPrice((current) => Math.round((current + delta) * 100) / 100)
      setDir(delta > 0 ? 1 : delta < 0 ? -1 : 0)
    }, 1800)
    return () => clearInterval(timer)
  }, [reduce])

  const change = Math.round((price - BASE_PRICE) * 100) / 100
  const changePct = (change / BASE_PRICE) * 100

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}
      role="img"
      aria-label="Preview of the L2 Signals desk interface: instrument, price and depth of market, using sample data"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-2 px-3 py-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-semibold tracking-tight">XAU/USD</span>
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' }}>
            M15
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent-gold)' }}
            animate={reduce ? undefined : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[8px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
            interface preview
          </span>
        </div>
      </div>

      {/* price */}
      <div className="px-3 pt-2.5 pb-2 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="font-mono text-[22px] leading-none font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {price.toFixed(2)}
          </p>
          <p className="font-mono text-[9px] mt-1" style={{ color: dir >= 0 ? 'var(--accent-gold)' : 'rgba(255,122,112,0.95)' }}>
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)} ({change >= 0 ? '+' : ''}
            {changePct.toFixed(2)}%)
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
            spread
          </p>
          <p className="font-mono text-[10px]" style={{ color: 'var(--text-secondary)' }}>
            0.24
          </p>
        </div>
      </div>

      {/* depth ladder */}
      <div className="px-3 pb-1 grid grid-cols-2 gap-3">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--text-muted)' }}>
            bids
          </p>
          {BIDS.map((level, i) => (
            <div key={`b${i}`} className="flex items-center justify-end gap-1.5 mb-[3px]">
              <span className="font-mono text-[9px] tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {level.price.toFixed(2)}
              </span>
              <motion.span
                className="h-[6px] rounded-sm origin-right"
                style={{
                  width: `${level.pct}%`,
                  maxWidth: '58%',
                  background: 'linear-gradient(90deg, rgba(0,201,120,0.18), rgba(0,201,120,0.75))',
                }}
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.4 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
              />
            </div>
          ))}
        </div>

        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--text-muted)' }}>
            asks
          </p>
          {ASKS.map((level, i) => (
            <div key={`a${i}`} className="flex items-center justify-start gap-1.5 mb-[3px]">
              <motion.span
                className="h-[6px] rounded-sm origin-left"
                style={{
                  width: `${level.pct}%`,
                  maxWidth: '58%',
                  background: 'linear-gradient(90deg, rgba(255,122,112,0.75), rgba(255,122,112,0.18))',
                }}
                animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.4 + i * 0.35, repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 }}
              />
              <span className="font-mono text-[9px] tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {level.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* readouts */}
      <div className="px-3 py-2 grid grid-cols-3 gap-2" style={{ borderTop: '1px solid var(--glass-border)' }}>
        {[
          { k: 'session', v: 'London' },
          { k: 'close', v: '21:00 UTC' },
          { k: 'risk', v: '1–2%' },
        ].map((item) => (
          <div key={item.k}>
            <p className="font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
              {item.k}
            </p>
            <p className="font-mono text-[10px]" style={{ color: 'var(--text-secondary)', fontFamily: MONO }}>
              {item.v}
            </p>
          </div>
        ))}
      </div>

      <p className="px-3 pb-2.5 text-[9px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        Sample data. The software shows the setup; the order is placed by the member in their own terminal.
      </p>
    </div>
  )
}
