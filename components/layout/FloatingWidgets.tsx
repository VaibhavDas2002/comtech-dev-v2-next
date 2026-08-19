'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone, Sparkles, ChevronUp } from 'lucide-react';
import { useApp } from '../providers/AppProviders';

export function FloatingWidgets() {
  const pathname = usePathname();
  const { openQuoteModal } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hello Comtech Team! I am reaching out from your website for sales & service enquiry.');
    window.open(`https://wa.me/919434197268?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shadow-lg backdrop-blur-md transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Sticky Fast Quote Pill */}
      <button
        onClick={() => openQuoteModal()}
        className="pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-xl backdrop-blur-md font-semibold text-xs transition-all hover:scale-105 group"
      >
        <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
        <span>Instant Quote Ticket</span>
      </button>

      {/* Floating WhatsApp Action */}
      <button
        onClick={openWhatsApp}
        className="pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/40 transition-all hover:scale-110 group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-7 h-7" />
        <span className="absolute right-16 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-slate-700">
          Chat with Suri IT Team
        </span>
      </button>
    </div>
  );
}
