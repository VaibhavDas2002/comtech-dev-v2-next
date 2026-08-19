'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../providers/AppProviders';
import {
  ShieldCheck,
  Cpu,
  Wrench,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Video,
  FileSpreadsheet,
  Award,
  Zap,
} from 'lucide-react';

export function HeroSection() {
  const { openQuoteModal } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'sales' | 'service'>('all');

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden gradient-bg-tech">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-teal-400/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top announcement pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-800/80 border border-cyan-500/30 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-cyan-950/20">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-cyan-400">Suri&apos;s #1 Technology Hub</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Sales &amp; Chip-Level Service Lab</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Powering Businesses with{' '}
            <span className="gradient-text">Advanced IT Sales</span> &amp;{' '}
            <span className="gradient-text">Expert Chip-Level Services</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Authorized CCTV Surveillance, Certified Tally Prime ERP, High-Precision Motherboard Repair Lab, and Corporate IT AMC for institutions across Birbhum.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openQuoteModal({ type: 'general', subject: 'General Quote Request' })}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Fast Quote / Book Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+919434197268"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-300 dark:border-slate-700 shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Call Sales: +91 94341 97268</span>
            </a>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-500" />
              <span>100% Genuine Certified Hardware</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Free Onsite CCTV Survey in Suri</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span>30-Day Chip Repair Warranty</span>
            </div>
          </div>
        </div>

        {/* Dual Division Interactive Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-cyan-500" />
                  <span>Two Specialized Divisions Under One Roof</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Beside A.B.T.A Building, New DangalPara, Suri, Birbhum
                </p>
              </div>

              {/* Division switcher pills */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'all'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Capabilities
                </button>
                <button
                  onClick={() => setActiveTab('sales')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'sales'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Sales Division
                </button>
                <button
                  onClick={() => setActiveTab('service')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === 'service'
                      ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Service Division
                </button>
              </div>
            </div>

            {/* Division Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Division 1: Sales */}
              {(activeTab === 'all' || activeTab === 'sales') && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:bg-slate-800/50 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/30">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          Comtech Information Services
                        </h4>
                        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                          IT Sales, Licenses &amp; Commercial Hardware
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>Hikvision &amp; CP Plus HD / IP / ColorVu Night CCTV Kits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>Certified Tally Prime Silver &amp; Gold Perpetual Licenses + TDL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>HP, Dell, Lenovo Business Laptops, Desktops &amp; Servers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span>Quick Heal &amp; Seqrite Enterprise Antivirus Deployments</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href="/products"
                      className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore Sales Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openQuoteModal({ type: 'product', subject: 'Sales Inquiry' })}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              )}

              {/* Division 2: Service */}
              {(activeTab === 'all' || activeTab === 'service') && (
                <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:bg-slate-800/50 border border-emerald-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-lg bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          Comtech Infosys
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Advanced Chip-Level Diagnostic Lab &amp; IT AMC
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>BGA Rework, No-Power Laptop &amp; Logic Board Short Repair</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Laser Printer Fuser &amp; Logic Card Servicing Lab</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Structured Cat6 Rack Cabling &amp; Optical Fiber Splicing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Institutional Annual Maintenance Contracts (AMC with 2hr SLA)</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href="/services"
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore Service Lab</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openQuoteModal({ type: 'service', subject: 'Repair Lab Inquiry' })}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Book Repair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Metrics / Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-cyan-600 dark:text-cyan-400">
              12+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Years Serving Suri &amp; Birbhum
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-blue-600 dark:text-blue-400">
              4,800+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              CCTV Surveillance Nodes Active
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">
              98.4%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Motherboard Lab Recovery Rate
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-teal-600 dark:text-teal-400">
              350+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Corporate &amp; Institution Clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
