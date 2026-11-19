"use client"
import { motion, useReducedMotion } from 'framer-motion'

/**
 * The hero's graphic layer.
 *
 * It is a texture, not a chart anyone should read: a deterministic candle series
 * sits low in the section at low opacity, a scan line sweeps across it, and a
 * code ticker runs along the bottom. Nothing here is live data and nothing here
 * is a claim — it is the visual language of a trading desk, kept quiet enough
 * that the headline stays the loudest thing on the page.
 *
 * The series is generated once at module scope from a fixed seed so the server
 * and the client paint the same candles. A `Math.random()` series would differ
 * between the two renders and jump on hydration.
 */

const VIEW_W = 1200
const VIEW_H = 560
const COUNT = 104

type Candle = { i: number; x: number; o: number; c: number; hi: number; lo: number }

/** Linear congruential generator — deterministic, no dependency. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

const CANDLES: Candle[] = (() => {
  const rnd = seeded(20261119)
  const out: Candle[] = []
  const step = VIEW_W / COUNT
  let price = 330

  for (let i = 0; i < COUNT; i += 1) {
    // Slight upward bias with real pullbacks, so it reads as a market rather
    // than a straight line or noise.
    const drift = (rnd() - 0.455) * 30
    const open = price
    const close = Math.max(120, Math.min(430, open + drift))
    const hi = Math.max(open, close) + rnd() * 15
    const lo = Math.min(open, close) - rnd() * 15
    out.push({ i, x: i * step + step / 2, o: open, c: close, hi, lo })
    price = close
  }

  return out
})()

export default function QuantBackground() {
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(10,14,20) 0%, rgb(18,24,34) 55%, rgb(10,14,20) 100%)' }} />
      {/* accent radials */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(900px 500px at 18% 8%, rgba(0,201,120,0.14), transparent 62%), radial-gradient(700px 400px at 88% 22%, rgba(0,201,120,0.08), transparent 60%)' }} />
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* candle field + scan sweep */}
      <div className="absolute inset-0 opacity-[0.5]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="qCandleUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,201,120,0.85)" />
              <stop offset="100%" stopColor="rgba(0,201,120,0.28)" />
            </linearGradient>
            <linearGradient id="qCandleDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,122,112,0.55)" />
              <stop offset="100%" stopColor="rgba(255,122,112,0.18)" />
            </linearGradient>
            <linearGradient id="qScanTrail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,201,120,0)" />
              <stop offset="100%" stopColor="rgba(0,201,120,0.16)" />
            </linearGradient>
            {/* fades the series out upwards so the headline never fights it.
                Mask stops are WHITE with varying opacity: an SVG mask is read by
                luminance, so black — whatever its alpha — masks everything out,
                which is exactly how the first cut of this hid the whole series. */}
            <linearGradient id="qCandleFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="38%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
            <mask id="qCandleMask">
              <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#qCandleFade)" />
            </mask>
          </defs>

          <g mask="url(#qCandleMask)">
            {!reduce && (
              <motion.g
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {CANDLES.map((candle) => {
                  const up = candle.c >= candle.o
                  const bodyTop = Math.min(candle.o, candle.c)
                  const bodyH = Math.max(2.5, Math.abs(candle.c - candle.o))
                  return (
                    <g key={candle.i}>
                      <line
                        x1={candle.x}
                        x2={candle.x}
                        y1={candle.hi}
                        y2={candle.lo}
                        stroke={up ? 'rgba(0,201,120,0.4)' : 'rgba(255,122,112,0.3)'}
                        strokeWidth="1"
                      />
                      <rect
                        x={candle.x - 3.4}
                        y={bodyTop}
                        width="6.8"
                        height={bodyH}
                        rx="1"
                        fill={up ? 'url(#qCandleUp)' : 'url(#qCandleDown)'}
                      />
                    </g>
                  )
                })}
              </motion.g>
            )}

            {/* the sweep: a soft trail with a bright leading edge */}
            {!reduce && (
              <motion.g
                initial={{ x: -180 }}
                animate={{ x: VIEW_W + 120 }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
              >
                <rect x="0" y="0" width="180" height={VIEW_H} fill="url(#qScanTrail)" />
                <rect x="178" y="0" width="2" height={VIEW_H} fill="rgba(0,201,120,0.55)" />
                <rect x="176" y="0" width="6" height={VIEW_H} fill="rgba(0,201,120,0.12)" />
              </motion.g>
            )}
          </g>
        </svg>
      </div>

      {/* drifting sheen */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { x: '-30%' }}
        animate={reduce ? undefined : { x: '30%' }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,201,120,0.10) 50%, transparent 100%)',
          backgroundSize: '50% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* L2 logo watermark */}
      <motion.img
        src="/images/l2signals_logo.jpg"
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain rounded-full"
        style={{ width: 'min(58vw, 560px)', height: 'min(58vw, 560px)', opacity: 0.06, filter: 'blur(0.6px)' }}
        initial={reduce ? false : { scale: 0.97, opacity: 0.05 }}
        animate={reduce ? undefined : { scale: [0.97, 1.02, 0.97], opacity: [0.05, 0.07, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* code ticker */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-white/[0.06] bg-black/20 backdrop-blur">
        <motion.div
          className="flex gap-8 whitespace-nowrap py-2 text-[10px] font-mono tracking-wide text-white/55"
          initial={reduce ? false : { x: 0 }}
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              <span>λ L2_SIGNALS · 3_STRATEGIES · PENDING_LIMIT_ENTRY · 1–2%_RISK</span>
              <span>EMA20 · ADX · RSI · ATR · 21:00_UTC_CLOSE</span>
              <span>BACKTEST_5,810_TRADES · 50.2%_WR · +0.13R_AVG · LABELLED_SEPARATELY</span>
              <span>DETERMINISTIC · MT5_FEED · LIVE_LEDGER</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent 58%, rgba(10,14,20,0.72) 100%)' }} />
    </div>
  )
}
