import Layout from '../components/layout/Layout';
import PricingPlans from '../components/Pricing/PricingPlans';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Choose the perfect plan for your AI prompt generation needs
            </p>
          </div>

          {/* Pricing Component */}
          <PricingPlans />
        </div>
      </div>
    </Layout>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{question}</h3>
      <p className="text-gray-600 dark:text-gray-300">{answer}</p>
    </div>
  );
} 