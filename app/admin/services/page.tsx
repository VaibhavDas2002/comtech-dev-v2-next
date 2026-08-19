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
  CheckSquare,
  Square,
  Star,
  Layers,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

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

  // Toggle selection
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === services.length && services.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(services.map((s) => s.id));
    }
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`CONFIRM: Delete ${selectedIds.length} selected service(s)?`)) return;

    setServices((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    showToast(`${selectedIds.length} services deleted`);
    setSelectedIds([]);
  };

  const handleBulkStatusToggle = (status: boolean) => {
    if (selectedIds.length === 0) return;
    setServices((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, is_active: status } : s))
    );
    showToast(`Marked ${selectedIds.length} services as ${status ? 'Active' : 'Inactive'}`);
    setSelectedIds([]);
  };

  const handleBulkFeaturedToggle = (status: boolean) => {
    if (selectedIds.length === 0) return;
    setServices((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, is_featured: status } : s))
    );
    showToast(`Updated featured status for ${selectedIds.length} services`);
    setSelectedIds([]);
  };

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
        showToast('Service saved successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service deleted');
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
            <Wrench className="w-6 h-6 text-[#E9A51A]" />
            <span>Services Catalog Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, update service specs, starting pricing, features and division tags
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95"
          style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Bulk Action Sticky Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Services Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Catalog Bulk Actions:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkStatusToggle(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Active</span>
            </button>

            <button
              onClick={() => handleBulkStatusToggle(false)}
              className="px-3 py-1.5 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Mark Inactive</span>
            </button>

            <button
              onClick={() => handleBulkFeaturedToggle(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#E9A51A]" />
              <span>Feature on Home</span>
            </button>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
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

      {/* Services Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-white"
                    title="Select / Deselect All"
                  >
                    {selectedIds.length === services.length && services.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Service Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Division</th>
                <th className="p-4">Pricing Starts</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((s) => {
                const isSelected = selectedIds.includes(s.id);
                return (
                  <tr
                    key={s.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#2b0820]/60' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleSelectOne(s.id)}
                        className="cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                        )}
                      </button>
                    </td>

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
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[#E9A51A] text-[10px] font-semibold">
                        {s.category}
                      </span>
                    </td>

                    <td className="p-4 capitalize text-[11px] text-slate-300">{s.division}</td>
                    
                    <td className="p-4 font-bold text-white text-xs">{s.price_starting || 'Call'}</td>
                    
                    <td className="p-4">
                      {s.is_active ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px] border border-slate-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingService ? 'Edit Service Offering' : 'Add New Service Catalog Item'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Service['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="CCTV & Surveillance">CCTV & Surveillance</option>
                    <option value="Laptop & Desktop Repair">Laptop & Desktop Repair</option>
                    <option value="Tally & Software Solutions">Tally & Software Solutions</option>
                    <option value="Structured Networking">Structured Networking</option>
                    <option value="Printer & Hardware Services">Printer & Hardware Services</option>
                    <option value="Data Recovery & Security">Data Recovery & Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Division</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value as Service['division'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="both">Both Divisions</option>
                    <option value="sales">Sales (Comtech Information Services)</option>
                    <option value="service">Service (Comtech Infosys)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (₹ / Text)</label>
                  <input
                    type="text"
                    value={priceStarting}
                    onChange={(e) => setPriceStarting(e.target.value)}
                    placeholder="e.g. ₹350 onwards"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Badge (Optional)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Popular, Authorized Lab"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <MediaUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  label="Service Image (Base64 Database or URL)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500"
                  />
                  <span>Service is Active</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
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
