'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../providers/AppProviders';
import { ThreeTechCanvas } from '../ui/ThreeTechCanvas';
import { Tilt3DCard } from '../ui/Tilt3DCard';
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
  Activity,
  HardDrive,
  Check,
} from 'lucide-react';

export function HeroSection() {
  const { openQuoteModal } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'sales' | 'service'>('all');

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden gradient-bg-tech">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[400px] blur-[140px] rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse, rgba(123,27,90,0.18) 0%, rgba(233,165,26,0.08) 60%, transparent 100%)'}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top announcement pill */}
        <div className="flex justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-300 backdrop-blur-md shadow-xl">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold text-cyan-400">Suri&apos;s #1 Technology Hub</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Sales &amp; Chip-Level Service Lab</span>
          </div>
        </div>

        {/* Hero 2-Column Split: Content & 3D Interactive WebGL Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Powering Businesses with{' '}
              <span className="gradient-text">Advanced IT Sales</span> &amp;{' '}
              <span className="gradient-text">Expert Chip-Level Services</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Authorized CCTV Surveillance, Certified Tally Prime ERP, High-Precision Motherboard Diagnostic Lab, and Corporate IT AMC for institutions across Birbhum.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteModal({ type: 'general', subject: 'Hero Quick Quote Request' })}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl transition-all hover:scale-105 cursor-pointer"
                style={{background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)', boxShadow: '0 8px 24px -4px rgba(123,27,90,0.40)'}}
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Fast Quote / Book Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919434197268"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#1c0614] hover:bg-[#fdf6fa] dark:hover:bg-[#2a0820] text-slate-800 dark:text-white font-semibold text-xs sm:text-sm border dark:border-[#3a0f2b] border-slate-300 shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Sales: +91 94341 97268</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{color: '#7B1B5A'}} />
                <span>100% Genuine Hardware</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{color: '#E9A51A'}} />
                <span>Free Onsite CCTV Survey</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{color: '#A6A4A5'}} />
                <span>30-Day Lab Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic WebGL Canvas & Floating Interactive Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            <ThreeTechCanvas />
            <div className="absolute top-4 right-2 sm:right-6 animate-float pointer-events-none">
              <div className="p-3 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3" style={{background: 'rgba(26,5,17,0.90)', border: '1px solid rgba(233,165,26,0.35)'}}>
                <div className="p-2 rounded-xl" style={{background: 'rgba(233,165,26,0.15)', color: '#E9A51A'}}>
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Surveillance Nodes</span>
                  <span className="text-xs font-extrabold text-white font-mono">4,800+ Live in Birbhum</span>
                </div>
              </div>
            </div>

            {/* Floating 3D Badge 2 (Bottom Left) */}
            <div className="absolute bottom-6 left-2 sm:left-4 animate-float [animation-delay:2s] pointer-events-none">
              <div className="p-3 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3" style={{background: 'rgba(26,5,17,0.90)', border: '1px solid rgba(123,27,90,0.45)'}}>
                <div className="p-2 rounded-xl" style={{background: 'rgba(123,27,90,0.20)', color: '#c44a8a'}}>
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Motherboard Lab</span>
                  <span className="text-xs font-extrabold font-mono" style={{color: '#c44a8a'}}>98.4% Recovery Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Division Interactive Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <Tilt3DCard maxTilt={8} scale={1.01}>
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-500" />
                    <span>Two Specialized Divisions Under One Roof</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Beside A.B.T.A Building, New DangalPara, Suri, Birbhum – 731101
                  </p>
                </div>

                {/* Division switcher pills */}
                <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'all'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Capabilities
                  </button>
                  <button
                    onClick={() => setActiveTab('sales')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'sales'
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Sales Division
                  </button>
                  <button
                    onClick={() => setActiveTab('service')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'service'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
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
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:bg-slate-800/50 border border-blue-500/20 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
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

                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>Hikvision &amp; CP Plus HD / IP / ColorVu Night CCTV Kits</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>Certified 3-Star Tally Prime Silver &amp; Gold Perpetual Licenses</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>HP, Dell, Lenovo Commercial Desktops, Laptops &amp; Servers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>Quick Heal &amp; Seqrite Endpoint Enterprise Antivirus</span>
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
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                )}

                {/* Division 2: Service */}
                {(activeTab === 'all' || activeTab === 'service') && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:bg-slate-800/50 border border-emerald-500/20 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
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
                        <span>Corporate IT AMC Contracts with Guaranteed 2-Hour SLA</span>
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
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Book Repair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* 3D Stat Counters with Tilt Physics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-w-5xl mx-auto">
          <Tilt3DCard maxTilt={15} scale={1.04}>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1c0614]/80 border border-[#e8d5e2] dark:border-[#3a0f2b] text-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading" style={{color: '#7B1B5A'}}>12+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Years in Suri &amp; Birbhum</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard maxTilt={15} scale={1.04}>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1c0614]/80 border border-[#e8d5e2] dark:border-[#3a0f2b] text-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading" style={{color: '#E9A51A'}}>4,800+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">CCTV Nodes Deployed</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard maxTilt={15} scale={1.04}>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1c0614]/80 border border-[#e8d5e2] dark:border-[#3a0f2b] text-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading" style={{color: '#c44a8a'}}>98.4%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Motherboard Lab Recovery</div>
            </div>
          </Tilt3DCard>
          <Tilt3DCard maxTilt={15} scale={1.04}>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1c0614]/80 border border-[#e8d5e2] dark:border-[#3a0f2b] text-center shadow-xl">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading" style={{color: '#A6A4A5'}}>350+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Corporate AMC Clients</div>
            </div>
          </Tilt3DCard>
        </div>
      </div>
    </section>
  );
}
