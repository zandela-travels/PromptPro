import Layout from '../components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By using PromptPro, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
            </p>

            <h2>2. Use of the Service</h2>
            <ul>
              <li>You must be at least 13 years old to use PromptPro.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree not to use PromptPro for unlawful, harmful, or abusive purposes.</li>
            </ul>

            <h2>3. Intellectual Property</h2>
            <p>
              All content and code on PromptPro is the intellectual property of PromptPro or its licensors. You may not reproduce, distribute, or create derivative works without permission.
            </p>

            <h2>4. Subscription and Payments</h2>
            <p>
              PromptPro offers free and paid subscription plans. By subscribing to a paid plan, you authorize us to charge your selected payment method. Payments are handled securely by third-party providers.
            </p>

            <h2>5. Refund Policy</h2>
            <p>
              All sales are final. Refunds may be issued in special cases such as accidental overcharges or if the subscription has not been used within 24 hours. Please contact support for review.
            </p>

            <h2>6. Modifications</h2>
            <p>
              We may update these Terms and Conditions at any time. Continued use of PromptPro after changes constitutes acceptance of the updated terms.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              PromptPro is provided “as is.” We do not guarantee uninterrupted service and are not liable for any direct or indirect damages, including data loss or service interruptions.
            </p>

            <h2>8. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate our Terms or engage in abusive or fraudulent behavior.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction where PromptPro operates. Legal disputes will be handled in accordance with those laws.
            </p>

            <h2>10. Contact</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us through our website’s contact page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
