'use client';

import React from 'react';
import { Testimonial } from '@/lib/types';
import { Star, Quote, Building2, MapPin } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-slate-100/70 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Verified Client Reviews
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Trusted by Leaders Across Birbhum
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            See how Comtech Information Services &amp; Comtech Infosys empower healthcare, education, retail, and enterprise clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-slate-200 dark:border-slate-800 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-500/10 pointer-events-none" />

              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {t.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-cyan-500 shrink-0" />
                  <span>{t.designation}, {t.company}</span>
                </div>
                <div className="text-[10px] text-cyan-600 dark:text-cyan-400 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{t.location} • {t.service_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
