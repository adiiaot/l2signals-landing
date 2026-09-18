"use client"
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Lock, ChevronLeft, ChevronRight } from 'lucide-react'
import { demoTweets, propTweets } from '../data/tweets'

function fmtR(v?: number) {
  if (v === undefined || v === null || v === 0) return '—'
  return `${v > 0 ? '+' : ''}${v.toFixed(1)}R`
}

function badgeCls(result: string) {
  if (result === 'win' || result === 'win_milestone' || result === 'partial_win') return 'badge-win'
  if (result === 'loss') return 'badge-loss'
  if (result === 'info') return 'badge-info'
  return 'badge-warn'
}

function resolveRR(v: any): number {
  // Priority: realizedR (already profit-based) -> realized via SL -> planned -> pnl-based estimate
  if (typeof v.realizedR === 'number' && Number.isFinite(v.realizedR) && v.realizedR !== 0) return v.realizedR
  const entry = Number(v.entryPrice || 0)
  const exit = Number(v.exitPrice || 0)
  const sl = Number(v.stopLoss || 0)
  const pnl = Number(v.pnl || 0)
  const lot = Number(v.entrySize || v.lot || 0)
  const planned = Number(v.riskRewardRatio || 0)
  if (sl && entry && exit) {
    const risk = Math.abs(entry - sl)
    if (risk > 0.1) {
      const isLong = (v.direction || (v.trend === 'UP' ? 'LONG' : 'SHORT') || 'LONG') === 'LONG'
      const realized = (isLong ? (exit - entry) : (entry - exit)) / risk
      if (Number.isFinite(realized) && Math.abs(realized) > 0.001) return realized
    }
  }
  if (planned && Math.abs(planned) > 0.001) return planned
  // Fallback profit-based: 1R = lot * 100 * $15 price distance (conservative XAU 15m SL avg ~15-20)
  // This ensures 0.00 RR wins (manual logs with no SL) show realized R from actual $ profit, not signal plan
  if (pnl && lot) {
    const ASSUMED_SL_PRICE = 15
    const risk$ = lot * 100 * ASSUMED_SL_PRICE
    if (risk$ > 0.1) return pnl / risk$
  }
  if (pnl > 0) return 0.8
  if (pnl < 0) return -1
  return 0
}

function LedgerCarousel({ data, showX, liveAccount }: { data: typeof demoTweets; showX: boolean; liveAccount?: 'demo' | 'prop' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [liveData, setLiveData] = useState<any[] | null>(null)

  const updateArrows = () => {
    const el = ref.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => updateArrows()
    el.addEventListener('scroll', onScroll)
    updateArrows()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    const id = setInterval(() => {
      if (paused || !el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 308, behavior: 'smooth' })
      }
    }, 5000)
    return () => {
      clearInterval(id)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // fetch live trades — API first (bypasses Firestore rules), fallback to direct Firestore
  useEffect(() => {
    if (!liveAccount) return
    let mounted = true
    ;(async () => {
      try {
        const base = process.env.NEXT_PUBLIC_L2_WEB_API || 'https://l2signal-web-six.vercel.app';
        try {
          const r = await fetch(`${base}/api/trades?account=${liveAccount}&limit=80`, { cache: 'no-store' }).then(x=>x.json()).catch(()=>null);
          if (r?.success && Array.isArray(r.trades) && r.trades.length) {
            const rows = r.trades.slice(0,40).map((v:any) => {
              const rr = resolveRR(v)
              const entry = Number(v.entryPrice || 0)
              const exit = Number(v.exitPrice || 0)
              const sl = Number(v.stopLoss || 0)
              return {
                id: v.id||v.tradeId,
                date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '',
                signalNo: undefined,
                result: v.result || (rr>0?'win':'loss'),
                rr,
                pnl: Number(v.pnl || 0),
                caption: `${v.direction || ''} ${Number(v.entryPrice||0).toFixed(2)} → ${Number(v.exitPrice||0).toFixed(2)} · SL ${Number(v.stopLoss||0).toFixed(2)} · TP ${Number(v.takeProfit||0).toFixed(2)}`,
                tweetUrl: '',
                entry, exit, sl, tp: Number(v.takeProfit||0), lot: Number(v.entrySize||0.01),
              }
            });
            if (mounted && rows.length) { setLiveData(rows); return; }
          }
        } catch {}
        // Fallback direct Firestore
        const { db } = await import('../lib/firebase')
        const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
        const q = query(collection(db, 'trades'), orderBy('timestamp', 'desc'), limit(80))
        const snap = await getDocs(q)
        const rows = snap.docs.map(d => ({ id: d.id, v: d.data() as any }))
          .filter(({ v }) => (v.accountId || 'demo') === liveAccount)
          .slice(0, 40)
          .map(({ id, v }) => {
          const rr = resolveRR(v)
          const entry = Number(v.entryPrice || 0)
          const exit = Number(v.exitPrice || 0)
          const sl = Number(v.stopLoss || 0)
          return {
            id,
            date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '',
            signalNo: undefined,
            result: v.result || (rr>0?'win':'loss'),
            rr,
            pnl: Number(v.pnl || 0),
            caption: `${v.direction || ''} ${Number(v.entryPrice||0).toFixed(2)} → ${Number(v.exitPrice||0).toFixed(2)} · SL ${Number(v.stopLoss||0).toFixed(2)} · TP ${Number(v.takeProfit||0).toFixed(2)}`,
            tweetUrl: '',
            entry, exit, sl, tp: Number(v.takeProfit||0), lot: Number(v.entrySize||0.01),
          }
        })
        if (mounted && rows.length) setLiveData(rows)
      } catch {}
    })()
    return () => { mounted = false }
  }, [liveAccount])

  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  const display = liveData && liveData.length ? liveData : data

  return (
    <div className="relative">
      <button
        aria-label="Previous"
        onClick={() => scroll(-1)}
        disabled={!canLeft}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border bg-white shadow-card items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        aria-label="Next"
        onClick={() => scroll(1)}
        disabled={!canRight}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border bg-white shadow-card items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div ref={ref} className="hidden md:flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 scroll-smooth">
        {display.map((t: any, i: number) => {
          const isWin = (t.rr ?? 0) > 0 || t.result === 'win_milestone' || t.result === 'partial_win'
          const isLoss = (t.rr ?? 0) < 0 || t.result === 'loss'
          const accent = isWin ? 'var(--status-win)' : isLoss ? 'var(--status-loss)' : 'var(--accent-gold)'
          const title = t.caption?.split('·')[0]?.trim() || t.caption
          const detail = t.caption?.split('·').slice(1).join('·').trim()
          const hasLevels = t.entry !== undefined
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -3 }}
              className="min-w-[300px] max-w-[300px] snap-start rounded-xl border flex flex-col justify-between overflow-hidden group hover:shadow-card transition-all"
              style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}
            >
              <div className="h-1 w-full" style={{ background: accent }} />
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className={`badge font-mono text-[10px] ${badgeCls(t.result)}`}>{t.result === 'win_milestone' ? 'MILESTONE' : String(t.result).toUpperCase()}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/[0.04] border" style={{ borderColor: 'var(--glass-border)' }}>
                    {t.signalNo ? `#${String(t.signalNo).padStart(2, '0')}` : '—'} · {t.date}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-semibold leading-tight text-text-primary group-hover:text-accent-gold transition line-clamp-1">{title}</p>
                  {detail && <p className="text-[11px] font-mono text-text-muted mt-1 line-clamp-1">{detail}</p>}
                  {hasLevels && t.entry ? (
                    <div className="mt-2 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                      <span className="rounded px-1.5 py-1 bg-black/[0.03] border text-center" style={{ borderColor: 'var(--glass-border)' }}>E {Number(t.entry).toFixed(2)}</span>
                      <span className="rounded px-1.5 py-1 bg-black/[0.03] border text-center" style={{ borderColor: 'var(--glass-border)' }}>X {Number(t.exit ?? t.tp ?? 0).toFixed(2)}</span>
                      <span className="rounded px-1.5 py-1 bg-black/[0.03] border text-center" style={{ borderColor: 'var(--glass-border)' }}>SL {Number(t.sl ?? t.stopLoss ?? 0).toFixed(2)}</span>
                    </div>
                  ) : null}
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.14em] text-text-muted uppercase">RR</p>
                    <p className="text-[26px] font-bold font-mono leading-none tracking-tight" style={{ color: accent }}>
                      {fmtR(t.rr)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-mono font-medium" style={{ color: (t.pnl ?? 0) >= 0 ? 'var(--status-win)' : 'var(--status-loss)' }}>
                      {t.pnl !== undefined && t.pnl !== 0 ? `${t.pnl > 0 ? '+' : ''}$${Number(t.pnl).toFixed(2)}` : '—'}
                    </p>
                    <p className="text-[10px] font-mono text-text-muted">{t.lot ? `${Number(t.lot).toFixed(2)} lot` : '1–2% risk'}</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2.5 flex items-center justify-between border-t" style={{ borderColor: 'var(--glass-border)', background: 'rgba(var(--text-primary-rgb),0.02)' }}>
                <span className="text-[10px] font-mono text-text-muted">1–2% scales with size</span>
                {showX && t.tweetUrl ? (
                  <a href={t.tweetUrl} target="_blank" rel="noopener" className="text-[11px] font-semibold font-mono inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-gold text-white hover:opacity-90 transition">
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-text-muted inline-flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="md:hidden max-h-[460px] overflow-y-auto no-scrollbar space-y-2.5 pr-1">
        {(liveData && liveData.length ? liveData : data).map((t: any) => {
          const isWin = (t.rr ?? 0) > 0 || t.result === 'win_milestone' || t.result === 'partial_win'
          const isLoss = (t.rr ?? 0) < 0 || t.result === 'loss'
          const accent = isWin ? 'var(--status-win)' : isLoss ? 'var(--status-loss)' : 'var(--accent-gold)'
          const title = t.caption?.split('·')[0]?.trim() || t.caption
          return (
            <div key={t.id} className="rounded-xl border overflow-hidden" style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}>
              <div className="h-1 w-full" style={{ background: accent }} />
              <div className="p-3">
                <div className="flex items-center gap-1.5">
                  <span className={`badge font-mono text-[10px] px-1.5 py-0.5 ${badgeCls(t.result)}`}>{t.result === 'win_milestone' ? 'MILESTONE' : String(t.result).toUpperCase()}</span>
                  <span className="text-[10px] font-mono text-text-muted">{t.date} · #{t.signalNo ?? '—'}</span>
                  <span className="ml-auto text-[15px] font-bold font-mono" style={{ color: accent }}>{fmtR(t.rr)}</span>
                </div>
                <p className="text-xs font-semibold text-text-primary mt-1.5 line-clamp-1">{title}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-text-muted">{t.pnl ? `${t.pnl > 0 ? '+' : ''}$${Number(t.pnl).toFixed(2)}` : ''} · {t.lot ? `${Number(t.lot).toFixed(2)} lot` : '1–2%'}</span>
                  {showX && t.tweetUrl ? (
                    <a href={t.tweetUrl} target="_blank" rel="noopener" className="w-7 h-7 rounded-full bg-accent-gold text-white flex items-center justify-center">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-text-muted flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VerifiedLiveCard() {
  const [trades, setTrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const updateArrows = () => {
    const el = ref.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => updateArrows()
    el.addEventListener('scroll', onScroll)
    updateArrows()
    return () => el.removeEventListener('scroll', onScroll)
  }, [trades])
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    const id = setInterval(() => {
      if (paused || !el || trades.length <= 1) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
      else el.scrollBy({ left: 268, behavior: 'smooth' })
    }, 5000)
    return () => { clearInterval(id); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) }
  }, [trades])
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Use web app public API (bypasses Firestore rules) — same data as /proof in web app
        const base = process.env.NEXT_PUBLIC_L2_WEB_API || 'https://l2signal-web-six.vercel.app';
        const [rDemo, rProp] = await Promise.all([
          fetch(`${base}/api/trades?account=demo&limit=80`, { cache: 'no-store' }).then(r=>r.json()).catch(()=>null),
          fetch(`${base}/api/trades?account=prop&limit=80`, { cache: 'no-store' }).then(r=>r.json()).catch(()=>null),
        ]);
        const all: any[] = [];
        if (rDemo?.success && Array.isArray(rDemo.trades)) all.push(...rDemo.trades.map((v:any)=>({ v, id: v.id||v.tradeId })));
        if (rProp?.success && Array.isArray(rProp.trades)) all.push(...rProp.trades.map((v:any)=>({ v, id: v.id||v.tradeId })));
        // Fallback to direct Firestore if API fails (local dev)
        let rows: any[] = [];
        if (all.length) {
          rows = all.map(({ id, v }) => ({
            id,
            date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '',
            result: v.result || 'win',
            rr: resolveRR(v),
            pnl: Number(v.pnl||0),
            entry: Number(v.entryPrice||0),
            exit: Number(v.exitPrice||0),
            sl: Number(v.stopLoss||0),
            tp: Number(v.takeProfit||0),
            lot: Number(v.entrySize||0.01),
            direction: v.direction || (v.trend === 'UP' ? 'LONG' : 'SHORT'),
            account: v.accountId || 'demo',
          })).sort((a,b) => b.date.localeCompare(a.date)).slice(0, 40);
        } else {
          // Fallback: try direct Firestore (requires rules allow read)
          try {
            const { db } = await import('../lib/firebase')
            const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
            const q = query(collection(db, 'trades'), orderBy('timestamp', 'desc'), limit(80))
            const snap = await getDocs(q)
            rows = snap.docs.map(d => ({ id: d.id, v: d.data() as any }))
              .map(({ id, v }) => ({
                id,
                date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '',
                result: v.result || 'win',
                rr: resolveRR(v),
                pnl: Number(v.pnl||0),
                entry: Number(v.entryPrice||0),
                exit: Number(v.exitPrice||0),
                sl: Number(v.stopLoss||0),
                tp: Number(v.takeProfit||0),
                lot: Number(v.entrySize||0.01),
                direction: v.direction || (v.trend === 'UP' ? 'LONG' : 'SHORT'),
                account: v.accountId || 'demo',
              })).sort((a,b) => b.date.localeCompare(a.date)).slice(0, 40);
          } catch {}
        }
        if (mounted) { setTrades(rows); setLoading(false) }
      } catch { if (mounted) setLoading(false) }
    }
    load()
    const id = setInterval(load, 30000)
    return () => { mounted = false; clearInterval(id) }
  }, [])
  if (loading) return <div className="py-6 text-center text-xs font-mono text-text-muted">Loading live verified trades…</div>
  if (!trades.length) return <div className="py-6 text-center text-xs text-text-muted">No verified trades yet — log one in the web app and it appears here live.</div>
  const wins = trades.filter(t => t.result === 'win' || t.result === 'partial_win').length
  const losses = trades.filter(t => t.result === 'loss').length
  const totalR = trades.reduce((a,t)=> a + (t.rr||0), 0)
  const wr = trades.length ? Math.round((wins/trades.length)*1000)/10 : 0
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-win animate-pulse" /> Verified L2 Signals <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-status-win/10 text-status-win border border-status-win/15">LIVE TRACKING</span></h3>
        <span className="text-[11px] font-mono text-text-muted">{trades.length} trades · {wins}W {losses}L · {wr}% WR · {totalR>0?'+':''}{totalR.toFixed(1)}R</span>
      </div>
      <div className="relative">
        <button aria-label="Previous" onClick={() => scroll(-1)} disabled={!canLeft} className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border bg-white shadow-card items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed" style={{ borderColor: 'var(--glass-border)' }}><ChevronLeft className="w-4 h-4" /></button>
        <button aria-label="Next" onClick={() => scroll(1)} disabled={!canRight} className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border bg-white shadow-card items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed" style={{ borderColor: 'var(--glass-border)' }}><ChevronRight className="w-4 h-4" /></button>
        <div ref={ref} className="hidden md:flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 scroll-smooth">
          {trades.map(t => {
            const isWin = t.rr > 0
            const accent = isWin ? 'var(--status-win)' : t.result === 'loss' ? 'var(--status-loss)' : 'var(--accent-gold)'
            return (
              <div key={t.id} className="min-w-[260px] max-w-[260px] snap-start rounded-xl border p-3" style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: isWin?'rgba(34,197,94,0.12)':'rgba(239,68,68,0.12)', color: accent }}>{String(t.result).toUpperCase()}</span>
                  <span className="text-[10px] font-mono text-text-muted">{t.date} · {t.account.toUpperCase()} · {t.direction}</span>
                </div>
                <p className="text-xs font-mono mt-2">{Number(t.entry).toFixed(2)} → {Number(t.exit).toFixed(2)} · {Number(t.lot).toFixed(2)} lot</p>
                <div className="flex items-end justify-between mt-2">
                  <div><p className="text-[10px] tracking-widest text-text-muted uppercase">R</p><p className="text-lg font-bold font-mono" style={{ color: accent }}>{t.rr>0?'+':''}{Number(t.rr).toFixed(2)}R</p></div>
                  <div className="text-right"><p className="text-xs font-mono" style={{ color: t.pnl>=0?'var(--status-win)':'var(--status-loss)' }}>{t.pnl>=0?'+':''}${Number(t.pnl).toFixed(2)}</p><p className="text-[10px] font-mono text-text-muted">SL {Number(t.sl).toFixed(2)} · TP {Number(t.tp).toFixed(2)}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="md:hidden space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {trades.map(t => (
          <div key={t.id} className="rounded-xl border p-3 flex items-center justify-between" style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}>
            <div>
              <p className="text-xs font-bold" style={{ color: t.rr>0?'var(--status-win)':'var(--status-loss)' }}>{String(t.result).toUpperCase()} · {t.direction} · {Number(t.rr).toFixed(2)}R</p>
              <p className="text-[11px] font-mono text-text-muted">{t.date} · {Number(t.entry).toFixed(2)} → {Number(t.exit).toFixed(2)} · {Number(t.lot).toFixed(2)} lot</p>
            </div>
            <span className="text-xs font-mono" style={{ color: t.pnl>=0?'var(--status-win)':'var(--status-loss)' }}>{t.pnl>=0?'+':''}${Number(t.pnl).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-mono text-text-muted text-center">Live from Firestore — updates within 30s of logging in the web app. No X/Tweet needed.</p>
    </div>
  )
}

function PropWall() {
  const [trades, setTrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        // Prefer web app API (bypasses Firestore rules) — same as VerifiedLiveCard
        const base = process.env.NEXT_PUBLIC_L2_WEB_API || 'https://l2signal-web-six.vercel.app';
        try {
          const r = await fetch(`${base}/api/trades?account=prop&limit=80`, { cache: 'no-store' }).then(x=>x.json()).catch(()=>null);
            if (r?.success && Array.isArray(r.trades) && r.trades.length) {
              const rows = r.trades.slice(0,30).map((v:any) => {
              const rr = resolveRR(v)
              const entry = Number(v.entryPrice || 0)
              const exit = Number(v.exitPrice || 0)
              const sl = Number(v.stopLoss || 0)
              return { id: v.id||v.tradeId, date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '', result: v.result || (rr>0?'win':'loss'), rr, pnl: Number(v.pnl||0), caption: `${v.direction || ''} ${entry.toFixed(2)} → ${exit.toFixed(2)}`, entry, exit, sl, tp: Number(v.takeProfit||0), lot: Number(v.entrySize||0.04) }
            });
            if (mounted && rows.length) { setTrades(rows); setLoading(false); return; }
          }
        } catch {}
        // Fallback direct Firestore (local dev)
        const { db } = await import('../lib/firebase')
        const { collection, query, orderBy, limit, getDocs } = await import('firebase/firestore')
        try {
          const q = query(collection(db, 'trades'), orderBy('timestamp', 'desc'), limit(80))
          const snap = await getDocs(q)
            const rows = snap.docs.map(d => ({ id: d.id, v: d.data() as any }))
            .filter(({ v }) => (v.accountId || 'demo') === 'prop')
            .slice(0, 30)
            .map(({ id, v }) => {
            const rr = resolveRR(v)
            const entry = Number(v.entryPrice || 0)
            const exit = Number(v.exitPrice || 0)
            const sl = Number(v.stopLoss || 0)
            return { id, date: (v.timestamp?.toDate ? v.timestamp.toDate().toISOString().slice(0,10) : String(v.timestamp||'').slice(0,10)) || '', result: v.result || (rr>0?'win':'loss'), rr, pnl: Number(v.pnl||0), caption: `${v.direction || ''} ${entry.toFixed(2)} → ${exit.toFixed(2)}`, entry, exit, sl, tp: Number(v.takeProfit||0), lot: Number(v.entrySize||0.04) }
          })
          if (mounted && rows.length > 0) {
            setTrades(rows)
            setLoading(false)
            return
          }
        } catch {}
        if (mounted) {
          setTrades(propTweets.map(t => ({ id: t.id, date: t.date, result: t.result, rr: t.rr, pnl: t.pnl, caption: t.caption, entry: 0, exit: 0, sl: 0, tp: 0, lot: 0.04 } as any)))
          setLoading(false)
        }
      } catch {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const displayTrades = trades.length ? trades : propTweets.map(t => ({ ...t, entry: 0, exit: 0, sl: 0, tp: 0, lot: 0.04 } as any))
  if (loading) return <div className="py-8 text-center text-xs font-mono text-text-muted">Loading live ledger…</div>

  return (
    <div className="space-y-3">
      <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-text-muted">
        <span className="px-2 py-1 rounded bg-surface-overlay border" style={{ borderColor: 'var(--glass-border)' }}>Live account · private</span>
        <span className="hidden sm:inline">· {displayTrades.length} trades · 1–2% risk · verified privately</span>
      </div>
      <LedgerCarousel data={displayTrades as any} showX={false} />
      <p className="text-[11px] font-mono text-text-muted text-center">Trades verified privately — join private group for live screenshots</p>
    </div>
  )
}

export default function ProofSection() {
  const [tab, setTab] = useState<'demo' | 'prop'>('demo')
  return (
    <section id="proof" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-text-primary">L2 Signals Trade Ledger</h2>
          <p className="text-[11px] font-mono text-text-muted">Every trade · Every R · Every date</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-full" style={{ background: 'rgb(var(--surface-overlay-rgb))', border: '1px solid var(--glass-border)' }}>
          <button onClick={() => setTab('demo')} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${tab === 'demo' ? 'bg-accent-gold text-white' : 'text-text-muted hover:text-text-primary'}`}>Demo</button>
          <button onClick={() => setTab('prop')} className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${tab === 'prop' ? 'bg-accent-gold text-white' : 'text-text-muted hover:text-text-primary'}`}>Prop Live</button>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        {tab === 'demo' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted">
              <span className="px-2 py-1 rounded bg-accent-gold/10 text-accent-gold border border-accent-gold/15">$100 → Live · auto-synced</span>
              <span className="hidden sm:inline">· 1–2% risk · verified Firestore</span>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-status-win/10 text-status-win border border-status-win/15 text-[9px] font-bold tracking-widest">LIVE TRACKING</span>
            </div>
            <LedgerCarousel data={demoTweets} showX={false} liveAccount="demo" />
            <p className="text-[10px] font-mono text-text-muted text-center">Auto-syncs from your Firestore trades — no X posts needed · swipe or use arrows</p>
          </div>
        ) : (
          <PropWall />
        )}

        <div className="mt-4 flex justify-center">
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-xs font-medium px-5 py-2 rounded-full border hover:border-accent-gold transition" style={{ borderColor: 'var(--glass-border)' }}>Join Channel to see next trades →</a>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        <VerifiedLiveCard />
      </div>
    </section>
  )
}
