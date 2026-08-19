'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '../providers/AppProviders';
import { Service } from '@/lib/types';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
  Layers,
} from 'lucide-react';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const { openQuoteModal } = useApp();

  return (
    <section className="py-20 bg-slate-100/70 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4" />
              <span>Full-Spectrum IT Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              End-to-End IT Services &amp; Solutions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              From ColorVu CCTV security and chip-level motherboard lab repair to Tally cloud setups and enterprise web engineering.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors group"
          >
            <span>View All Services Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Image with badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {service.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-cyan-500/90 text-white text-[11px] font-bold tracking-wide shadow-md">
                    {service.badge}
                  </span>
                )}

                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 text-cyan-300 text-[11px] font-semibold backdrop-blur-sm border border-slate-700">
                  {service.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                    {service.short_description}
                  </p>

                  {/* Key feature pills */}
                  <div className="mt-4 space-y-1.5">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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
                    <span className="text-xs font-bold text-slate-900 dark:text-cyan-400">
                      {service.price_starting || 'Quote on Call'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        openQuoteModal({
                          type: 'service',
                          service_or_product_name: service.title,
                          subject: `Inquiry for ${service.title}`,
                        })
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
