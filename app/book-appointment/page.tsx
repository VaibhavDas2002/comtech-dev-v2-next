'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { siteSettings } from '@/lib/store/seedData';
import { MediaUploader } from '@/components/ui/MediaUploader';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
import { ServiceMode, EnquiryUrgency } from '@/lib/types';
import {
  Calendar,
  Clock,
  Wrench,
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Building,
  Laptop,
  Video,
  FileSpreadsheet,
  Network,
  ShieldAlert,
  Globe,
  Sparkles,
  ArrowRight,
  Printer,
  ChevronRight,
  HelpCircle,
  Check,
  Send,
  Loader2,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
  icon: React.ElementType;
  division: 'Service Lab' | 'Sales & Setup' | 'Consultancy';
  symptoms: string[];
  startingPrice: string;
}

const SERVICE_CATEGORIES: CategoryOption[] = [
  {
    id: 'Hardware & Motherboard Lab',
    name: 'Laptop & Motherboard Chip-Level Lab',
    icon: Laptop,
    division: 'Service Lab',
    startingPrice: '₹750 (Inspection & Repair)',
    symptoms: [
      'No Display / Blank Screen',
      'Liquid / Water Spill Damage',
      'No Power / Won\'t Turn On',
      'Overheating / Loud Fan Noise',
      'Broken Hinge / Screen Damage',
      'Blue Screen (BSOD) / OS Crash',
      'Dead Hard Drive / Data Recovery',
      'RAM / Fast NVMe SSD Upgrade',
      'Keyboard / Battery Replacement',
    ],
  },
  {
    id: 'CCTV & Surveillance',
    name: 'CCTV Camera & DVR/NVR Surveillance',
    icon: Video,
    division: 'Sales & Setup',
    startingPrice: '₹499 (Service Visit)',
    symptoms: [
      'Camera Video Feed Blank / Offline',
      'Night Vision Dark / IR Failed',
      'DVR/NVR Continuous Beeping Sound',
      'Hard Disk Not Recording / Overwrite Error',
      'Mobile App Remote Viewing Setup (Hik-Connect / gDMSS)',
      'Camera Re-location / Wire Splicing',
      'New 4/8/16 Cam ColorVu Installation',
      'Password Reset for DVR / NVR',
    ],
  },
  {
    id: 'Tally Prime',
    name: 'Tally Prime ERP & TDL Customization',
    icon: FileSpreadsheet,
    division: 'Sales & Setup',
    startingPrice: '₹999 (Remote/Onsite)',
    symptoms: [
      'Tally Silver/Gold License Activation Error',
      'Company Data Corruption / Sync Error',
      'Multi-User LAN / Client Connection Issue',
      'Custom TDL Invoice with QR Code / E-Way Bill',
      'Tally on Cloud Anywhere Access Setup',
      'Tally Software Services (TSS) Annual Renewal',
      'GST Rate & Return Filing Configuration',
    ],
  },
  {
    id: 'Networking & AMC',
    name: 'Structured Fiber & Corporate AMC Network',
    icon: Network,
    division: 'Service Lab',
    startingPrice: '₹1,200 (Site Survey)',
    symptoms: [
      'Optical Fiber Cable Broken / Fusion Splicing Needed',
      'Wi-Fi Dead Zones & Slow Speed',
      'Server Rack & 24-Port Patch Panel Cabling',
      'Corporate Office Annual AMC Periodic Visit',
      'Router / Firewall / Managed Switch Setup',
      'Commercial LAN Drops Installation',
    ],
  },
  {
    id: 'Antivirus & Security',
    name: 'Commercial Antivirus & Cyber Defense',
    icon: ShieldAlert,
    division: 'Sales & Setup',
    startingPrice: '₹599 / Device',
    symptoms: [
      'Ransomware Attack / Encrypted Files Help',
      'Malware / Spyware Sluggish PC Removal',
      'Quick Heal / Seqrite License Expiry Renewal',
      'Centralized Endpoint Server Deployment',
      'Web Filtering & USB Access Control',
    ],
  },
  {
    id: 'Website & Software',
    name: 'Custom Web Development & Billing Software',
    icon: Globe,
    division: 'Consultancy',
    startingPrice: 'Custom Quote',
    symptoms: [
      'New Business Website / E-Commerce Store',
      'Custom Billing & Inventory Software',
      'Domain & Cloud Hosting Renewal',
      'Payment Gateway Integration (UPI/Razorpay)',
      'Database Optimization & Performance Tuning',
    ],
  },
];

function AppointmentFormContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category') || searchParams.get('service');

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>(SERVICE_CATEGORIES[0].id);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState<string>('');
  
  const [deviceBrandModel, setDeviceBrandModel] = useState<string>('');
  const [deviceSerial, setDeviceSerial] = useState<string>('');
  const [warrantyStatus, setWarrantyStatus] = useState<string>('Out of Warranty');
  
  const [serviceMode, setServiceMode] = useState<ServiceMode>('lab_visit');
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });
  const [timeSlot, setTimeSlot] = useState<string>('Morning: 10:00 AM – 01:00 PM');
  const [urgency, setUrgency] = useState<EnquiryUrgency>('normal');

  const [customerCategory, setCustomerCategory] = useState<string>('Individual / Home');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [sameAsPhone, setSameAsPhone] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [detailedNotes, setDetailedNotes] = useState<string>('');
  const [attachmentUrl, setAttachmentUrl] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    ticket_number: string;
    created_at: string;
    id: string;
  } | null>(null);

  // Sync category from URL param if present
  useEffect(() => {
    if (initialCategoryParam) {
      const match = SERVICE_CATEGORIES.find(
        (c) =>
          c.id.toLowerCase().includes(initialCategoryParam.toLowerCase()) ||
          c.name.toLowerCase().includes(initialCategoryParam.toLowerCase()) ||
          initialCategoryParam.toLowerCase().includes(c.id.toLowerCase())
      );
      if (match) {
        setSelectedCategory(match.id);
      }
    }
  }, [initialCategoryParam]);

  // Keep WhatsApp in sync if checked
  useEffect(() => {
    if (sameAsPhone) {
      setWhatsappNumber(phone);
    }
  }, [phone, sameAsPhone]);

  const activeCategoryObj =
    SERVICE_CATEGORIES.find((c) => c.id === selectedCategory) || SERVICE_CATEGORIES[0];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!name.trim()) {
      setErrorMessage('Please provide your Full Name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please provide a valid 10-digit Mobile Number.');
      return;
    }
    if (serviceMode === 'onsite_visit' && !address.trim()) {
      setErrorMessage('Please provide your complete address for Onsite Engineer deployment in Suri / Birbhum.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payloadSymptoms = [...selectedSymptoms];
      if (customSymptom.trim()) {
        payloadSymptoms.push(customSymptom.trim());
      }

      const fullMessage = `
[IT Service Appointment Registration]
• Department: ${activeCategoryObj.name}
• Service Mode: ${serviceMode === 'lab_visit' ? 'Bring to Suri Lab (Comtech Infosys)' : serviceMode === 'onsite_visit' ? 'Onsite Visit by Engineer' : 'Remote Online Support'}
• Preferred Date: ${appointmentDate}
• Preferred Time Slot: ${timeSlot}
• Priority / Urgency: ${urgency.toUpperCase()}
• Device: ${deviceBrandModel || 'Not Specified'} (Serial: ${deviceSerial || 'N/A'}, Warranty: ${warrantyStatus})
• Symptoms Checked: ${payloadSymptoms.length > 0 ? payloadSymptoms.join(', ') : 'General diagnostics required'}
• Customer Category: ${customerCategory}
• Address/Landmark: ${address || 'Lab Visit'} ${landmark ? `(Landmark: ${landmark})` : ''}
• Notes: ${detailedNotes || 'None'}
      `.trim();

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          whatsapp_number: sameAsPhone ? phone : whatsappNumber,
          email,
          type: 'service_appointment',
          service_or_product_name: activeCategoryObj.name,
          subject: `Service Appointment: ${activeCategoryObj.name} (${serviceMode === 'lab_visit' ? 'Lab Visit' : 'Onsite Visit'})`,
          message: fullMessage,
          urgency,
          appointment_date: appointmentDate,
          appointment_time_slot: timeSlot,
          service_mode: serviceMode,
          customer_category: customerCategory,
          address,
          landmark,
          device_brand_model: deviceBrandModel,
          device_serial: deviceSerial,
          warranty_status: warrantyStatus,
          issue_symptoms: payloadSymptoms,
          attachment_url: attachmentUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmedBooking({
          ticket_number: data.ticket_number || `APT-${Math.floor(100000 + Math.random() * 900000)}`,
          created_at: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          id: data.data?.id || `enq-${Date.now()}`,
        });
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        setErrorMessage(data.error || 'Failed to register appointment. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // CONFIRMATION VOUCHER VIEW
  // -------------------------------------------------------------
  if (confirmedBooking) {
    const whatsappText = encodeURIComponent(
      `Hello Comtech Infosys Suri Desk,\nI have registered an IT Service Appointment.\n• Ticket Ref: ${confirmedBooking.ticket_number}\n• Customer: ${name}\n• Phone: ${phone}\n• Service: ${activeCategoryObj.name}\n• Date & Time: ${appointmentDate} (${timeSlot})\n• Mode: ${serviceMode === 'lab_visit' ? 'Suri Lab Visit' : 'Onsite Visit'}\n• Device: ${deviceBrandModel || 'IT Equipment'}\nPlease confirm the technician assignment.`
    );

    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#7B1B5A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#7B1B5A] transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-900 dark:text-white">Appointment Confirmed</span>
        </div>

        {/* Printable Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#e8d5e2] dark:border-[#3a0f2b] shadow-2xl relative overflow-hidden space-y-8">
          {/* Top Decorative Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e8d5e2] dark:border-[#3a0f2b]">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center border border-emerald-500/30 shrink-0">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(123,27,90,0.12)', color: '#7B1B5A', border: '1px solid rgba(123,27,90,0.25)' }}>
                  Appointment Registered
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                  Service Ticket Confirmed!
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Logged in Comtech Infosys Suri Service Management System.
                </p>
              </div>
            </div>

            {/* Ticket Ref Badge */}
            <div className="p-4 rounded-2xl text-center sm:text-right" style={{ background: 'rgba(123,27,90,0.08)', border: '1px solid rgba(123,27,90,0.20)' }}>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                Appointment Reference
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-slate-900 dark:text-white block mt-0.5" style={{ color: '#7B1B5A' }}>
                {confirmedBooking.ticket_number}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {confirmedBooking.created_at}
              </span>
            </div>
          </div>

          {/* Key Appointment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slot & Service Mode */}
            <div className="p-5 rounded-2xl bg-[#fdf6fa] dark:bg-[#1c0614] border border-[#e8d5e2] dark:border-[#3a0f2b] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: '#7B1B5A' }} />
                <span>Appointment Schedule</span>
              </h3>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold">{appointmentDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Time Window:</span>
                  <span className="font-bold">{timeSlot}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Service Mode:</span>
                  <span className="font-bold" style={{ color: '#E9A51A' }}>
                    {serviceMode === 'lab_visit'
                      ? '🏢 Walk-in to Suri Service Lab'
                      : serviceMode === 'onsite_visit'
                      ? '🚗 Doorstep Onsite Visit'
                      : '💻 Remote Desktop Diagnostic'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Urgency Level:</span>
                  <span className="font-bold capitalize">{urgency}</span>
                </div>
              </div>
            </div>

            {/* Customer & Location */}
            <div className="p-5 rounded-2xl bg-[#fdf6fa] dark:bg-[#1c0614] border border-[#e8d5e2] dark:border-[#3a0f2b] space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: '#E9A51A' }} />
                <span>Customer &amp; Location Details</span>
              </h3>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Customer Name:</span>
                  <span className="font-bold">{name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-bold">{phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-[#3a0f2b]">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold">{customerCategory}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Address / Location:</span>
                  <span className="font-semibold text-right max-w-[200px] truncate">{address || 'Suri Lab Walk-in'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Diagnostics Summary */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Wrench className="w-4 h-4" style={{ color: '#7B1B5A' }} />
              <span>Registered Technical Issue</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Service Area:</span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{activeCategoryObj.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Device / Equipment:</span>
                <span className="font-bold text-slate-900 dark:text-white block mt-0.5">{deviceBrandModel || 'Hardware Unit'} ({warrantyStatus})</span>
              </div>
              {selectedSymptoms.length > 0 && (
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block mb-1.5">Symptoms Checklist:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSymptoms.map((symp, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {symp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Suri Lab Address Card */}
          <div className="p-5 rounded-2xl text-slate-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: '#0e0309', border: '1px solid #3a0f2b' }}>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E9A51A]">
                Suri Service Lab Address
              </span>
              <p className="font-bold text-white text-sm">
                Comtech Infosys (Lab &amp; Service Division)
              </p>
              <p className="text-slate-400">
                Beside A.B.T.A Building, New DangalPara, Suri, Birbhum, West Bengal – 731101
              </p>
              <p className="text-slate-400">
                Opening Hours: {siteSettings.opening_hours}
              </p>
            </div>
            <div className="space-y-1 sm:text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Lab Technical Helpdesk</span>
              <a href={`tel:${siteSettings.phone_service}`} className="font-mono font-bold text-base block text-[#E9A51A] hover:underline">
                +91 94743 06951
              </a>
              <span className="text-[11px] text-slate-400 block">Sales Desk: +91 94341 97268</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e8d5e2] dark:border-[#3a0f2b]">
            <div className="flex flex-wrap items-center gap-3">
              {/* WhatsApp Action */}
              <a
                href={`https://wa.me/919474306951?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              {/* Call Lab */}
              <a
                href={`tel:${siteSettings.phone_service}`}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-xs flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4" style={{ color: '#c44a8a' }} />
                <span>Call Lab (+91 94743 06951)</span>
              </a>

              {/* Print Voucher */}
              <button
                onClick={handlePrint}
                className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Voucher</span>
              </button>
            </div>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setSelectedSymptoms([]);
                setCustomSymptom('');
                setDetailedNotes('');
                setAttachmentUrl('');
              }}
              className="text-xs font-bold text-[#7B1B5A] dark:text-[#E9A51A] hover:underline"
            >
              Book Another Appointment &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN REGISTRATION FORM VIEW
  // -------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ background: 'rgba(123,27,90,0.10)', color: '#7B1B5A', borderColor: 'rgba(123,27,90,0.20)' }}>
          <Wrench className="w-4 h-4" />
          <span>Comtech Infosys &bull; Service Lab &amp; Onsite Dispatch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 dark:text-white leading-[1.15]">
          Book IT Service <span className="gradient-text">Appointment</span> &amp; Register Issue
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Register your motherboard repairs, CCTV malfunctions, Tally ERP sync issues, or request an emergency onsite technician in Suri and Birbhum. Instant ticket generation with priority turnaround.
        </p>
      </div>

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Step Interactive Form */}
        <div className="lg:col-span-8 space-y-8">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Step 1: Service Category Selection */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: '#7B1B5A' }}>
                1
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Select IT Service Department
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Choose the specialized division to handle your technical issue.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSymptoms([]);
                    }}
                    className={`p-4 rounded-2xl text-left border transition-all duration-200 flex items-start gap-3.5 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'border-[#7B1B5A] shadow-md'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/40'
                    }`}
                    style={isSelected ? { background: 'rgba(123,27,90,0.06)', borderColor: '#7B1B5A' } : {}}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                        isSelected ? 'text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                      style={isSelected ? { background: '#7B1B5A' } : {}}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {cat.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 shrink-0" style={{ color: '#7B1B5A' }} />}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {cat.startingPrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Issue Symptoms & Device Information */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: '#7B1B5A' }}>
                2
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Technical Issue Symptoms &amp; Device Details
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select common symptoms or describe the exact hardware/software problem.
                </p>
              </div>
            </div>

            {/* Symptoms Tag Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Common Symptoms for {activeCategoryObj.name} (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeCategoryObj.symptoms.map((symptom, idx) => {
                  const isChecked = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? 'text-white border-transparent shadow-sm'
                          : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                      style={isChecked ? { background: '#7B1B5A' } : {}}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                      <span>{symptom}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Device Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Device / Model / Software Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dell Inspiron 15 3000 / Hikvision 8CH DVR / Tally Gold"
                  value={deviceBrandModel}
                  onChange={(e) => setDeviceBrandModel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Warranty Status
                </label>
                <select
                  value={warrantyStatus}
                  onChange={(e) => setWarrantyStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                >
                  <option value="Out of Warranty">Out of Warranty</option>
                  <option value="Under OEM Warranty">Under OEM Warranty</option>
                  <option value="Comtech AMC Covered">Comtech AMC Covered</option>
                  <option value="Not Sure">Not Sure / Don't Know</option>
                </select>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Detailed Issue Description &amp; Fault History
              </label>
              <textarea
                rows={3}
                placeholder="Describe when the issue began, error codes, beeps, blinking lights, or any prior repairs done..."
                value={detailedNotes}
                onChange={(e) => setDetailedNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A] leading-relaxed"
              />
            </div>

            {/* Optional Media Attachment (Base64 Document Storage) */}
            <div className="pt-2">
              <MediaUploader
                value={attachmentUrl}
                onChange={setAttachmentUrl}
                label="Attach Photo of Error / Damaged Hardware (Optional)"
                description="Upload photo/screenshot of the screen or error (JPEG/PNG/PDF, Max 6MB Base64)"
                allowPdf={true}
              />
            </div>
          </div>

          {/* Step 3: Service Mode, Appointment Date & Time Slot */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: '#7B1B5A' }}>
                3
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Service Delivery Mode &amp; Time Slot
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select whether you will visit our Suri Lab or request an onsite engineer visit.
                </p>
              </div>
            </div>

            {/* 3 Service Modes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Lab Visit */}
              <button
                type="button"
                onClick={() => setServiceMode('lab_visit')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  serviceMode === 'lab_visit'
                    ? 'border-[#7B1B5A] shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40'
                }`}
                style={serviceMode === 'lab_visit' ? { background: 'rgba(123,27,90,0.06)', borderColor: '#7B1B5A' } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(123,27,90,0.12)', color: '#7B1B5A' }}>
                    <Building className="w-5 h-5" />
                  </div>
                  {serviceMode === 'lab_visit' && <Check className="w-4 h-4" style={{ color: '#7B1B5A' }} />}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Bring to Suri Lab
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Walk-in to Comtech Infosys (Beside A.B.T.A Bldg, New DangalPara). Free bench check.
                </p>
              </button>

              {/* Onsite Visit */}
              <button
                type="button"
                onClick={() => setServiceMode('onsite_visit')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  serviceMode === 'onsite_visit'
                    ? 'border-[#E9A51A] shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40'
                }`}
                style={serviceMode === 'onsite_visit' ? { background: 'rgba(233,165,26,0.08)', borderColor: '#E9A51A' } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(233,165,26,0.15)', color: '#E9A51A' }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  {serviceMode === 'onsite_visit' && <Check className="w-4 h-4" style={{ color: '#E9A51A' }} />}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Onsite Engineer Visit
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Certified technician dispatched to your home/office in Suri, Bolpur, Sainthia, Birbhum.
                </p>
              </button>

              {/* Remote Support */}
              <button
                type="button"
                onClick={() => setServiceMode('remote_support')}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  serviceMode === 'remote_support'
                    ? 'border-[#c44a8a] shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40'
                }`}
                style={serviceMode === 'remote_support' ? { background: 'rgba(196,74,138,0.08)', borderColor: '#c44a8a' } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(196,74,138,0.15)', color: '#c44a8a' }}>
                    <Laptop className="w-5 h-5" />
                  </div>
                  {serviceMode === 'remote_support' && <Check className="w-4 h-4" style={{ color: '#c44a8a' }} />}
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Remote Online Support
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Instant AnyDesk / TeamViewer screen sharing for Tally, Antivirus, and software fixes.
                </p>
              </button>
            </div>

            {/* Visual Interactive Date & Time Picker */}
            <div className="space-y-6 pt-2">
              {/* Date Selection Header & Presets */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar className="w-4 h-4" style={{ color: '#7B1B5A' }} />
                    <span>Select Appointment Date</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Selected: <strong className="text-[#7B1B5A] dark:text-[#E9A51A]">{new Date(appointmentDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                  </span>
                </div>

                {/* Quick Date Presets */}
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4].map((offset) => {
                    const d = new Date();
                    d.setDate(d.getDate() + offset);
                    const dateStr = d.toISOString().split('T')[0];
                    const isSelected = appointmentDate === dateStr;
                    const label =
                      offset === 0
                        ? 'Today (Urgent)'
                        : offset === 1
                        ? 'Tomorrow'
                        : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
                    return (
                      <button
                        key={offset}
                        type="button"
                        onClick={() => {
                          setAppointmentDate(dateStr);
                          setCalendarViewDate(new Date(d));
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                          isSelected
                            ? 'text-white border-transparent shadow-md scale-105'
                            : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                        style={isSelected ? { background: '#7B1B5A' } : {}}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Month Calendar Grid Card */}
                <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  {/* Calendar Month Navigation */}
                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => {
                        const prev = new Date(calendarViewDate);
                        prev.setMonth(prev.getMonth() - 1);
                        setCalendarViewDate(prev);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Previous Month"
                    >
                      &larr;
                    </button>

                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      {calendarViewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const next = new Date(calendarViewDate);
                        next.setMonth(next.getMonth() + 1);
                        setCalendarViewDate(next);
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      title="Next Month"
                    >
                      &rarr;
                    </button>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Days Matrix */}
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const year = calendarViewDate.getFullYear();
                      const month = calendarViewDate.getMonth();
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const firstDayIndex = new Date(year, month, 1).getDay();
                      const todayStr = new Date().toISOString().split('T')[0];

                      const cells = [];
                      // Empty leading cells
                      for (let i = 0; i < firstDayIndex; i++) {
                        cells.push(<div key={`empty-${i}`} className="h-8" />);
                      }

                      // Day cells
                      for (let day = 1; day <= daysInMonth; day++) {
                        const cellDate = new Date(year, month, day);
                        const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isPast = cellDateStr < todayStr;
                        const isSelected = appointmentDate === cellDateStr;
                        const isToday = cellDateStr === todayStr;
                        const isSunday = cellDate.getDay() === 0;

                        cells.push(
                          <button
                            key={day}
                            type="button"
                            disabled={isPast}
                            onClick={() => setAppointmentDate(cellDateStr)}
                            className={`h-9 rounded-xl text-xs font-semibold flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                              isPast
                                ? 'opacity-30 cursor-not-allowed text-slate-400'
                                : isSelected
                                ? 'text-white font-bold shadow-md scale-105 z-10'
                                : isToday
                                ? 'border border-[#E9A51A] text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-slate-800'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            style={isSelected ? { background: '#7B1B5A' } : {}}
                          >
                            <span>{day}</span>
                            {isSunday && !isSelected && (
                              <span className="text-[7px] text-amber-500 font-bold -mt-0.5">On-Call</span>
                            )}
                          </button>
                        );
                      }
                      return cells;
                    })()}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                    <span>* Sunday: Emergency breakdown on-call service available</span>
                    <span>Mon - Sat: 9:30 AM - 8:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Time Window Slots Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-4 h-4" style={{ color: '#E9A51A' }} />
                    <span>Select Time Window Slot</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    Current: <strong className="text-[#E9A51A]">{timeSlot}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: 'Morning: 10:00 AM – 01:00 PM',
                      icon: '🌅',
                      title: 'Morning Slot',
                      time: '10:00 AM – 01:00 PM',
                      badge: 'High Lab Availability',
                      desc: 'Motherboard diagnostic bench triage & part drop-off',
                    },
                    {
                      key: 'Afternoon: 01:00 PM – 04:00 PM',
                      icon: '☀️',
                      title: 'Afternoon Slot',
                      time: '01:00 PM – 04:00 PM',
                      badge: 'Onsite & Field Active',
                      desc: 'Doorstep engineer visits, CCTV inspections & Tally setups',
                    },
                    {
                      key: 'Evening: 04:00 PM – 07:30 PM',
                      icon: '🌆',
                      title: 'Evening Slot',
                      time: '04:00 PM – 07:30 PM',
                      badge: 'Handover & Remote',
                      desc: 'Repaired laptop collection, testing & remote support',
                    },
                    {
                      key: 'Immediate Emergency SLA',
                      icon: '🚨',
                      title: 'Emergency Priority',
                      time: 'Within 2 Hours SLA',
                      badge: 'Immediate Dispatch',
                      desc: 'Surveillance downtime, water-damaged logic board triage',
                    },
                  ].map((slot) => {
                    const isSelected = timeSlot === slot.key;
                    return (
                      <button
                        key={slot.key}
                        type="button"
                        onClick={() => setTimeSlot(slot.key)}
                        className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? 'border-[#E9A51A] shadow-md'
                            : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:border-slate-300'
                        }`}
                        style={isSelected ? { background: 'rgba(233,165,26,0.08)', borderColor: '#E9A51A' } : {}}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{slot.icon}</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {slot.title}
                            </span>
                          </div>
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase"
                            style={
                              isSelected
                                ? { background: 'rgba(233,165,26,0.25)', color: '#E9A51A' }
                                : { background: 'rgba(123,27,90,0.10)', color: '#7B1B5A' }
                            }
                          >
                            {slot.badge}
                          </span>
                        </div>
                        <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                          {slot.time}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                          {slot.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Specific Hour Quick Chips */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                    Or select exact preferred technician arrival hour:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['10:30 AM', '11:45 AM', '01:30 PM', '03:00 PM', '05:15 PM', '06:45 PM'].map((hr) => (
                      <button
                        key={hr}
                        type="button"
                        onClick={() => setTimeSlot(`Exact Preferred Time: ${hr}`)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                          timeSlot === `Exact Preferred Time: ${hr}`
                            ? 'text-white border-transparent'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                        style={timeSlot === `Exact Preferred Time: ${hr}` ? { background: '#7B1B5A' } : {}}
                      >
                        {hr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block uppercase tracking-wider">
                Repair Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'normal', label: 'Normal (Standard)', desc: '24-48h turnaround' },
                  { key: 'urgent', label: 'Urgent (Priority)', desc: 'Same-day bench queue' },
                  { key: 'critical', label: 'Critical (Business Down)', desc: 'Immediate dispatch' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setUrgency(item.key as EnquiryUrgency)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      urgency === item.key
                        ? 'border-[#7B1B5A] bg-[#fdf6fa] dark:bg-[#1c0614] text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40'
                    }`}
                  >
                    <span className="text-xs block font-bold">{item.label}</span>
                    <span className="text-[10px] block opacity-70 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Customer Details & Address */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: '#7B1B5A' }}>
                4
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Customer &amp; Location Details
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide your contact details so our Suri support engineers can reach out.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Customer / Establishment Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Individual / Home User',
                    'Commercial Shop / Retailer',
                    'Corporate Office / Enterprise',
                    'School / College / Institute',
                    'Diagnostic Clinic / Hospital',
                    'Government / Bank Office',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCustomerCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        customerCategory === cat
                          ? 'text-white border-transparent shadow-sm'
                          : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                      style={customerCategory === cat ? { background: '#7B1B5A' } : {}}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sourav Mukherjee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Primary Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    placeholder="94743 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                  />
                </div>
              </div>

              {/* WhatsApp Sync */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={sameAsPhone}
                    onChange={(e) => setSameAsPhone(e.target.checked)}
                    className="rounded text-[#7B1B5A] focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>WhatsApp number is the same as Mobile number</span>
                </label>
                {!sameAsPhone && (
                  <input
                    type="tel"
                    placeholder="Enter WhatsApp Number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full mt-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                  />
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>

              {/* Landmark */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Nearby Landmark (Suri / Birbhum)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Suri Bus Stand / Beside Zilla School"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A]"
                />
              </div>

              {/* Complete Address */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Full Street Address {serviceMode === 'onsite_visit' && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Holding No. 42, New DangalPara, Suri, Birbhum – 731101"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#7B1B5A] leading-relaxed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-xl transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #7B1B5A 0%, #c44a8a 100%)',
                  boxShadow: '0 8px 24px -4px rgba(123,27,90,0.45)',
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Registering Technical Ticket &amp; Booking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Confirm Appointment &amp; Generate Service Ticket</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2.5">
                🔒 You will receive a unique ticket reference with direct WhatsApp engineer connectivity. No advance payment required for diagnostics booking.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Booking Summary Card & Lab Guarantees */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <Tilt3DCard maxTilt={8} scale={1.01}>
            <div className="glass-card rounded-3xl p-6 border border-[#e8d5e2] dark:border-[#3a0f2b] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Booking Summary
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(233,165,26,0.15)', color: '#E9A51A' }}>
                  Comtech Verified
                </span>
              </div>

              {/* Selected Department Pill */}
              <div className="p-3.5 rounded-2xl bg-[#fdf6fa] dark:bg-[#1c0614] border border-[#e8d5e2] dark:border-[#3a0f2b] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: '#7B1B5A' }}>
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold">Service Unit</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                    {activeCategoryObj.name}
                  </span>
                </div>
              </div>

              {/* Slot Summary */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#7B1B5A]" />
                    <span>Target Date:</span>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{appointmentDate}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E9A51A]" />
                    <span>Time Window:</span>
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[140px] truncate">
                    {timeSlot}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c44a8a]" />
                    <span>Service Mode:</span>
                  </span>
                  <span className="font-bold capitalize" style={{ color: '#E9A51A' }}>
                    {serviceMode === 'lab_visit' ? 'Lab Walk-in' : serviceMode === 'onsite_visit' ? 'Onsite Visit' : 'Remote'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Bench Estimation:</span>
                  <span className="font-bold text-xs" style={{ color: '#7B1B5A' }}>
                    {activeCategoryObj.startingPrice}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>30-Day Post-Service Lab Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>100% Genuine OEM Replacement Parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>GST Tax Invoice with Transparent Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No Diagnosis Charge if Unrepairable</span>
                </div>
              </div>

              {/* Direct Call Assistance */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Need Urgent Phone Booking?
                </span>
                <a
                  href={`tel:${siteSettings.phone_service}`}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c44a8a]" />
                  <span>Call Lab: +91 94743 06951</span>
                </a>
              </div>
            </div>
          </Tilt3DCard>
        </div>
      </form>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Loading appointment scheduler...</div>}>
      <AppointmentFormContent />
    </Suspense>
  );
}
