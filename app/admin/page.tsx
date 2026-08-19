'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Wrench,
  ShoppingBag,
  BookOpen,
  Gift,
  Camera,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Plus,
} from 'lucide-react';
import { Enquiry, Service, Product, Blog, Promotion } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [resE, resS, resP, resB, resPr] = await Promise.all([
          fetch('/api/enquiries').then((r) => r.json()),
          fetch('/api/services').then((r) => r.json()),
          fetch('/api/products').then((r) => r.json()),
          fetch('/api/blogs').then((r) => r.json()),
          fetch('/api/promotions').then((r) => r.json()),
        ]);

        if (resE.success) setEnquiries(resE.data);
        if (resS.success) setServices(resS.data);
        if (resP.success) setProducts(resP.data);
        if (resB.success) setBlogs(resB.data);
        if (resPr.success) setPromotions(resPr.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const pendingCount = enquiries.filter((e) => e.status === 'pending').length;
  const urgentCount = enquiries.filter((e) => e.urgency === 'urgent' || e.urgency === 'critical').length;

  return (
    <div className="space-y-8">
      {/* Page Title & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Operations &amp; CRM Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time management for Comtech Information Services &amp; Comtech Infosys
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Inbox className="w-4 h-4" />
            <span>Open Leads CRM ({pendingCount} New)</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total CRM Leads</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">
            {enquiries.length}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold text-[10px]">
              {pendingCount} Pending
            </span>
            {urgentCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold text-[10px]">
                {urgentCount} High Urgency
              </span>
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Services Active</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">
            {services.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{services.filter((s) => s.is_active).length} Online on Public Site</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Hardware &amp; Products</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">
            {products.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>{products.filter((p) => p.in_stock).length} In Stock Ready</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Published Guides</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">
            {blogs.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>{promotions.filter((p) => p.is_active).length} Active Promotions</span>
          </div>
        </div>
      </div>

      {/* Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Leads */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <Inbox className="w-5 h-5 text-cyan-400" />
              <span>Recent Customer Enquiries</span>
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Manage all leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 5).map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {enq.ticket_number}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                        enq.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300'
                          : enq.status === 'quoted'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {enq.status}
                    </span>
                    {enq.urgency === 'critical' && (
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                        Critical
                      </span>
                    )}
                  </div>

                  <div className="font-bold text-sm text-white">{enq.name}</div>
                  <p className="text-xs text-slate-400 line-clamp-1">{enq.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.name}, replying to your Comtech Ticket ${enq.ticket_number}.`
                    )}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    href="/admin/enquiries"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Quick Shortcut Center */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-heading text-white">
            Quick Actions
          </h2>

          <div className="space-y-2.5">
            <Link
              href="/admin/services"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Manage Services</h4>
                  <p className="text-[11px] text-slate-400">Add or edit service pricing &amp; specs</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Products Catalog</h4>
                  <p className="text-[11px] text-slate-400">Update hardware stock &amp; discount rates</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Publish Article</h4>
                  <p className="text-[11px] text-slate-400">Write tech guides &amp; SEO content</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/promotions"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Create Promo Campaign</h4>
                  <p className="text-[11px] text-slate-400">Launch festive discounts &amp; coupon codes</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
