'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/providers/AppProviders';
import { Service } from '@/lib/types';
import {
  Layers,
  Search,
  CheckCircle2,
  Sparkles,
  Phone,
  ArrowRight,
  Shield,
  Wrench,
} from 'lucide-react';

export default function ServicesPage() {
  const { openQuoteModal } = useApp();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success) {
          setServices(data.data);
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
    'CCTV & Surveillance',
    'Tally Prime',
    'Hardware & Motherboard Lab',
    'Website & Software',
    'Antivirus & Security',
    'Networking & AMC',
  ];

  const filtered = services.filter((s) => {
    const matchesCat =
      selectedCategory === 'all' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesDiv =
      selectedDivision === 'all' || s.division === selectedDivision || s.division === 'both';
    const matchesSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesDiv && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{background:"rgba(123,27,90,0.10)",color:"#7B1B5A",borderColor:"rgba(123,27,90,0.20)"}}>
            <Layers className="w-4 h-4" />
            <span>Service &amp; Solution Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Comprehensive <span className="gradient-text">IT Services</span> for Suri &amp; Birbhum
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our end-to-end capabilities spanning surveillance automation, certified Tally accounting, chip-level logic board laboratory, custom software, and fiber networking.
          </p>
        </div>
      </section>

      {/* Appointment & Issue Registration Banner Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #1a0511 0%, #2a0820 50%, #0e0309 100%)',
            border: '1px solid rgba(233,165,26,0.30)',
          }}
        >
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(233,165,26,0.08)' }} />

          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider" style={{ background: 'rgba(233,165,26,0.15)', color: '#E9A51A', border: '1px solid rgba(233,165,26,0.30)' }}>
              <span>🚨 Need Urgent Lab Diagnostics or Onsite Support?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
              Book IT Service Appointment &amp; Register Your Issue Online
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Schedule a visit to our Suri Lab or request an onsite technician for laptop motherboard repair, CCTV camera fixes, or Tally cloud migration. Instant ticket &amp; WhatsApp confirmation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative z-10 shrink-0">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #E9A51A 0%, #f0c040 100%)',
                boxShadow: '0 8px 20px -4px rgba(233,165,26,0.40)',
              }}
            >
              <Wrench className="w-4 h-4" />
              <span>Book Appointment &amp; Register Issue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Division Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Division:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setSelectedDivision('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedDivision === 'all'
                      ? 'bg-white dark:bg-slate-700 text-[#7B1B5A] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedDivision('sales')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedDivision === 'sales'
                      ? 'bg-white dark:bg-slate-700 text-[#7B1B5A] dark:text-[#E9A51A] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Sales
                </button>
                <button
                  onClick={() => setSelectedDivision('service')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedDivision === 'service'
                      ? 'bg-white dark:bg-slate-700 text-[#c44a8a] dark:text-[#c44a8a] shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Service Lab
                </button>
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
                    ? 'bg-[#7B1B5A] text-white shadow-md shadow-[#7B1B5A]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Services' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">
            Loading services catalog...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-card rounded-2xl p-8">
            <Layers className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No services match your filters
            </h3>
            <p className="text-xs text-slate-500">
              Try searching with different keywords or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDivision('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#7B1B5A] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <div
                key={service.id}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800 group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    {service.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#7B1B5A] text-white text-[10px] font-bold">
                        {service.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 text-[#E9A51A] text-[10px] font-semibold border border-slate-700 backdrop-blur-sm">
                      {service.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                          service.division === 'sales'
                            ? 'bg-[#7B1B5A]/10 text-blue-500 border border-[#7B1B5A]/20'
                            : service.division === 'service'
                            ? 'bg-[#c44a8a]/10 text-[#c44a8a] border border-emerald-500/20'
                            : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                        }`}
                      >
                        {service.division === 'sales'
                          ? 'Comtech Info Services (Sales)'
                          : service.division === 'service'
                          ? 'Comtech Infosys (Lab)'
                          : 'Sales & Service'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white group-hover:text-[#7B1B5A] transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-1.5 pt-2">
                      {service.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c44a8a] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Estimated Pricing
                    </span>
                    <span className="text-xs font-bold text-[#7B1B5A]">
                      {service.price_starting || 'Quote on Call'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/book-appointment?service=${encodeURIComponent(service.title)}`}
                      className="px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-md transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
                      style={{background:"linear-gradient(135deg,#7B1B5A 0%,#c44a8a 100%)", boxShadow:"0 4px 12px -4px rgba(123,27,90,0.40)"}}
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

