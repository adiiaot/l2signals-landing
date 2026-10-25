"use client"
import { motion } from 'framer-motion'

export default function QuantBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(10,14,20) 0%, rgb(18,24,34) 55%, rgb(10,14,20) 100%)' }} />
      {/* gold radial */}
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
      {/* drifting sheen */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-30%' }}
        animate={{ x: '30%' }}
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
        initial={{ scale: 0.97, opacity: 0.05 }}
        animate={{ scale: [0.97, 1.02, 0.97], opacity: [0.05, 0.07, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* algorithm line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="qline" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,201,120,0)" />
            <stop offset="18%" stopColor="rgba(0,201,120,0.9)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* EMA-like stepped line */}
        <motion.path
          d="M -20 380 L 120 340 L 220 360 L 320 300 L 420 320 L 520 260 L 640 280 L 760 220 L 880 240 L 980 180 L 1120 160"
          fill="none"
          stroke="url(#qline)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        {/* second faint line */}
        <motion.path
          d="M -20 400 L 140 380 L 240 390 L 340 340 L 460 350 L 580 300 L 700 310 L 820 260 L 940 270 L 1060 210 L 1220 200"
          fill="none"
          stroke="rgba(0,201,120,0.28)"
          strokeWidth="1"
          strokeDasharray="6 10"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ pathLength: 1 } as any}
        />
        {/* nodes */}
        {[ [320,300], [520,260], [760,220], [980,180] ].map(([x,y], i) => (
          <g key={i}>
            <motion.circle
              cx={x} cy={y} r="3.2"
              fill="rgba(0,201,120,0.95)"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0,1,1], scale: 1 }}
              transition={{ delay: 0.6 + i * 0.18, duration: 0.6 }}
            />
            <motion.circle
              cx={x} cy={y} r="10"
              fill="none"
              stroke="rgba(0,201,120,0.22)"
              strokeWidth="1"
              initial={{ r: 6, opacity: 0.5 }}
              animate={{ r: 18, opacity: 0 }}
              transition={{ delay: 0.9 + i * 0.22, duration: 2.4, repeat: Infinity, repeatDelay: 1.2 }}
            />
          </g>
        ))}
      </svg>

      {/* code ticker */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-white/[0.06] bg-black/20 backdrop-blur">
        <motion.div
          className="flex gap-8 whitespace-nowrap py-2 text-[10px] font-mono tracking-wide text-white/55"
          initial={{ x: 0 }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              <span>λ L2_SIGNALS · 3_STRATEGIES · HYBRID_LIMIT+STOP · 1–2%_RISK</span>
              <span>EMA20 · ADX · RSI · ATR · 21:00_UTC_CLOSE</span>
              <span>BACKTEST_20,237_SIGNALS · 64.8%_WR · +0.69R_AVG · DEMO_$100→$1007.41</span>
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
