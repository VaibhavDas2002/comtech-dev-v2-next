'use client';

import React, { useState, useEffect } from 'react';
import {
  Database,
  MapPin,
  Tag,
  Building,
  Phone,
  Clock,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Globe,
  Sliders,
  Layers,
  Award,
} from 'lucide-react';
import { MasterLocation, MasterBrand, SiteSettings } from '@/lib/types';
import { initialMasterLocations, initialMasterBrands, siteSettings as defaultSettings } from '@/lib/store/seedData';

export default function MasterManagementPage() {
  const [activeTab, setActiveTab] = useState<'locations' | 'brands' | 'site_settings' | 'db_cleanup'>('locations');
  
  // Locations State
  const [locations, setLocations] = useState<MasterLocation[]>(initialMasterLocations);
  const [newLocation, setNewLocation] = useState({
    city_or_area: '',
    pincode: '',
    district: 'Birbhum',
    is_onsite_supported: true,
    estimated_eta: 'Within 2 - 3 Hours',
  });

  // Brands State
  const [brands, setBrands] = useState<MasterBrand[]>(initialMasterBrands);
  const [newBrand, setNewBrand] = useState({
    name: '',
    category: 'Hardware & Accessories',
    is_authorized_partner: true,
  });

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [savingSettings, setSavingSettings] = useState(false);

  // Status & Notifications
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPurging, setIsPurging] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const resSettings = await fetch('/api/settings');
      const settingsData = await resSettings.json();
      if (settingsData.success && settingsData.data) {
        setSettings(settingsData.data);
      }

      // Default locations and brands from memory
      setLocations([
        { id: 'loc-1', city_or_area: 'Suri Town & DangalPara', pincode: '731101', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Within 1 - 2 Hours' },
        { id: 'loc-2', city_or_area: 'Sainthia', pincode: '731234', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Same Day / Within 4 Hours' },
        { id: 'loc-3', city_or_area: 'Bolpur & Santiniketan', pincode: '731204', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Same Day / Scheduled Slot' },
        { id: 'loc-4', city_or_area: 'Rampurhat', pincode: '731224', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Next Business Day' },
        { id: 'loc-5', city_or_area: 'Dubrajpur', pincode: '731123', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Within 3 - 4 Hours' },
        { id: 'loc-6', city_or_area: 'Ilambazar', pincode: '731214', district: 'Birbhum', is_onsite_supported: true, estimated_eta: 'Same Day Dispatch' },
      ]);

      setBrands([
        { id: 'br-1', name: 'Hikvision', category: 'CCTV & Surveillance', is_authorized_partner: true },
        { id: 'br-2', name: 'CP Plus', category: 'CCTV & Surveillance', is_authorized_partner: true },
        { id: 'br-3', name: 'Tally Solutions', category: 'ERP Software & TDL', is_authorized_partner: true },
        { id: 'br-4', name: 'Dell Technologies', category: 'Laptops & Desktops', is_authorized_partner: true },
        { id: 'br-5', name: 'HP Enterprise', category: 'Laptops & Printers', is_authorized_partner: true },
        { id: 'br-6', name: 'Lenovo', category: 'Laptops & ThinkPads', is_authorized_partner: true },
        { id: 'br-7', name: 'Quick Heal / Seqrite', category: 'Cybersecurity & Antivirus', is_authorized_partner: true },
        { id: 'br-8', name: 'D-Link', category: 'Structured Networking', is_authorized_partner: true },
        { id: 'br-9', name: 'Epson', category: 'EcoTank Printers', is_authorized_partner: true },
      ]);
    } catch (err) {
      console.error('Error fetching master data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.city_or_area.trim() || !newLocation.pincode.trim()) {
      alert('Area Name and PIN Code are required.');
      return;
    }
    const created: MasterLocation = {
      id: `loc-${Date.now()}`,
      ...newLocation,
    };
    setLocations([created, ...locations]);
    setNewLocation({
      city_or_area: '',
      pincode: '',
      district: 'Birbhum',
      is_onsite_supported: true,
      estimated_eta: 'Within 2 - 3 Hours',
    });
    showToast('Service location added to master database');
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
    showToast('Location removed from master catalog');
  };

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name.trim()) {
      alert('Brand Name is required.');
      return;
    }
    const created: MasterBrand = {
      id: `br-${Date.now()}`,
      ...newBrand,
    };
    setBrands([created, ...brands]);
    setNewBrand({
      name: '',
      category: 'Hardware & Accessories',
      is_authorized_partner: true,
    });
    showToast('Brand added to master partner list');
  };

  const handleDeleteBrand = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id));
    showToast('Brand removed');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      setSavingSettings(true);
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Site master configurations updated successfully');
      }
    } catch {
      alert('Error updating settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handlePurgeEnquiries = async () => {
    if (!confirm('CONFIRM PURGE: Are you sure you want to delete/reset all public appointments and enquiries from the database? This cannot be undone.')) {
      return;
    }

    try {
      setIsPurging(true);
      const res = await fetch('/api/enquiries/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast('Database reset complete: All appointments and enquiries deleted.');
      } else {
        alert(data.error || 'Failed to purge database');
      }
    } catch {
      alert('Error during purge operation');
    } finally {
      setIsPurging(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 border" style={{ background: 'rgba(123,27,90,0.15)', color: '#E9A51A', borderColor: 'rgba(233,165,26,0.30)' }}>
            <Database className="w-3.5 h-3.5" />
            <span>Core System Masters</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Master Data Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure system lookups, service territory PIN codes, authorized brands, and database maintenance.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { key: 'locations', label: 'Service Locations & PINs', icon: MapPin },
          { key: 'brands', label: 'Authorized Brands & OEM', icon: Award },
          { key: 'site_settings', label: 'Company & Contact Master', icon: Building },
          { key: 'db_cleanup', label: 'Database Maintenance / Purge', icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? 'border-transparent text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
              style={isActive ? { background: '#7B1B5A' } : {}}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Locations & Pincodes Master */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          {/* Add Location Form */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#E9A51A]" />
              <span>Add New Service Territory / PIN Code</span>
            </h3>
            <form onSubmit={handleAddLocation} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">City / Area Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bolpur Santiniketan"
                  value={newLocation.city_or_area}
                  onChange={(e) => setNewLocation({ ...newLocation, city_or_area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Postal PIN Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 731204"
                  value={newLocation.pincode}
                  onChange={(e) => setNewLocation({ ...newLocation, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Estimated Technician ETA</label>
                <input
                  type="text"
                  placeholder="e.g. Within 2 Hours"
                  value={newLocation.estimated_eta}
                  onChange={(e) => setNewLocation({ ...newLocation, estimated_eta: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:opacity-95 flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Location</span>
                </button>
              </div>
            </form>
          </div>

          {/* Locations Table */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Configured Service Areas ({locations.length})
              </span>
              <span className="text-[11px] text-slate-400">Doorstep Engineer Coverage in Birbhum</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Area / City</th>
                    <th className="p-4">PIN Code</th>
                    <th className="p-4">District</th>
                    <th className="p-4">Onsite Dispatch</th>
                    <th className="p-4">Estimated ETA</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {locations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E9A51A]" />
                        <span>{loc.city_or_area}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-[#c44a8a]">{loc.pincode}</td>
                      <td className="p-4 text-slate-300">{loc.district}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          SUPPORTED
                        </span>
                      </td>
                      <td className="p-4 text-slate-300 font-mono text-[11px]">{loc.estimated_eta}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteLocation(loc.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Authorized Brands Master */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#E9A51A]" />
              <span>Register Hardware / Software OEM Brand</span>
            </h3>
            <form onSubmit={handleAddBrand} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cisco Meraki"
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Product Category</label>
                <input
                  type="text"
                  placeholder="e.g. Networking / Switches"
                  value={newBrand.category}
                  onChange={(e) => setNewBrand({ ...newBrand, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all cursor-pointer hover:opacity-95 flex items-center justify-center gap-1.5"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Brand</span>
                </button>
              </div>
            </form>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{brand.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-[#E9A51A] font-bold">
                      OFFICIAL
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{brand.category}</span>
                </div>
                <button
                  onClick={() => handleDeleteBrand(brand.id)}
                  className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Company & Contact Settings Master */}
      {activeTab === 'site_settings' && settings && (
        <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Comtech Corporate Contact Master</h3>
              <p className="text-xs text-slate-400">Live contact numbers and physical addresses used across public website.</p>
            </div>
            <button
              type="submit"
              disabled={savingSettings}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? 'Saving...' : 'Save Master Settings'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name (Sales Division)</label>
              <input
                type="text"
                value={settings.company_sales_name}
                onChange={(e) => setSettings({ ...settings, company_sales_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name (Service Division)</label>
              <input
                type="text"
                value={settings.company_service_name}
                onChange={(e) => setSettings({ ...settings, company_service_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sales Mobile Phone Number</label>
              <input
                type="text"
                value={settings.phone_sales}
                onChange={(e) => setSettings({ ...settings, phone_sales: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Service &amp; Lab Mobile Phone Number</label>
              <input
                type="text"
                value={settings.phone_service}
                onChange={(e) => setSettings({ ...settings, phone_service: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A] font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Office Address Line (Suri, Birbhum)</label>
              <input
                type="text"
                value={settings.address_line1}
                onChange={(e) => setSettings({ ...settings, address_line1: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: Database Maintenance & Purge */}
      {activeTab === 'db_cleanup' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Purge Public Appointments &amp; CRM Enquiries
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Permanently deletes all appointments, quote requests, and test submissions from the database. 
                Use this to reset your CRM queue before production launch.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <span>⚠️ Warning:</span>
              <span>This operation will immediately delete all records from `enquiries` database.</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Services, products, blog posts, and user accounts will remain untouched.
            </p>
          </div>

          <button
            onClick={handlePurgeEnquiries}
            disabled={isPurging}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isPurging ? 'Purging Database...' : 'Permanently Delete All Enquiries & Appointments'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
