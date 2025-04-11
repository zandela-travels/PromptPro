'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Docs', path: '/docs' },
    { name: 'About', path: '/about' },
    { name: 'Policy', path: '/privacy'},
  ];

  const isActivePath = (path: string) => pathname === path;

  if (!mounted || loading) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-[1.02]">
              PromptPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FiUser className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {currentUser.name || 'User'}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-xs">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="px-4 py-2 flex items-center space-x-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  <FiLogOut />
                  <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FiUser className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {currentUser.name || 'User'}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    disabled={isLoggingOut}
                    className="flex items-center space-x-2 w-full px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <FiLogOut />
                    <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg text-center transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}