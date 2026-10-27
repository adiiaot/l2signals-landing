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

const DESCRIPTION =
  'L2 Signals Services develops software, provides IT support, builds algorithmic trading tools and advises on technology. L2 Signals — rule-based intraday XAU/USD signals — is live in early access. No profit is guaranteed.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'L2 Signals Services — Software, IT & Trading Technology',
    template: '%s | L2 Signals Services',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'L2 Signals Services — Software, IT & Trading Technology',
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'L2 Signals Services',
    type: 'website',
    images: ['/images/l2signals_cover_banner.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L2 Signals Services — Software, IT & Trading Technology',
    description: DESCRIPTION,
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
