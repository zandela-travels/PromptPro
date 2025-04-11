import Layout from '../components/layout/Layout';

export default function DocsPage() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
            Documentation
          </h1>

          <div className="prose prose-lg dark:prose-invert">
            <h2>Getting Started</h2>
            <p>
              Learn how to use PromptPro to generate effective AI prompts for your needs.
            </p>

            <h3>Quick Start Guide</h3>
            <ol>
              <li>Choose your use case from the available templates</li>
              <li>Fill in the required information</li>
              <li>Generate your optimized prompt</li>
              <li>Copy and use with your favorite AI assistant</li>
            </ol>

            <h2>Best Practices</h2>
            <p>
              Follow these guidelines to get the most out of your AI interactions:
            </p>
            <ul>
              <li>Be specific about your requirements</li>
              <li>Provide relevant context</li>
              <li>Specify the desired format</li>
              <li>Include any constraints or preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
} 