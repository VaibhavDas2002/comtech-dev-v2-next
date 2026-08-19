'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/types';
import {
  Camera,
  Plus,
  Trash2,
  MapPin,
  X,
  CheckSquare,
  Square,
  CheckCircle2,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('CCTV Installation');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Suri, Birbhum');

  useEffect(() => {
    loadGallery();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  async function loadGallery() {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) setGallery(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === gallery.length && gallery.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(gallery.map((g) => g.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`CONFIRM: Delete ${selectedIds.length} gallery photo(s)?`)) return;

    setGallery((prev) => prev.filter((g) => !selectedIds.includes(g.id)));
    showToast(`${selectedIds.length} photos deleted`);
    setSelectedIds([]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<GalleryItem> = {
      id: `gal-${Date.now()}`,
      title,
      category,
      image_url: imageUrl,
      description,
      location,
      is_featured: true,
    };

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        loadGallery();
        setModalOpen(false);
        setTitle('');
        setImageUrl('');
        setDescription('');
        showToast('Photo added to gallery');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete gallery item?')) return;
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Photo removed');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#E9A51A]" />
            <span>Gallery Media Showcase</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload actual laboratory and installation project photos
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95"
          style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Bulk Action Sticky Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Photos Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Gallery Bulk Actions:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl bg-slate-900 border space-y-3 flex flex-col justify-between transition-all shadow-xl ${
                isSelected ? 'border-[#E9A51A] bg-[#22071a]' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-800">
                  <button
                    onClick={() => toggleSelectOne(item.id)}
                    className="absolute top-2 right-2 z-10 p-1 rounded-lg bg-black/60 hover:bg-black/90 cursor-pointer"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 hover:text-white" />
                    )}
                  </button>

                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-[#E9A51A]">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mt-2 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#E9A51A]" />
                  {item.location}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-white">Add Showcase Photo</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 16-CH CCTV Deployment"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                >
                  <option value="CCTV Installation">CCTV Installation</option>
                  <option value="Motherboard Repair Lab">Motherboard Repair Lab</option>
                  <option value="Server & Networking">Server &amp; Networking</option>
                  <option value="Showroom & Retail">Showroom &amp; Retail</option>
                  <option value="Client Deployments">Client Deployments</option>
                </select>
              </div>

              <div>
                <MediaUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  label="Showcase Photo (Base64 Database or URL)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location Tag</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold text-xs shadow-lg cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
