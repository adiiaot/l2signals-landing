import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Request a quote',
  description:
    'Request a scoped quote for Signals API access, a custom trading system, a business website, a mobile app, hiring or a partnership. No fixed prices — every engagement is quoted individually.',
}

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return children
}
