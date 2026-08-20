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

import { NavbarHeritageRibbon } from '../ui/Ribbon';

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
    { name: 'Book Appointment', href: '/book-appointment' },
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
      <div className="bg-[#1a0511] text-slate-300 text-xs py-1.5 px-4 border-b border-[#3a0f2b] hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium" style={{color: '#E9A51A'}}>
              <Shield className="w-3.5 h-3.5" />
              <span>Est. 1997 • Suri&apos;s #1 Authorized IT Sales &amp; Motherboard Lab (29+ Years of Trust)</span>
            </span>
            <span className="text-slate-500 hidden xl:inline">•</span>
            <span className="text-slate-400 hidden xl:inline">
              📍 Beside A.B.T.A Building, New DangalPara, Suri – 731101
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+919434197268"
              className="flex items-center gap-1 hover:text-[#E9A51A] transition-colors"
            >
              <Phone className="w-3 h-3" style={{color: '#E9A51A'}} />
              <span>Sales: +91 94341 97268</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="tel:+919474306951"
              className="flex items-center gap-1 hover:text-[#c44a8a] transition-colors"
            >
              <Wrench className="w-3 h-3" style={{color: '#c44a8a'}} />
              <span>Service: +91 94743 06951</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel shadow-lg shadow-[#7B1B5A]/10 py-2.5'
            : 'bg-white/95 dark:bg-[#0e0309]/95 backdrop-blur-md py-3.5 border-b border-[#e8d5e2] dark:border-[#3a0f2b]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Dual Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-white dark:bg-[#1c0614] p-1 flex items-center justify-center border border-[#e8d5e2] dark:border-[#3a0f2b] shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0">
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
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded" style={{background: 'rgba(123,27,90,0.12)', color: '#7B1B5A', border: '1px solid rgba(123,27,90,0.25)'}}>
                  Suri
                </span>
                <NavbarHeritageRibbon />
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5">
                Information Services <span style={{color: '#E9A51A'}}>&bull;</span> Infosys
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
                      ? 'text-white font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-[#fdf6fa] dark:hover:bg-[#1c0614]'
                  }`}
                  style={isActive ? {background: '#7B1B5A', color: '#fff'} : {}}
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
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-bold tracking-wide shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              style={{background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)', boxShadow: '0 4px 16px -4px rgba(123,27,90,0.4)'}}
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
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-[#fdf6fa] dark:hover:bg-[#1c0614]'
                  }`}
                  style={isActive ? {background: '#7B1B5A'} : {}}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold shadow-md cursor-pointer"
              style={{background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)'}}
            >
              <Wrench className="w-4 h-4" />
              <span>Book Appointment &amp; Register Issue</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Quick Quote / Ticket</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
