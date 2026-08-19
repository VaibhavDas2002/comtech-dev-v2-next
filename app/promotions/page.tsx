'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { Promotion } from '@/lib/types';
import {
  Gift,
  Tag,
  Clock,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function PromotionsPage() {
  const { openQuoteModal } = useApp();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/promotions');
        const data = await res.json();
        if (data.success) {
          setPromotions(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Gift className="w-4 h-4" />
            <span>Special Marketing Campaigns &amp; Deals</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Exclusive <span className="gradient-text">Offers &amp; Packages</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Take advantage of limited-time bundle discounts on CCTV complete kits, Tally Prime upgrades, and corporate Annual Maintenance Contracts in Suri.
          </p>
        </div>
      </section>

      {/* Promotions List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading promotions...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-xl group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={promo.image_url}
                      alt={promo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wide shadow-md">
                      {promo.badge}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#7B1B5A] transition-colors">
                        {promo.title}
                      </h2>
                      <p className="text-xs font-semibold text-[#7B1B5A] mt-1">
                        {promo.discount_text}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {promo.description}
                    </p>

                    {/* Coupon Box */}
                    {promo.coupon_code && (
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-dashed border-[#7B1B5A]/30 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">
                            Promo Coupon Code
                          </span>
                          <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                            {promo.coupon_code}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(promo.coupon_code!)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#7B1B5A]/10 hover:bg-[#7B1B5A]/20 text-[#7B1B5A] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {copiedCode === promo.coupon_code ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 flex flex-col gap-3">
                  {promo.valid_until && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Valid through {promo.valid_until}</span>
                    </div>
                  )}

                  <button
                    onClick={() =>
                      openQuoteModal({
                        type: 'general',
                        subject: `Promotion Claim: ${promo.title} [Coupon: ${promo.coupon_code || 'DIRECT'}]`,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{promo.cta_text || 'Claim This Offer'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

