import { PAYSTACK_STOREFRONT_URL } from '@/lib/payments/links'

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-4 py-6 scroll-reveal">
      <div className="card text-center max-w-2xl mx-auto">
        <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Access</p>
        <h3 className="text-lg font-bold text-text-primary mt-1">Need Signals To Scale Your Capital?</h3>
        <p className="text-xs text-text-muted mt-2 max-w-xl mx-auto">
          Access is open — the payment page shows the current price and all three rails. Join the free channel, check the ledger, then decide. No pressure, no DMs.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <a href="/pay" className="btn-primary rounded-full px-6 py-2.5 text-xs">Subscribe — pay now</a>
          <a
            href={PAYSTACK_STOREFRONT_URL}
            target="_blank"
            rel="noopener"
            className="btn-secondary rounded-full px-6 py-2.5 text-xs"
          >
            Pay online
          </a>
          <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="btn-secondary rounded-full px-6 py-2.5 text-xs">Join Our Channel on Telegram</a>
          <a href="https://x.com/l2signals" target="_blank" rel="noopener" className="btn-secondary rounded-full px-6 py-2.5 text-xs">Follow on X</a>
        </div>
        <p className="text-[10px] text-text-muted mt-3">
          Online payments run through Paystack — card, bank transfer or USSD. USDT / USDC (TRON · BSC) and Nigerian bank transfer are on the payment page.
        </p>
      </div>
    </section>
  )
}
