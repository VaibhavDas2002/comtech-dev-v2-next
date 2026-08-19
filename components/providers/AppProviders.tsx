'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isQuoteModalOpen: boolean;
  openQuoteModal: (initialData?: { type?: string; service_or_product_name?: string; subject?: string }) => void;
  closeQuoteModal: () => void;
  quoteModalData: { type?: string; service_or_product_name?: string; subject?: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalData, setQuoteModalData] = useState<{ type?: string; service_or_product_name?: string; subject?: string } | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('comtech_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark for sleek cyber IT vibe
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('comtech_theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const openQuoteModal = (initialData?: { type?: string; service_or_product_name?: string; subject?: string }) => {
    setQuoteModalData(initialData || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalData(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quoteModalData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProviders');
  }
  return context;
}
