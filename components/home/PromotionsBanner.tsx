'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../providers/AppProviders';
import { Promotion } from '@/lib/types';
import { Sparkles, Tag, ArrowRight, Clock, Gift } from 'lucide-react';

interface PromotionsBannerProps {
  promotions: Promotion[];
}

export function PromotionsBanner({ promotions }: PromotionsBannerProps) {
  const { openQuoteModal } = useApp();

  if (promotions.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Limited Time Deals
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Featured Promotions &amp; Combo Packages
              </h2>
            </div>
          </div>

          <Link
            href="/promotions"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promotions.slice(0, 3).map((promo) => (
            <div
              key={promo.id}
              className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-6 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                    {promo.badge}
                  </span>
                  {promo.coupon_code && (
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {promo.coupon_code}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-400 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-xs text-cyan-300 font-semibold">{promo.discount_text}</p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {promo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                {promo.valid_until && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Valid till {promo.valid_until}</span>
                  </div>
                )}

                <button
                  onClick={() =>
                    openQuoteModal({
                      type: 'general',
                      subject: `Claim Offer: ${promo.title} (${promo.coupon_code || ''})`,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  {promo.cta_text || 'Claim Deal'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
