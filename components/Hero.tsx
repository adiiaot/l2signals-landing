"use client"
import { motion } from 'framer-motion'
import QuantBackground from './QuantBackground'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <QuantBackground />

      <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium border backdrop-blur" style={{ background: 'rgba(0,0,0,0.28)', borderColor: 'rgba(255,255,255,0.14)', color: '#fff' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" /> Live validation · Systematic · 1–2% risk per trade
          </div>
          <h1 className="text-[28px] md:text-[42px] font-bold leading-[1.05] tracking-tight text-white">
            Systematic Gold Trading.<br />
            <span className="font-mono font-light tracking-tight" style={{ color: 'var(--accent-gold)' }}>No guesswork.</span>
          </h1>
          <p className="text-sm md:text-[15px] leading-relaxed text-white/80 max-w-2xl mx-auto">
            L2 Signals is a Systematic Intraday Signal Service — 3 Complementary Strategies, Hybrid <span className="text-white font-medium">Execution </span> Model. Backtested on real market data, forward validated live. Every trade, every R.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full bg-white text-black text-xs font-semibold px-6 py-2.5 hover:bg-white/90 transition">
              Join Our Channel on Telegram
            </a>
            <a href="/pay" className="inline-flex items-center justify-center rounded-full bg-accent-gold text-white text-xs font-semibold px-6 py-2.5 hover:opacity-90 transition">
              Subscribe — pay with card or USDT
            </a>
            <a href="#proof" className="inline-flex items-center justify-center rounded-full border text-xs font-medium px-6 py-2.5 backdrop-blur" style={{ borderColor: 'rgba(255,255,255,0.22)', color: '#fff', background: 'rgba(255,255,255,0.06)' }}>
              View Our Trade Ledger
            </a>
          </div>
          <div className="flex flex-wrap justify-center pt-2 font-mono text-[10px]">
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15">74.2% · PF 5.12 · +103R hybrid</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
