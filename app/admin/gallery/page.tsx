'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/types';
import { Camera, Plus, Trash2, MapPin, X } from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('CCTV Installation');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Suri, Birbhum');

  useEffect(() => {
    loadGallery();
  }, []);

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete gallery item?')) return;
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Camera className="w-6 h-6 text-cyan-400" />
            <span>Gallery Media Showcase</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload actual laboratory and installation project photos
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-800">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-cyan-300">
                  {item.category}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white mt-2 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{item.description}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {item.location}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
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

              <MediaUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Showcase Photo (Image or PDF)"
                description="Upload JPEG/PNG/PDF (Max 6MB Base64) or enter an external Web Image URL"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Suri, Birbhum"
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

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
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
