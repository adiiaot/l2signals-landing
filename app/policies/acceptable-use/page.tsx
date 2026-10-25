import type { Metadata } from 'next'
import PolicyShell from '../../../components/PolicyShell'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy',
  description:
    'Rules for using L2 Signals, the private Telegram group and paid content: no sharing, resale or redistribution, no access-control bypass, no abuse and no misrepresentation.',
}

export default function AcceptableUsePage() {
  return (
    <PolicyShell
      slug="acceptable-use"
      title="Acceptable Use Policy"
      intro={
        <>
          This policy sets out how L2 Signals Services products may be used. It applies to the website, the
          private Telegram group, paid signals, documentation and any member application. Access is personal:
          paying for a subscription does not give you the right to redistribute the service or the content
          inside it.
        </>
      }
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. Purpose and scope</h2>
        <p>
          This policy protects members, the integrity of the signal service and the work behind it. It applies
          to every L2 Signals Services product and to any content made available through a paid subscription,
          including signal posts, updates, charts, screenshots, performance records, documentation and
          private-group discussion. It applies alongside the Terms of Service and the Subscription Terms &amp;
          Conditions. If a product-specific term is stricter, the stricter term applies to that product.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. Personal access only</h2>
        <p>
          A subscription is for one person. Access must not be shared, transferred, sold or used to give
          another person the benefit of the service. You must not post or forward private signals, updates or
          group content to anyone outside the group, whether in another chat, a public channel, a forum, a
          social network, a newsletter, a paid community or a private group of your own.
        </p>
        <p>
          This prohibition covers copying, paraphrasing, screenshotting, recording, re-uploading and
          republishing paid content, and it applies whether or not you charge for it. Sharing a single signal
          with a friend is still redistribution.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. No resale, relicensing or competing service</h2>
        <p>
          You must not resell, sublicense, rent, lease or otherwise commercialise access to L2 Signals or its
          content. You must not use the service, its signals or its performance records to build, market or
          operate a competing signal service, managed account, copy-trading product or “signal mirror” without
          a separate written agreement.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. No access-control bypass</h2>
        <p>
          You must not attempt to bypass, disable or evade subscription checks, invite controls, rate limits,
          authentication or any other access measure. This includes sharing or reusing invite links, using
          another person&apos;s account, scraping the service, automating access outside an approved
          integration, or attempting to obtain paid content without a verified payment.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. No abuse of infrastructure or other users</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>Do not attack, probe, overload or interfere with the website, APIs, bots or delivery channels.</li>
          <li>Do not attempt to access administrative functions, other members&apos; data or internal systems.</li>
          <li>Do not upload malware, phishing content or unlawful material to any L2 channel.</li>
          <li>Do not harass, threaten, impersonate or defraud members, staff or the business.</li>
          <li>Do not use the service to break the law or to breach a broker&apos;s or prop firm&apos;s rules.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. No misrepresentation</h2>
        <p>
          You must not claim to be L2 Signals Services, its staff or an authorised representative. You must not
          present your personal trading results, a demo account, a prop-firm challenge or a third-party product
          as an official L2 Signals result. You must not alter a signal card, performance screenshot or
          document and present the altered version as official.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Trading and account responsibility</h2>
        <p>
          You remain responsible for your own account, position sizing, execution and compliance with your
          broker and prop firm. This policy does not transfer any trading risk to L2 Signals Services, and a
          breach of this policy does not change the risks described in the Trading Risk Disclosure.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Reporting a breach</h2>
        <p>
          Report suspected sharing, impersonation, scraping or abuse to{' '}
          <a href="mailto:l2signalslab@gmail.com">l2signalslab@gmail.com</a> or{' '}
          <a href="https://t.me/aotayoL2" target="_blank" rel="noopener">
            @aotayoL2 on Telegram
          </a>
          . Include links or screenshots where possible. Reports are reviewed by a person.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Enforcement</h2>
        <p>
          Where a breach is substantiated, L2 Signals Services may take proportionate action, including a
          warning, removal of content, suspension of posting rights, suspension of access or termination of the
          subscription. Severe or repeated breaches may result in immediate termination. We will explain the
          reason and the applicable next step, except where doing so would prejudice an investigation, affect
          another person&apos;s privacy or conflict with the law.
        </p>
        <p>
          Enforcement is not arbitrary. We aim to act on evidence, apply the same standard to comparable
          conduct, and avoid penalties that are disproportionate to the breach. Nothing in this policy limits a
          right you have under applicable consumer or data-protection law.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. Appeals and contact</h2>
        <p>
          If you believe an action was taken in error, contact{' '}
          <a href="mailto:l2signalslab@gmail.com">l2signalslab@gmail.com</a> with the account details and the
          decision you are appealing. We will review the available records and respond within a reasonable
          period. A review does not guarantee reinstatement, and access will not be restored while a serious
          security or fraud issue remains unresolved.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Relationship with other documents</h2>
        <p>
          Read this policy with the Terms of Service, Subscription Terms &amp; Conditions, Trading Risk
          Disclosure, Signal Access &amp; Delivery Policy and Privacy Policy. If two documents appear to
          conflict about acceptable use, the stricter provision applies, subject to applicable law.
        </p>
      </section>
    </PolicyShell>
  )
}
