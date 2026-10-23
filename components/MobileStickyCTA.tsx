"use client"
import { useEffect, useState } from 'react'

export default function MobileStickyCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
      <div className="rounded-full flex items-center justify-between gap-3 px-3 py-2 shadow-card" style={{ background: 'rgba(18,24,34,0.96)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
        <span className="text-xs font-mono text-white/80 pl-2">L2 Signals · XAU/USD</span>
        <div className="flex items-center gap-2">
          <a href="/pay" className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full">Pay</a>
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="bg-accent-gold text-white text-xs font-semibold px-4 py-1.5 rounded-full">Join</a>
        </div>
      </div>
    </div>
  )
}
