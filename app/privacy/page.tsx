import type { Metadata } from 'next'
import PolicyShell from '@/components/PolicyShell'
import Link from 'next/link'
import { BUSINESS } from '@/data/business'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What personal data L2 Signals Services collects, why it is processed, which processors are involved, how long it is kept, how it is protected and how to exercise your rights.',
}

export default function PrivacyPage() {
  return (
    <PolicyShell
      slug="privacy"
      title="Privacy Policy"
      intro={
        <>
          This policy explains what personal data L2 Signals Services collects, why we collect it, who
          processes it, how long we keep it and what you can ask us to do with it. It covers the website, the
          payment page, the L2 Signals subscription and enquiries about other products.
        </>
      }
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. Who is responsible for your data</h2>
        <p>
          L2 Signals Services is the controller for the personal data described here. Contact{' '}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or{' '}
          <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener">
            {BUSINESS.telegramSupportHandle} on Telegram
          </a>{" "}
          for any privacy question or request. This policy is written to be consistent with applicable
          Nigerian data-protection law, including the Nigeria Data Protection Act 2023, and with other laws
          that genuinely apply to you.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Data we collect</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            <b className="text-text-primary">Contact and identity:</b> the email address you give at checkout,
            and — when you send proof or ask for support — your name, Telegram username or ID, phone or
            WhatsApp number and any other details you choose to provide.
          </li>
          <li>
            <b className="text-text-primary">Payment records:</b> payment method, amount, currency, date,
            status, plan and the transaction reference, bank narration or crypto transaction hash. We do not
            receive or store full card numbers, CVV codes, wallet seed phrases or bank passwords.
          </li>
          <li>
            <b className="text-text-primary">Subscription and access records:</b> start and end dates, grace
            period, renewal status, invite status, membership notes and the Telegram identity linked to the
            subscription.
          </li>
          <li>
            <b className="text-text-primary">Consent records:</b> the legal-document versions you accepted, the
            product and price shown, the timestamp in UTC, and the consent state. This is the audit record of
            what you agreed to before a payment was initiated.
          </li>
          <li>
            <b className="text-text-primary">Technical and security data:</b> server logs, truncated or hashed IP
            address, user agent, request time, rate-limit counters and error diagnostics. We use these to keep
            the service available and to detect abuse.
          </li>
          <li>
            <b className="text-text-primary">Communications:</b> the content of enquiries, support messages and
            project briefs you send us.
          </li>
          <li>
            <b className="text-text-primary">Custom project data:</b> information you provide about a project,
            such as requirements, strategy rules, documents or datasets. A separate agreement may add
            confidentiality terms for that material.
          </li>
        </ul>
        <p>
          We do not ask for your broker password, MT5 investor password, card PIN or wallet recovery phrase.
          Do not send them to us through any channel.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. Why we process it and on what basis</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            <b className="text-text-primary">To provide the service you bought</b> — verifying payment, applying
            access, managing membership, delivering signals and handling renewals or cancellation. This is
            necessary to perform our contract with you.
          </li>
          <li>
            <b className="text-text-primary">To keep an auditable consent record</b> — evidence that the
            applicable terms, risk disclosure and founding-member conditions were accepted before payment.
            This is necessary for the contract and for demonstrating compliance.
          </li>
          <li>
            <b className="text-text-primary">To answer enquiries and provide support</b> — responding to your
            message and resolving payment or access issues.
          </li>
          <li>
            <b className="text-text-primary">To secure and improve the service</b> — preventing fraud, abuse,
            duplicate payment claims and attacks; diagnosing errors; maintaining availability. This is based on
            our legitimate interest in operating a safe service, balanced against your rights.
          </li>
          <li>
            <b className="text-text-primary">To meet legal and accounting obligations</b> — retaining payment
            and tax records where the law requires it, and responding to lawful requests.
          </li>
          <li>
            <b className="text-text-primary">With your consent</b> — where we specifically ask for it, such as
            an optional communication. You can withdraw consent at any time; withdrawal does not affect
            processing that already took place.
          </li>
        </ul>
        <p>
          We do not sell personal data, run advertising profiles, or use your payment data for automated
          decisions that produce legal or similarly significant effects.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Payment providers and third-party processors</h2>
        <p>
          We use service providers that process data on our behalf or as independent controllers for their own
          regulated functions. The main ones are:
        </p>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            <b className="text-text-primary">Paystack</b> — hosted checkout for card, bank transfer and USSD.
            Paystack processes the payment instrument; we receive the transaction reference, amount, currency,
            status and customer email.
          </li>
          <li>
            <b className="text-text-primary">Blockchain networks and wallets</b> — for crypto payments. A
            transaction hash and wallet address are public and permanent by design. We use them to verify your
            payment; we do not control the public ledger.
          </li>
          <li>
            <b className="text-text-primary">Banks</b> — for Nigerian bank transfers. We receive the narration or
            reference you send us and the credit shown on the receiving account.
          </li>
          <li>
            <b className="text-text-primary">Firebase / Google Cloud</b> — authentication-free database and
            server-side storage for payment, consent, membership and signal records.
          </li>
          <li>
            <b className="text-text-primary">Vercel and Render</b> — website hosting and background workers, which
            process request logs and serve the site.
          </li>
          <li>
            <b className="text-text-primary">Telegram</b> — delivery of signals and member support. Your use of
            Telegram is governed by Telegram&apos;s own terms and privacy policy.
          </li>
          <li>
            <b className="text-text-primary">Email providers</b> — used to receive and reply to messages you send
            to our published contact email.
          </li>
        </ul>
        <p>
          We share only what is necessary for the relevant function. A provider may process data outside
          Nigeria; where that happens, we rely on the provider&apos;s contractual safeguards and apply
          appropriate measures. We do not claim a certification or adequacy mechanism that we have not verified.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Cookies and local storage</h2>
        <p>
          The website uses local storage for preferences such as the light or dark theme. We do not set
          advertising cookies or sell audience data. Server logs and rate-limit counters are used for security
          and reliability. If analytics or additional cookies are introduced, this policy and any required
          consent control will be updated before they are used.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. When we share data</h2>
        <p>
          We share personal data only as needed: with the processors above; with professional advisers such as
          an accountant or lawyer under confidentiality; with a payment provider during a dispute or
          chargeback; with authorities where we are legally required to do so or where necessary to investigate
          fraud or protect a person; and as part of a genuine reorganisation or sale of the business, subject to
          appropriate safeguards.
        </p>
        <p>
          We do not share your contact details with other members, and we do not publish your payment details.
          If a member-facing case study is ever published, it will use only information you expressly agree to
          share.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. How long we keep data</h2>
        <p>
          Payment, consent and membership records are kept for as long as the subscription or business
          relationship lasts and then for the period needed for accounting, tax, dispute and legal purposes.
          Consent records are kept with the payment record they relate to, because their purpose is to evidence
          what was accepted. Support messages are kept while the issue is open and for a reasonable period
          afterwards. Technical logs are kept for a short operational period unless they are needed for a
          security investigation.
        </p>
        <p>
          When data is no longer needed, it is deleted or aggregated. Some records may need to be retained to
          comply with a legal obligation or to establish, exercise or defend a legal claim; in that case we
          limit access and retain only what is necessary.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. How we protect data</h2>
        <p>
          We use encrypted transport (HTTPS), server-side access controls, least-privilege service credentials,
          restricted administrative access and rate limiting on public payment routes. Payment secrets are kept
          in server-side environment variables and are never included in browser code. Consent and payment
          writes happen on the server; a browser flag alone is not accepted as proof.
        </p>
        <p>
          No system is completely secure. If a personal-data breach occurs that is likely to result in a risk
          to your rights, we will investigate, take steps to contain it and notify the relevant authority and
          affected people where the law requires.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Your rights</h2>
        <p>
          Subject to applicable law, you may ask to access your personal data, correct inaccurate data, delete
          data that is no longer necessary, restrict or object to certain processing, receive data in a
          portable format where that right applies, and withdraw consent where processing is based on consent.
          You also have the right to complain to the Nigeria Data Protection Commission or another competent
          supervisory authority.
        </p>
        <p>
          Send a request to <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. We may need to verify
          your identity before acting, and we will respond within the period required by applicable law. A
          request that would require us to delete a record we must keep for a legal obligation may be limited
          to that extent, and we will explain why.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. Children</h2>
        <p>
          The service is intended for adults. It is not directed to children, and we do not knowingly collect
          personal data from a child. If you believe a child has provided data, contact us and we will take
          appropriate steps to remove it.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Automated processing</h2>
        <p>
          We do not use your personal data for automated decision-making that produces legal or similarly
          significant effects. The signal engine processes market data, not your personal circumstances.
          Position sizing and trading decisions remain yours.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">12. Changes to this policy</h2>
        <p>
          We may update this policy when our practices or the law change. The current version and effective
          date are shown at the top of this page. Material changes will be communicated through the website or
          the official channel. Where a change requires your consent, we will ask for it rather than assume it.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">13. Contact and related documents</h2>
        <p>
          Privacy questions and requests: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or{" "}
          <a href={BUSINESS.telegramSupport} target="_blank" rel="noopener">
            {BUSINESS.telegramSupportHandle} on Telegram
          </a>
          . Read this policy with the <Link href="/terms">Terms of Service</Link>,{" "}
          <Link href="/policies/subscription-terms">Subscription Terms</Link> and the{" "}
          <Link href="/policies/acceptable-use">Acceptable Use Policy</Link>.
        </p>
      </section>
    </PolicyShell>
  )
}
