import Layout from '../components/layout/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <p>
              At <strong>PromptPro</strong>, we are committed to protecting the privacy and security of our users’
              personal information. This Privacy Policy outlines how we collect, use, and safeguard your information
              when you use our platform. By using PromptPro, you consent to the practices described in this policy.
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>Personal identification information (name, email) provided during sign up or communication.</li>
              <li>Payment information handled securely by third-party payment processors.</li>
              <li>Usage and technical data such as IP address, browser type, and session activity.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain your account and prompt usage tracking.</li>
              <li>To communicate important updates, notifications, or support responses.</li>
              <li>To analyze usage patterns and improve features.</li>
              <li>To detect and prevent abuse, spam, or unauthorized activity.</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell or rent your information. We may share data with trusted service providers or as required
              by law. These parties are obligated to keep your information secure and confidential.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement industry-standard security practices to protect your information. However, no method of
              transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies to enhance user experience and collect analytics. You can disable cookies via your browser,
              but some features may be affected.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this policy. Any changes will be posted on this page. We recommend reviewing it periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the contact page on our
              website.
            </p>

            <h2>Refund Policy</h2>
            <p>
              At <strong>PromptPro</strong>, we offer both free and paid plans. Due to the nature of digital services and instant
              plan activation, all purchases are considered final. However, we may offer refunds in the following cases:
            </p>
            <ul>
              <li>If you were charged incorrectly due to a technical error.</li>
              <li>If you cancel your subscription within 24 hours of purchase and have not used any prompts.</li>
            </ul>
            <p>
              If you believe you’re eligible for a refund, please contact our support team with details. Refund decisions
              are made at our discretion and may take 5–10 business days to process.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
