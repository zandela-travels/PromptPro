import Layout from '../components/layout/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2>1. Terms</h2>
            <p>
              By accessing PromptPro, you agree to be bound by these terms of service and
              agree that you are responsible for compliance with any applicable local laws.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or
              software) on PromptPro for personal, non-commercial transitory viewing only.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on PromptPro are provided on an 'as is' basis. PromptPro makes
              no warranties, expressed or implied, and hereby disclaims and negates all
              other warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of rights.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall PromptPro or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or profit, or due to
              business interruption) arising out of the use or inability to use PromptPro.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 