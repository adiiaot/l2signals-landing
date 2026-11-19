"use client"

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export type StudyPoint = { label: string; netR: number; cumulativeR: number }

/**
 * The back-tested study, drawn.
 *
 * Two panels, each with its own scale and its own label — one period at a time,
 * then the same numbers accumulated. They are deliberately NOT one chart with a
 * shared axis: a 201.8R period and a 763.5R total cannot share a scale without
 * making the bars look like noise, and two scales on one axis is how a chart
 * lies without a single false number in it.
 *
 * Everything here is back-test data. It animates because a bar that grows is
 * easier to read than a bar that is simply there; it never animates a number it
 * does not finish on.
 */
export default function StudyChart({ points }: { points: StudyPoint[] }) {
  const reduce = useReducedMotion()

  const barMax = Math.max(...points.map((p) => Math.abs(p.netR)))
  const cumMax = Math.max(...points.map((p) => p.cumulativeR))

  // Bar panel geometry
  const BW = 620
  const BH = 170
  const padB = 26
  const baseY = BH - padB
  const plotH = baseY - 22
  const slot = BW / points.length
  const barW = Math.min(46, slot * 0.5)

  // Cumulative panel geometry
  const LW = 620
  const LH = 170
  const lPadX = 18
  const lTop = 18
  const lBase = LH - padB
  const stepX = (LW - lPadX * 2) / (points.length - 1)
  const lx = (i: number) => lPadX + i * stepX
  const ly = (value: number) => lBase - (value / cumMax) * (lBase - lTop)
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${lx(i).toFixed(1)} ${ly(p.cumulativeR).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${lx(points.length - 1).toFixed(1)} ${lBase} L ${lx(0).toFixed(1)} ${lBase} Z`

  return (
    <div className="mt-3 grid gap-2 lg:grid-cols-2">
      <figure className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
        <figcaption className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] uppercase tracking-[0.12em] text-text-muted">Net R by period</span>
          <span className="font-mono text-[9px] text-text-muted">back-tested</span>
        </figcaption>

        <svg viewBox={`0 0 ${BW} ${BH}`} className="mt-1 w-full" role="img" aria-label="Back-tested net R for each period, from 2021 H2 to 2026">
          <line x1="0" x2={BW} y1={baseY} y2={baseY} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 4" />
          {points.map((point, i) => {
            const h = Math.max(2, (Math.abs(point.netR) / barMax) * plotH)
            const x = i * slot + (slot - barW) / 2
            return (
              <g key={point.label}>
                <motion.rect
                  x={x}
                  y={baseY - h}
                  width={barW}
                  height={h}
                  rx="2"
                  fill="url(#studyBar)"
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={reduce ? undefined : { scaleY: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                />
                <motion.text
                  x={x + barW / 2}
                  y={baseY - h - 6}
                  textAnchor="middle"
                  fontSize="9"
                  className={i % 2 === 1 ? 'study-val study-hide-sm' : 'study-val'}
                  fill="var(--accent-gold)"
                  fontFamily="ui-monospace, monospace"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                >
                  {point.netR > 0 ? `+${point.netR}` : point.netR}
                </motion.text>
                <text
                  x={x + barW / 2}
                  y={BH - 8}
                  textAnchor="middle"
                  fontSize="9"
                  className={i % 2 === 1 ? 'study-axis study-hide-sm' : 'study-axis'}
                  fill="var(--text-muted)"
                  fontFamily="ui-monospace, monospace"
                >
                  {point.label}
                </text>
              </g>
            )
          })}
          <defs>
            <linearGradient id="studyBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,201,120,0.9)" />
              <stop offset="100%" stopColor="rgba(0,201,120,0.25)" />
            </linearGradient>
          </defs>
        </svg>
      </figure>

      <figure className="rounded-xl p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
        <figcaption className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] uppercase tracking-[0.12em] text-text-muted">Cumulative net R</span>
          <span className="font-mono text-[9px] text-text-muted">{points[points.length - 1].cumulativeR.toFixed(1)}R</span>
        </figcaption>

        <svg viewBox={`0 0 ${LW} ${LH}`} className="mt-1 w-full" role="img" aria-label="Cumulative back-tested net R, ending at 763.5R">
          <line x1="0" x2={LW} y1={lBase} y2={lBase} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 4" />
          <motion.path
            d={areaPath}
            fill="rgba(0,201,120,0.10)"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={reduce ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.3, ease: EASE }}
          />
          {points.map((point, i) => (
            <motion.circle
              key={point.label}
              cx={lx(i)}
              cy={ly(point.cumulativeR)}
              r="2.6"
              fill="var(--accent-gold)"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.06 }}
            />
          ))}
          {points.map((point, i) => (
            <text
              key={`${point.label}-x`}
              x={lx(i)}
              y={LH - 8}
              textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
              fontSize="9"
              className={i === 0 || i === points.length - 1 ? 'study-axis' : 'study-axis study-hide-sm'}
              fill="var(--text-muted)"
              fontFamily="ui-monospace, monospace"
            >
              {point.label}
            </text>
          ))}
        </svg>
      </figure>
    </div>
  )
}
