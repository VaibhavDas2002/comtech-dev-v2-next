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
    <section className="py-16 text-white relative overflow-hidden" style={{background: 'linear-gradient(180deg, #1a0511 0%, #0e0309 100%)'}}>
      {/* Background glow */}
      <div className="absolute -top-40 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{background: 'rgba(123,27,90,0.12)'}} />
      <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{background: 'rgba(233,165,26,0.07)'}} />

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
            className="hidden sm:flex items-center gap-1 text-xs font-bold transition-colors"
            style={{color: '#E9A51A'}}
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promotions.slice(0, 3).map((promo) => (
            <div
              key={promo.id}
              className="rounded-2xl border p-6 flex flex-col justify-between space-y-4 transition-all shadow-xl relative overflow-hidden group"
              style={{background: 'linear-gradient(135deg, rgba(26,5,17,0.90) 0%, rgba(14,3,9,0.95) 100%)', borderColor: 'rgba(123,27,90,0.30)'}}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(233,165,26,0.45)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,27,90,0.30)'}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider">
                    {promo.badge}
                  </span>
                  {promo.coupon_code && (
                    <span className="px-2.5 py-0.5 rounded font-mono text-[11px] font-bold flex items-center gap-1" style={{background: 'rgba(233,165,26,0.18)', color: '#E9A51A', border: '1px solid rgba(233,165,26,0.30)'}}>
                      <Tag className="w-3 h-3" />
                      {promo.coupon_code}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold font-heading text-white transition-colors group-hover:text-[#E9A51A]">
                  {promo.title}
                </h3>
                <p className="text-xs font-semibold" style={{color: '#E9A51A'}}>{promo.discount_text}</p>
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
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  style={{background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)', boxShadow: '0 4px 12px -4px rgba(123,27,90,0.40)'}}>
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
