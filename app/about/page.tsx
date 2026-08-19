'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProviders';
import {
  Cpu,
  ShoppingBag,
  Wrench,
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';
import { siteSettings } from '@/lib/store/seedData';

export default function AboutPage() {
  const { openQuoteModal } = useApp();

  return (
    <div className="py-12 md:py-20 space-y-20">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{background:"rgba(123,27,90,0.10)",color:"#7B1B5A",borderColor:"rgba(123,27,90,0.20)"}}>
            <Award className="w-4 h-4" />
            <span>Serving Suri &amp; Birbhum Since 2012</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Pioneering IT Excellence in <span className="gradient-text">Birbhum District</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded with a vision to deliver tier-1 technology hardware and laboratory-grade repair diagnostics to Suri and surrounding regions without needing to send equipment to Kolkata.
          </p>
        </div>
      </section>

      {/* Dual Business Model Deep-Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sales Wing */}
          <div className="glass-card rounded-3xl p-8 border border-[#7B1B5A]/20 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B1B5A]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#7B1B5A] text-white shadow-lg shadow-blue-600/30">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B1B5A] dark:text-[#E9A51A]">
                  Sales Wing
                </span>
                <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Comtech Information Services
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The commercial sales and digital software licensing backbone. As certified channel partners, we supply verified genuine OEM hardware, CCTV surveillance packages, Tally Prime perpetual licenses, enterprise endpoint protection, and server hardware.
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Authorized Hikvision, CP Plus &amp; Dahua CCTV Distributor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Certified 3-Star Tally Solutions Silver/Gold Licensing Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Official Partner for Quick Heal, Seqrite &amp; Kaspersky EPS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>HP, Dell, Lenovo Business Desktops, Laptops &amp; Servers</span>
              </div>
            </div>
            <button
              onClick={() => openQuoteModal({ type: 'product', subject: 'Sales Division Quote' })}
              className="px-5 py-2.5 rounded-xl bg-[#7B1B5A] hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer"
            >
              Contact Sales Team
            </button>
          </div>

          {/* Service Wing */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/20 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c44a8a]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#7B1B5A] text-white shadow-lg shadow-emerald-600/30">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#c44a8a] dark:text-[#c44a8a]">
                  Service Wing
                </span>
                <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Comtech Infosys
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              The high-tech engineering and chip-level diagnostic laboratory. Equipped with high-precision BGA rework machinery, digital oscilloscopes, and thermal imaging cameras, we repair complex motherboard shorts and logic board issues that other centers declare dead.
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c44a8a] shrink-0" />
                <span>Chip-level BGA micro-soldering for Laptops, PCs &amp; MacBooks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c44a8a] shrink-0" />
                <span>Laser printer fuser and logic card rebuild facility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c44a8a] shrink-0" />
                <span>Fiber optic splicing &amp; 24-Port Server rack structured cabling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c44a8a] shrink-0" />
                <span>Corporate IT AMC Contracts with 2-hour SLA response in Suri</span>
              </div>
            </div>
            <button
              onClick={() => openQuoteModal({ type: 'service', subject: 'Service Lab Booking' })}
              className="px-5 py-2.5 rounded-xl bg-[#7B1B5A] hover:bg-[#c44a8a] text-white text-xs font-bold shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              Book Service Lab
            </button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#7B1B5A]/10 text-[#7B1B5A] flex items-center justify-center border border-[#7B1B5A]/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                To deliver enterprise-grade IT infrastructure, seamless CCTV security, customized accounting software automation, and cost-effective chip-level repairs to businesses, educational institutions, and residential clients across Birbhum with speed and integrity.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                To be the most dependable and technologically advanced IT solutions conglomerate in West Bengal, empowering local enterprises with modern digital tools, cloud workflows, and zero downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl shadow-blue-900/30">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
            Need Expert Technology Guidance for Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100 max-w-xl mx-auto">
            Drop by our service center beside A.B.T.A Building, New DangalPara, Suri, or book an onsite consultation with our certified engineers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openQuoteModal()}
              className="px-8 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-lg hover:bg-cyan-50 transition-colors cursor-pointer"
            >
              Get Free Consultation / Quote
            </button>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-blue-900/60 hover:bg-blue-900/80 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              View Suri Location Map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

