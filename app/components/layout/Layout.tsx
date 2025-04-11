// components/layout/Layout.tsx
'use client';

import Navbar from './Navbar'; // Adjust path to your existing Navbar component
import { useAuth } from "@/app/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {children}
      </main>
    </>
  );
}