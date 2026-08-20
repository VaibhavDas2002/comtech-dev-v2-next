'use client';

import React from 'react';
import { Award, Sparkles, Shield, Star, Crown } from 'lucide-react';

interface HeroRibbonBannerProps {
  className?: string;
}

/**
 * 3D Folded Ribbon Banner with swallowtail ends and shimmering gold border
 */
export function HeroRibbonBanner({ className = '' }: HeroRibbonBannerProps) {
  return (
    <div className={`ribbon-banner-container group ${className}`}>
      {/* Left Swallowtail Fold (Behind) */}
      <div className="relative -mr-3 hidden sm:block">
        <div
          className="w-8 h-10 bg-gradient-to-r from-[#4d0a36] to-[#7B1B5A] ribbon-swallowtail-left shadow-lg border-y border-l border-[#E9A51A]/60"
          style={{ transform: 'translateY(4px)' }}
        />
        {/* 3D Underfold Triangle */}
        <div
          className="absolute top-1 -right-0 w-0 h-0 border-t-[8px] border-t-[#350624] border-l-[8px] border-l-transparent"
          style={{ zIndex: 1 }}
        />
      </div>

      {/* Main Ribbon Center Body */}
      <div className="ribbon-banner-body relative px-5 py-2 sm:px-7 sm:py-2.5 rounded-sm sm:rounded shadow-2xl flex items-center gap-2.5 overflow-hidden">
        {/* Shimmer Light Reflection Effect */}
        <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-ribbon-shimmer pointer-events-none" />

        {/* Gold Badge Icon */}
        <div className="p-1 rounded-full bg-gradient-to-br from-[#E9A51A] to-[#b87b0a] text-slate-950 shadow-md shrink-0 flex items-center justify-center">
          <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a0511]" />
        </div>

        {/* Text Content */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold tracking-wider uppercase font-heading text-white drop-shadow-md">
          <span className="text-[#fde047] font-black tracking-widest flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#fde047] text-[#fde047] inline" />
            ESTABLISHED 1997
          </span>
          <span className="text-[#E9A51A]">•</span>
          <span className="text-white/95 font-bold tracking-wide">
            29+ YEARS OF EXCELLENCE IN SURI &amp; BIRBHUM
          </span>
          <span className="hidden md:inline text-[#E9A51A]">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-[#fce7f3] text-[11px] font-semibold lowercase tracking-normal bg-[#5c1041]/80 px-2 py-0.5 rounded-full border border-[#E9A51A]/40">
            <Sparkles className="w-3 h-3 text-[#E9A51A]" />
            Sales &amp; Service
          </span>
        </div>
      </div>

      {/* Right Swallowtail Fold (Behind) */}
      <div className="relative -ml-3 hidden sm:block">
        <div
          className="w-8 h-10 bg-gradient-to-l from-[#4d0a36] to-[#7B1B5A] ribbon-swallowtail-right shadow-lg border-y border-r border-[#E9A51A]/60"
          style={{ transform: 'translateY(4px)' }}
        />
        {/* 3D Underfold Triangle */}
        <div
          className="absolute top-1 -left-0 w-0 h-0 border-t-[8px] border-t-[#350624] border-r-[8px] border-r-transparent"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>
  );
}

/**
 * 3D Corner Ribbon for Cards & Containers
 */
export function CornerRibbon({
  text = 'EST. 1997',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`corner-ribbon-wrapper ${className}`}>
      <div className="corner-ribbon-badge flex items-center justify-center gap-1">
        <Crown className="w-2.5 h-2.5 inline fill-current" />
        <span>{text}</span>
      </div>
    </div>
  );
}

/**
 * Pill/Ribbon Badge for Navbar, Footers, and Section Headers
 */
export function RibbonBadge({
  text = 'Est. 1997 • 29+ Years',
  icon = 'award',
  size = 'md',
  className = '',
}: {
  text?: string;
  icon?: 'award' | 'star' | 'shield' | 'crown';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'star':
        return <Star className="w-3 h-3 fill-current text-[#E9A51A]" />;
      case 'shield':
        return <Shield className="w-3 h-3 text-[#E9A51A]" />;
      case 'crown':
        return <Crown className="w-3 h-3 text-[#E9A51A]" />;
      case 'award':
      default:
        return <Award className="w-3.5 h-3.5 text-[#E9A51A]" />;
    }
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3.5 py-1 gap-1.5',
    lg: 'text-sm px-4 py-1.5 gap-2',
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wider relative overflow-hidden transition-all shadow-md ${sizeClasses} ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(123,27,90,0.95) 0%, rgba(196,74,138,0.90) 50%, rgba(233,165,26,0.95) 100%)',
        border: '1px solid rgba(233, 165, 26, 0.65)',
        color: '#FFFFFF',
        boxShadow: '0 4px 14px -2px rgba(123, 27, 90, 0.40)',
      }}
    >
      <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-ribbon-shimmer pointer-events-none" />
      {renderIcon()}
      <span className="drop-shadow-sm font-heading">{text}</span>
    </div>
  );
}

/**
 * Compact Navbar Heritage Badge
 */
export function NavbarHeritageRibbon({ className = '' }: { className?: string }) {
  return (
    <div
      className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm transition-transform hover:scale-105 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #7B1B5A 0%, #a8256e 50%, #E9A51A 100%)',
        border: '1px solid rgba(233, 165, 26, 0.70)',
        color: '#FFFFFF',
      }}
      title="Comtech: Established in 1997 (29+ Years of Trusted Service in Birbhum)"
    >
      <Crown className="w-2.5 h-2.5 text-[#fde047] fill-[#fde047]" />
      <span className="tracking-wider text-[#fef08a] font-mono">EST. 1997</span>
    </div>
  );
}
