'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import Navbar from './components/layout/Navbar';
import GenerateButton from './components/generateButton/GenerateButton'; // Make sure this path matches your project structure

export default function HomePage() {
  const { currentUser } = useAuth();
  const [userInput, setUserInput] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
            PromptPro
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create powerful, effective prompts for ChatGPT, Claude, and other AI assistants to get better results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Task-Specific</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generate prompts tailored to your specific use case - writing, coding, analysis, and more
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Multi-AI Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Optimized for various AI models including ChatGPT, Claude, and others
            </p>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Best Practices</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Automatically incorporates proven prompt engineering techniques
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-200/50 dark:border-gray-700/50">
          <div className="mb-4">
            <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe what you need...
            </label>
            <input
              id="prompt-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., 'Help me write a professional email'"
            />
          </div>
          
          {currentUser ? (
            <GenerateButton userInput={userInput} />
          ) : (
            <Link
              href="/auth"
              className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl text-center transition-all duration-200"
            >
              Login to Generate
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}