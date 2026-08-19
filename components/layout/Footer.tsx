'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Cpu,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  ArrowUpRight,
  Lock,
  Heart,
} from 'lucide-react';
import { siteSettings } from '@/lib/store/seedData';

export function Footer() {
  const pathname = usePathname();

  // Don't render footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="text-slate-300 border-t pt-16 pb-12 relative overflow-hidden" style={{background: '#0e0309', borderColor: '#3a0f2b'}}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{background: 'rgba(123,27,90,0.08)'}} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{background: 'rgba(233,165,26,0.05)'}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 shadow-lg shrink-0">
                <img
                  src="/Comtech-logo.png"
                  alt="Comtech Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold font-heading tracking-tight text-white">
                    COMTECH
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded" style={{background: 'rgba(123,27,90,0.25)', color: '#E9A51A', border: '1px solid rgba(233,165,26,0.30)'}}>
                    Suri
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Information Services (Sales) & Infosys (Service)
                </p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Birbhum&apos;s leading technology powerhouse since 2012. Specializing in enterprise CCTV surveillance, certified Tally Prime ERP solutions, advanced chip-level motherboard diagnostics, fiber networking, and custom web applications.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{background: '#1a0511', border: '1px solid #3a0f2b', color: '#E9A51A'}}>
                <Shield className="w-3.5 h-3.5" />
                <span>GST Registered &amp; Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{background: '#1a0511', border: '1px solid #3a0f2b', color: '#c44a8a'}}>
                <span>100% Genuine Brands</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-heading">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  About Comtech
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Our IT Services
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1 font-semibold" style={{color: '#E9A51A'}}>
                  ✦ Book Service Appointment
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Products & Sales
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Special Promotions
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#E9A51A] transition-colors flex items-center gap-1">
                  Tech Knowledgebase
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Solutions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-heading">
              Key Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services?category=CCTV+%26+Surveillance" className="hover:text-[#E9A51A] transition-colors">
                  CCTV ColorVu Night Cameras
                </Link>
              </li>
              <li>
                <Link href="/services?category=Tally+Prime" className="hover:text-[#E9A51A] transition-colors">
                  Tally Prime Licenses & TDL
                </Link>
              </li>
              <li>
                <Link href="/services?category=Hardware+%26+Motherboard+Lab" className="hover:text-[#E9A51A] transition-colors">
                  Chip-Level Laptop Lab
                </Link>
              </li>
              <li>
                <Link href="/services?category=Website+%26+Software" className="hover:text-[#E9A51A] transition-colors">
                  Custom Web & ERP Dev
                </Link>
              </li>
              <li>
                <Link href="/services?category=Antivirus+%26+Security" className="hover:text-[#E9A51A] transition-colors">
                  Quick Heal & Seqrite Antivirus
                </Link>
              </li>
              <li>
                <Link href="/services?category=Networking+%26+AMC" className="hover:text-[#E9A51A] transition-colors">
                  Corporate IT AMC Contracts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Suri Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-200 font-heading">
              Suri Service Hub
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{color: '#E9A51A'}} />
                <span>
                  {siteSettings.address_line1}, {siteSettings.city}, {siteSettings.district}, WB – {siteSettings.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" style={{color: '#c44a8a'}} />
                <div>
                  <a href={`tel:${siteSettings.phone_sales}`} className="hover:text-white block">
                    Sales: {siteSettings.phone_sales}
                  </a>
                  <a href={`tel:${siteSettings.phone_service}`} className="hover:text-white block">
                    Service: {siteSettings.phone_service}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" style={{color: '#7B1B5A'}} />
                <a href={`mailto:${siteSettings.email_general}`} className="hover:text-white truncate">
                  {siteSettings.email_general}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteSettings.opening_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Comtech Information Services & Comtech Infosys. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Support Enquiry
            </Link>
            <span>&bull;</span>
            <Link href="/admin" className="flex items-center gap-1 text-slate-400 transition-colors" style={{}}
              onMouseEnter={e => (e.currentTarget.style.color = '#E9A51A')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}>
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
