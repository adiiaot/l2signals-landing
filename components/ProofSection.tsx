'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, ShieldCheck } from 'lucide-react'

type Account = 'demo' | 'prop'
type Outcome = 'win' | 'loss' | 'expired' | 'unknown'

interface TradeRow {
  id: string
  date: string
  result: string
  outcome: Outcome
  resultLabel: string
  direction: string
  entry: number | null
  exit: number | null
  sl: number | null
  tp: number | null
  lot: number | null
  pnl: number | null
  /** Realised R only. `null` means the record does not contain enough data. */
  rr: number | null
}

const WEB_API = (process.env.NEXT_PUBLIC_L2_WEB_API || 'https://l2signal-web-six.vercel.app').replace(/\/$/, '')
const PUBLIC_PROOF = `${WEB_API}/proof`
const VISIBLE_TRADES = 30

function finite(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function dateOf(value: unknown): string {
  if (value && typeof value === 'object' && 'toDate' in value) {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString().slice(0, 10)
    } catch {
      return ''
    }
  }
  return typeof value === 'string' ? value.slice(0, 10) : ''
}

/**
 * Realised R is only reported when the record actually supports it:
 *  1. an explicit realised R, or
 *  2. entry + exit + a positive stop-loss, from which R can be calculated.
 *
 * Planned R is not substituted for realised R, and no assumed stop distance is
 * invented. A missing value displays as "not recorded" rather than a guess.
 */
function realisedR(raw: Record<string, unknown>): number | null {
  const explicit = finite(raw.realizedR)
  if (explicit !== null) return explicit

  const entry = finite(raw.entryPrice)
  const exit = finite(raw.exitPrice)
  const sl = finite(raw.stopLoss)
  if (entry === null || exit === null || sl === null) return null
  if (entry <= 0 || exit <= 0 || sl <= 0) return null

  const risk = Math.abs(entry - sl)
  if (risk <= 0.0001) return null

  const direction = String(raw.direction || (raw.trend === 'UP' ? 'LONG' : raw.trend === 'DOWN' ? 'SHORT' : '')).toUpperCase()
  const isLong = direction.includes('LONG') || direction === 'UP'
  const isShort = direction.includes('SHORT') || direction === 'DOWN'
  if (!isLong && !isShort) return null

  const r = (isLong ? exit - entry : entry - exit) / risk
  return Number.isFinite(r) ? r : null
}

/**
 * The execution ledger is a record of what happened, not a marketing score.
 * A negative P/L is a loss even if the stored result field says "win"; an
 * explicit "loss" stays a loss. Expired/unfilled records are kept separate.
 */
function outcomeOf(raw: Record<string, unknown>): Outcome {
  const result = String(raw.result || '').toLowerCase()
  if (result.includes('expire')) return 'expired'
  if (result.includes('loss')) return 'loss'

  const pnl = finite(raw.pnl)
  if (pnl !== null && pnl < 0) return 'loss'
  if (result.includes('win')) return 'win'
  if (pnl !== null && pnl > 0) return 'win'
  return 'unknown'
}

function labelFor(outcome: Outcome, result: string): string {
  if (outcome === 'expired') return 'EXPIRED'
  if (outcome === 'loss') return 'LOSS'
  if (outcome === 'win') return result.toLowerCase().includes('partial') ? 'PARTIAL' : 'WIN'
  return 'RECORDED'
}

function normalise(raw: Record<string, unknown>, account: Account): TradeRow {
  const result = String(raw.result || 'recorded')
  const outcome = outcomeOf(raw)
  return {
    id: String(raw.id || raw.tradeId || `${account}-${dateOf(raw.timestamp)}-${raw.entryPrice || ''}-${raw.exitPrice || ''}`),
    date: dateOf(raw.timestamp),
    result,
    outcome,
    resultLabel: labelFor(outcome, result),
    direction: String(raw.direction || (raw.trend === 'UP' ? 'LONG' : raw.trend === 'DOWN' ? 'SHORT' : '—')),
    entry: finite(raw.entryPrice),
    exit: finite(raw.exitPrice),
    sl: finite(raw.stopLoss),
    tp: finite(raw.takeProfit),
    lot: finite(raw.entrySize),
    pnl: finite(raw.pnl),
    rr: realisedR(raw),
  }
}

function fmtLevel(value: number | null): string {
  return value === null || value <= 0 ? '—' : value.toFixed(2)
}

function fmtR(value: number | null): string {
  if (value === null) return 'R not recorded'
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}R`
}

export default function ProofSection() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState<Account>('demo')
  const [trades, setTrades] = useState<TradeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)

    const load = async () => {
      try {
        const res = await fetch(`${WEB_API}/api/trades?account=${tab}&limit=200`, { cache: 'no-store' })
        const json = await res.json().catch(() => null)
        if (cancelled) return
        if (!json?.success || !Array.isArray(json.trades)) throw new Error('ledger unavailable')
        const rows: Record<string, unknown>[] = json.trades.filter(
          (row: unknown): row is Record<string, unknown> => Boolean(row) && typeof row === 'object'
        )
        setTrades(rows.map((row) => normalise(row, tab)))
      } catch {
        if (!cancelled) {
          setTrades([])
          setError(true)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const timer = setInterval(load, 60_000)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [tab])

  const summary = useMemo(() => {
    const wins = trades.filter((trade) => trade.outcome === 'win').length
    const losses = trades.filter((trade) => trade.outcome === 'loss').length
    const expired = trades.filter((trade) => trade.outcome === 'expired').length
    const decided = wins + losses
    const withR = trades.filter((trade) => trade.outcome !== 'expired' && trade.rr !== null).length
    const totalR = trades.reduce(
      (sum, trade) => (trade.outcome === 'expired' ? sum : sum + (trade.rr ?? 0)),
      0
    )
    const winRate = decided > 0 ? Math.round((wins / decided) * 1000) / 10 : null
    return { decided, wins, losses, expired, withR, totalR, winRate }
  }, [trades])

  const shown = trades.slice(0, VISIBLE_TRADES)

  return (
    <section id="proof" className="max-w-6xl mx-auto px-4 py-6 scroll-mt-20 scroll-reveal">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">
            Performance &amp; methodology
          </p>
          <h2 className="text-lg sm:text-xl font-bold mt-1">The execution ledger</h2>
          <p className="text-[11px] text-text-muted mt-1 max-w-2xl leading-relaxed">
            Trades recorded by the operator on the demo and prop accounts. Realised R is shown only where the
            record supports it. This is execution data — not the official engine record, and not a promise for
            your account.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 p-1 rounded-full w-full sm:w-auto" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }} role="tablist" aria-label="Account">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'demo'}
            onClick={() => setTab('demo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${tab === 'demo' ? 'bg-accent-gold text-white' : 'text-text-muted hover:text-text-primary'}`}
          >
            Demo
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'prop'}
            onClick={() => setTab('prop')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${tab === 'prop' ? 'bg-accent-gold text-white' : 'text-text-muted hover:text-text-primary'}`}
          >
            Prop
          </button>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        {loading ? (
          <p className="py-8 text-center text-xs font-mono text-text-muted">Loading the recorded ledger…</p>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-xs text-text-muted">The live ledger could not be loaded.</p>
            <a
              href={PUBLIC_PROOF}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-gold hover:underline"
            >
              Open the public performance record <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ) : trades.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-xs text-text-muted">No trades are recorded on this account yet.</p>
            <p className="text-[10px] text-text-muted mt-1">An empty ledger is reported as empty — not filled with sample results.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
              <span className="badge-info">{tab === 'demo' ? 'Demo account' : 'Prop account'}</span>
              <span className="text-text-muted">{trades.length} recorded trades</span>
              <span className="text-text-muted">· {summary.decided} decided</span>
              <span className="text-text-muted">· {summary.wins}W / {summary.losses}L</span>
              {summary.expired > 0 && <span className="text-text-muted">· {summary.expired} expired</span>}
              <span className="text-text-muted">· {summary.withR} with realised R</span>
              {summary.winRate !== null && <span className="text-text-muted">· {summary.winRate}% win rate</span>}
              <span className="inline-flex items-center gap-1 text-text-muted w-full sm:w-auto sm:ml-auto">
                <ShieldCheck className="w-3 h-3" aria-hidden /> Source: public web ledger
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="rounded-xl p-2.5 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Decided</p>
                <p className="text-base font-bold font-mono mt-0.5">{summary.decided}</p>
                <p className="text-[9px] text-text-muted mt-0.5">wins + losses</p>
              </div>
              <div className="rounded-xl p-2.5 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Wins</p>
                <p className="text-base font-bold font-mono mt-0.5 text-status-win">{summary.wins}</p>
                <p className="text-[9px] text-text-muted mt-0.5">includes partial wins</p>
              </div>
              <div className="rounded-xl p-2.5 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Losses</p>
                <p className="text-base font-bold font-mono mt-0.5 text-status-loss">{summary.losses}</p>
                <p className="text-[9px] text-text-muted mt-0.5">counted from result / P&amp;L</p>
              </div>
              <div className="rounded-xl p-2.5 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Known R</p>
                <p className="text-base font-bold font-mono mt-0.5 text-accent-gold">
                  {summary.totalR > 0 ? '+' : ''}
                  {summary.totalR.toFixed(2)}R
                </p>
                <p className="text-[9px] text-text-muted mt-0.5">
                  from {summary.withR} of {summary.decided} decided
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((trade, index) => {
                const tone =
                  trade.outcome === 'loss'
                    ? 'var(--status-loss)'
                    : trade.outcome === 'win'
                      ? 'var(--status-win)'
                      : trade.outcome === 'expired'
                        ? 'var(--accent-gold)'
                        : 'var(--text-muted)'
                return (
                  <motion.article
                    key={`${trade.id}-${index}`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.2) }}
                    className="rounded-xl p-3"
                    style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-text-muted">{trade.date || 'date not recorded'}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: tone }}>
                        {trade.direction}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      {trade.outcome === 'expired' ? (
                        <p className="text-sm font-bold font-mono" style={{ color: tone }}>
                          Expired — no fill
                        </p>
                      ) : (
                        <p className="text-lg font-bold font-mono" style={{ color: tone }}>
                          {fmtR(trade.rr)}
                        </p>
                      )}
                      <span
                        className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded"
                        style={{ color: tone, border: `1px solid ${tone}`, opacity: 0.9 }}
                      >
                        {trade.resultLabel}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-text-muted mt-1">
                      E {fmtLevel(trade.entry)} → X {fmtLevel(trade.exit)} · SL {fmtLevel(trade.sl)}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-[10px] font-mono">
                      <span className="text-text-muted">{trade.lot !== null ? `${trade.lot.toFixed(2)} lot` : 'size not recorded'}</span>
                      <span style={{ color: (trade.pnl ?? 0) >= 0 ? 'var(--status-win)' : 'var(--status-loss)' }}>
                        {trade.pnl === null ? 'P/L not recorded' : `${trade.pnl > 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`}
                      </span>
                    </div>
                  </motion.article>
                )
              })}
            </div>

            <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
              R is calculated from the recorded entry, exit and a positive stop-loss, or taken from an explicit
              realised R. If a record has no stop-loss, R is shown as not recorded; the trade still counts in the
              win/loss tally but is excluded from Known R. Planned R and an assumed stop distance are never
              substituted. The official monthly Net R — measured from engine outcomes — is published separately
              from this execution ledger.
              {trades.length > VISIBLE_TRADES && ` The summary covers all ${trades.length} recorded trades; the latest ${VISIBLE_TRADES} are shown.`}
            </p>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <a
          href={PUBLIC_PROOF}
          target="_blank"
          rel="noopener"
          className="btn-primary rounded-full px-5 py-2.5 text-xs justify-center inline-flex items-center gap-1.5"
        >
          Public performance record <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a href="#methodology" className="btn-secondary rounded-full px-5 py-2.5 text-xs justify-center">
          How Net R is measured
        </a>
      </div>
    </section>
  )
}
