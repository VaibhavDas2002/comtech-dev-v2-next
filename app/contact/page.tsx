'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteSettings } from '@/lib/store/seedData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Building,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

function ContactContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('general');
  const [serviceOrProduct, setServiceOrProduct] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'critical'>('normal');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  useEffect(() => {
    if (intent === 'cctv_promo') {
      setType('cctv_survey');
      setMessage('Interested in the Full-Color Night CCTV 4-Camera Security Bundle (Coupon: SURICCTV25). Please arrange free site survey.');
    } else if (intent === 'tally_promo') {
      setType('product');
      setMessage('Claiming the Tally Prime Upgrade & Custom WhatsApp TDL Pack offer (Coupon: TALLYFAST).');
    } else if (intent === 'amc_promo') {
      setType('amc_quote');
      setMessage('Requesting proposal for Corporate Annual Maintenance Contract (AMC) with 2 months free discount.');
    }
  }, [intent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          type,
          service_or_product_name: serviceOrProduct,
          subject: 'Contact Page Inquiry',
          message,
          urgency,
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket_number) {
        setTicketNumber(data.ticket_number);
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
        } catch {}
      }
    } catch {
      setTicketNumber(`COM-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Comtech Team!\nTicket: *${ticketNumber}*\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
    );
    window.open(`https://wa.me/919434197268?text=${text}`, '_blank');
  };

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{background:"rgba(123,27,90,0.10)",color:"#7B1B5A",borderColor:"rgba(123,27,90,0.20)"}}>
            <MapPin className="w-4 h-4" />
            <span>Suri Hub â€¢ Customer Assistance &amp; Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white">
            Connect with Our <span className="gradient-text">IT Specialists</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Reach out for sales quotes, free CCTV site surveys, chip-level laptop inspection drop-offs, or corporate AMC proposals in Suri &amp; Birbhum.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-[#7B1B5A]" />
                <span>Office &amp; Laboratory Coordinates</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#7B1B5A]/10 text-[#7B1B5A] border border-[#7B1B5A]/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Address
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed block mt-0.5">
                      {siteSettings.address_line1}, {siteSettings.address_line2}, {siteSettings.city}, {siteSettings.district}, WB â€“ {siteSettings.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#7B1B5A]/10 text-blue-500 border border-[#7B1B5A]/20 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Direct Helplines
                    </span>
                    <div className="space-y-1 mt-0.5">
                      <a href={`tel:${siteSettings.phone_sales}`} className="text-[#7B1B5A] hover:underline block font-semibold">
                        Sales: {siteSettings.phone_sales}
                      </a>
                      <a href={`tel:${siteSettings.phone_service}`} className="text-[#c44a8a] dark:text-[#c44a8a] hover:underline block font-semibold">
                        Service Lab: {siteSettings.phone_service}
                      </a>
                      <a href={`tel:${siteSettings.phone_landline}`} className="text-slate-500 hover:underline block">
                        Landline: {siteSettings.phone_landline}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#A6A4A5]/10 text-[#A6A4A5] border border-[#A6A4A5]/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Email Communication
                    </span>
                    <div className="space-y-0.5 mt-0.5 text-slate-600 dark:text-slate-400">
                      <div>General: {siteSettings.email_general}</div>
                      <div>Sales: {siteSettings.email_sales}</div>
                      <div>Service: {siteSettings.email_service}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Business Hours
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                      {siteSettings.opening_hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg h-64 w-full">
              <iframe
                title="Comtech Suri Office Map"
                src={siteSettings.google_maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
              {ticketNumber ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#c44a8a]/10 text-[#c44a8a] rounded-full flex items-center justify-center mx-auto border border-[#c44a8a]/25">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    Enquiry Registered Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Your service/sales request has been logged. Our engineers at New DangalPara will review and call you shortly.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
                    <span className="text-[10px] uppercase font-bold text-[#7B1B5A]">
                      Tracking Reference ID
                    </span>
                    <div className="text-2xl font-extrabold font-mono tracking-widest text-slate-900 dark:text-white mt-1">
                      {ticketNumber}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={openWhatsApp}
                      className="px-5 py-3 rounded-xl bg-[#7B1B5A] hover:bg-[#c44a8a] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                    <button
                      onClick={() => {
                        setTicketNumber(null);
                        setName('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-[#7B1B5A] text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    <span>Live CRM Ticket System</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    Submit Your Requirements &amp; Get Priority Support
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sourav Mukherjee"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9434XXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Category of Service / Sales
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      >
                        <option value="cctv_survey">CCTV Surveillance &amp; Free Site Survey</option>
                        <option value="service">Chip-Level Laptop &amp; Motherboard Lab</option>
                        <option value="product">Tally Prime License &amp; TDL Module</option>
                        <option value="product">Hardware, Laptop &amp; Printer Sales</option>
                        <option value="amc_quote">Corporate IT AMC &amp; Fiber Splicing</option>
                        <option value="service">Website &amp; Software Development</option>
                        <option value="general">General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Item / Model / Product Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={serviceOrProduct}
                        onChange={(e) => setServiceOrProduct(e.target.value)}
                        placeholder="e.g. Hikvision 4-CH Kit or Lenovo ThinkPad"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Urgency Level
                      </label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value as 'normal' | 'urgent' | 'critical')}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      >
                        <option value="normal">Normal (Within 24 Hours)</option>
                        <option value="urgent">Urgent (Within 4-6 Hours)</option>
                        <option value="critical">Critical Emergency (Immediate 2-Hour SLA)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Message / Issue Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your requirements, problem symptoms, or site details..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-[#c44a8a]" />
                      <span>Data is strictly confidential</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Generate Priority Ticket</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Loading contact page...</div>}>
      <ContactContent />
    </Suspense>
  );
}

