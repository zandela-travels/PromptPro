'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useRouter } from 'next/navigation';
import { Client, Databases, ID, Query } from 'node-appwrite';
import bcrypt from 'bcryptjs';

// Initialize Appwrite
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
  const usersCollectionId = process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!;

  // Register user
  const register = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Save new user in Appwrite DB
        await databases.createDocument(
          databaseId,
          usersCollectionId,
          ID.unique(),
          {
            username: data.name,
            email: data.email,
            password: hashedPassword,
            plan: 'Free',
          }
        );
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    [databaseId, usersCollectionId]
  );

  // Login user
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await databases.listDocuments(
          databaseId,
          usersCollectionId,
          [Query.equal('email', email)]
        );

        const userDoc = res.documents[0];
        if (!userDoc) throw new Error('User not found');

        const passwordMatch = await bcrypt.compare(password, userDoc.password);
        if (!passwordMatch) throw new Error('Invalid password');

        const user = {
          id: userDoc.$id,
          name: userDoc.username,
          email: userDoc.email,
          plan: userDoc.plan || 'Free',
        };

        setCurrentUser(user);
        localStorage.setItem('userEmail', user.email);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    [databaseId, usersCollectionId]
  );

  // Logout
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem('userEmail');
    router.push('/login');
  }, [router]);

  // Check auth state from localStorage on mount
  const checkAuth = useCallback(async () => {
    const storedEmail = localStorage.getItem('userEmail');
    if (!storedEmail) {
      setLoading(false);
      return;
    }

    try {
      const res = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.equal('email', storedEmail)]
      );

      const userDoc = res.documents[0];
      if (!userDoc) throw new Error('User not found');

      const user = {
        id: userDoc.$id,
        name: userDoc.username,
        email: userDoc.email,
        plan: userDoc.plan || 'Free',
      };

      setCurrentUser(user);
    } catch (error) {
      console.error('Auth check failed:', error);
      setCurrentUser(null);
      localStorage.removeItem('userEmail');
    } finally {
      setLoading(false);
    }
  }, [databaseId, usersCollectionId]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      login,
      logout,
      register,
    }),
    [currentUser, loading, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
