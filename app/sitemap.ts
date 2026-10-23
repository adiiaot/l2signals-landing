import type { MetadataRoute } from 'next'

/**
 * Sitemap derives from NEXT_PUBLIC_SITE_URL so a domain switch needs no code edit.
 * Payment pages are deliberately excluded — they are transactional, not content.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://l2signals-landing.vercel.app'
).replace(/\/$/, '')

const ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/policies', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/policies/subscription-terms', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/policies/signal-access-and-delivery', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/policies/performance-measurement', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/policies/trading-risk-disclosure', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/policies/founding-members-programme', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/policies/founding-member-extension', priority: 0.3, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
