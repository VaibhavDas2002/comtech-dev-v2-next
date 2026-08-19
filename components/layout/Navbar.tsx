'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../providers/AppProviders';
import {
  Menu,
  X,
  Sun,
  Moon,
  Phone,
  Shield,
  Cpu,
  ShoppingBag,
  Wrench,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, openQuoteModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products & Sales', href: '/products' },
    { name: 'Promotions', href: '/promotions' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blogs & Guides', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  // Don't show public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top emergency & contact bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Suri&apos;s #1 Authorized IT Sales & Advanced Motherboard Service Lab</span>
            </span>
            <span className="text-slate-400 hidden lg:inline">
              📍 Beside A.B.T.A Building, New DangalPara, Suri, Birbhum – 731101
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+919434197268"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>Sales: +91 94341 97268</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919474306951"
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <Wrench className="w-3 h-3 text-emerald-400" />
              <span>Service: +91 94743 06951</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-lg shadow-black/5 dark:shadow-cyan-950/20 py-2.5'
            : 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-3.5 border-b border-slate-200/80 dark:border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Dual Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/Comtech-logo.png"
                alt="Comtech Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                  COMTECH
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  Suri
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
                Information Services <span className="text-cyan-500">&bull;</span> Infosys
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle dark/light theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Quote Modal Trigger */}
            <button
              onClick={() => openQuoteModal()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold tracking-wide shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Quote</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <a
              href="tel:+919434197268"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Sales Call</span>
            </a>
            <a
              href="tel:+919474306951"
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold"
            >
              <Wrench className="w-4 h-4" />
              <span>Service Lab</span>
            </a>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Free Quote / Ticket</span>
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
