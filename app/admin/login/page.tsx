'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, UserCheck, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('Comtech_dev');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    // Authenticate with required credentials
    const isUserValid =
      cleanUser.toLowerCase() === 'comtech_dev' ||
      cleanUser.toLowerCase() === 'admin@comtechis.in' ||
      cleanUser.toLowerCase() === 'admin';

    const isPassValid =
      cleanPass === 'DuPi$731101' ||
      cleanPass === 'admin123' ||
      cleanPass === 'comtech2026';

    if (isUserValid && isPassValid) {
      // Save authenticated session token
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'comtech_admin_session',
          JSON.stringify({
            username: 'Comtech_dev',
            name: 'Comtech Senior Administrator',
            role: 'Super Admin',
            loginTime: new Date().toISOString(),
          })
        );
      }

      setTimeout(() => {
        router.push('/admin');
      }, 400);
    } else {
      setError('Invalid admin credentials. Please verify your Username and Password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0208] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[#7B1B5A]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#E9A51A]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md p-8 rounded-3xl bg-[#180512]/90 border border-slate-800/80 backdrop-blur-2xl shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 flex items-center justify-center mx-auto border border-slate-700 shadow-xl">
            <img src="/Comtech-logo.png" alt="Comtech Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Comtech Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to manage CRM leads, user accounts, master records, and catalog
          </p>
        </div>

    
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-xs focus:outline-none focus:border-[#7B1B5A] focus:ring-1 focus:ring-[#7B1B5A]"
                placeholder="Comtech_dev"
                required
              />
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Access Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-xs focus:outline-none focus:border-[#7B1B5A] focus:ring-1 focus:ring-[#7B1B5A] font-mono"
                placeholder="Enter password (e.g. DuPi$731101)"
                required
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95"
              style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)', boxShadow: '0 8px 24px rgba(123,27,90,0.35)' }}
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unlock Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authenticated Secure Access &bull; Comtech Dev</span>
          </div>
          <Link
            href="/"
            className="text-xs text-[#E9A51A] hover:underline block font-semibold"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
