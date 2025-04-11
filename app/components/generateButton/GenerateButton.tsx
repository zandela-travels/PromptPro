'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Databases, Query, Client } from 'appwrite';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

interface GenerateButtonProps {
  userInput: string;
}

interface UserDocument {
  $id: string;
  promptCount: number;
  plan: string;
  name?: string;
  email?: string;
  monthlyPromptLimit?: number;
}

const planLimits: Record<string, number> = {
  Free: 10,
  Starter: 50,
  Pro: 200,
  Team: 400
};

function getDaysUntilNextMonth(): number {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const diffInMs = nextMonth.getTime() - now.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

export default function GenerateButton({ userInput }: GenerateButtonProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState<number>(planLimits['Free']);
  const [daysLeft, setDaysLeft] = useState<number>(getDaysUntilNextMonth());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser?.email) {
          setLoading(false);
          return;
        }
  
        const { documents } = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
          [Query.equal('email', currentUser.email)]
        );
  
        if (documents.length > 0) {
          const doc = documents[0] as unknown as UserDocument;
  
          // Auto-reset logic
          const today = new Date();
          let promptCount = doc.promptCount || 0;
  
          if (today.getDate() === 1 && promptCount !== 0) {
            // Reset promptCount in database
            await databases.updateDocument(
              process.env.NEXT_PUBLIC_DATABASE_ID!,
              process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
              doc.$id,
              { promptCount: 0 }
            );
            promptCount = 0;
          }
  
          // Assign limits based on plan
          const planLimits: Record<string, number> = {
            Free: 10,
            Starter: 50,
            Pro: 200,
            Team: 400,
          };
  
          const monthlyPromptLimit = planLimits[doc.plan] ?? 10;
  
          setUserData({
            ...doc,
            promptCount,
            monthlyPromptLimit,
          });
        }
      } catch (error) {
        setError('Failed to load user data');
        console.error('Database error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);
  

  const handleGenerate = async () => {
    if (!currentUser || !userData || loading || isGenerating) return;
    setIsGenerating(true);
    setError('');

    try {
      if (userData.promptCount >= monthlyLimit) {
        setError('You have reached your monthly prompt limit');
        return;
      }

      const updatedCount = userData.promptCount + 1;
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
        userData.$id,
        { promptCount: updatedCount }
      );

      setUserData(prev => prev ? { ...prev, promptCount: updatedCount } : null);

      const prompt = `Custom prompt for ${userData.name || 'user'}:
Task: ${userInput}

Includes:
1. Personalized context
2. Your preferences
3. AI best practices`;

      setGeneratedPrompt(prompt);
    } catch (error) {
      setError('Failed to generate prompt. Please try again.');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!userData) {
    return (
      <Link
        href="/auth"
        className="block w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-center transition-all"
      >
        Login to Generate
      </Link>
    );
  }

  const remainingPrompts = Math.max(0, monthlyLimit - userData.promptCount);
  const progress = Math.min(100, (userData.promptCount / monthlyLimit) * 100);

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            {remainingPrompts} prompts remaining
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {userData.plan} Plan
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 pt-1">
          Prompt count resets in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={remainingPrompts <= 0 || isGenerating}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
          remainingPrompts <= 0 || isGenerating
            ? 'bg-gray-200 cursor-not-allowed text-gray-400'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isGenerating ? (
          <Loader2 className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          'Generate Prompt'
        )}
      </button>

      {generatedPrompt && (
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <pre className="whitespace-pre-wrap font-mono text-sm">{generatedPrompt}</pre>
        </div>
      )}
    </div>
  );
}
