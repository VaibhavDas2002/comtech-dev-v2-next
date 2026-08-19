'use client';

import React, { useState, useEffect } from 'react';
import { Service } from '@/lib/types';
import {
  Wrench,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Service['category']>('CCTV & Surveillance');
  const [division, setDivision] = useState<Service['division']>('both');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [priceStarting, setPriceStarting] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuresStr, setFeaturesStr] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) setServices(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingService(null);
    setTitle('');
    setCategory('CCTV & Surveillance');
    setDivision('both');
    setShortDesc('');
    setDescription('');
    setPriceStarting('');
    setImageUrl('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
    setBadge('');
    setIsActive(true);
    setIsFeatured(false);
    setFeaturesStr('Free onsite survey\n1-Year warranty\nAuthorized brand parts');
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setCategory(s.category);
    setDivision(s.division);
    setShortDesc(s.short_description);
    setDescription(s.description);
    setPriceStarting(s.price_starting || '');
    setImageUrl(s.image_url);
    setBadge(s.badge || '');
    setIsActive(s.is_active);
    setIsFeatured(s.is_featured);
    setFeaturesStr(s.features.join('\n'));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresStr
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload: Partial<Service> = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      title,
      category,
      division,
      short_description: shortDesc,
      description,
      price_starting: priceStarting,
      image_url: imageUrl,
      badge,
      is_active: isActive,
      is_featured: isFeatured,
      features,
    };

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        loadServices();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-cyan-400" />
            <span>Services Catalog Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, update service specs, starting pricing, features and division tags
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Service Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Division</th>
                <th className="p-4">Pricing Starts</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/30">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={s.image_url}
                      alt={s.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{s.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {s.short_description}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] font-semibold">
                      {s.category}
                    </span>
                  </td>
                  <td className="p-4 capitalize text-[11px] text-slate-300">{s.division}</td>
                  <td className="p-4 font-bold text-white text-xs">{s.price_starting || 'Call'}</td>
                  <td className="p-4">
                    {s.is_active ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px]">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Service['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  >
                    <option value="CCTV & Surveillance">CCTV &amp; Surveillance</option>
                    <option value="Tally Prime">Tally Prime</option>
                    <option value="Hardware & Motherboard Lab">Hardware &amp; Motherboard Lab</option>
                    <option value="Website & Software">Website &amp; Software</option>
                    <option value="Antivirus & Security">Antivirus &amp; Security</option>
                    <option value="Networking & AMC">Networking &amp; AMC</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Division
                  </label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as Service['division'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  >
                    <option value="both">Both (Sales &amp; Service)</option>
                    <option value="sales">Sales (Comtech Info Services)</option>
                    <option value="service">Service (Comtech Infosys)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Starting Price Text
                  </label>
                  <input
                    type="text"
                    value={priceStarting}
                    onChange={(e) => setPriceStarting(e.target.value)}
                    placeholder="₹ 8,999 or Quote on call"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Most Popular, 3-Star Partner"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <MediaUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Service Featured Image / Brochure"
                description="Upload JPEG/PNG/PDF (Max 6MB Base64) or enter an external Web Image URL"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Features / Bullets (One per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresStr}
                  onChange={(e) => setFeaturesStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-cyan-500"
                  />
                  <span>Active on Public Website</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-cyan-500"
                  />
                  <span>Featured on Home Page</span>
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
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
