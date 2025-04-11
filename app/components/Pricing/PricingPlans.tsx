'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiCheck, FiX, FiZap, FiLock, FiUsers, FiStar } from 'react-icons/fi';
import { Account, Databases, Client, Query } from 'node-appwrite';
import { databases } from '@/app/lib/appwrite.config';

interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingPlan {
  name: string;
  price: number;
  promptLimit: string;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  icon: React.ReactNode;
}

const plans: PricingPlan[] = [
  { name: 'Free', price: 0, promptLimit: '10/month', description: 'Perfect for trying out basic features', icon: <FiZap className="w-5 h-5 text-purple-500" />, features: [{ text: '10 AI prompts', included: true }, { text: '5 basic templates', included: true }, { text: 'Community support', included: true }, { text: 'Email support', included: false }, { text: 'PDF exports', included: false }, { text: 'API access', included: false }] },
  { name: 'Starter', price: 7.45, promptLimit: '50/month', description: 'For casual users and hobbyists', icon: <FiStar className="w-5 h-5 text-blue-500" />, features: [{ text: '50 AI prompts', included: true }, { text: '20+ templates', included: true }, { text: 'Email support', included: true }, { text: 'PDF exports', included: true }, { text: 'Basic analytics', included: false }, { text: 'API access (50 reqs/day)', included: false }] },
  { name: 'Pro', price: 11.99, promptLimit: '200/month', description: 'For professionals & power users', icon: <FiLock className="w-5 h-5 text-green-500" />, features: [{ text: '200 AI prompts', included: true }, { text: 'All premium templates', included: true }, { text: 'Priority email support', included: true }, { text: 'PDF/CSV exports', included: true }, { text: 'Usage analytics', included: true }, { text: 'API access (200 reqs/day)', included: true }], highlighted: true },
  { name: 'Team', price: 29.99, promptLimit: '400/month', description: 'Collaboration for businesses', icon: <FiUsers className="w-5 h-5 text-orange-500" />, features: [{ text: '400 AI prompts', included: true }, { text: 'All templates + future releases', included: true }, { text: '24/7 priority support', included: true }, { text: 'Advanced analytics', included: true }, { text: 'Shared workspace', included: true }, { text: 'Unlimited API access', included: true }] },
];

const PLAN_ORDER = ['Free', 'Starter', 'Pro', 'Team'];

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const email = localStorage.getItem('userEmail'); 
        if (!email) {
          console.warn('No email found.');
          setIsLoggedIn(false);
          setCurrentPlan(null);
          return;
        }

        const { documents } = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
          [Query.equal('email', email)]
        );

        if (documents.length === 0) {
          console.warn('No user document found.');
          setIsLoggedIn(false);
          setCurrentPlan(null);
          return;
        }

        const userData = documents[0];

        setIsLoggedIn(true);
        setCurrentPlan(userData.plan || 'Free');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setCurrentPlan(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  const handleSubscribe = (planName: string) => {
    if (isLoading) return;

    if (!isLoggedIn) {
      router.push(`/auth?redirect=/pricing&plan=${planName}`);
      return;
    }

    if (planName === currentPlan) return;

    const currentIndex = currentPlan ? PLAN_ORDER.indexOf(currentPlan) : -1;
    const selectedIndex = PLAN_ORDER.indexOf(planName);

    if (selectedIndex > currentIndex) {
      router.push(`/checkout?plan=${planName.toLowerCase()}&billing=${isAnnual ? 'annual' : 'monthly'}`);
    } else {
      router.push(`/downgrade?plan=${planName.toLowerCase()}`);
    }
  };

  const getButtonText = (planName: string) => {
    if (isLoading) return 'Loading...';
    if (!isLoggedIn) return 'Get Started';
    if (planName === currentPlan) return 'Current Plan';
    
    const currentIndex = currentPlan ? PLAN_ORDER.indexOf(currentPlan) : -1;
    const selectedIndex = PLAN_ORDER.indexOf(planName);
    
    if (currentIndex === -1) return 'Choose Plan';
    return selectedIndex > currentIndex ? 'Upgrade' : 'Downgrade';
  };

  const getPrice = (price: number) => 
    isAnnual ? (price * 12 * 0.8).toFixed(2) : price.toFixed(2);

  if (isLoading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p>Loading plans...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Simple, Transparent Pricing {currentPlan}
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Choose the perfect plan for your needs
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setIsAnnual(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                !isAnnual ? 'bg-gray-900 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                isAnnual ? 'bg-gray-900 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>Annually</span>
              <span className="ml-1 text-xs text-green-400">(Save 20%)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-xl transition-all ${plan.highlighted ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-lg' : 'border border-gray-200 dark:border-gray-700 shadow-md'} bg-white dark:bg-gray-800 overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center mb-3">
                {plan.icon}
                <h3 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${getPrice(plan.price)}</span>
                <span className="ml-1 text-base text-gray-500 dark:text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
              </div>
            </div>

            <div className="px-4 pb-4">
            <button 
                onClick={() => handleSubscribe(plan.name)} 
                disabled={isLoading || plan.name === currentPlan}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                  (isLoading || plan.name === currentPlan)
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-gray-900 hover:bg-gray-700 text-white'
                }`}
              >
                {getButtonText(plan.name)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
