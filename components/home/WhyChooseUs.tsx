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
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Wrench,
      title: 'Premier Motherboard Lab',
      desc: 'Birbhum’s only advanced chip-level micro-soldering and BGA station for laptop and server logic boards.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Clock,
      title: '2-Hour Emergency SLA',
      desc: 'Guaranteed rapid on-site technician deployment for corporate AMC clients and emergency surveillance down-time in Suri.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Pricing & Warranty',
      desc: 'Clear upfront diagnostic fees, genuine GST invoices, and 30-day post-service warranty on all motherboard repairs.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: Headphones,
      title: 'Dedicated Remote & Phone Desk',
      desc: 'Instant remote desktop assistance for Tally accounting synchronization, antivirus definition updates, and DVR playback.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Users,
      title: '12+ Years Local Trust',
      desc: 'Over 350+ commercial shops, educational institutions, hospitals, and diagnostic clinics rely on Comtech across Birbhum.',
      color: 'text-teal-500 bg-teal-500/10 border-teal-500/20',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0c121e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
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
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-cyan-500/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${pt.color}`}>
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
