'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Wrench,
  ShoppingBag,
  BookOpen,
  Gift,
  Camera,
  MessageSquare,
  Globe,
  LogOut,
  Cpu,
  ShieldCheck,
  Menu,
  X,
  Bell,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // If on login page, render children directly without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads & Enquiries CRM', href: '/admin/enquiries', icon: Inbox, badge: 'CRM' },
    { name: 'Services Catalog', href: '/admin/services', icon: Wrench },
    { name: 'Products & Sales', href: '/admin/products', icon: ShoppingBag },
    { name: 'Tech Blogs & Guides', href: '/admin/blogs', icon: BookOpen },
    { name: 'Promotions & Deals', href: '/admin/promotions', icon: Gift },
    { name: 'Gallery Showcase', href: '/admin/gallery', icon: Camera },
    { name: 'Client Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center border border-slate-700 shrink-0">
            <img src="/Comtech-logo.png" alt="Comtech Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-sm font-heading">COMTECH ADMIN</span>
            <span className="text-[10px] text-cyan-400 block -mt-1">Management Portal</span>
          </div>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Menu */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-900 border-r border-slate-800/80 shrink-0 flex flex-col justify-between p-4 space-y-6 md:min-h-screen z-20`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 shadow-md shrink-0">
              <img src="/Comtech-logo.png" alt="Comtech Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-base font-extrabold font-heading text-white tracking-tight">
                COMTECH
              </span>
              <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-widest">
                Admin Control
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-2">
              Operations &amp; CRM
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Open Public Website</span>
          </Link>
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/50 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px]">System Online</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">v2.4</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-950 overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-400">
              Suri Operations Management Portal
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="font-semibold hidden sm:inline">Comtech Admin</span>
            </div>
          </div>
        </header>

        {/* Child Pages */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
