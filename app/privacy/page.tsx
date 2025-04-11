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

            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account,
              use our services, or communicate with us.
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              The security of your data is important to us but remember that no method of
              transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 