'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/types';
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success) {
          setGallery(data.data);
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
    'CCTV Installation',
    'Motherboard Repair Lab',
    'Server & Networking',
    'Showroom & Retail',
    'Client Deployments',
  ];

  const filtered = gallery.filter(
    (g) => selectedCategory === 'all' || g.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filtered.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest border border-cyan-500/20">
            <Camera className="w-4 h-4" />
            <span>Actual Project Photos &amp; Lab Showcases</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Project <span className="gradient-text">Visual Gallery</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Take a visual tour inside our Suri chip-level diagnostic laboratory, live enterprise CCTV deployments, server rack cabling, and retail showroom.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Photos' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400">Loading gallery...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-400">No photos in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 relative aspect-video"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 text-cyan-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-slate-700">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-lg bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-heading line-clamp-1">{item.title}</h3>
                    {item.location && (
                      <div className="flex items-center gap-1 text-[11px] text-cyan-300 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 text-white hover:text-cyan-400 rounded-full bg-slate-900/80 border border-slate-700 z-10 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 p-3 text-white hover:text-cyan-400 rounded-full bg-slate-900/80 border border-slate-700 z-10 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 p-3 text-white hover:text-cyan-400 rounded-full bg-slate-900/80 border border-slate-700 z-10 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[65vh]">
              <img
                src={filtered[activeLightboxIndex].image_url}
                alt={filtered[activeLightboxIndex].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {filtered[activeLightboxIndex].category}
                </span>
                {filtered[activeLightboxIndex].location && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {filtered[activeLightboxIndex].location}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold font-heading">
                {filtered[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300">
                {filtered[activeLightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
