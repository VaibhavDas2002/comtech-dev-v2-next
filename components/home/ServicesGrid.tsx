'use client';

import React from 'react';
import Link from 'next/link';
import { Service } from '@/lib/types';
import { useApp } from '../providers/AppProviders';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import {
  Wrench,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const { openQuoteModal } = useApp();

  return (
    <section className="py-20 relative" style={{background: '#fdf6fa'}}>
      <div className="dark:hidden absolute inset-0" style={{background: '#fdf6fa'}} />
      <div className="hidden dark:block absolute inset-0" style={{background: 'rgba(14,3,9,0.40)'}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border" style={{background: 'rgba(123,27,90,0.10)', color: '#7B1B5A', borderColor: 'rgba(123,27,90,0.20)'}}>
              <Wrench className="w-3.5 h-3.5" />
              <span>Core Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Specialized <span className="gradient-text">IT Services</span> &amp; Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              From authorized CCTV setups and certified Tally Prime ERP deployments to chip-level laptop motherboard micro-soldering in Suri.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#1c0614] text-xs font-bold text-slate-900 dark:text-white border transition-all shadow-sm group"
            style={{borderColor: 'rgba(123,27,90,0.25)'}}
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{color: '#7B1B5A'}} />
          </Link>
        </div>

        {/* 3D Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <Tilt3DCard key={service.id} maxTilt={10} scale={1.02} className="h-full">
              <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group h-full shadow-lg">
                {/* Image & Badge Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {service.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-white text-[11px] font-bold tracking-wide shadow-md" style={{background: '#7B1B5A'}}>
                      {service.badge}
                    </span>
                  )}

                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur-sm" style={{background: 'rgba(26,5,17,0.85)', color: '#E9A51A', border: '1px solid rgba(233,165,26,0.30)'}}>
                    {service.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white transition-colors" style={{}}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#7B1B5A'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = ''}>
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                      {service.short_description}
                    </p>

                    {/* Key feature pills */}
                    <div className="mt-4 space-y-1.5">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{color: idx === 0 ? '#7B1B5A' : idx === 1 ? '#E9A51A' : '#A6A4A5'}} />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer with Price & CTAs */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-medium">
                        Pricing Starts
                      </span>
                      <span className="text-xs font-bold dark:text-white" style={{color: '#7B1B5A'}}>
                        {service.price_starting || 'Quote on Call'}
                      </span>
                    </div>

                    <Link
                      href={`/book-appointment?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-xs font-bold shadow-md transition-all hover:scale-105 cursor-pointer"
                      style={{background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)', boxShadow: '0 4px 12px -4px rgba(123,27,90,0.40)'}}
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Book Service</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
