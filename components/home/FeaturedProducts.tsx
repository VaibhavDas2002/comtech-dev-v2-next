'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../providers/AppProviders';
import { Product } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import { ShoppingBag, ArrowRight, Check, Tag, ShieldCheck } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { openQuoteModal } = useApp();

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Comtech Information Services (Sales)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Featured Hardware &amp; Software Catalog
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              100% genuine products with manufacturer brand warranty, GST invoice, and onsite setup support in Suri &amp; Birbhum.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors group"
          >
            <span>Browse Full Product Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800"
            >
              {/* Product Image */}
              <div className="relative h-48 w-full bg-slate-900/50 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                    {product.brand}
                  </span>
                  {product.discount_price && product.price && (
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Save {Math.round(((product.price - product.discount_price) / product.price) * 100)}%
                    </span>
                  )}
                </div>

                <span className="absolute bottom-2 right-2 text-[10px] font-medium text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                    {product.short_description}
                  </p>

                  {/* Specifications snapshot */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    {Object.entries(product.specifications).slice(0, 2).map(([key, val], idx) => (
                      <div key={idx} className="truncate">
                        <span className="font-semibold text-slate-400 block text-[9px] uppercase">{key}:</span>
                        <span className="font-medium truncate block">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    {product.discount_price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                          {formatINR(product.discount_price)}
                        </span>
                        {product.price && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatINR(product.price)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-slate-900 dark:text-cyan-400">
                        {product.price ? formatINR(product.price) : 'Quote on Request'}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{product.warranty || 'Brand Warranty'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      openQuoteModal({
                        type: 'product',
                        service_or_product_name: product.title,
                        subject: `Price Quote for ${product.title}`,
                      })
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 text-white dark:text-cyan-300 border border-slate-800 dark:border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
