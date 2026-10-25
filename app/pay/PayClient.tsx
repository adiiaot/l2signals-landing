'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { isValidTxHash } from '@/lib/payments/chains'
import {
  NETWORK_ASSET,
  NETWORK_LABELS,
  NETWORK_PLACEHOLDERS,
  PAYMENT_NETWORKS,
  networkOptionLabel,
  type PaymentNetwork,
} from '@/lib/payments/types'
import type { PublicPayConfig } from '@/lib/payments/config'
import { PROOF_EMAIL, TELEGRAM_PROOF_HANDLE, TELEGRAM_PROOF_URL } from '@/lib/payments/links'
import { OFFER } from '@/data/business'
import { LEGAL_VERSION, legalVersion, requiredConsentVersions } from '@/data/legal'

type Method = 'card' | 'crypto' | 'bank'

interface Done {
  paymentId: string
  amount: number
  currency: string
  /** What the payer shows as proof: Paystack reference, tx hash or bank narration. */
  reference?: string
  email?: string
  /** Online payments are verified server-side; manual payments await review. */
  channel: 'online' | 'manual'
  /** False when a successful charge could not be linked to a consent record. */
  consentRecorded?: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * The documents shown before payment. Versions come from the same registry the
 * server validates against, so a stale page fails loudly instead of quietly
 * recording consent to a version nobody is looking at any more.
 */
const CORE_DOCS = [
  { label: 'Terms of Service', href: '/terms', slug: 'terms' },
  { label: 'Privacy Policy', href: '/privacy', slug: 'privacy' },
  { label: 'Trading Risk Disclosure', href: '/policies/trading-risk-disclosure', slug: 'trading-risk-disclosure' },
  { label: 'Subscription Terms', href: '/policies/subscription-terms', slug: 'subscription-terms' },
  { label: 'Refunds & Cancellations', href: '/policies/refunds-and-cancellations', slug: 'refunds-and-cancellations' },
] as const

const EXTRA_DOCS = [
  { label: 'Performance Measurement Policy', href: '/policies/performance-measurement', slug: 'performance-measurement' },
  { label: 'Acceptable Use Policy', href: '/policies/acceptable-use', slug: 'acceptable-use' },
  ...(OFFER.foundingApplicable
    ? [{ label: 'Founding Members Programme', href: '/policies/founding-members-programme', slug: 'founding-members-programme' }]
    : []),
] as const

function naira(value: number) {
  return `₦${Math.round(value).toLocaleString('en-NG')}`
}

function usd(value: number) {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">{label}</p>
      <div className="flex items-stretch gap-2 mt-1">
        <code className="flex-1 min-w-0 break-all rounded-lg border px-3 py-2 text-[11px] sm:text-xs font-mono bg-surface-overlay" style={{ borderColor: 'var(--glass-border)' }}>
          {value}
        </code>
        <button
          type="button"
          onClick={copy}
          className="btn-secondary rounded-lg px-3 text-[11px] shrink-0 min-h-[44px]"
          aria-label={`Copy ${label}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

export default function PayClient({ config }: { config: PublicPayConfig }) {
  const params = useSearchParams()
  const returnReference = params.get('reference') || params.get('trxref')

  const networks = useMemo(
    () => PAYMENT_NETWORKS.filter((network) => Boolean(config.addresses[network])),
    [config.addresses]
  )

  const tabs = useMemo(() => {
    const list: { key: Method; label: string; hint: string }[] = []
    const onlinePrice = config.paystackCurrency === 'USD' ? config.plan.usd : config.plan.ngn
    if (config.paystackEnabled && onlinePrice > 0) {
      list.push({ key: 'card', label: 'Pay online', hint: 'Paystack · card · transfer · USSD' })
    }
    if (config.methods.crypto.enabled && networks.length > 0) {
      list.push({ key: 'crypto', label: 'Crypto', hint: 'USDT · TRON/BSC · USDC · Solana' })
    }
    // A bank tab without account details is a dead end — hide it until configured.
    if (config.methods.ngn.enabled && config.methods.ngn.accountNumber) {
      list.push({ key: 'bank', label: 'Bank transfer', hint: 'Nigeria · NGN' })
    }
    return list
  }, [config, networks.length])

  const [method, setMethod] = useState<Method>(tabs[0]?.key ?? 'bank')
  const [email, setEmail] = useState('')
  const [network, setNetwork] = useState<PaymentNetwork>(networks[0] ?? 'tron')
  // One asset per network — derived, never chosen separately. Picking them
  // independently is what put USDC on the TRON address.
  const asset = NETWORK_ASSET[network]
  const [txHash, setTxHash] = useState('')
  const [bankRef, setBankRef] = useState('')
  const [note, setNote] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [consent, setConsent] = useState({ terms: false, risk: false, founding: false })

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<Done | null>(null)

  const [returnState, setReturnState] = useState<'checking' | 'failed' | null>(
    returnReference ? 'checking' : null
  )

  const emailValid = EMAIL_RE.test(email.trim())

  const onlinePriceLabel =
    config.paystackCurrency === 'USD' ? usd(config.plan.usd) : naira(config.plan.ngn)

  const onlineAvailable =
    config.paystackEnabled &&
    (config.paystackCurrency === 'USD' ? config.plan.usd : config.plan.ngn) > 0

  const bankAvailable = config.methods.ngn.enabled && Boolean(config.methods.ngn.accountNumber)

  const headlinePrice =
    tabs[0]?.key === 'crypto'
      ? usd(config.plan.usd)
      : tabs[0]?.key === 'card'
        ? onlinePriceLabel
        : naira(config.plan.ngn)

  const consentComplete = consent.terms && consent.risk && (!OFFER.foundingApplicable || consent.founding)

  const acceptedVersions = useMemo(() => {
    const required = requiredConsentVersions(OFFER.foundingApplicable)
    const map: Record<string, string> = {}
    if (consent.terms) {
      for (const slug of ['terms', 'subscription-terms', 'privacy', 'performance-measurement']) {
        if (required[slug]) map[slug] = required[slug]
      }
    }
    if (consent.risk && required['trading-risk-disclosure']) {
      map['trading-risk-disclosure'] = required['trading-risk-disclosure']
    }
    if (consent.founding && OFFER.foundingApplicable && required['founding-members-programme']) {
      map['founding-members-programme'] = required['founding-members-programme']
    }
    return map
  }, [consent])

  const methodValid =
    emailValid &&
    (method === 'card'
      ? true
      : method === 'crypto'
        ? txHash.trim().length > 0 && isValidTxHash(network, txHash.trim())
        : bankRef.trim().length >= 6)

  const railsAvailable =
    onlineAvailable || bankAvailable || (config.methods.crypto.enabled && networks.length > 0)
  const canPay = railsAvailable && consentComplete && methodValid

  // ── Returning from Paystack: verify server-side, never trust the URL ───────
  useEffect(() => {
    if (!returnReference) return
    let cancelled = false

    const verify = async () => {
      try {
        const res = await fetch(`/api/pay/paystack/verify?reference=${encodeURIComponent(returnReference)}`)
        const json = await res.json()
        if (cancelled) return

        if (json?.ok) {
          setDone({
            paymentId: json.paymentId,
            amount: json.amount,
            currency: json.currency,
            reference: returnReference,
            channel: 'online',
            consentRecorded: json.consentRecorded !== false,
          })
          setReturnState(null)
        } else {
          setReturnState('failed')
          setError(json?.error || 'That payment was not completed.')
        }
      } catch {
        if (!cancelled) {
          setReturnState('failed')
          setError('Could not reach the payment verifier. Contact us if you were charged.')
        }
      } finally {
        if (!cancelled && typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/pay')
        }
      }
    }

    verify()
    return () => {
      cancelled = true
    }
  }, [returnReference])

  // Proof and identity are matched by hand, so the email is the only identity
  // field the page needs — there is no bot round-trip to wait on.
  const onEmailChange = (value: string) => setEmail(value)

  const onNetworkChange = (next: PaymentNetwork) => {
    setNetwork(next)
    setTxHash('')
  }

  // Stablecoins are 1:1 with USD, so the amount never needs re-quoting.
  const cryptoAmount = config.plan.usd

  const submit = async () => {
    setError(null)
    if (!consentComplete) {
      setError('Accept all required documents before paying.')
      return
    }
    if (!emailValid) {
      setError('Enter a valid email address.')
      return
    }

    if (method === 'crypto') {
      if (!txHash.trim()) {
        setError('Paste the transaction hash from your wallet or explorer.')
        return
      }
      if (!isValidTxHash(network, txHash.trim())) {
        setError(`That does not look like a ${NETWORK_LABELS[network]} transaction hash.`)
        return
      }
    }

    if (method === 'bank' && bankRef.trim().length < 6) {
      setError('Enter the transfer reference or narration from your bank receipt.')
      return
    }

    setBusy(true)
    try {
      // Consent is recorded server-side before any payment instruction is acted
      // on. The server validates the version map; this response is the id the
      // payment route will consume exactly once.
      const consentRes = await fetch('/api/pay/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          accepted: acceptedVersions,
          company: honeypot,
        }),
      })
      const consentJson = await consentRes.json().catch(() => null)
      if (!consentJson?.ok) {
        throw new Error(
          consentJson?.error ||
            'Could not record your acceptance of the documents. Reload the page and try again.'
        )
      }
      const consentId = String(consentJson.consentId || '')
      if (!consentId) {
        throw new Error('Could not record your acceptance of the documents. Reload and try again.')
      }

      if (method === 'card') {
        const res = await fetch('/api/pay/paystack/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), consentId }),
        })
        const json = await res.json()
        if (!json.ok) throw new Error(json.error || 'Could not start online checkout.')
        window.location.href = json.authorizationUrl
        return
      }

      const payload =
        method === 'crypto'
          ? { email: email.trim(), method, network, txHash: txHash.trim(), consentId, company: honeypot }
          : { email: email.trim(), method, reference: bankRef.trim(), note, consentId, company: honeypot }

      const res = await fetch('/api/pay/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Could not save the payment.')

      setDone({
        paymentId: json.paymentId,
        amount: json.amount,
        currency: json.currency,
        reference: method === 'crypto' ? txHash.trim() : bankRef.trim(),
        email: email.trim(),
        channel: 'manual',
        consentRecorded: true,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  // ── States that replace the whole form ────────────────────────────────────
  if (returnState === 'checking') {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-10">
        <div className="card text-center">
          <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Confirming payment</p>
          <h1 className="text-lg sm:text-xl font-bold mt-2">Checking your charge with Paystack…</h1>
          <p className="text-xs text-text-muted mt-2">This takes a few seconds. Do not close this page.</p>
        </div>
      </div>
    )
  }

  if (done) {
    const proofRef = done.reference || done.paymentId
    const amountLabel = done.currency === 'NGN' ? naira(done.amount) : usd(done.amount)
    const mailto = `mailto:${PROOF_EMAIL}?subject=${encodeURIComponent(
      'L2 Signals — payment proof'
    )}&body=${encodeURIComponent(
      [
        'L2 Signals — payment proof',
        '',
        'Full name: ',
        'Telegram username: ',
        `Email used: ${done.email || ''}`,
        'Phone / WhatsApp: ',
        `Reference: ${proofRef}`,
        `Amount: ${amountLabel}`,
        '',
        'Screenshot attached below.',
      ].join('\n')
    )}`

    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4">
        <div className="card-glow text-center">
          <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">
            {done.channel === 'online' ? 'Payment verified' : 'Payment submitted'}
          </p>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">
            {done.channel === 'online' ? `${amountLabel} paid` : `${amountLabel} submitted`}
          </h1>
          <p className="text-xs text-text-muted mt-2 max-w-md mx-auto leading-relaxed">
            {done.channel === 'online'
              ? done.consentRecorded === false
                ? 'Paystack confirmed the charge, but the consent record could not be matched automatically. Our team will review before access is applied — keep the reference below.'
                : 'Paystack confirmed the charge and your document consent is recorded. We match the email used at checkout and issue your invitation — no screenshot is needed.'
              : 'One step left: send your proof so it can be checked and you can be added to the private group. Nothing is charged twice and this page is not needed again.'}
          </p>
          <div className="inline-flex flex-wrap justify-center gap-2 mt-4">
            <span className="badge-info">Reference saved</span>
            <span className={done.consentRecorded === false ? 'badge-warn' : 'badge-win'}>
              {done.consentRecorded === false ? 'Consent under review' : 'Consent recorded'}
            </span>
            <span className={done.channel === 'online' ? 'badge-win' : 'badge-warn'}>
              {done.channel === 'online' ? 'Verified server-side' : 'Awaiting verification'}
            </span>
          </div>
        </div>

        {done.channel === 'online' ? (
          <div className="card">
            <h2 className="text-sm font-bold">Nothing to send</h2>
            <p className="mt-2 text-xs text-text-secondary leading-relaxed">
              The charge is already verified against Paystack and matched to the email used at checkout. Keep
              the reference below — it is how support finds the payment.
            </p>
            <p className="mt-2 rounded-lg bg-surface-overlay px-3 py-2 font-mono text-[11px] break-all" style={{ border: '1px solid var(--glass-border)' }}>
              {proofRef}
            </p>
            <p className="mt-2 text-[11px] text-text-muted leading-relaxed">
              Access is applied manually after verification. If you have not heard within 24 hours, message{' '}
              <a href={TELEGRAM_PROOF_URL} target="_blank" rel="noopener" className="text-accent-gold hover:underline">
                {TELEGRAM_PROOF_HANDLE}
              </a>{' '}
              or email{' '}
              <a href={mailto} className="text-accent-gold hover:underline break-all">
                {PROOF_EMAIL}
              </a>{' '}
              with this reference.
            </p>
          </div>
        ) : (
          <div className="card">
            <h2 className="text-sm font-bold">Send these 4 things</h2>
            <ul className="mt-2 space-y-1.5 text-xs text-text-secondary leading-relaxed">
              <li>
                <span className="text-text-primary font-semibold">1.</span>{' '}
                {done.email ? (
                  <>
                    The email you paid with —{' '}
                    <code className="text-accent-gold">{done.email}</code>
                  </>
                ) : (
                  'The email you paid with'
                )}
              </li>
              <li>
                <span className="text-text-primary font-semibold">2.</span> Your reference —{' '}
                <code className="text-accent-gold break-all">{proofRef}</code>
              </li>
              <li>
                <span className="text-text-primary font-semibold">3.</span> Your member details — full
                name, Telegram <code>@username</code>, email and phone / WhatsApp number, so you can be
                added to the member database and tracked
              </li>
              <li>
                <span className="text-text-primary font-semibold">4.</span> A screenshot of the payment
                (or the explorer page for crypto)
              </li>
            </ul>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={TELEGRAM_PROOF_URL}
                target="_blank"
                rel="noopener"
                className="btn-primary rounded-full px-5 py-2.5 text-xs text-center"
              >
                Send on Telegram ({TELEGRAM_PROOF_HANDLE})
              </a>
              <a
                href={mailto}
                className="btn-secondary rounded-full px-5 py-2.5 text-xs text-center break-all"
              >
                Email instead
              </a>
            </div>
            <p className="text-[11px] text-text-muted mt-3">
              Either channel works — Telegram is fastest. Proof by email goes to{' '}
              <a href={mailto} className="text-accent-gold hover:underline break-all">
                {PROOF_EMAIL}
              </a>
              . Keep the reference above; it is how the payment gets matched.
            </p>
          </div>
        )}

        <div className="card">
          <h2 className="text-sm font-bold">What happens next</h2>
          <ol className="mt-2 space-y-2 text-xs text-text-secondary list-decimal ml-4 leading-relaxed">
            <li>
              {done.channel === 'online'
                ? 'The charge is already verified against Paystack and matched to the email used at checkout.'
                : 'The payment is checked against the wallet, bank statement or chain.'}
            </li>
            <li>
              You get a single-use invite to the private group — on Telegram, or by email if you asked
              for that.
            </li>
            <li>Your access starts from the date you paid, for {config.plan.days} days.</li>
          </ol>
          <p className="text-[11px] text-text-muted mt-3">
            Usually within a few hours. Nothing after 24h? Message{' '}
            <a
              href={TELEGRAM_PROOF_URL}
              target="_blank"
              rel="noopener"
              className="text-accent-gold hover:underline"
            >
              {TELEGRAM_PROOF_HANDLE}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${PROOF_EMAIL}`} className="text-accent-gold hover:underline">
              {PROOF_EMAIL}
            </a>{' '}
            with the reference above — the reference is the only thing needed to find your payment.
          </p>
        </div>

        <div className="card text-center">
          <button
            type="button"
            onClick={() => {
              setDone(null)
              setTxHash('')
              setBankRef('')
              setNote('')
              setError(null)
              // A new payment attempt needs a fresh, active acceptance.
              setConsent({ terms: false, risk: false, founding: false })
            }}
            className="btn-secondary rounded-full px-5 py-2.5 text-xs"
          >
            Submit another payment
          </button>
        </div>
      </div>
    )
  }

  if (tabs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-10">
        <div className="card text-center">
          <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Checkout</p>
          <h1 className="text-lg sm:text-xl font-bold mt-2">Payments are being set up</h1>
          <p className="text-xs text-text-muted mt-2">
            No payment rail is enabled right now. Message {TELEGRAM_PROOF_HANDLE} or email {PROOF_EMAIL} and we will
            arrange payment directly — do not send funds to any address that is not published on this page.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
            <a
              href={TELEGRAM_PROOF_URL}
              target="_blank"
              rel="noopener"
              className="btn-primary rounded-full px-5 py-2.5 text-xs"
            >
              Message {TELEGRAM_PROOF_HANDLE}
            </a>
            <a href={`mailto:${PROOF_EMAIL}`} className="btn-secondary rounded-full px-5 py-2.5 text-xs">
              Email {PROOF_EMAIL}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4">
      {/* Price */}
      <div className="card text-center">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">L2 Signals subscription</p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 leading-tight">
          {headlinePrice} / {config.plan.days} days
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2">
          {config.plan.days} days of access · {config.plan.graceDays}-day grace period · XAU/USD intraday signals
        </p>
        <p className="text-[11px] text-text-muted mt-3">
          {onlineAvailable ? `${onlinePriceLabel} online · ` : ''}
          {bankAvailable ? `${naira(config.plan.ngn)} bank · ` : ''}
          {config.methods.crypto.enabled && networks.length > 0 ? `${usd(config.plan.usd)} crypto` : ''}
        </p>
        <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
          Pay here. Online payments are verified against Paystack. For crypto or bank transfer, submit your
          reference on this page and send proof to {TELEGRAM_PROOF_HANDLE} on Telegram or{' '}
          <a href={`mailto:${PROOF_EMAIL}`} className="text-accent-gold hover:underline break-all">
            {PROOF_EMAIL}
          </a>
          . Access is added after verification — usually within a few hours.
        </p>
      </div>

      {/* ── Pre-payment disclosure + mandatory consent ───────────────────── */}
      <div className="card">
        <p className="text-[10px] sm:text-[11px] tracking-[0.16em] text-accent-gold uppercase">Before you pay</p>
        <h2 className="text-base sm:text-lg font-bold mt-1">What you are buying — and what you are not</h2>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Product &amp; period</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              L2 Signals subscription — rule-based intraday XAU/USD signals delivered to a private Telegram
              group for {config.plan.days} days from a verified payment. No automatic renewal.
            </p>
          </div>
          <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Price</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              {onlineAvailable ? `Pay online: ${onlinePriceLabel} · ` : ''}
              {bankAvailable ? `Bank transfer: ${naira(config.plan.ngn)} · ` : ''}
              {config.methods.crypto.enabled && networks.length > 0 ? `Crypto: ${usd(config.plan.usd)}. ` : ''}
              Charged once for the {config.plan.days}-day period; the amount is set by the server, never by your
              browser.
            </p>
          </div>
          <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Access</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              A personal, single-use invitation is issued after payment is verified. Access is personal and
              cannot be shared, forwarded or resold. We do not take custody of your funds.
            </p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(var(--status-warn-rgb),0.06)', border: '1px solid rgba(var(--status-warn-rgb),0.22)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-status-warn">Risk</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              Trading leveraged gold can lose money quickly. No profit, win rate, funding or withdrawal is
              guaranteed. Signals are research and execution guidance, not personal financial advice.
            </p>
          </div>
          <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Your responsibility</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              You choose the broker, position size, entries and exits, and you follow your own broker or
              prop-firm rules. Your execution can produce a different result from the official record.
            </p>
          </div>
          <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Cancellation &amp; refunds</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              Do not pay again to cancel — nothing renews automatically. Access ends after the paid period and
              any stated grace period. Refunds are currently reviewed case by case; duplicate or erroneous
              payments are corrected, and statutory rights are not removed.
            </p>
          </div>
        </div>

        {OFFER.foundingApplicable && (
          <div className="mt-2 rounded-xl p-3" style={{ background: 'rgba(var(--accent-gold-rgb),0.06)', border: '1px solid rgba(var(--accent-gold-rgb),0.2)' }}>
            <p className="text-[10px] uppercase tracking-[0.14em] text-accent-gold">Founding-member condition</p>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              The founding cohort is capped at {OFFER.foundingCap} members. A founding member with an eligible
              first paid subscription may receive one additional month of access if the official cumulative Net
              R for the calendar month in which that period begins is zero or below. It is a one-time access
              benefit — not a cash refund, not measured from your personal account, and not repeated in later
              months.
            </p>
          </div>
        )}

        <div className="mt-4 rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">The documents</p>
            <span className="text-[10px] font-mono text-text-muted">Version {LEGAL_VERSION}</span>
          </div>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {CORE_DOCS.map((doc) => (
              <li key={doc.slug}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener"
                  className="text-[11px] text-accent-gold hover:underline"
                >
                  {doc.label}
                </a>
                <span className="text-[10px] text-text-muted"> · v{legalVersion(doc.slug)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {EXTRA_DOCS.map((doc) => (
              <a
                key={doc.slug}
                href={doc.href}
                target="_blank"
                rel="noopener"
                className="text-[10px] text-text-muted hover:text-accent-gold"
              >
                {doc.label}
              </a>
            ))}
            <a href="/legal" target="_blank" rel="noopener" className="text-[10px] font-semibold text-accent-gold hover:underline">
              Legal &amp; trust centre
            </a>
          </div>
        </div>

        <fieldset className="mt-4">
          <legend className="text-xs font-bold">Required confirmations</legend>
          <p className="text-[10px] text-text-muted mt-0.5">
            Every confirmation below is required before the payment control unlocks. They start unchecked.
          </p>

          <label className="flex items-start gap-2.5 py-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent.terms}
              onChange={(event) => setConsent((prev) => ({ ...prev, terms: event.target.checked }))}
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ accentColor: 'var(--accent-gold)' }}
            />
            <span className="text-[11px] text-text-secondary leading-relaxed">
              I accept the{' '}
              <a href="/terms" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                Terms of Service
              </a>{' '}
              and the{' '}
              <a href="/policies/subscription-terms" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                Subscription Terms &amp; Conditions
              </a>
              , and I acknowledge the{' '}
              <a href="/privacy" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                Privacy Policy
              </a>{' '}
              and the{' '}
              <a href="/policies/performance-measurement" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                Performance Measurement Policy
              </a>
              .
            </span>
          </label>

          <label className="flex items-start gap-2.5 py-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent.risk}
              onChange={(event) => setConsent((prev) => ({ ...prev, risk: event.target.checked }))}
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ accentColor: 'var(--accent-gold)' }}
            />
            <span className="text-[11px] text-text-secondary leading-relaxed">
              I have read and accept the{' '}
              <a href="/policies/trading-risk-disclosure" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                Trading Risk Disclosure
              </a>
              . I understand that trading XAU/USD and leveraged instruments can result in loss, that no profit is
              guaranteed, and that I am responsible for my own position sizing and execution.
            </span>
          </label>

          {OFFER.foundingApplicable && (
            <label className="flex items-start gap-2.5 py-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent.founding}
                onChange={(event) => setConsent((prev) => ({ ...prev, founding: event.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ accentColor: 'var(--accent-gold)' }}
              />
              <span className="text-[11px] text-text-secondary leading-relaxed">
                I accept the{' '}
                <a href="/policies/founding-members-programme" target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} className="text-accent-gold hover:underline">
                  Founding Members Programme
                </a>{' '}
                conditions, including that any extension is a one-time access benefit measured from the official
                calendar-month record — not a cash refund and not based on my personal account.
              </span>
            </label>
          )}
        </fieldset>
      </div>

      <div className="card">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
          role="tablist"
          aria-label="Payment method"
        >
          {tabs.map((tab) => {
            const active = method === tab.key
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => {
                  setMethod(tab.key)
                  setError(null)
                }}
                className={`rounded-xl border px-2 py-2.5 text-center transition-colors min-h-[52px] flex flex-col items-center justify-center ${
                  active ? 'border-accent-gold/60 bg-accent-gold/10' : 'border-transparent bg-surface-overlay'
                }`}
                style={active ? undefined : { borderColor: 'var(--glass-border)' }}
              >
                <span className="block text-xs font-semibold leading-tight">{tab.label}</span>
                {/* The hint is long ("USDT · TRON/BSC · USDC · Solana") — hide it on
                    phones, where a third of the row cannot hold it */}
                <span className="hidden sm:block text-[10px] text-text-muted mt-0.5 leading-tight">{tab.hint}</span>
              </button>
            )
          })}
        </div>

        {!onlineAvailable && (
          <p className="mt-3 text-[11px] text-text-muted">
            Online checkout is not switched on for this page yet. Use crypto or bank transfer if they are
            available, or message{' '}
            <a
              href={TELEGRAM_PROOF_URL}
              target="_blank"
              rel="noopener"
              className="text-accent-gold hover:underline font-semibold"
            >
              {TELEGRAM_PROOF_HANDLE}
            </a>{' '}
            to arrange payment.
          </p>
        )}

        {/* Email — required for every method */}
        <label className="block mt-4">
          <span className="text-xs font-medium">Email</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@email.com"
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]"
            style={{ borderColor: 'var(--glass-border)' }}
          />
          <span className="block text-[10px] text-text-muted mt-1">
            Used to match your payment and reach you. Never shared.
          </span>
        </label>

        {/* ── Paystack ─────────────────────────────────────────────────── */}
        {method === 'card' && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
              <p className="text-xs font-semibold">Secure checkout — Paystack</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                You will be redirected to Paystack, where you can pay with a card, bank transfer or USSD —
                Verve, Mastercard and Visa are accepted. We never see or store your card details.
              </p>
              <p className="text-sm font-mono mt-2">{onlinePriceLabel}</p>
            </div>
            {returnState === 'failed' && (
              <p className="text-[11px] text-status-loss">
                That payment did not complete. You have not been charged twice — check your bank app before
                retrying, or message {TELEGRAM_PROOF_HANDLE} if your bank shows a charge.
              </p>
            )}
          </div>
        )}

        {/* ── Crypto ───────────────────────────────────────────────────── */}
        {method === 'crypto' && (
          <div className="mt-4 space-y-3">
            {!consentComplete ? (
              <div className="rounded-xl p-3" role="status" style={{ background: 'rgba(var(--status-warn-rgb),0.06)', border: '1px solid rgba(var(--status-warn-rgb),0.22)' }}>
                <p className="text-xs font-semibold">Wallet details are hidden</p>
                <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                  Accept the required confirmations above to reveal the deposit address. No payment has been
                  requested and nothing has been charged.
                </p>
              </div>
            ) : (
              <>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Pay with</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                {networks.map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => onNetworkChange(net)}
                    className={`rounded-lg border px-3 py-2.5 text-[11px] font-semibold min-h-[48px] ${
                      network === net ? 'border-accent-gold/60 bg-accent-gold/10' : 'bg-surface-overlay'
                    }`}
                    style={network === net ? undefined : { borderColor: 'var(--glass-border)' }}
                  >
                    {networkOptionLabel(net)}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-text-muted mt-1">
                Each network accepts one asset only. The address below belongs to the network you pick.
              </p>
            </div>

            <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Send exactly</p>
              <p className="text-base sm:text-lg font-bold font-mono mt-0.5">
                {cryptoAmount.toFixed(2)} {asset}
              </p>
              <p className="text-[10px] text-text-muted mt-0.5">
                on {NETWORK_LABELS[network]} — stablecoin amount quoted in USD. Send exactly this amount.
              </p>
              <div className="mt-3 space-y-2">
                <CopyField label={`${asset} address — ${NETWORK_LABELS[network]}`} value={config.addresses[network]} />
                <CopyField label="Amount" value={cryptoAmount.toFixed(2)} />
              </div>
              <p className="text-[11px] text-status-warn mt-2 font-semibold">
                Only send {asset} on {NETWORK_LABELS[network]}. Anything else sent to this address cannot be
                recovered.
              </p>
              <p className="text-[10px] text-text-muted mt-1">Copy the address — never type it.</p>
            </div>

            <label className="block">
              <span className="text-xs font-medium">Transaction hash</span>
              <input
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder={NETWORK_PLACEHOLDERS[network]}
                autoComplete="off"
                spellCheck={false}
                className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm font-mono bg-surface-overlay min-h-[44px]"
                style={{ borderColor: 'var(--glass-border)' }}
              />
              <span className="block text-[10px] text-text-muted mt-1">
                From your wallet history or a block explorer. This is what links the payment to you.
              </span>
            </label>
              </>
            )}
          </div>
        )}

        {/* ── Bank transfer ────────────────────────────────────────────── */}
        {method === 'bank' && (
          <div className="mt-4 space-y-3">
            {!consentComplete ? (
              <div className="rounded-xl p-3" role="status" style={{ background: 'rgba(var(--status-warn-rgb),0.06)', border: '1px solid rgba(var(--status-warn-rgb),0.22)' }}>
                <p className="text-xs font-semibold">Bank details are hidden</p>
                <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                  Accept the required confirmations above to reveal the transfer details. No payment has been
                  requested and nothing has been charged.
                </p>
              </div>
            ) : (
              <>
            {config.methods.ngn.bankName || config.methods.ngn.accountNumber ? (
              <div className="rounded-xl p-3 bg-surface-overlay space-y-2" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Transfer exactly</p>
                <p className="text-base font-bold font-mono">{naira(config.plan.ngn)}</p>
                {config.methods.ngn.bankName && (
                  <p className="text-xs">
                    <span className="text-text-muted">Bank: </span>
                    {config.methods.ngn.bankName}
                  </p>
                )}
                {config.methods.ngn.accountName && (
                  <p className="text-xs">
                    <span className="text-text-muted">Name: </span>
                    {config.methods.ngn.accountName}
                  </p>
                )}
                {config.methods.ngn.accountNumber && (
                  <CopyField label="Account number" value={config.methods.ngn.accountNumber} />
                )}
                {config.methods.ngn.instructions && (
                  <p className="text-[11px] text-text-muted leading-relaxed">{config.methods.ngn.instructions}</p>
                )}
              </div>
            ) : (
              <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
                <p className="text-xs font-semibold">Bank details are being set up</p>
                <p className="text-[11px] text-text-muted mt-1">
                  Use online checkout or crypto for now, or message{' '}
                  <a
                    href={TELEGRAM_PROOF_URL}
                    target="_blank"
                    rel="noopener"
                    className="text-accent-gold hover:underline"
                  >
                    {TELEGRAM_PROOF_HANDLE}
                  </a>{' '}
                  / email{' '}
                  <a href={`mailto:${PROOF_EMAIL}`} className="text-accent-gold hover:underline">
                    {PROOF_EMAIL}
                  </a>{' '}
                  and we will send transfer details.
                </p>
              </div>
            )}

            <label className="block">
              <span className="text-xs font-medium">Transfer reference / narration</span>
              <input
                value={bankRef}
                onChange={(e) => setBankRef(e.target.value)}
                placeholder="e.g. the session ID or narration on your receipt"
                autoComplete="off"
                className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay min-h-[44px]"
                style={{ borderColor: 'var(--glass-border)' }}
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium">Note (optional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                placeholder="Anything that helps us find the transfer"
                className="mt-1 w-full rounded-lg border px-3 py-2.5 text-[16px] sm:text-sm bg-surface-overlay resize-y"
                style={{ borderColor: 'var(--glass-border)' }}
              />
            </label>
              </>
            )}
          </div>
        )}

        {/* Honeypot — hidden from people, filled by bots */}
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0"
        />

        {error && (
          <p className="text-[11px] text-status-loss mt-3" role="alert">
            {error}
          </p>
        )}

        {!consentComplete && (
          <p id="pay-gate-hint" className="text-[11px] text-text-muted mt-3">
            Payment is locked until all required confirmations above are accepted.
          </p>
        )}
        {consentComplete && !railsAvailable && (
          <p id="pay-gate-hint" className="text-[11px] text-text-muted mt-3">
            No payment method is configured on this page yet. Message {TELEGRAM_PROOF_HANDLE} or email{' '}
            {PROOF_EMAIL} to arrange payment.
          </p>
        )}
        {consentComplete && railsAvailable && !methodValid && (
          <p id="pay-gate-hint" className="text-[11px] text-text-muted mt-3">
            Enter a valid email and complete the payment details to unlock the button.
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={busy || !canPay}
          aria-describedby={!canPay ? 'pay-gate-hint' : undefined}
          className="btn-primary rounded-full px-6 py-2.5 text-xs w-full mt-4 disabled:opacity-60"
        >
          {busy
            ? 'Working…'
            : method === 'card'
              ? `Pay ${onlinePriceLabel} on Paystack →`
              : method === 'crypto'
                ? 'I have sent it — submit hash →'
                : 'I have sent it — submit reference →'}
        </button>

        <p className="text-[11px] text-text-muted mt-3 leading-relaxed">
          Every payment is verified before access — online payments against Paystack&apos;s API, crypto against
          the chain, and bank transfers against the record we receive. Access is added to the private group by
          a person, not automatically. If you need help, message {TELEGRAM_PROOF_HANDLE} on Telegram or email{' '}
          {PROOF_EMAIL}.
        </p>
      </div>

      {/* Context / honesty */}
      <div className="card">
        <p className="text-xs font-semibold">Good to know</p>
        <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed list-disc ml-4">
          <li>Signals are research, not financial advice. You trade your own account and keep your own funds.</li>
          <li>We never ask for your broker or MT5 password, and we never manage money for you.</li>
          <li>One payment covers one subscription. Reusing a transaction reference is refused automatically.</li>
          {config.methods.usd.enabled && config.methods.usd.instructions && (
            <li>Paying from outside Nigeria in USD: {config.methods.usd.instructions}</li>
          )}
        </ul>
        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          L2 Signals is a product of L2 Signals Services, a technology business. Your acceptance of the{' '}
          <a href="/terms" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Terms</a>,{' '}
          <a href="/policies/subscription-terms" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Subscription Terms</a> and{' '}
          <a href="/policies/trading-risk-disclosure" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Trading Risk Disclosure</a>{' '}
          is recorded with this checkout, including the document versions shown above. That record is stored
          server-side against the payment — it is not a browser-only flag.
        </p>
      </div>
    </div>
  )
}
