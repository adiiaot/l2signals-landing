/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  experimental: { serverActions: { allowedOrigins: ['*'] } },
  /**
   * The legal documents live at their canonical routes (`/terms`, `/policies/*`).
   * These aliases give the requested `/legal/*` address surface without
   * duplicating the content or creating two versions that could drift.
   */
  async redirects() {
    return [
      { source: '/legal/terms', destination: '/terms', permanent: true },
      { source: '/legal/privacy', destination: '/privacy', permanent: true },
      { source: '/legal/risk-disclosure', destination: '/policies/trading-risk-disclosure', permanent: true },
      { source: '/legal/trading-risk-disclosure', destination: '/policies/trading-risk-disclosure', permanent: true },
      { source: '/legal/subscription', destination: '/policies/subscription-terms', permanent: true },
      { source: '/legal/subscription-terms', destination: '/policies/subscription-terms', permanent: true },
      { source: '/legal/performance', destination: '/policies/performance-measurement', permanent: true },
      { source: '/legal/performance-measurement', destination: '/policies/performance-measurement', permanent: true },
      { source: '/legal/signal-access', destination: '/policies/signal-access-and-delivery', permanent: true },
      { source: '/legal/signal-access-and-delivery', destination: '/policies/signal-access-and-delivery', permanent: true },
      { source: '/legal/acceptable-use', destination: '/policies/acceptable-use', permanent: true },
      { source: '/legal/refunds', destination: '/policies/refunds-and-cancellations', permanent: true },
      { source: '/legal/refunds-and-cancellations', destination: '/policies/refunds-and-cancellations', permanent: true },
      { source: '/legal/founding-members', destination: '/policies/founding-members-programme', permanent: true },
      { source: '/legal/founding-members-programme', destination: '/policies/founding-members-programme', permanent: true },
      { source: '/legal/founding-member-extension', destination: '/policies/founding-member-extension', permanent: true },
    ]
  },
}

module.exports = nextConfig
