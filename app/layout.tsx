import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MobileStickyCTA from '../components/MobileStickyCTA'

export const metadata: Metadata = {
  title: 'L2 Signals — Intraday Signals for Disciplined Traders',
  description: 'Systematic XAU/USD intraday signals — 3 strategies + hybrid limit+stop to 21:00 UTC. Demo $100→$1,007.41 in 37 days. Proof of execution live. Plus Signals API access, custom trading systems, and fintech apps — quoted custom.',
  openGraph: {
    title: 'L2 Signals — Intraday Signals for Disciplined Traders',
    description: 'Systematic XAU/USD — Demo $100→$1,007.41 in 37 days. Verifiable ledger. Plus Signals API, custom trading systems & fintech apps.',
    images: ['/images/l2signals_cover_banner.jpg'],
  },
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
