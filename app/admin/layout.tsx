'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Database,
  Wrench,
  ShoppingBag,
  BookOpen,
  Gift,
  Camera,
  MessageSquare,
  Globe,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  HardDrive,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ username: string; name: string; role: string }>({
    username: 'Comtech_dev',
    name: 'Comtech Senior Admin',
    role: 'Super Admin',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('comtech_admin_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAdminUser(parsed);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('comtech_admin_session');
    }
    router.push('/admin/login');
  };

  // If on login page, render children directly without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const primaryNavItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Leads & Enquiries CRM', href: '/admin/enquiries', icon: Inbox, badge: 'CRM' },
    { name: 'User Management', href: '/admin/users', icon: Users, badge: 'STAFF' },
    { name: 'Master Data Management', href: '/admin/masters', icon: Database, badge: 'CONFIG' },
  ];

  const catalogNavItems = [
    { name: 'Services Catalog', href: '/admin/services', icon: Wrench },
    { name: 'Products & Sales', href: '/admin/products', icon: ShoppingBag },
    { name: 'Tech Blogs & Guides', href: '/admin/blogs', icon: BookOpen },
    { name: 'Promotions & Deals', href: '/admin/promotions', icon: Gift },
    { name: 'Gallery Showcase', href: '/admin/gallery', icon: Camera },
    { name: 'Client Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Base64 Media & Docs', href: '/admin/documents', icon: HardDrive },
  ];

  return (
    <div className="min-h-screen bg-[#0a0207] text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#140510] border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center border border-slate-700 shrink-0">
            <img src="/Comtech-logo.png" alt="Comtech Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-sm font-heading text-white">COMTECH ADMIN</span>
            <span className="text-[10px] text-[#E9A51A] block -mt-1 font-mono">@{adminUser.username}</span>
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
        } md:block w-full md:w-64 bg-[#12040f] border-r border-slate-800/90 shrink-0 flex flex-col justify-between p-4 space-y-6 md:min-h-screen z-20`}
      >
        <div className="space-y-5">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-3 px-2 py-2 border-b border-slate-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 shadow-md shrink-0">
              <img src="/Comtech-logo.png" alt="Comtech Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-base font-extrabold font-heading text-white tracking-tight">
                COMTECH
              </span>
              <span className="text-[10px] uppercase font-bold text-[#E9A51A] block tracking-widest">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Primary Operations Nav */}
          <nav className="space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-1.5">
              Operations &amp; Control
            </div>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#7B1B5A] text-white font-bold shadow-md shadow-[#7B1B5A]/30 border border-[#c44a8a]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E9A51A]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-[#180512] text-[#E9A51A] border border-[#E9A51A]/40'
                          : 'bg-[#7B1B5A]/20 text-[#c44a8a]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Catalog & Content Management Nav */}
          <nav className="space-y-1 pt-2 border-t border-slate-800/80">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-1.5">
              Content &amp; Catalog
            </div>
            {catalogNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#7B1B5A] text-white font-bold shadow-md border border-[#c44a8a]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#E9A51A]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
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
            <Globe className="w-4 h-4 text-[#E9A51A]" />
            <span>Open Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout ({adminUser.username})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#0d0208] overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 px-6 bg-[#140510]/90 backdrop-blur-md border-b border-slate-800/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Suri Operations Management Portal &bull; Comtech Dev</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Link to CRM */}
            <Link
              href="/admin/enquiries"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300 hover:text-white"
            >
              <Inbox className="w-3.5 h-3.5 text-[#E9A51A]" />
              <span>CRM Enquiries</span>
            </Link>

            {/* Current Logged In Admin Badge */}
            <div className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md"
                style={{ background: 'linear-gradient(135deg, #7B1B5A, #E9A51A)' }}
              >
                C
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-bold text-white block text-[11px] leading-tight font-mono">{adminUser.username}</span>
                <span className="text-[9px] text-[#E9A51A] block font-semibold">{adminUser.role}</span>
              </div>
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
