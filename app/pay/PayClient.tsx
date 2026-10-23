'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { isValidTxHash } from '@/lib/payments/chains'
import {
  NETWORK_ASSETS,
  NETWORK_LABELS,
  NETWORK_PLACEHOLDERS,
  PAYMENT_NETWORKS,
  type PaymentNetwork,
} from '@/lib/payments/types'
import type { PublicPayConfig } from '@/lib/payments/config'
import { PAYSTACK_STOREFRONT_URL } from '@/lib/payments/links'

type Method = 'card' | 'crypto' | 'bank'

interface Done {
  paymentId: string
  amount: number
  currency: string
  telegramVerified?: boolean
  viaCard?: boolean
  /** True only when the bot verified the transfer on-chain. */
  verified?: boolean
  inviteLink?: string | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
          className="btn-secondary rounded-lg px-3 text-[11px] shrink-0"
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
    if (config.paystackEnabled && config.plan.ngn > 0) {
      list.push({ key: 'card', label: 'Card', hint: 'Paystack · instant' })
    }
    if (config.methods.crypto.enabled && networks.length > 0) {
      list.push({ key: 'crypto', label: 'Crypto', hint: 'USDT / USDC · TRON · BSC' })
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
  const [asset, setAsset] = useState<string>(NETWORK_ASSETS[networks[0] ?? 'tron'][0] ?? 'USDT')
  const [txHash, setTxHash] = useState('')
  const [bankRef, setBankRef] = useState('')
  const [note, setNote] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [claimToken, setClaimToken] = useState<string | null>(null)
  const [tgState, setTgState] = useState<'idle' | 'waiting' | 'verified'>('idle')
  const [tgUsername, setTgUsername] = useState('')
  const [tgBusy, setTgBusy] = useState(false)
  const [tgLink, setTgLink] = useState<string | null>(null)

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<Done | null>(null)

  const [returnState, setReturnState] = useState<'checking' | 'failed' | null>(
    returnReference ? 'checking' : null
  )

  const emailValid = EMAIL_RE.test(email.trim())

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
            telegramVerified: json.telegramVerified,
            viaCard: true,
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

  // ── Poll the claim while the user is in Telegram ───────────────────────────
  useEffect(() => {
    if (tgState !== 'waiting' || !claimToken) return
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/pay/claim?token=${encodeURIComponent(claimToken)}`, { cache: 'no-store' })
        const json = await res.json()
        if (json?.ok && json.verified) {
          setTgState('verified')
          setTgUsername(json.username || '')
        }
      } catch {
        // keep polling quietly
      }
    }, 4000)
    return () => clearInterval(id)
  }, [tgState, claimToken])

  const onEmailChange = (value: string) => {
    setEmail(value)
    // Identity is bound to the email that started the claim — changing it must reset.
    if (claimToken) {
      setClaimToken(null)
      setTgState('idle')
      setTgUsername('')
      setTgLink(null)
    }
  }

  const startTelegram = async () => {
    setError(null)
    if (!emailValid) {
      setError('Add your email first — it links this payment to you.')
      return
    }
    if (!config.telegramBotUrl) {
      setError('Telegram verification is unavailable. Your payment will be matched by email.')
      return
    }

    setTgBusy(true)
    try {
      const res = await fetch('/api/pay/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), method, company: honeypot }),
      })
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Could not start verification.')

      setClaimToken(json.token)
      setTgLink(json.telegramUrl)
      setTgState('waiting')
      window.open(json.telegramUrl, '_blank', 'noopener')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start verification.')
    } finally {
      setTgBusy(false)
    }
  }

  const onNetworkChange = (next: PaymentNetwork) => {
    setNetwork(next)
    setAsset(NETWORK_ASSETS[next][0] ?? 'USDT')
    setTxHash('')
  }

  // Stablecoins are 1:1 with USD, so the amount never needs re-quoting.
  const cryptoAmount = config.plan.usd

  const submit = async () => {
    setError(null)
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
      if (method === 'card') {
        const res = await fetch('/api/pay/paystack/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), token: claimToken }),
        })
        const json = await res.json()
        if (!json.ok) throw new Error(json.error || 'Could not start card checkout.')
        window.location.href = json.authorizationUrl
        return
      }

      const payload =
        method === 'crypto'
          ? { email: email.trim(), method, token: claimToken, network, txHash: txHash.trim(), company: honeypot }
          : { email: email.trim(), method, token: claimToken, reference: bankRef.trim(), note, company: honeypot }

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
        telegramVerified: json.telegramVerified,
        verified: Boolean(json.verified),
        inviteLink: json.inviteLink || null,
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
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-4">
        <div className="card-glow text-center">
          <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">
            {done.verified ? 'Payment verified' : 'Payment received'}
          </p>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">
            {done.currency === 'NGN' ? naira(done.amount) : usd(done.amount)}{' '}
            {done.verified ? 'confirmed' : 'submitted'}
          </h1>
          {done.verified ? (
            <p className="text-xs text-text-muted mt-2 max-w-md mx-auto leading-relaxed">
              The transfer was checked on-chain and your access is active. Join the private group below.
            </p>
          ) : (
            <p className="text-xs text-text-muted mt-2 max-w-md mx-auto leading-relaxed">
              Your reference is <code className="text-accent-gold">{done.paymentId}</code>. It is queued for
              review — access is activated manually, usually within a few hours.
            </p>
          )}
          <div className="inline-flex flex-wrap justify-center gap-2 mt-4">
            <span className={done.verified ? 'badge-win' : 'badge-info'}>
              {done.verified ? 'Verified on-chain' : 'Reference saved'}
            </span>
            {done.telegramVerified ? (
              <span className="badge-info">Telegram linked</span>
            ) : (
              <span className="badge-warn">Matched by email</span>
            )}
          </div>
          {done.verified && done.inviteLink && (
            <a
              href={done.inviteLink}
              target="_blank"
              rel="noopener"
              className="btn-primary rounded-full px-6 py-2.5 text-xs inline-block mt-4"
            >
              Join the private group
            </a>
          )}
        </div>

        <div className="card">
          <h2 className="text-sm font-bold">What happens next</h2>
          {done.verified ? (
            <ol className="mt-2 space-y-2 text-xs text-text-secondary list-decimal ml-4 leading-relaxed">
              <li>Your subscription is now active for this billing period.</li>
              <li>
                {done.telegramVerified
                  ? 'The bot has also sent the invite to your Telegram — check that chat.'
                  : 'Use the join button above. Send /status to the bot any time to see your expiry.'}
              </li>
              <li>Nothing else is required. Renew from this page when your period ends.</li>
            </ol>
          ) : (
            <ol className="mt-2 space-y-2 text-xs text-text-secondary list-decimal ml-4 leading-relaxed">
              <li>We verify the payment against the chain, bank receipt or Paystack dashboard.</li>
              <li>Your subscription is extended and any ban is lifted.</li>
              <li>The bot sends your single-use invite to the private group.</li>
            </ol>
          )}
          <p className="text-[11px] text-text-muted mt-3">
            Nothing arrived within 24h? Message{' '}
            <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">
              t.me/l2signals
            </a>{' '}
            with your reference.
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
            Crypto and bank details are not published yet. Card payments already work — pay on the
            Paystack page and send us the reference on Telegram.
          </p>
          <a
            href={PAYSTACK_STOREFRONT_URL}
            target="_blank"
            rel="noopener"
            className="btn-primary rounded-full px-5 py-2.5 text-xs inline-block mt-4"
          >
            Pay by card on Paystack
          </a>
          <p className="text-[10px] text-text-muted mt-3">
            Or message{' '}
            <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">
              t.me/l2signals
            </a>{' '}
            and we will sort out access.
          </p>
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
          {config.plan.ngn > 0 ? naira(config.plan.ngn) : usd(config.plan.usd)} / month
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-2">
          {config.plan.days} days of access · {config.plan.graceDays}-day grace period · XAU/USD intraday signals
        </p>
        <p className="text-[11px] text-text-muted mt-3">
          {config.plan.ngn > 0 ? `${naira(config.plan.ngn)} card or bank · ` : ''}
          {usd(config.plan.usd)} crypto
        </p>
      </div>

      <div className="card">
        {/* Method tabs */}
        <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Payment method">
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
                className={`rounded-xl border px-2 py-2.5 text-center transition-colors min-h-[56px] ${
                  active ? 'border-accent-gold/60 bg-accent-gold/10' : 'border-transparent bg-surface-overlay'
                }`}
                style={active ? undefined : { borderColor: 'var(--glass-border)' }}
              >
                <span className="block text-xs font-semibold">{tab.label}</span>
                <span className="block text-[10px] text-text-muted mt-0.5 leading-tight">{tab.hint}</span>
              </button>
            )
          })}
        </div>

        {!config.paystackEnabled && (
          <p className="mt-3 text-[11px] text-text-muted">
            Card checkout is not switched on for this page yet — you can still{' '}
            <a
              href={PAYSTACK_STOREFRONT_URL}
              target="_blank"
              rel="noopener"
              className="text-accent-gold hover:underline font-semibold"
            >
              pay by card on Paystack
            </a>{' '}
            and send us the reference with /pay.
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
            Used to match your payment if you do not link Telegram. Never shared.
          </span>
        </label>

        {/* Telegram identity — optional, recommended */}
        {config.telegramBotUrl ? (
          <div className="mt-4 rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <p className="text-xs font-semibold">Verify with Telegram (recommended)</p>
                <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                  Proves this payment is yours, so access is granted automatically — no manual matching.
                </p>
              </div>
              {tgState === 'verified' ? (
                <span className="badge-win shrink-0">Verified {tgUsername ? `@${tgUsername}` : ''}</span>
              ) : (
                <button
                  type="button"
                  onClick={startTelegram}
                  disabled={tgBusy || tgState === 'waiting'}
                  className="btn-secondary rounded-full px-4 py-2 text-[11px] shrink-0"
                >
                  {tgBusy ? 'Opening…' : tgState === 'waiting' ? 'Waiting for bot…' : 'Open Telegram'}
                </button>
              )}
            </div>
            {tgState === 'waiting' && (
              <p className="text-[11px] text-text-muted mt-2">
                Press <b>Start</b> in the bot, then come back here.{' '}
                {tgLink && (
                  <a href={tgLink} target="_blank" rel="noopener" className="text-accent-gold hover:underline">
                    Open the link again
                  </a>
                )}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-text-muted mt-4">
            Telegram linking is unavailable — your payment will be matched by email.
          </p>
        )}

        {/* ── Card ─────────────────────────────────────────────────────── */}
        {method === 'card' && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
              <p className="text-xs font-semibold">Secure card checkout — Paystack</p>
              <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                You will be redirected to Paystack (Verve, Mastercard, Visa, bank USSD/transfer). We never see
                or store your card details.
              </p>
              <p className="text-sm font-mono mt-2">{naira(config.plan.ngn)}</p>
            </div>
            {returnState === 'failed' && (
              <p className="text-[11px] text-status-loss">
                That card payment did not complete. You have not been charged twice — check your bank app before
                retrying, or{' '}
                <a href={PAYSTACK_STOREFRONT_URL} target="_blank" rel="noopener" className="underline font-semibold">
                  pay directly on the Paystack page
                </a>
                .
              </p>
            )}
            <a
              href={PAYSTACK_STOREFRONT_URL}
              target="_blank"
              rel="noopener"
              className="block text-center text-[11px] text-text-muted hover:text-accent-gold"
            >
              Prefer the Paystack page? Pay there and send us the reference →
            </a>
          </div>
        )}

        {/* ── Crypto ───────────────────────────────────────────────────── */}
        {method === 'crypto' && (
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Network</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                {networks.map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => onNetworkChange(net)}
                    className={`rounded-lg border px-2 py-2 text-[11px] font-semibold min-h-[40px] ${
                      network === net ? 'border-accent-gold/60 bg-accent-gold/10' : 'bg-surface-overlay'
                    }`}
                    style={network === net ? undefined : { borderColor: 'var(--glass-border)' }}
                  >
                    {NETWORK_LABELS[net]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Asset</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {NETWORK_ASSETS[network].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAsset(option)}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold min-h-[34px] ${
                      asset === option ? 'border-accent-gold/60 bg-accent-gold/10' : 'bg-surface-overlay'
                    }`}
                    style={asset === option ? undefined : { borderColor: 'var(--glass-border)' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-3 bg-surface-overlay" style={{ border: '1px solid var(--glass-border)' }}>
              <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Send exactly</p>
              <p className="text-base sm:text-lg font-bold font-mono mt-0.5">
                {cryptoAmount.toFixed(2)} {asset}
              </p>
              <p className="text-[10px] text-text-muted mt-0.5">
                ${config.plan.usd.toFixed(2)} — stablecoin, 1:1 with USD. The amount never moves.
              </p>
              <div className="flex justify-center mt-3">
                <div className="rounded-lg bg-white p-2">
                  <QRCodeSVG value={config.addresses[network]} size={132} level="M" />
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <CopyField label={`${NETWORK_LABELS[network]} address`} value={config.addresses[network]} />
                <CopyField label="Amount" value={cryptoAmount.toFixed(2)} />
              </div>
              <p className="text-[11px] text-status-warn mt-2 font-semibold">
                Wrong network = unrecoverable. Copy the address — never type it.
              </p>
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
          </div>
        )}

        {/* ── Bank transfer ────────────────────────────────────────────── */}
        {method === 'bank' && (
          <div className="mt-4 space-y-3">
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
                  Use card or crypto for now, or message{' '}
                  <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">
                    t.me/l2signals
                  </a>
                  .
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

        {error && <p className="text-[11px] text-status-loss mt-3">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={busy}
          className="btn-primary rounded-full px-6 py-2.5 text-xs w-full mt-4 disabled:opacity-60"
        >
          {busy
            ? 'Working…'
            : method === 'card'
              ? `Pay ${naira(config.plan.ngn)} with card →`
              : method === 'crypto'
                ? 'I have sent it — submit hash →'
                : 'I have sent it — submit reference →'}
        </button>

        <p className="text-[11px] text-text-muted mt-3 leading-relaxed">
          Access is activated after review — Paystack payments are checked against the Paystack dashboard, crypto
          against the chain. Nothing is auto-granted from a redirect alone.
        </p>
      </div>

      {/* Context / honesty */}
      <div className="card">
        <p className="text-xs font-semibold">Before you pay</p>
        <ul className="mt-2 space-y-1.5 text-[11px] text-text-secondary leading-relaxed list-disc ml-4">
          <li>Signals are research, not financial advice. You trade your own account and keep your own funds.</li>
          <li>We never ask for your broker or MT5 password, and we never manage money for you.</li>
          <li>One payment covers one subscription. Reusing a transaction reference is refused automatically.</li>
          {config.methods.usd.enabled && config.methods.usd.instructions && (
            <li>Paying from outside Nigeria in USD: {config.methods.usd.instructions}</li>
          )}
        </ul>
        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">
          L2 Signals is a product of L2 Signals Services, a technology company. By paying you agree to our{' '}
          <a href="/terms" className="text-accent-gold hover:underline">Terms</a> and{' '}
          <a href="/policies/subscription-terms" className="text-accent-gold hover:underline">subscription policy</a>.
        </p>
      </div>
    </div>
  )
}
