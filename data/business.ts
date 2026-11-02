/**
 * L2 Signals Services — business identity, product ecosystem and offer facts.
 *
 * SINGLE SOURCE OF TRUTH for marketing copy that also appears in legal text.
 * The *checkout* price still comes from `config/payments` (web dashboard), which
 * is authoritative for what is actually charged; `OFFER` mirrors the published
 * defaults and must be kept in step with `DEFAULT_PAYMENTS_CONFIG`.
 *
 * Rules for this file:
 *  - Never state a feature, integration, result or release date that is not true.
 *  - Statuses are deliberately conservative: "in development" is not "coming soon".
 *  - Registration details may only be published once the certificate has been
 *    issued and confirmed; never guess a number, a date or a TIN.
 *  - Never publish a price for the private service. The fee is shown only on the
 *    payment page, and only after the risk disclosure and terms are accepted.
 *  - Results are data only: wins, losses, expired signals, R. Never income claims.
 */

export const BUSINESS = {
  name: 'L2 Signals Services',
  shortName: 'L2 Signals',
  tagline: 'Software development & trading technology',
  description:
    'L2 Signals Services is a software development business. It builds trading systems, signal engines, MetaTrader Expert Advisors, custom indicators, dashboards, websites and mobile applications for firms, businesses and retail traders. L2 Signals — a private, invite-only product — is the business\u2019s proof of work.',
  email: 'l2signalslab@gmail.com',
  telegramSupport: 'https://t.me/aotayoL2',
  telegramSupportHandle: '@aotayoL2',
  telegramChannel: 'https://t.me/l2signals',
  x: 'https://x.com/l2signals',
  founder: 'AOT',
  founderRole: 'Founder — software & trading systems',
} as const

/**
 * Business registration — verified 2 November 2026.
 *
 * The certificate of business name registration, the status report, the TIN and
 * the business registration number have been issued by the Corporate Affairs
 * Commission and the business is registered as of 1 November 2026.
 *
 * `number` and `tin` stay empty until the exact strings are pasted in from the
 * certificate — never type them from memory, never guess a digit.
 *
 * Internal caution (do not render publicly): a registered business name is not a
 * licence, an approval or an endorsement by any financial regulator, and the site
 * must never imply that it is.
 */
export const REGISTRATION = {
  registered: true,
  body: 'Corporate Affairs Commission (CAC)',
  bodyShort: 'CAC',
  type: 'Business name',
  registeredOn: '1 November 2026',
  /** Public identifier — enough for anyone to verify the registration. */
  number: 'BN 9979030',
  status: 'Active',
  /** As stated on the certificate. */
  activity: 'Software development, web design and intranet development',
  /**
   * The TIN is held on the certificate and is deliberately NOT published, not
   * stored here, and not sent to any client. Business registration number only.
   */
  tin: '',
} as const

/** One-line registration statement used in the footer and legal centre. */
export function registrationLine(): string {
  const base = `Registered ${REGISTRATION.type.toLowerCase()} — ${REGISTRATION.bodyShort}, ${REGISTRATION.registeredOn}`
  return REGISTRATION.number ? `${base} · ${REGISTRATION.number}` : base
}

/**
 * The sentence that frames the relationship between the business and its product.
 * Used on the homepage, the L2 Signals page and the proof-of-work block.
 */
export const POSITIONING =
  'L2 Signals\u2019 signal engine and its private app are operated by L2 Signals Services, as a service within the business. It exists as proof of work: when the business says it can build signal engines, Expert Advisors, indicators, trading tools and software for clients, there is a live product and a published record to verify that claim.'

/**
 * Mandatory risk notice. Must appear in the site footer and beside any results.
 * Do not shorten, soften or reword it in a component.
 */
export const RISK_NOTICE =
  'L2 Signals Services builds trading software and tools. Trading financial markets carries a high risk of loss. Past or back-tested performance does not guarantee future results. Nothing on this website is financial advice or a promise of profit. Membership of any private community is by invitation and requires acceptance of a written risk disclosure.'

export const OFFER = {
  /** Product the /pay page currently sells. Never reuse this for other products. */
  product: 'L2 Signals subscription',
  productId: 'l2-signals-subscription',
  ngn: 50_000,
  usd: 40,
  days: 30,
  graceDays: 5,
  foundingCap: 50,
  /**
   * The current subscription is sold as the founding-member offer, so the
   * founding consent applies at checkout. Set this to false when the founding
   * cohort closes and the standard subscription terms are sold instead — the
   * third checkbox and the founding clause then disappear from /pay.
   */
  foundingApplicable: true,
} as const

export type ProductStatus =
  | 'live'
  | 'private'
  | 'in-development'
  | 'planned'
  | 'available'

export interface Product {
  id: string
  name: string
  status: ProductStatus
  statusLabel: string
  tagline: string
  description: string
  audience: string
  capabilities: string[]
  cta: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
  note?: string
  image?: string
  imageAlt?: string
  featured?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'l2-signals',
    name: 'L2 Signals',
    status: 'private',
    statusLabel: 'Private · by invitation',
    tagline: 'Private trade setups, shared with invited members',
    description:
      'A rule-based intraday XAU/USD engine operated by the business. Setups are shared with invited members through a private group, and each one states the direction, order type, entry, stop-loss, take-profit and the applicable trade-management instructions.',
    audience: 'Experienced discretionary and prop-firm traders who can execute and size their own trades.',
    capabilities: [
      'Three-tier strategy stack with direction-aware routing',
      'One clear order type per setup — market or pending — with entry, stop and target',
      'Published stop-loss, take-profit and exit playbook on every setup',
      'Official monthly performance measured from engine outcomes, not member accounts',
      'Private delivery; members execute on their own broker or prop firm',
    ],
    cta: { label: 'View L2 Signals', href: '/signals' },
    secondary: { label: 'Proof of work', href: '/signals#proof' },
    note: 'Access is by invitation. Fees and terms are shown on the payment page after the risk disclosure and terms are accepted.',
    featured: true,
  },
  {
    id: 'l2-ea',
    name: 'L2 EA',
    status: 'in-development',
    statusLabel: 'In development',
    tagline: 'MetaTrader 5 Expert Advisor',
    description:
      'A native MQL5 Expert Advisor built on the L2 Signals rules, designed to execute eligible setups automatically — the same entries, stop-loss and take-profit logic, with risk controls applied independently of signal generation. Built for the business and available to commission for your own rules.',
    audience: 'Traders and firms who want systematic execution on MetaTrader 5 without placing every order by hand.',
    capabilities: [
      'Rule-based execution of eligible setups',
      'Configurable risk per trade, spread, slippage, exposure and daily-loss limits',
      'Order management, partial-profit management and expiry handling',
      'Duplicate-order protection and restart reconciliation',
      'Detailed trade logs that separate signal, execution and account outcomes',
    ],
    cta: { label: 'Discuss an EA build', href: '/quote?type=system-built' },
    secondary: { label: 'See services', href: '/services' },
    note: 'Not yet available for purchase. No release date or performance claim is made.',
    image: '/images/l2-ea-suite.png',
    imageAlt: 'L2 Signals EA — MetaTrader 5 Expert Advisor product overview',
  },
  {
    id: 'l2-indicator',
    name: 'L2 Indicator',
    status: 'planned',
    statusLabel: 'Planned',
    tagline: 'Market-analysis indicator',
    description:
      'An indicator that surfaces the conditions behind a rule set on the chart, so a trader can study the logic rather than copy a black box. Planned for TradingView; custom indicator builds are quoted per project.',
    audience: 'Traders and firms who want the logic visible on their own charts.',
    capabilities: [
      'Planned: visualise the strategy conditions used by the engine',
      'Planned: show the reference entry, invalidation and target levels',
      'Planned: configurable timeframes and alert conditions',
    ],
    cta: { label: 'Commission an indicator', href: '/quote?type=system-code' },
    note: 'Planned product. Features listed are intended scope, not shipped functionality.',
  },
  {
    id: 'l2-signals-app',
    name: 'L2 Signals App',
    status: 'private',
    statusLabel: 'Private · not for public release',
    tagline: 'Member application & analytics',
    description:
      'The member application for signal access, performance reporting, trading journals, trade logs and strategy analytics. The internal dashboard already runs these tools; the member build stays private and is not released to the public.',
    audience: 'Invited members who want their signal history, execution record and analytics in one place.',
    capabilities: [
      'Member sign-in and access control',
      'Official signal outcomes alongside personal execution records',
      'Journal, trade log and strategy analytics',
      'Monthly performance reporting',
    ],
    cta: { label: 'Contact the business', href: '#contact' },
    note: 'Private build. Not publicly available and not offered for sale.',
  },
  {
    id: 'custom-systems',
    name: 'Signals API & custom systems',
    status: 'available',
    statusLabel: 'Available — quoted',
    tagline: 'Build with the L2 team',
    description:
      'Signals API access and custom trading systems, dashboards, business sites and fintech apps, scoped and quoted per project. This is a services track, not a self-serve product.',
    audience: 'Traders, desks, prop firms and businesses that need a system or integration built.',
    capabilities: [
      'Signals, outcomes, trade history and proof endpoints',
      'Custom strategy engineering, backtesting and scoring',
      'Dashboards, admin tools, websites and mobile apps',
      'Manual onboarding and a scoped quote before work starts',
    ],
    cta: { label: 'See services', href: '/services' },
    secondary: { label: 'Request a quote', href: '/quote' },
    note: 'Scope, price and timeline are agreed in writing before work begins.',
  },
]

/** Short, non-negotiable statements shown on the homepage and at checkout. */
export const RESPONSIBILITIES = [
  'You trade your own account and keep control of your own funds.',
  'We never ask for your broker or MT5 password and never manage money for you.',
  'Setups are research and execution guidance, not personal financial advice.',
  'No profit, win rate, funding or withdrawal is guaranteed.',
  'Historical and backtested results do not predict future results.',
  'Position sizing, broker rules and prop-firm limits are your responsibility.',
]

/** What the business explicitly does not do — keeps trust copy honest. */
export const LIMITS = [
  'We do not take custody of member funds.',
  'We do not execute trades on a client or member account.',
  'We do not guarantee a minimum number of signals in any period.',
  'We do not publish a fee for the private membership — it is shown at the consent step.',
]

/** Customer journey shown in the How it works section. */
export const JOURNEY = [
  {
    step: '01',
    title: 'Read the business, then the product',
    body: 'Start with the services, then read the L2 Signals scope, delivery rules and risk disclosure. Nothing is charged to browse.',
  },
  {
    step: '02',
    title: 'Review the published record',
    body: 'The live execution ledger and the back-tested study are published separately and labelled. Official engine outcomes are kept apart from any member\u2019s account results.',
  },
  {
    step: '03',
    title: 'Request an invitation',
    body: 'Access to the private group is by invitation. The business answers directly and decides who it accepts; there is no public sign-up.',
  },
  {
    step: '04',
    title: 'Accept the documents before paying',
    body: 'The payment page states the product, period, access and risks. The fee is shown after you accept the terms, the risk disclosure and, where applicable, the founding-member conditions. Consent is recorded with the date, time and document versions.',
  },
  {
    step: '05',
    title: 'Execute on your own account',
    body: 'Follow the published order type, entry, stop, target and updates. Size to your own account and broker rules. Your execution remains your responsibility.',
  },
]
