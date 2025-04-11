'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Layout from '../components/layout/Layout';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md mx-auto pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLogin 
                  ? 'Great to see you again! Enter your details to continue.'
                  : 'Join us today! Enter your details to get started.'
                }
              </p>
            </div>
            
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 rounded-xl blur"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-1 flex shadow-inner">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`relative w-1/2 py-3 text-sm font-medium transition-all duration-300 ${
                    isLogin
                      ? 'text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {isLogin && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-lg transition-all duration-300"></div>
                  )}
                  <span className="relative">Login</span>
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`relative w-1/2 py-3 text-sm font-medium transition-all duration-300 ${
                    !isLogin
                      ? 'text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {!isLogin && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-lg transition-all duration-300"></div>
                  )}
                  <span className="relative">Register</span>
                </button>
              </div>
            </div>

            {isLogin ? (
              <LoginForm 
                redirect={redirect} 
                setIsLogin={setIsLogin}
                initialEmail={registeredEmail}
              />
            ) : (
              <RegisterForm 
                setIsLogin={setIsLogin} 
                setRegisteredEmail={setRegisteredEmail}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function LoginForm({ 
  redirect, 
  initialEmail = '',
  setIsLogin
}: { 
  redirect: string; 
  initialEmail?: string;
  setIsLogin: (value: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      await login(email, password);
      router.push(redirect);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('User not found')) {
        setError('User not found. Please register first.');
        const confirmRegister = window.confirm(
          'Account not found. Would you like to register?'
        );
        if (confirmRegister) {
          setIsLogin(false);
          setEmail(email);
        }
      } else {
        setError(error.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}

function RegisterForm({ 
  setIsLogin,
  setRegisteredEmail 
}: { 
  setIsLogin: (value: boolean) => void;
  setRegisteredEmail: (email: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setRegisteredEmail(formData.email);
      setIsLogin(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.type === 'user_already_exists') {
        setError('An account with this email already exists');
      } else {
        setError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            required
            minLength={3}
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="John Doe"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password (min 6 characters)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            minLength={6}
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}