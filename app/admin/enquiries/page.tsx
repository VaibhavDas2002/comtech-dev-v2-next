'use client';

import React, { useState, useEffect } from 'react';
import { Enquiry, EnquiryStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  Inbox,
  Search,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  X,
  AlertCircle,
  ExternalLink,
  Download,
  CheckSquare,
  Square,
  SlidersHorizontal,
  FileSpreadsheet,
  Check,
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkProcessing, setBulkProcessing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Edit single modal state
  const [activeEditEnquiry, setActiveEditEnquiry] = useState<Enquiry | null>(null);
  const [editStatus, setEditStatus] = useState<EnquiryStatus>('pending');
  const [editNotes, setEditNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  async function loadEnquiries() {
    try {
      const res = await fetch('/api/enquiries');
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = enquiries.filter((e) => {
    const matchesStatus = selectedStatus === 'all' || e.status === selectedStatus;
    const matchesSearch =
      !searchQuery ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.ticket_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.device_brand_model && e.device_brand_model.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Toggle single selection
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all filtered
  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length && filtered.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((e) => e.id));
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      !confirm(
        `CONFIRM BULK DELETE: Are you sure you want to permanently delete ${selectedIds.length} selected enquiry ticket(s)?`
      )
    ) {
      return;
    }

    try {
      setBulkProcessing(true);
      const res = await fetch(`/api/enquiries?ids=${selectedIds.join(',')}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast(`${selectedIds.length} enquiries deleted successfully`);
        setSelectedIds([]);
        loadEnquiries();
      } else {
        alert(data.error || 'Failed to delete enquiries');
      }
    } catch {
      alert('Error during bulk deletion');
    } finally {
      setBulkProcessing(false);
    }
  };

  // Bulk Status Update
  const handleBulkStatusChange = async (newStatus: EnquiryStatus) => {
    if (selectedIds.length === 0) return;

    try {
      setBulkProcessing(true);
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: selectedIds,
          status: newStatus,
          admin_notes: `[Bulk Update] Status set to ${newStatus} on ${new Date().toLocaleDateString()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Updated status to "${newStatus}" for ${selectedIds.length} items`);
        setSelectedIds([]);
        loadEnquiries();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch {
      alert('Error updating bulk status');
    } finally {
      setBulkProcessing(false);
    }
  };

  // Export Selected to CSV
  const handleExportCSV = () => {
    const itemsToExport =
      selectedIds.length > 0
        ? enquiries.filter((e) => selectedIds.includes(e.id))
        : enquiries;

    if (itemsToExport.length === 0) {
      alert('No enquiries to export.');
      return;
    }

    const headers = [
      'Ticket Number',
      'Date',
      'Name',
      'Phone',
      'Email',
      'Type',
      'Service/Product',
      'Urgency',
      'Status',
      'Appointment Date',
      'Time Slot',
      'Service Mode',
      'Device Model',
      'Address',
      'Message',
      'Admin Notes',
    ];

    const rows = itemsToExport.map((e) => [
      `"${e.ticket_number || ''}"`,
      `"${e.created_at || ''}"`,
      `"${e.name || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${e.type || ''}"`,
      `"${e.service_or_product_name || ''}"`,
      `"${e.urgency || ''}"`,
      `"${e.status || ''}"`,
      `"${e.appointment_date || ''}"`,
      `"${e.appointment_time_slot || ''}"`,
      `"${e.service_mode || ''}"`,
      `"${e.device_brand_model || ''}"`,
      `"${(e.address || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.admin_notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `comtech_enquiries_export_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${itemsToExport.length} enquiries to CSV`);
  };

  const openEditModal = (enq: Enquiry) => {
    setActiveEditEnquiry(enq);
    setEditStatus(enq.status);
    setEditNotes(enq.admin_notes || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditEnquiry) return;
    setSaving(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activeEditEnquiry.id,
          status: editStatus,
          admin_notes: editNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === activeEditEnquiry.id ? data.data : item))
        );
        setActiveEditEnquiry(null);
        showToast('Enquiry updated successfully');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSingle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry ticket?')) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        showToast('Enquiry deleted');
      }
    } catch {
      alert('Error deleting enquiry');
    }
  };

  const statuses = ['all', 'pending', 'contacted', 'quoted', 'in_progress', 'resolved', 'cancelled'];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-[#E9A51A]" />
            <span>Leads &amp; Enquiries CRM</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer service appointments, quote requests, ticket numbers, and technician follow-up notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E9A51A]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={async () => {
              if (
                confirm(
                  'CONFIRM PURGE: Delete all public enquiry and appointment records from database?'
                )
              ) {
                await fetch('/api/enquiries/reset', { method: 'POST' });
                setSelectedIds([]);
                loadEnquiries();
                showToast('All enquiries purged');
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge All</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ticket, name, phone, device model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-[#7B1B5A] text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Action Sticky Bar (appears when 1 or more items selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Bulk Operational Actions:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Bulk Status Select */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 font-semibold">Set Status:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) handleBulkStatusChange(e.target.value as EnquiryStatus);
                }}
                defaultValue=""
                disabled={bulkProcessing}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#E9A51A]"
              >
                <option value="" disabled>Choose status...</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Export Selected to CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#E9A51A]" />
              <span>Export Selected</span>
            </button>

            {/* Bulk Delete */}
            <button
              onClick={handleBulkDelete}
              disabled={bulkProcessing}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{bulkProcessing ? 'Processing...' : 'Bulk Delete'}</span>
            </button>

            {/* Deselect All */}
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

      {/* Leads Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No leads or appointments in database.
          </div>
        ) : (
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
                      {selectedIds.length === filtered.length && filtered.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">Ticket &amp; Date</th>
                  <th className="p-4">Customer Contact</th>
                  <th className="p-4">Category &amp; Item</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Urgency</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filtered.map((enq) => {
                  const isSelected = selectedIds.includes(enq.id);
                  return (
                    <tr
                      key={enq.id}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-[#2b0820]/60'
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleSelectOne(enq.id)}
                          className="cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                          )}
                        </button>
                      </td>

                      <td className="p-4">
                        <span className="font-mono font-extrabold text-[#E9A51A] block">
                          {enq.ticket_number}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {formatDate(enq.created_at)}
                        </span>
                        {enq.type === 'service_appointment' && (
                          <span
                            className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                            style={{
                              background: 'rgba(123,27,90,0.25)',
                              color: '#E9A51A',
                              border: '1px solid rgba(233,165,26,0.30)',
                            }}
                          >
                            📅 APPOINTMENT
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-white">{enq.name}</div>
                        <div className="text-slate-300 font-mono text-[11px]">{enq.phone}</div>
                        {enq.address && (
                          <div className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">
                            📍 {enq.address}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 uppercase block w-fit">
                          {enq.type}
                        </span>
                        {enq.service_or_product_name && (
                          <span className="text-[11px] text-[#E9A51A] line-clamp-1 mt-1 block font-semibold">
                            {enq.service_or_product_name}
                          </span>
                        )}
                        {enq.appointment_date && (
                          <div className="text-[10px] text-slate-400 mt-1">
                            🗓 {enq.appointment_date} ({enq.appointment_time_slot || 'Anytime'})
                          </div>
                        )}
                        {enq.service_mode && (
                          <div className="text-[10px] font-medium text-purple-300">
                            Mode: {enq.service_mode === 'lab_visit' ? '🏢 Lab Visit' : enq.service_mode === 'onsite_visit' ? '🚗 Onsite' : '💻 Remote'}
                          </div>
                        )}
                      </td>

                      <td className="p-4 max-w-xs">
                        {enq.device_brand_model && (
                          <div className="text-[11px] font-bold text-slate-200 mb-0.5">
                            🔧 {enq.device_brand_model}
                          </div>
                        )}
                        <p className="line-clamp-2 text-slate-400 text-[11px] leading-relaxed">
                          {enq.message}
                        </p>
                        {enq.admin_notes && (
                          <div className="mt-1.5 p-1.5 rounded bg-slate-800/90 border border-slate-700 text-[10px] text-amber-300">
                            <span className="font-bold">Staff Note: </span>
                            {enq.admin_notes}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                            enq.urgency === 'critical'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : enq.urgency === 'urgent'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {enq.urgency}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                            enq.status === 'resolved'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : enq.status === 'in_progress'
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : enq.status === 'quoted'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : enq.status === 'contacted'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : enq.status === 'cancelled'
                              ? 'bg-slate-800 text-slate-500 border border-slate-700'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </td>

                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <a
                          href={`tel:${enq.phone}`}
                          className="inline-flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openEditModal(enq)}
                          className="inline-flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-[#E9A51A] transition-colors cursor-pointer"
                          title="Update Status / Notes"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle(enq.id)}
                          className="inline-flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Ticket"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Single Status Modal */}
      {activeEditEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Update Enquiry Ticket</span>
                  <span className="text-[#E9A51A] font-mono text-sm">
                    {activeEditEnquiry.ticket_number}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {activeEditEnquiry.name} &bull; +91 {activeEditEnquiry.phone}
                </p>
              </div>
              <button
                onClick={() => setActiveEditEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Enquiry Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Internal Staff Notes &amp; Follow-up Details
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Quoted ₹18,000 + GST. Customer visiting Suri showroom tomorrow."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveEditEnquiry(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
                >
                  {saving ? 'Updating...' : 'Save Ticket Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
