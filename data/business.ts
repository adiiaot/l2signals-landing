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
 *  - Do not add a registration number, licence or address that has not been verified.
 */

export const BUSINESS = {
  name: 'L2 Signals Services',
  shortName: 'L2 Signals',
  tagline: 'Systematic trading technology & signal services',
  description:
    'L2 Signals Services is a trading-technology business and signal provider. We build systematic trading tools, automation and market-analysis products. L2 Signals is our flagship signal service: rule-based intraday XAU/USD setups delivered to a private group for interested members.',
  email: 'l2signalslab@gmail.com',
  telegramSupport: 'https://t.me/aotayoL2',
  telegramSupportHandle: '@aotayoL2',
  telegramChannel: 'https://t.me/l2signals',
  x: 'https://x.com/l2signals',
  founder: 'AOT',
  founderRole: 'Founder — cross-asset quant',
} as const

export const OFFER = {
  /** Product the /pay page currently sells. Never reuse this for other products. */
  product: 'L2 Signals subscription',
  productId: 'l2-signals-subscription',
  ngn: 50_000,
  usd: 40,
  days: 31,
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
  | 'early-access'
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
    status: 'early-access',
    statusLabel: 'Live — early access',
    tagline: 'Systematic intraday XAU/USD signals',
    description:
      'L2 Signals Services provides rule-based intraday XAU/USD setups to interested members through a private group. Each setup states the direction, order type, entry, stop-loss, take-profit and the applicable trade-management instructions.',
    audience: 'Experienced discretionary and prop-firm traders who can execute and size their own trades.',
    capabilities: [
      'Three-tier strategy stack with direction-aware routing',
      'One clear order type per setup — market or pending — with entry, stop and target',
      'Published stop-loss, take-profit and exit playbook on every setup',
      'Official monthly performance measured from engine outcomes, not member accounts',
      'Private group delivery; members execute on their own broker or prop firm',
    ],
    cta: { label: 'Explore L2 Signals', href: '#signals' },
    secondary: { label: 'View performance', href: '#proof' },
    note: `Founding cohort capped at ${OFFER.foundingCap} members · official launch planned`,
    featured: true,
  },
  {
    id: 'l2-ea',
    name: 'L2 EA',
    status: 'in-development',
    statusLabel: 'In development',
    tagline: 'MetaTrader 5 Expert Advisor',
    description:
      'A native MQL5 Expert Advisor built on the L2 Signals rules, designed to execute eligible setups automatically — the same entries, stop-loss and take-profit logic, with risk controls applied independently of signal generation.',
    audience: 'Traders who want systematic execution on MetaTrader 5 without placing every order by hand.',
    capabilities: [
      'Rule-based execution of eligible L2 Signals setups',
      'Configurable risk per trade, spread, slippage, exposure and daily-loss limits',
      'Order management, partial-profit management and expiry handling',
      'Duplicate-order protection and restart reconciliation',
      'Detailed trade logs that separate signal, execution and account outcomes',
    ],
    cta: { label: 'Register EA interest', href: 'mailto:l2signalslab@gmail.com?subject=L2%20EA%20early%20interest' },
    secondary: { label: 'Follow development', href: 'https://t.me/l2signals', external: true },
    note: 'Not yet available for purchase. No release date or performance claim is made.',
    image: '/images/l2-ea-suite.png',
    imageAlt: 'L2 Signals EA — MetaTrader 5 Expert Advisor product overview',
  },
  {
    id: 'l2-indicator',
    name: 'L2 Indicator',
    status: 'planned',
    statusLabel: 'Planned',
    tagline: 'TradingView market-analysis indicator',
    description:
      'A planned TradingView indicator that surfaces the conditions behind L2 Signals setups on the chart, so traders can study the rule set rather than copy a black box.',
    audience: 'Traders who prefer to see the logic on their own charts and study it before acting.',
    capabilities: [
      'Planned: visualise the strategy conditions used by the L2 engine',
      'Planned: show the reference entry, invalidation and target levels',
      'Planned: configurable timeframes and alert conditions',
    ],
    cta: { label: 'Follow development', href: 'https://t.me/l2signals', external: true },
    note: 'Planned product. Features listed are intended scope, not shipped functionality.',
  },
  {
    id: 'l2-signals-app',
    name: 'L2 Signals App',
    status: 'planned',
    statusLabel: 'Planned',
    tagline: 'Member application & analytics',
    description:
      'A planned member application for signal access, performance reporting, trading journals, trade logs and strategy analytics. The internal L2 dashboard already runs these tools privately; the public member app is a separate build.',
    audience: 'Members who want their signal history, execution record and analytics in one place.',
    capabilities: [
      'Planned: member sign-in and subscription access',
      'Planned: official signal outcomes alongside personal execution records',
      'Planned: journal, trade log and strategy analytics',
      'Planned: monthly performance reporting and shareable proof',
    ],
    cta: { label: 'Join the channel for updates', href: 'https://t.me/l2signals', external: true },
    note: 'Planned product. The private internal dashboard is not the public app.',
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

/** Short, non-negotiable statements shown on the homepage and checkout. */
export const RESPONSIBILITIES = [
  'You trade your own account and keep control of your own funds.',
  'We never ask for your broker or MT5 password and never manage money for you.',
  'Signals are research and execution guidance, not personal financial advice.',
  'No profit, win rate, funding or withdrawal is guaranteed.',
  'Historical and backtested results do not predict future results.',
  'Position sizing, broker rules and prop-firm limits are your responsibility.',
]

/** What the business explicitly does not do — keeps trust copy honest. */
export const LIMITS = [
  'We do not take custody of member funds in the signal subscription.',
  'We do not execute trades on a member’s account under the signal subscription.',
  'We do not guarantee a minimum number of signals in any period.',
  'We do not claim a regulatory approval or exemption that has not been confirmed.',
]

/** Customer journey shown in the How it works section. */
export const JOURNEY = [
  {
    step: '01',
    title: 'Learn the business and the product',
    body: 'Start with the product ecosystem, then read the L2 Signals scope, delivery rules and risk disclosure. Nothing is charged to browse.',
  },
  {
    step: '02',
    title: 'Check the record and the method',
    body: 'Review the official performance ledger and how monthly Net R is measured. Official engine outcomes are kept separate from any member’s account results.',
  },
  {
    step: '03',
    title: 'Join with informed consent',
    body: 'The payment page states the product, price, period, access and risks. You must actively accept the terms, risk disclosure and, where applicable, the founding-member conditions.',
  },
  {
    step: '04',
    title: 'Get verified and onboarded',
    body: 'Payment is verified before access. You receive a personal, single-use invite to the private Telegram group; access is never granted from a browser redirect alone.',
  },
  {
    step: '05',
    title: 'Execute on your own account',
    body: 'Follow the published order type, entry, stop, target and updates. Size to your own account and broker rules. Your execution remains your responsibility.',
  },
]
