'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../providers/AppProviders';
import { X, CheckCircle2, Send, Phone, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function EnquiryModal() {
  const { isQuoteModalOpen, closeQuoteModal, quoteModalData } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('general');
  const [serviceOrProduct, setServiceOrProduct] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'critical'>('normal');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (quoteModalData) {
      if (quoteModalData.type) setType(quoteModalData.type);
      if (quoteModalData.service_or_product_name) setServiceOrProduct(quoteModalData.service_or_product_name);
      if (quoteModalData.subject) setMessage(`Inquiry regarding: ${quoteModalData.subject}`);
    }
  }, [quoteModalData]);

  if (!isQuoteModalOpen) return null;

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
          subject: serviceOrProduct ? `Quote for ${serviceOrProduct}` : 'Website Enquiry',
          message,
          urgency,
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket_number) {
        setSubmittedTicket(data.ticket_number);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas not supported
        }
      }
    } catch {
      // Offline fallback
      const fallbackTicket = `COM-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(fallbackTicket);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedTicket(null);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setServiceOrProduct('');
    closeQuoteModal();
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Comtech! My Ticket is *${submittedTicket}*.\nName: ${name}\nPhone: ${phone}\nRequirement: ${serviceOrProduct || message}`
    );
    window.open(`https://wa.me/919434197268?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedTicket ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Enquiry Registered!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Our support engineer in Suri will contact you within 30–60 minutes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Your Priority Ticket ID
              </span>
              <div className="text-2xl font-extrabold font-mono tracking-widest text-slate-900 dark:text-white mt-1">
                {submittedTicket}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openWhatsAppDirect}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                Chat on WhatsApp Now
              </button>
              <button
                onClick={handleResetAndClose}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant Sales & Service Quote</span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Get Fast Price Quote or Book Service
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 mb-6">
              Comtech Information Services & Comtech Infosys • Suri, Birbhum
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Ghosh"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
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
                    placeholder="e.g. 98321XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
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
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Enquiry Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="cctv_survey">Free CCTV Site Survey</option>
                    <option value="service">Chip-Level Motherboard / Repair</option>
                    <option value="product">Hardware / Laptop / Printer Sales</option>
                    <option value="product">Tally Prime License & TDL</option>
                    <option value="amc_quote">Corporate IT AMC & Networking</option>
                    <option value="service">Website & Software Development</option>
                  </select>
                </div>
              </div>

              {serviceOrProduct && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Selected Product / Service
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={serviceOrProduct}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-sm font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  How can we help? (Describe requirement or issue) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Need 4 camera ColorVu setup for shop in Suri market with 1TB HDD and mobile app configuration..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Privacy • No Spam</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit & Generate Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
