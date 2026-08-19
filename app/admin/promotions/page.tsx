'use client';

import React, { useState, useEffect } from 'react';
import { Promotion } from '@/lib/types';
import { Gift, Plus, Edit, Trash2, Tag, Clock, X } from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('Festive Deal');
  const [discountText, setDiscountText] = useState('Save 20%');
  const [description, setDescription] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [ctaText, setCtaText] = useState('Claim Offer');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    loadPromotions();
  }, []);

  async function loadPromotions() {
    try {
      const res = await fetch('/api/promotions');
      const data = await res.json();
      if (data.success) setPromotions(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingPromo(null);
    setTitle('');
    setSubtitle('');
    setBadge('Special Offer');
    setDiscountText('Flat 15% OFF');
    setDescription('');
    setCouponCode('SURISPECIAL');
    setValidUntil('2026-12-31');
    setCtaText('Claim Offer');
    setImageUrl('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (p: Promotion) => {
    setEditingPromo(p);
    setTitle(p.title);
    setSubtitle(p.subtitle || '');
    setBadge(p.badge);
    setDiscountText(p.discount_text);
    setDescription(p.description);
    setCouponCode(p.coupon_code || '');
    setValidUntil(p.valid_until || '');
    setCtaText(p.cta_text);
    setImageUrl(p.image_url);
    setIsActive(p.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<Promotion> = {
      id: editingPromo ? editingPromo.id : `promo-${Date.now()}`,
      title,
      subtitle,
      badge,
      discount_text: discountText,
      description,
      coupon_code: couponCode,
      valid_until: validUntil,
      cta_text: ctaText,
      image_url: imageUrl,
      is_active: isActive,
    };

    try {
      const res = await fetch('/api/promotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        loadPromotions();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete promotion campaign?')) return;
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Gift className="w-6 h-6 text-amber-400" />
            <span>Promotions &amp; Campaign Deals</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage banner campaigns, discount codes, coupon offers, and validity dates
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Promotion</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase">
                  {p.badge}
                </span>
                {p.coupon_code && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                    {p.coupon_code}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-white line-clamp-1">{p.title}</h3>
              <p className="text-xs text-cyan-400 font-semibold">{p.discount_text}</p>
              <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                {p.valid_until ? `Valid till ${p.valid_until}` : 'Ongoing'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-white">
                {editingPromo ? 'Edit Promotion' : 'New Promotion'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Promotion Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Festive Special"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Discount Highlight
                  </label>
                  <input
                    type="text"
                    value={discountText}
                    onChange={(e) => setDiscountText(e.target.value)}
                    placeholder="Save 25% On Full Installation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="SURICCTV25"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Valid Until Date
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <MediaUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Promotion Banner / Flyer (Image or PDF)"
                description="Upload JPEG/PNG/PDF (Max 6MB Base64) or enter an external Web Image URL"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span>Active Campaign</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
