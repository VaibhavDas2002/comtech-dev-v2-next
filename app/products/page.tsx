'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/components/providers/AppProviders';
import { Product } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  ShoppingBag,
  Search,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

export default function ProductsPage() {
  const { openQuoteModal } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = [
    'all',
    'CCTV & Security',
    'Software & Licenses',
    'Laptops & Desktops',
    'Antivirus & Cybersecurity',
    'Networking & Accessories',
    'Printers & Peripherals',
  ];

  const brands = ['all', 'Hikvision', 'Tally Solutions', 'HP', 'Quick Heal', 'D-Link', 'Epson'];

  const filtered = products.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand =
      selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesBrand && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
            <ShoppingBag className="w-4 h-4" />
            <span>Comtech Information Services (Sales)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Official <span className="gradient-text">Hardware &amp; Software</span> Catalog
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            100% Genuine OEM equipment with manufacturer warranty, GST invoice billing, and free onsite setup in Suri &amp; Birbhum.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Brand Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                Brand:
              </span>
              <div className="flex items-center gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedBrand === b
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {b === 'all' ? 'All Brands' : b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading catalog...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-card rounded-2xl p-8">
            <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No products match your search
            </h3>
            <p className="text-xs text-slate-500">Try adjusting your brand or category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800 group"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-900/40 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">
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

                  <div className="p-6 space-y-3">
                    <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                      {product.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {product.short_description}
                    </p>

                    {/* Specifications List */}
                    <div className="space-y-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 text-[11px]">
                      {Object.entries(product.specifications).slice(0, 3).map(([key, val], idx) => (
                        <div key={idx} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                          <span className="text-slate-400 uppercase text-[9px] font-semibold">{key}</span>
                          <span className="font-medium truncate max-w-[65%] text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
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
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{product.warranty || 'Official Brand Warranty'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalProduct(product)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      title="View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        openQuoteModal({
                          type: 'product',
                          service_or_product_name: product.title,
                          subject: `Quote for ${product.title}`,
                        })
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Product Spec Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-1/2 h-56 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-4">
                <img
                  src={activeModalProduct.image_url}
                  alt={activeModalProduct.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-3">
                <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                  {activeModalProduct.brand}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeModalProduct.description}
                </p>

                <div className="pt-2">
                  <div className="text-sm font-bold text-slate-900 dark:text-cyan-400">
                    {activeModalProduct.discount_price
                      ? formatINR(activeModalProduct.discount_price)
                      : formatINR(activeModalProduct.price)}
                  </div>
                  <div className="text-xs text-emerald-500 font-medium">
                    {activeModalProduct.warranty}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(activeModalProduct.specifications).map(([k, v]) => (
                  <div key={k} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex justify-between">
                    <span className="text-slate-400 font-medium">{k}:</span>
                    <span className="text-slate-900 dark:text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 flex justify-end gap-3">
              <button
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const p = activeModalProduct;
                  setActiveModalProduct(null);
                  openQuoteModal({
                    type: 'product',
                    service_or_product_name: p.title,
                    subject: `Quote for ${p.title}`,
                  });
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
