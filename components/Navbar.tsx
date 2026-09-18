"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const LINKS = [
  { label: 'Ledger', href: '#proof' },
  { label: 'How it Works', href: '#how' },
  { label: 'Services', href: '/services' },
  { label: 'Quote', href: '/quote' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const scrollTo = (href: string) => {
    setOpen(false)
    if (href.startsWith('/')) { window.location.href = href; return }
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else if (href.startsWith('#')) window.location.href = `/${href}`
  }
  return (
    <>
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl shadow-sm" style={{ background: 'rgb(var(--surface-raised-rgb))', borderColor: 'var(--glass-border)' }}>
        <div className="max-w-6xl mx-auto px-4 h-[56px] flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/images/l2signals_logo.jpg" alt="L2 Signals" className="w-8 h-8 rounded-lg object-cover border" style={{ borderColor: 'var(--glass-border)' }} />
            <div className="leading-tight">
              <p className="text-[13px] font-bold tracking-tight text-accent-gold">L2 Signals</p>
              <p className="text-[9px] tracking-[0.16em] text-text-muted uppercase">Intraday Trading</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-0.5">
            {LINKS.map(l => (
              l.href.startsWith('/') ? (
                <a key={l.href} href={l.href} className="px-3 py-1.5 rounded-full text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition">{l.label}</a>
              ) : (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="px-3 py-1.5 rounded-full text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition">{l.label}</button>
              )
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-1.5 bg-accent-gold text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full hover:opacity-90 transition">
              Join Channel
            </a>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}
            >
              {mounted && theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center border" style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}>
              {open ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile side drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[300px] z-50 md:hidden flex flex-col"
              style={{ background: 'rgb(var(--surface-raised-rgb))', borderLeft: '1px solid var(--glass-border)' }}
            >
              <div className="h-[56px] flex items-center justify-between px-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
                <span className="text-sm font-bold">Menu</span>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg border flex items-center justify-center" style={{ borderColor: 'var(--glass-border)' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                {LINKS.map(l => (
                  l.href.startsWith('/') ? (
                    <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="w-full block text-left px-3 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition">{l.label}</a>
                  ) : (
                    <button key={l.href} onClick={() => scrollTo(l.href)} className="w-full text-left px-3 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition">{l.label}</button>
                  )
                ))}
              </div>
              <div className="p-4 border-t space-y-2" style={{ borderColor: 'var(--glass-border)' }}>
                <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-primary w-full justify-center">Join Channel</a>
                <a href="https://x.com/l2signals" target="_blank" rel="noopener" className="btn-secondary w-full justify-center">Follow on X</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
