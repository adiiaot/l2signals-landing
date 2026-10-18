export interface PolicyDoc {
  slug: string
  title: string
  short: string
  pdf: string
}

export const POLICIES: PolicyDoc[] = [
  {
    slug: 'subscription-terms',
    title: 'Subscription Terms & Conditions',
    short: 'Plans & pricing, payment methods, activation, renewal, cancellation and refunds.',
    pdf: '/policies/l2-signals-subscription-terms-and-conditions.pdf',
  },
  {
    slug: 'signal-access-and-delivery',
    title: 'Signal Access & Delivery Policy',
    short: 'Order types, entries, the daily expiry window, position sizing and execution rules.',
    pdf: '/policies/l2-signals-signal-access-and-delivery-policy.pdf',
  },
  {
    slug: 'performance-measurement',
    title: 'Performance Measurement Policy',
    short: 'How official monthly net R is recorded, calculated and finalised.',
    pdf: '/policies/l2-signals-performance-measurement-policy.pdf',
  },
  {
    slug: 'founding-members-programme',
    title: 'Founding Members Programme',
    short: 'The 2027 early-access programme — 50 members, pricing and benefits.',
    pdf: '/policies/l2-signals-founding-members-programme.pdf',
  },
  {
    slug: 'founding-member-extension',
    title: 'Founding Member Extension Policy',
    short: 'One-time free month when the official monthly net R is zero or negative.',
    pdf: '/policies/l2-signals-founding-member-extension-policy.pdf',
  },
  {
    slug: 'trading-risk-disclosure',
    title: 'Trading Risk Disclosure',
    short: 'Risk of loss, leverage, execution, and personal responsibility.',
    pdf: '/policies/l2-signals-trading-risk-disclosure.pdf',
  },
]

export const POLICY_TAGLINE = 'Systematic Trading. Measured Performance. Structured Execution.'
