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
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeEditEnquiry, setActiveEditEnquiry] = useState<Enquiry | null>(null);
  const [editStatus, setEditStatus] = useState<EnquiryStatus>('pending');
  const [editNotes, setEditNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

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
      e.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry ticket?')) return;
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const statuses = ['all', 'pending', 'contacted', 'quoted', 'in_progress', 'resolved', 'cancelled'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <Inbox className="w-6 h-6 text-[#E9A51A]" />
            <span>Leads &amp; Enquiries CRM</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer service appointments, quote requests, ticket numbers, and technician follow-up notes
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={async () => {
              if (confirm('CONFIRM PURGE: Delete all public enquiry and appointment records from database?')) {
                await fetch('/api/enquiries/reset', { method: 'POST' });
                loadEnquiries();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge / Reset CRM</span>
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
              placeholder="Search by ticket, name, phone, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                  selectedStatus === st
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No leads match your filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
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
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <span className="font-mono font-extrabold text-[#E9A51A] block">
                        {enq.ticket_number}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        {formatDate(enq.created_at)}
                      </span>
                      {enq.type === 'service_appointment' && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" style={{ background: 'rgba(123,27,90,0.25)', color: '#E9A51A', border: '1px solid rgba(233,165,26,0.30)' }}>
                          📅 Appointment
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
                      <p className="line-clamp-2 text-slate-400 text-[11px] leading-relaxed">{enq.message}</p>
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
                        className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full ${
                          enq.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : enq.status === 'contacted'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : enq.status === 'quoted'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : enq.status === 'in_progress'
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : enq.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${enq.name}, Comtech Infosys Suri regarding your ticket ${enq.ticket_number}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                          title="Open WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openEditModal(enq)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#E9A51A]"
                          title="Update Status / Note"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
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
        )}
      </div>

      {/* Edit Status Modal */}
      {activeEditEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-white">
                Update Ticket: {activeEditEnquiry.ticket_number}
              </h3>
              <button
                onClick={() => setActiveEditEnquiry(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  CRM Workflow Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as EnquiryStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 capitalize"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted Customer</option>
                  <option value="quoted">Quotation Sent</option>
                  <option value="in_progress">In Progress / Under Repair</option>
                  <option value="resolved">Resolved / Closed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Internal Staff Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Quoted ₹12,000 for 4 ColorVu cams, customer agreed, scheduled tomorrow..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveEditEnquiry(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  {saving ? 'Saving...' : 'Update Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
