import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy — L2 Signals', description: 'How L2 Signals collects, uses and protects your data.' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card">
        <p className="text-[11px] tracking-[0.16em] text-accent-gold uppercase">Last updated — 18 Sep 2026</p>
        <h1 className="text-2xl font-bold mt-2">Privacy Policy</h1>
        <p className="text-xs text-text-muted mt-2">We minimize data collection. This policy explains what we collect and why. Contact: <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline">l2signalslab@gmail.com</a>.</p>

        <div className="prose prose-sm max-w-none mt-6 space-y-5 text-xs leading-relaxed text-text-secondary">
          <section><h2 className="text-sm font-bold text-text-primary">1. Data we collect</h2><ul className="list-disc ml-4 space-y-1"><li><b>Contact/inquiry:</b> name, email, message you send via quote form or email/Telegram.</li><li><b>Usage:</b> anonymized page views / logs (Vercel analytics) to improve reliability.</li><li><b>Trading data you log:</b> trades you explicitly log in the web app (stored in Firestore). We don’t access your broker.</li><li><b>Cookies/localStorage:</b> theme, balance display, and session preferences stored locally on your device.</li></ul></section>
          <section><h2 className="text-sm font-bold text-text-primary">2. How we use it</h2><ul className="list-disc ml-4 space-y-1"><li>Reply to inquiries and deliver quoted services.</li><li>Operate the proof ledger, dashboards and market-data cache.</li><li>Improve stability, prevent abuse, and send service updates you requested (Telegram).</li></ul><p>We don’t sell your data or run ads.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">3. Sharing</h2><p>We share data only with service providers needed to run L2 Signals (hosting on Vercel/Render, Firebase/Firestore, email). They are bound by their own privacy obligations.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">4. Retention & security</h2><p>Inquiries retained while a project or legal obligation requires. Ledger data you logged remains until you request deletion. We apply reasonable technical measures but no system is 100% secure.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">5. Your rights</h2><p>Request access, correction or deletion of your personal data via <a href="mailto:l2signalslab@gmail.com" className="text-accent-gold hover:underline">l2signalslab@gmail.com</a>. We’ll respond within 30 days where applicable law requires.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">6. Third parties & international</h2><p>Links to Telegram, X, gold-api.com, Dukascopy etc. are governed by their policies. Data may be processed in the US/EU where our providers host.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">7. Children</h2><p>Our services are not directed to children under 13. Don’t provide children’s data.</p></section>
          <section><h2 className="text-sm font-bold text-text-primary">8. Changes</h2><p>We’ll update this page when practices change and keep the “Last updated” date. Material changes may be announced in-channel.</p></section>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <a href="/terms" className="btn-secondary rounded-full px-5 py-2 text-xs">Terms</a>
          <a href="/legal" className="btn-secondary rounded-full px-5 py-2 text-xs">Legal</a>
        </div>
      </div>
    </div>
  )
}
