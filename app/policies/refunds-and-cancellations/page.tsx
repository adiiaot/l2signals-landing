import type { Metadata } from 'next'
import PolicyShell from '../../../components/PolicyShell'

export const metadata: Metadata = {
  title: 'Refunds & Cancellations',
  description:
    'How to cancel an L2 Signals subscription, when access ends, how failed and duplicate payments are handled, and the current position on refunds.',
}

export default function RefundsPage() {
  return (
    <PolicyShell
      slug="refunds-and-cancellations"
      title="Refunds & Cancellations"
      intro={
        <>
          This page explains how to stop a subscription, when access ends, how payment problems are handled
          and what happens with duplicate or erroneous payments. It applies to the L2 Signals subscription. It
          does not set the terms for any other L2 Signals Services product.
        </>
      }
      reviewNote="The final commercial refund policy has not been confirmed by the owner. The interim process below describes how requests are handled today and does not remove any right you have under applicable law. This notice will be removed once the owner confirms the final policy."
    >
      <section>
        <h2 className="text-sm font-bold text-text-primary">1. How the subscription works</h2>
        <p>
          The L2 Signals subscription is sold as a prepaid access period — currently 31 days from the date a
          verified payment is applied. It does not renew automatically. There is no stored card mandate and no
          recurring charge. Access ends at the end of the paid period unless a new payment is submitted and
          verified.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">2. How to cancel</h2>
        <p>
          Because the subscription does not renew automatically, you can simply choose not to make another
          payment. If you want confirmation that your access will not be extended, contact{' '}
          <a href="mailto:l2signalslab@gmail.com">l2signalslab@gmail.com</a> or{' '}
          <a href="https://t.me/aotayoL2" target="_blank" rel="noopener">
            @aotayoL2 on Telegram
          </a>{' '}
          with the email or reference used for payment. You may also ask to be removed from the private group.
          Removing yourself from the group does not, by itself, create a refund.
        </p>
        <p>
          Cancelling stops future access. It does not undo the current paid period, and it does not change any
          official performance calculation that already applies to that month.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">3. When access ends</h2>
        <p>
          Access is applied for the number of days shown at checkout. The admin record holds the exact start
          and end date. When the paid period ends, the private invite may be revoked. Any grace period shown on
          the payment page is an operational tolerance for renewal, not an additional paid period and not a
          guarantee of continued access.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">4. Failed, delayed or missing payments</h2>
        <ul className="list-disc ml-4 space-y-1">
          <li>
            <b className="text-text-primary">Pay online (Paystack):</b> a payment is only treated as received after
            the charge is verified with Paystack. Returning to a success page is not proof of payment.
          </li>
          <li>
            <b className="text-text-primary">Crypto:</b> send the exact asset on the stated network to the
            stated address. A transfer on the wrong network or of the wrong asset may be unrecoverable.
          </li>
          <li>
            <b className="text-text-primary">Bank transfer:</b> the reference or narration on the receipt is
            how the payment is matched. A missing or incorrect reference can delay activation.
          </li>
        </ul>
        <p>
          If a payment succeeded but access was not applied within 24 hours, send the reference, a screenshot
          and the email used to{' '}
          <a href="mailto:l2signalslab@gmail.com">l2signalslab@gmail.com</a> or{' '}
          <a href="https://t.me/aotayoL2" target="_blank" rel="noopener">
            @aotayoL2
          </a>
          . We will trace it and correct an error that is ours.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">5. Duplicate and erroneous payments</h2>
        <p>
          A transaction reference can back only one membership. If the same payment is submitted twice, the
          second submission is refused automatically. If you accidentally pay twice for the same period, or pay
          the wrong amount, contact us with both references. Once the duplicate or error is verified, the
          surplus will be refunded to the original payment method where that is technically possible, or
          credited to a future period if you prefer and we both agree in writing.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">6. Price errors and changes</h2>
        <p>
          The price shown on the payment page at the time of checkout is the price that applies to that
          payment. A later price change does not retrospectively alter a completed period. If an obvious
          pricing error is displayed and a payment is made on that basis, we will contact you before applying
          access and offer to honour the displayed price or refund the payment in full.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">7. Current refund position</h2>
        <p>
          The owner has not yet confirmed the final commercial refund policy. Until it is confirmed, requests
          are reviewed individually and in good faith. Factors include whether access was granted, whether the
          service was used, whether the request concerns a duplicate or erroneous payment, and whether the
          issue is something we can fix. A request is not automatically refused because the paid period has
          started, and it is not automatically granted because a member chose not to use the service.
        </p>
        <p>
          Where a refund is agreed, it is returned to the original payment method. Crypto refunds are made in
          the same asset and on the same network where possible; the value is measured at the amount received,
          not at a later exchange rate. Bank and card refunds may take several business days to appear,
          depending on the provider.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">8. Statutory rights</h2>
        <p>
          Nothing on this page excludes or limits a right you have under applicable consumer-protection law
          that cannot lawfully be excluded. If a mandatory rule gives you a remedy in your circumstances, that
          rule prevails over this page to the extent of the conflict.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">9. Chargebacks and disputes</h2>
        <p>
          If you believe a charge is wrong, contact us first so we can trace it. A chargeback or payment
          dispute may result in access being paused while the provider investigates. We will provide the
          available transaction evidence and cooperate with the provider. Raising a dispute does not remove the
          obligation to pay for access that was actually provided and used, subject to applicable law.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">10. How to make a request</h2>
        <p>
          Email <a href="mailto:l2signalslab@gmail.com">l2signalslab@gmail.com</a> with the subject “Refund
          request”, or message{' '}
          <a href="https://t.me/aotayoL2" target="_blank" rel="noopener">
            @aotayoL2 on Telegram
          </a>
          . Include the email used, the payment reference or transaction hash, the amount, the date and the
          reason for the request. We will acknowledge the request and explain the next step. Do not send card
          numbers, passwords or wallet seed phrases.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold text-text-primary">11. Relationship with other documents</h2>
        <p>
          Read this page with the Subscription Terms &amp; Conditions, Terms of Service, Trading Risk
          Disclosure and Founding Members Programme. If the final refund policy differs from this interim
          position, the updated document will state its effective date and will not be applied retroactively to
          a completed payment without your agreement or a legal requirement.
        </p>
      </section>
    </PolicyShell>
  )
}
