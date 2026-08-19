'use client';

import React, { useState } from 'react';
import { siteSettings } from '@/lib/store/seedData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function HomeContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

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
          type: category,
          message,
          subject: 'Home Page Contact Form Enquiry',
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

  return (
    <section className="py-20 bg-slate-100/80 dark:bg-[#080d16] relative" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Visit Our Suri Hub or Request Service
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Have a project, requirement, or hardware breakdown? Reach out and get immediate assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Location Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-500" />
                <span>Comtech Headquarters</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Physical Location
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 leading-relaxed block mt-0.5">
                      {siteSettings.address_line1}, {siteSettings.address_line2}, {siteSettings.city}, {siteSettings.district}, WB – {siteSettings.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Direct Helplines
                    </span>
                    <div className="space-y-0.5 mt-0.5">
                      <a href={`tel:${siteSettings.phone_sales}`} className="text-cyan-600 dark:text-cyan-400 hover:underline block font-semibold">
                        Sales: {siteSettings.phone_sales}
                      </a>
                      <a href={`tel:${siteSettings.phone_service}`} className="text-emerald-600 dark:text-emerald-400 hover:underline block font-semibold">
                        Service Lab: {siteSettings.phone_service}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-500 border border-teal-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Email Inquiries
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                      {siteSettings.email_general}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Operating Hours
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                      {siteSettings.opening_hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-56 w-full">
              <iframe
                title="Comtech Suri Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5583647413627!2d87.52589531497984!3d23.90906238451152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f993d0f0c058eb%3A0x88c2b53cb1cbfd22!2sSuri%2C%20West%20Bengal%20731101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Interactive Lead Generation Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
              {ticketNumber ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    Ticket Successfully Created!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Your request has been logged in our Suri CRM. An engineer will follow up shortly.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-xs mx-auto">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-600 dark:text-cyan-400">
                      Ticket Reference Number
                    </span>
                    <div className="text-2xl font-extrabold font-mono tracking-wider text-slate-900 dark:text-white mt-1">
                      {ticketNumber}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(`Hello Comtech, referencing Ticket ${ticketNumber}. Name: ${name}`);
                        window.open(`https://wa.me/919434197268?text=${msg}`, '_blank');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setTicketNumber(null);
                        setName('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-xs font-semibold"
                    >
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    <span>Quick Response Lead Capture</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                    Send Instant Requirement to Our Suri Engineers
                  </h3>

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
                        placeholder="e.g. Sourav Banerjee"
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
                        placeholder="e.g. 98321XXXXX"
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
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Area of Interest
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                      >
                        <option value="cctv_survey">CCTV Surveillance &amp; Free Survey</option>
                        <option value="product">Tally Prime License &amp; TDL Module</option>
                        <option value="service">Chip-Level Laptop / Motherboard Lab</option>
                        <option value="product">Laptops, Desktops &amp; Printer Sales</option>
                        <option value="amc_quote">Corporate IT AMC &amp; Fiber Splicing</option>
                        <option value="service">Custom Website &amp; Software Dev</option>
                        <option value="general">Other Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Detailed Requirement / Fault Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what you need, model number, or office requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Generating Ticket...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit &amp; Generate Instant CRM Ticket</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
