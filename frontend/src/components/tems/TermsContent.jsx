import React from "react";
import "./terms.css";

const TermsContent = () => {
  return (
    <>
      <div className="terms-container">
        <h1 className="terms-title">Terms & Conditions</h1>
        <section>
          <h2>1. Introduction</h2>
          <p>
            These Terms and Conditions govern the use of our website and the
            purchase of products including electric bicycles, accessories. By
            using our website, you agree to these Terms and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <ul>
            <li>You must be at least 18 years old to make a purchase.</li>
            <li>
              By placing an order, you confirm that you are legally capable of
              entering into a binding contract.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Products & Specifications</h2>
          <ul>
            <li>
              We make every effort to display accurate product details,
              specifications, and prices.
            </li>
            <li>
              Images are for representation purposes only; actual products may
              vary slightly.
            </li>
            <li>
              Specifications may change without prior notice to improve quality
              or performance.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Orders & Payments</h2>
          <ul>
            <li>All orders are subject to acceptance and availability.</li>
            <li>
              Prices are listed in INR and include/exclude GST as applicable.
            </li>
            <li>We accept UPI, Credit/Debit Cards, Net Banking.</li>
            <li>
              We reserve the right to cancel any order due to unavailability,
              pricing errors, or suspected fraud.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Cancellations & Returns</h2>
          <ul>
            <li>
              Orders can be cancelled within 24 hours of placing the order or
              before shipment.
            </li>
            <li>
              Returns are accepted only for manufacturing defects or damage
              during transit, reported within 48 hours.
            </li>
            <li>
              Product must be unused, in original packaging, and with proof of
              purchase.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Refunds & Payment Reversal</h2>
          <p>
            All online transactions on our website are processed securely via
            Razorpay. If you cancel your order within the allowed cancellation
            period or if your order is declined by us, we will initiate a refund
            via Razorpay.
          </p>
          <p>
            <strong>Refund timelines after initiation:</strong>
          </p>
          <ul>
            <li>
              <strong>UPI:</strong> 2–3 working days
            </li>
            <li>
              <strong>Debit Card:</strong> 5–7 working days
            </li>
            <li>
              <strong>Credit Card:</strong> 5–7 working days
            </li>
            <li>
              <strong>Net Banking:</strong> 5–10 working days
            </li>
          </ul>
          <p>
            Once we process a refund request, Razorpay will initiate it
            immediately, but the time taken for the amount to reflect in your
            account depends on your bank’s processing timelines. You will
            receive an email/SMS confirmation once your refund is initiated.
          </p>
        </section>

        <section>
          <h2>7. Warranty</h2>
          <ul>
            <li>
              All e-bikes come with a standard manufacturer’s warranty as stated
              on the product page.
            </li>
            <li>
              Warranty does not cover misuse, accidents, or normal wear and
              tear.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. User Responsibilities</h2>
          <ul>
            <li>Do not misuse our website or engage in illegal activities.</li>
            <li>
              Ensure compliance with local traffic and safety laws while riding
              an e-bike.
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages
            from using our products. We are not responsible for accidents,
            injuries, or legal violations while riding the e-bike.
          </p>
        </section>

        <section>
          <h2>10. Privacy Policy</h2>
          <p>
            We respect your privacy and handle your data as per our Privacy
            Policy.
          </p>
        </section>

        <section>
          <h2>11. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms shall be governed by the laws of India. Disputes are
            subject to the exclusive jurisdiction of the courts in Madurai.
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsContent;
