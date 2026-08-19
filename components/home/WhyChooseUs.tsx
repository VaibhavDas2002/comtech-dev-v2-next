'use client';

import React from 'react';
import {
  Award,
  ShieldCheck,
  Zap,
  Users,
  Wrench,
  Clock,
  Headphones,
  CheckCircle,
} from 'lucide-react';

export function WhyChooseUs() {
  const points = [
    {
      icon: Award,
      title: 'Certified OEM Partners',
      desc: 'Authorized partner for Hikvision, CP Plus, Tally Solutions, Quick Heal, Seqrite, and Dell/HP commercial systems.',
      color: 'text-white border-[#7B1B5A]/30',
      bg: '#7B1B5A',
    },
    {
      icon: Wrench,
      title: 'Premier Motherboard Lab',
      desc: 'Birbhum’s only advanced chip-level micro-soldering and BGA station for laptop and server logic boards.',
      color: 'text-white border-[#E9A51A]/30',
      bg: '#E9A51A',
    },
    {
      icon: Clock,
      title: '2-Hour Emergency SLA',
      desc: 'Guaranteed rapid on-site technician deployment for corporate AMC clients and emergency surveillance down-time in Suri.',
      color: 'text-white border-amber-600/30',
      bg: '#c44a8a',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Pricing & Warranty',
      desc: 'Clear upfront diagnostic fees, genuine GST invoices, and 30-day post-service warranty on all motherboard repairs.',
      color: 'text-white border-[#7B1B5A]/30',
      bg: '#5c1444',
    },
    {
      icon: Headphones,
      title: 'Dedicated Remote & Phone Desk',
      desc: 'Instant remote desktop assistance for Tally accounting synchronization, antivirus definition updates, and DVR playback.',
      color: 'text-white border-[#E9A51A]/30',
      bg: '#b8840d',
    },
    {
      icon: Users,
      title: '12+ Years Local Trust',
      desc: 'Over 350+ commercial shops, educational institutions, hospitals, and diagnostic clinics rely on Comtech across Birbhum.',
      color: 'text-white border-[#A6A4A5]/30',
      bg: '#6b696a',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0c121e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{color: '#7B1B5A'}}>
            The Comtech Advantage
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Why Suri &amp; Birbhum Choose Comtech
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            We combine authorized hardware sales with premier chip-level diagnostic laboratory expertise for total peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
              className="glass-card rounded-2xl p-6 border border-[#e8d5e2] dark:border-[#3a0f2b] space-y-4 hover:border-[#E9A51A]/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pt.color}`}
                  style={{background: pt.bg}}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
