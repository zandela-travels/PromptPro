// app/providers.tsx
'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AuthProvider>{children}</AuthProvider>;
}