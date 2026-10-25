import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getPaymentsConfig, toPublicConfig } from '@/lib/payments/config'
import PayClient from './PayClient'

export const metadata: Metadata = {
  title: 'Pay — subscription',
  description:
    'Subscribe to L2 Signals. Pay online with Paystack, send USDT/USDC, or use a Nigerian bank transfer. Consent is recorded before payment; access is applied after verification; no managed funds.',
  robots: { index: false, follow: false },
}

export const revalidate = 30

// Pricing must always come from `config/payments` — never a build-time snapshot.
export const dynamic = 'force-dynamic'

export default async function PayPage() {
  const config = await getPaymentsConfig()

  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-10">
          <div className="card text-center">
            <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Checkout</p>
            <h1 className="text-lg sm:text-xl font-bold mt-2">Loading payment options…</h1>
          </div>
        </div>
      }
    >
      <PayClient config={toPublicConfig(config)} />
    </Suspense>
  )
}
