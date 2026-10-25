"use client"

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function MobileStickyCTA() {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep the checkout and legal reading surfaces free of a competing CTA.
  const suppressed =
    pathname === '/pay' ||
    pathname === '/legal' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname.startsWith('/policies')

  if (!show || suppressed) return null

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-40">
      <div
        className="rounded-full flex items-center justify-between gap-2 px-2.5 py-2 shadow-card"
        style={{ background: 'rgba(18,24,34,0.96)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
      >
        <span className="hidden sm:inline text-xs font-mono text-white/80 pl-2">L2 Signals Services</span>
        <div className="flex items-center gap-2 ml-auto">
          <a href="/#products" className="bg-white text-black text-xs font-semibold px-3.5 py-1.5 rounded-full">
            Products
          </a>
          <a href="/pay" className="bg-accent-gold text-white text-xs font-semibold px-3.5 py-1.5 rounded-full">
            Join
          </a>
        </div>
      </div>
    </div>
  )
}
