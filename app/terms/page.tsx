import type { Metadata } from 'next'
import PolicyShell from '@/components/PolicyShell'
import Link from 'next/link'
import { BUSINESS } from '@/data/business'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The agreement between you and L2 Signals Services: products and availability, subscriptions and payments, permitted use, intellectual property, liability, termination, complaints and governing law.',
}

export default function TermsPage() {
  return (
    <PolicyShell
      slug="terms"
      title="Terms of Service"
      intro={
        <>
          These Terms govern your use of the L2 Signals Services website, products and services. L2 Signals is
          one product of L2 Signals Services, not the whole business. By using the website or buying a product
          you agree to these Terms and to the product-specific documents that apply. If you do not agree, do
          not use the service.
        </>
      }
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. Who we are and what these Terms cover</h2>
        <p>
          L2 Signals Services is a trading-technology and software business. It builds systematic trading
          tools, automation and market-analysis products. These Terms are between you and L2 Signals Services
          and cover the website, the L2 Signals subscription, any product documentation and any enquiry or
          custom project you discuss with us.
        </p>
        <p>
          The product ecosystem currently includes L2 Signals (a paid signal subscription, live in early
          access), L2 EA (an Expert Advisor in development), L2 Indicator (planned), L2 Signals App (planned)
          and custom systems or Signals API access (available by quote). A reference to a product does not mean
          it is available for purchase. Product-specific terms apply when a product is actually sold and
          prevail over these Terms if they conflict.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Eligibility and intended audience</h2>
        <p>
          You must be at least 18 years old and able to enter a binding contract. Trading products are intended
          for experienced traders who understand stop-losses, position sizing, leverage and the risk of loss.
          They are not designed for beginners and are not a substitute for trading education.
        </p>
        <p>
          You are responsible for complying with the laws that apply to you, including any restriction on
          trading, receiving trading information or making payments from your location. We do not represent
          that a product is available or lawful in every country.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. Website content is information, not an offer or advice</h2>
        <p>
          Website content, product descriptions, performance pages, charts, signals and documentation are
          provided for information and for operating the service. They are not personal financial, investment,
          legal, tax or accounting advice. Nothing on the website is an offer to manage funds, a solicitation
          to invest, or a promise of a particular result. You decide whether a product is suitable for you.
        </p>
        <p>
          We aim to keep information accurate and current, but we do not warrant that every page is complete,
          error-free or up to date at all times. Material corrections are made when identified.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Products, status and availability</h2>
        <p>
          Products are labelled with their actual status. “Live” or “early access” means the product is
          operating now. “In development” and “planned” mean it is not available for purchase, and features
          described for those products are intended scope, not shipped functionality. We do not promise a
          release date for an unreleased product, and we may change or cancel planned scope.
        </p>
        <p>
          Availability can depend on third parties such as MetaTrader 5, TradingView, Telegram, payment
          providers and hosting. We may suspend or withdraw a product, feature or integration where necessary
          for maintenance, security, legal or commercial reasons.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Subscriptions, payments and access</h2>
        <p>
          The L2 Signals subscription is sold for a prepaid access period shown at checkout. The price,
          currency, payment methods and period are displayed on the payment page before you pay. A payment is
          only treated as received after it is verified by our server-side process or by a person. A browser
          redirect, screenshot or claim is not proof of payment.
        </p>
        <p>
          Access is personal. It is delivered by a single-use invitation to the private Telegram group after
          verification. You must not share the invitation or the access. Subscriptions do not renew
          automatically; a new payment is required for another period. Activation, expiry, grace periods,
          cancellations and refunds are governed by the{" "}
          <Link href="/policies/subscription-terms">Subscription Terms &amp; Conditions</Link> and the{" "}
          <Link href="/policies/refunds-and-cancellations">Refunds &amp; Cancellations</Link> page.
        </p>
        <p>
          You are responsible for the information you provide. Payments made with incorrect details, an
          incorrect reference or an unsupported asset or network may be delayed or impossible to match.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. Product-specific conditions</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            <b className="text-text-primary">L2 Signals:</b> the{" "}
            <Link href="/policies/subscription-terms">Subscription Terms</Link>,{" "}
            <Link href="/policies/signal-access-and-delivery">Signal Access &amp; Delivery Policy</Link>,{" "}
            <Link href="/policies/trading-risk-disclosure">Trading Risk Disclosure</Link>,{" "}
            <Link href="/policies/performance-measurement">Performance Measurement Policy</Link> and, where
            applicable, the <Link href="/policies/founding-members-programme">Founding Members Programme</Link>{" "}
            apply.
          </li>
          <li>
            <b className="text-text-primary">L2 EA, L2 Indicator and L2 Signals App:</b> separate licence,
            compatibility and support terms will apply if and when those products are offered. Nothing on this
            website grants a licence to unreleased software or promises that a planned integration will work
            with your broker, platform or device.
          </li>
          <li>
            <b className="text-text-primary">Custom systems, API access and other services:</b> scope, price,
            deliverables, ownership and support are agreed in a separate written proposal or agreement. If that
            agreement conflicts with these Terms, the signed agreement prevails for that project.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Your responsibilities</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>Use your own trading account and keep control of your own funds and credentials.</li>
          <li>Verify every order before execution and size it to your own account and risk tolerance.</li>
          <li>Follow the published order type, entry, stop-loss, take-profit and updates, or accept the consequence of deviating.</li>
          <li>Comply with your broker and prop-firm rules, including loss limits and prohibited strategies.</li>
          <li>Keep your email, Telegram account and devices secure. Do not share your access.</li>
          <li>Provide accurate contact and payment details and tell us promptly if they change.</li>
          <li>Do not use the service for an unlawful purpose or in a way that harms another person.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Intellectual property and permitted use</h2>
        <p>
          The L2 Signals Services name, L2 Signals brand, software, signal engine, strategy implementation,
          documentation, design, text and performance records are owned by L2 Signals Services or its
          licensors. Your subscription grants a limited, personal, non-exclusive, non-transferable right to
          access the service for the paid period. It does not transfer ownership of the software, the
          strategies, the brand or the content.
        </p>
        <p>
          You must not copy, republish, resell, sublicense, redistribute or use paid content to operate a
          competing service. You must not reverse engineer or attempt to extract the engine or strategy logic,
          except where the law expressly permits it despite this restriction. The{" "}
          <Link href="/policies/acceptable-use">Acceptable Use Policy</Link> forms part of these Terms.
        </p>
        <p>
          If you send us feedback or a suggestion, you allow us to use it without obligation or payment. You
          retain ownership of your own trading data and project materials.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Third-party platforms and integrations</h2>
        <p>
          The service relies on third parties, including Telegram (delivery), Paystack (online payments),
          blockchain networks and wallets (crypto payments), hosting and database providers, and — for trading
          products — your broker, MetaTrader 5 or TradingView. Those services have their own terms and privacy
          policies. We do not control their availability, fees, execution, outages or policy changes and are
          not responsible for them, except to the extent the law says otherwise.
        </p>
        <p>
          A third-party link or integration is not an endorsement and does not make that provider our agent.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. Service availability, changes and discontinuation</h2>
        <p>
          We aim to keep the service available but do not guarantee uninterrupted or error-free operation. We
          may perform maintenance, change features, change data sources, or suspend a feature for security or
          legal reasons. Where a material change affects a paid period, we will communicate it through the
          official channel and apply it prospectively, subject to applicable law.
        </p>
        <p>
          We may discontinue a product. If we discontinue a paid product before the end of a paid period and
          cannot provide the access you paid for, we will offer a fair remedy, which may include a pro-rata
          refund or an alternative access arrangement.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, L2 Signals Services is not liable for trading
          losses, lost profits, lost opportunity, funding-firm outcomes, loss of data, or indirect,
          incidental, special or consequential loss arising from your use of the service or your trading
          decisions. You remain responsible for your own execution, position sizing and risk management.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited,
          including liability for fraud or fraudulent misrepresentation, death or personal injury caused by
          negligence, or any mandatory consumer right. If a limitation is found unenforceable, the remaining
          provisions continue to apply.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">12. Suspension, termination and cancellation</h2>
        <p>
          You may stop using the service at any time and choose not to renew. We may suspend or terminate
          access if you materially breach these Terms or the Acceptable Use Policy, if a payment is reversed or
          fraudulent, if required by law, or if continuing access creates a security or legal risk. Where
          reasonable, we will explain the reason and the applicable next step.
        </p>
        <p>
          Termination does not remove obligations that by their nature survive, including payment obligations
          already incurred, intellectual-property restrictions, confidentiality, and the liability and dispute
          provisions. Refund consequences are governed by the{" "}
          <Link href="/policies/refunds-and-cancellations">Refunds &amp; Cancellations</Link> page and
          applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">13. Complaints and contact</h2>
        <p>
          Contact <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or{" "}
          <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener">
            {BUSINESS.telegramSupportHandle} on Telegram
          </a>{" "}
          with your account details and a clear description of the issue. We aim to acknowledge complaints
          promptly and resolve them in good faith. Include the payment reference where the issue concerns a
          payment or access. Do not send card numbers, passwords or wallet seed phrases.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">14. Governing law and disputes</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria. Before starting formal
          proceedings, you agree to contact us and allow a reasonable opportunity to resolve the dispute. If it
          cannot be resolved, the courts with competent jurisdiction in Nigeria may hear the matter, subject to
          any mandatory right you have to bring a claim in another forum.
        </p>
        <p>
          The specific judicial venue and any consumer-dispute route remain subject to confirmation by Nigerian
          counsel. Nothing in this section prevents you from using a statutory consumer-protection or
          data-protection complaint mechanism.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">15. Regulatory status</h2>
        <p>
          L2 Signals Services does not claim that it, or L2 Signals, is approved, licensed, registered or
          exempt by the Nigerian Securities and Exchange Commission or any other regulator. A risk disclaimer
          does not by itself remove a regulatory obligation. The current service model is described
          accurately: customers receive signals, retain control of their own funds and make their own execution
          decisions. These Terms will be updated if the regulatory position is confirmed.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">16. Changes to these Terms</h2>
        <p>
          We may update these Terms. The current version and effective date are shown at the top of this page.
          Material changes will be communicated through the website or the official Telegram channel before
          they take effect where practicable. A change applies prospectively; it does not retroactively remove
          a right that has already accrued. If you do not agree to a material change, you may stop using the
          service and choose not to renew.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">17. General</h2>
        <p>
          If a provision is invalid or unenforceable, it is limited to the minimum extent necessary and the
          rest remains in force. A failure to enforce a provision is not a waiver. You may not assign your
          rights without our written consent; we may assign or transfer the business or these Terms as part of
          a genuine reorganisation or sale, subject to your rights under applicable law. Neither party is
          liable for a delay caused by an event beyond its reasonable control, except that this does not excuse
          a payment obligation.
        </p>
        <p>
          These Terms, together with the documents linked from them, are the entire agreement about the
          website and the products they cover, except where a separate signed agreement applies.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">18. Acknowledgement</h2>
        <p>
          By using the website or buying a product, you acknowledge that you have read these Terms and the
          product-specific documents that apply; that you are responsible for your own trading decisions and
          execution; that trading involves substantial risk and profits are not guaranteed; that access is
          personal and must not be redistributed; and that official performance is measured from the signal
          engine, not from your account.
        </p>
      </section>
    </PolicyShell>
  )
}
