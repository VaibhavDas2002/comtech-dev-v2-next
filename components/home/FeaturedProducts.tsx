'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useApp } from '../providers/AppProviders';
import { Tilt3DCard } from '../ui/Tilt3DCard';
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { openQuoteModal } = useApp();

  const formatINR = (val?: number) => {
    if (!val) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest mb-2" style={{color: '#E9A51A'}}>
              <ShoppingBag className="w-4 h-4" />
              <span>Hardware &amp; Commercial Sales</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Featured <span className="gradient-text">IT Products</span> &amp; Systems
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              100% Genuine OEM Surveillance Kits, Certified Tally ERP Licenses, Enterprise Desktops &amp; High-Speed Networking.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 dark:text-white border transition-all shadow-sm group"
            style={{background: 'white', borderColor: 'rgba(123,27,90,0.25)'}}
          >
            <span>View Full Sales Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" style={{color: '#E9A51A'}} />
          </Link>
        </div>

        {/* 3D Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Tilt3DCard key={product.id} maxTilt={12} scale={1.03} className="h-full">
              <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group h-full border shadow-lg transition-all duration-300" style={{borderColor: 'rgba(123,27,90,0.12)'}}>
                {/* Image & Badges */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded text-white text-[10px] font-bold uppercase tracking-wider shadow-sm" style={{background: '#7B1B5A'}}>
                      {product.brand}
                    </span>
                    {product.discount_price && product.price && (
                      <span className="px-2 py-0.5 rounded text-white text-[10px] font-bold flex items-center gap-1 shadow-sm" style={{background: '#E9A51A', color: '#1a0511'}}>
                        <Tag className="w-3 h-3" />
                        Save {Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 right-2 text-[10px] font-medium text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-800">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 transition-colors group-hover:text-[#7B1B5A]">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {product.short_description}
                    </p>

                    {/* Specifications snapshot */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, val], idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-semibold text-slate-400 block text-[9px] uppercase">{key}:</span>
                          <span className="font-medium truncate block">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      {product.discount_price ? (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                            {formatINR(product.discount_price)}
                          </span>
                          {product.price && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatINR(product.price)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs font-bold" style={{color: '#E9A51A'}}>
                          Quote on Request
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        openQuoteModal({
                          type: 'product',
                          service_or_product_name: product.title,
                          subject: `Quote Request for ${product.title}`,
                        })
                      }
                      className="px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                      style={{background: 'linear-gradient(135deg, #E9A51A 0%, #c48810 100%)', color: '#1a0511', boxShadow: '0 4px 12px -4px rgba(233,165,26,0.40)'}}
                    >
                      Get Quote
                    </button>
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
