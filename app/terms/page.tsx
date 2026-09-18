import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms & Conditions — L2 Signals', description: 'Terms governing use of L2 Signals website, signals, and services.' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card">
        <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Last updated — 18 Sep 2026</p>
        <h1 className="text-2xl font-bold mt-2">Terms & Conditions</h1>
        <p className="text-xs text-text-muted mt-2">These Terms govern your use of L2 Signals (website, Telegram, web app, services). By accessing or using our services you agree to them. Contact: <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline">l2signalslab@gmail.com</a>.</p>

        <div className="prose prose-sm max-w-none mt-6 space-y-5 text-xs leading-relaxed text-text-secondary">
          <section><h2 className="text-sm font-bold text-text-primary">1. Services</h2><p>L2 Signals provides intraday XAU/USD signal information, dashboards, proof ledger and related content. We also offer custom builds (services/quote). Signals are informational — not investment advice, portfolio management or brokerage. See <a href="/legal" className="text-accent-gold hover:underline">Legal / Risk Disclosure</a>.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">2. Eligibility & accounts</h2><p>You must be 18+ and comply with local laws. If we offer paid access, you are responsible for your account credentials and for keeping your Telegram / exchange accounts secure.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">3. Subscriptions & payments</h2><ul className="list-disc ml-4 space-y-1"><li>Pricing is shown in-channel or in a written quote. Quotes are valid 14 days unless stated otherwise.</li><li>Custom builds: typically 50% upfront, 50% on delivery. Retainers billed monthly, cancel anytime before renewal.</li><li>Manual payments (bank / crypto) require admin approval — access granted after confirmation. Activation codes are non-transferable.</li><li>Refunds are handled case-by-case unless a written scope guarantees otherwise.</li></ul></section>
          <section><h2 className="text-sm font-bold text-text-primary">4. Your obligations</h2><ul className="list-disc ml-4 space-y-1"><li>Don’t reverse-engineer, resell or redistribute signals, code or content without written permission.</li><li>Don’t use bots to scrape or overload our APIs / market-data cache.</li><li>You trade at your own risk, at your own sizing. Verify levels in your terminal before execution.</li></ul></section>
          <section><h2 className="text-sm font-bold text-text-primary">5. Intellectual property</h2><p>All content, branding, code and docs remain owned by L2 Signals / AOT unless a contract assigns them. Custom-build IP is defined in the quote/SOW.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">6. Disclaimer & liability</h2><p>Services are provided “as is” without warranties. Trading involves substantial risk of loss. Past performance (e.g. demo $100→$1,007 or backtests) does not guarantee future results. To the fullest extent permitted by law, our liability is limited to fees you paid in the last 3 months.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">7. Termination</h2><p>We may suspend or terminate access for breach, abuse or legal reasons. You may stop using the services at any time.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">8. Governing law & contact</h2><p>Unless a custom contract says otherwise, these Terms are governed by the laws applicable to our operating entity. Questions: <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline">l2signalslab@gmail.com</a> • <a href="https://t.me/l2signals" target="_blank" rel="noopener" className="text-accent-gold hover:underline">Telegram</a>.</p></section>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <a href="/privacy" className="btn-secondary rounded-full px-5 py-2 text-xs">Privacy Policy</a>
          <a href="/legal" className="btn-secondary rounded-full px-5 py-2 text-xs">Legal & Risk</a>
          <a href="/quote" className="btn-primary rounded-full px-5 py-2 text-xs">Get a quote</a>
        </div>
      </div>
    </div>
  )
}
