import Layout from '../components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
              About PromptPro
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Empowering users to get the most out of AI through intelligent prompt engineering.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              PromptPro was born from a simple observation: the quality of AI responses
              depends heavily on how questions are asked. We built this platform to help
              users craft the perfect prompts for their AI interactions.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              We're dedicated to making AI more accessible and effective for everyone.
              Through intelligent prompt generation, we help users unlock the full potential
              of AI assistants like ChatGPT, Claude, and others.
            </p>

            <h2>Why PromptPro?</h2>
            <ul>
              <li>Expert-designed prompt templates</li>
              <li>Context-aware suggestions</li>
              <li>Continuous learning and improvement</li>
              <li>User-friendly interface</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
} 