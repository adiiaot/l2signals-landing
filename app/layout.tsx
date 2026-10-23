import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MobileStickyCTA from '../components/MobileStickyCTA'

/**
 * One env var owns the public origin: OG images, canonical URLs and the sitemap
 * all derive from it. Buying a domain = set NEXT_PUBLIC_SITE_URL in Vercel
 * (plus the bot's PAY_PAGE_URL and the dashboard `checkoutUrl`), nothing else.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://l2signals-landing.vercel.app'
).replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'L2 Signals — Intraday Signals for Disciplined Traders',
  description: 'Systematic XAU/USD intraday signals — 3 strategies + hybrid limit+stop to 21:00 UTC. 4.25-year backtest: 20,237 signals, 64.8% WR, +0.69R per signal. Live demo $100→$1,007.41 in 37 days. Plus Signals API access, custom trading systems, and fintech apps — quoted custom.',
  openGraph: {
    title: 'L2 Signals — Intraday Signals for Disciplined Traders',
    description: 'Systematic XAU/USD — 4.25-year backtest (20,237 signals, 64.8% WR, +0.69R per signal) and a live demo ledger $100→$1,007.41 in 37 days. Verifiable proof. Plus Signals API, custom trading systems & fintech apps.',
    url: SITE_URL,
    siteName: 'L2 Signals',
    type: 'website',
    images: ['/images/l2signals_cover_banner.jpg'],
  },
  alternates: { canonical: '/' },
  icons: { icon: '/images/l2signals_logo.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileStickyCTA />
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting)x.target.classList.add('visible')})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});function w(){document.querySelectorAll('.scroll-reveal:not([data-obs])').forEach(function(el){el.setAttribute('data-obs','1');o.observe(el)})}document.addEventListener('DOMContentLoaded',w);new MutationObserver(w).observe(document.body,{childList:true,subtree:true})}catch(e){}})()` }} />
      </body>
    </html>
  )
}
