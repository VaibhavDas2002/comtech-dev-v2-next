'use client';

import React, { useState } from 'react';
import { useApp } from '../providers/AppProviders';
import {
  Video,
  Wrench,
  Calculator,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  Eye,
  Sliders,
} from 'lucide-react';

export function InteractiveCalculators() {
  const { openQuoteModal } = useApp();
  const [activeTab, setActiveTab] = useState<'cctv' | 'lab'>('cctv');

  // CCTV State
  const [premise, setPremise] = useState<'shop' | 'showroom' | 'office' | 'school' | 'home'>('shop');
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [isColorVu, setIsColorVu] = useState<boolean>(true);
  const [includeAudio, setIncludeAudio] = useState<boolean>(true);

  // Lab Diagnostic State
  const [symptom, setSymptom] = useState<'no_power' | 'water_damage' | 'no_display' | 'overheating' | 'bios_locked'>('no_power');

  // CCTV calculations
  const baseCamPrice = isColorVu ? 2100 : 1600;
  const dvrPrice = cameraCount <= 4 ? 3200 : cameraCount <= 8 ? 4800 : 8500;
  const hddSize = cameraCount <= 4 ? '1 TB Surveillance' : cameraCount <= 8 ? '2 TB Surveillance' : '4 TB Surveillance';
  const hddPrice = cameraCount <= 4 ? 3800 : cameraCount <= 8 ? 5800 : 9800;
  const estimatedDays = cameraCount <= 4 ? '18 - 22 Days' : cameraCount <= 8 ? '15 - 20 Days' : '12 - 16 Days';
  const approxTotal = cameraCount * baseCamPrice + dvrPrice + hddPrice + cameraCount * 450; // cabling/connectors

  // Diagnostic calculations
  const diagnosticData = {
    no_power: {
      title: 'Dead Laptop / No Power / Blinking LED',
      likelyCause: '19V Primary Rail Capacitor Short or Charging IC Regulator Degradation',
      labProcedure: 'Thermal camera short isolation + Micro-soldering component replacement',
      estTime: '2 â€“ 4 Hours',
      estPrice: 'â‚¹ 850 â€“ â‚¹ 1,800',
      savingVsNew: 'Save 75% vs New Board',
    },
    water_damage: {
      title: 'Liquid Spill / Tea / Water Damage',
      likelyCause: 'Corroded copper traces & shorted under-BGA balls',
      labProcedure: 'Ultrasonic chemical bath cleaning + Trace jumpering & micro-isolation',
      estTime: '4 â€“ 8 Hours',
      estPrice: 'â‚¹ 1,200 â€“ â‚¹ 2,500',
      savingVsNew: 'Save 70% vs New Board',
    },
    no_display: {
      title: 'Power ON but Blank / Flickering Screen',
      likelyCause: 'GPU BGA solder fatigue, RAM power rail drop, or corrupt BIOS chip',
      labProcedure: 'Infrared BGA Rework Station re-balling or EEPROM programmer reflash',
      estTime: '3 â€“ 6 Hours',
      estPrice: 'â‚¹ 1,100 â€“ â‚¹ 2,200',
      savingVsNew: 'Save 80% vs New Board',
    },
    overheating: {
      title: 'Thermal Throttling & Sudden Shutdowns',
      likelyCause: 'Dried ceramic thermal paste & clogged fan copper heatsink assembly',
      labProcedure: 'Premium Arctic MX-4 thermal paste re-pasting + Fan motor ultrasonic service',
      estTime: '1 â€“ 2 Hours',
      estPrice: 'â‚¹ 450 â€“ â‚¹ 750',
      savingVsNew: 'Prevent hardware blowout',
    },
    bios_locked: {
      title: 'Corrupted BIOS / Password Locked',
      likelyCause: 'Interrupted Windows update or corrupted CMOS firmware memory',
      labProcedure: 'Chip desoldering + Hardware RT809H BIOS programmer flashing',
      estTime: '1 â€“ 3 Hours',
      estPrice: 'â‚¹ 650 â€“ â‚¹ 1,200',
      savingVsNew: 'Instant recovery',
    },
  };

  const currentDiag = diagnosticData[symptom];

  return (
    <section className="py-20 bg-slate-900/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7B1B5A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border" style={{background:"rgba(233,165,26,0.12)",color:"#E9A51A",borderColor:"rgba(233,165,26,0.25)"}}>
            <Calculator className="w-4 h-4" />
            <span>Interactive Visual Estimators</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Plan Your <span className="gradient-text">Security Setup</span> or <span className="gradient-text">Lab Repair</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive tools to calculate CCTV hardware requirements or explore chip-level motherboard diagnostic solutions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setActiveTab('cctv')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cctv'
                  ? 'bg-gradient-to-r #7B1B5A text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>CCTV &amp; Surveillance Estimator</span>
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'lab'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Motherboard Lab Diagnostic Tool</span>
            </button>
          </div>
        </div>

        {/* Tab 1: CCTV Estimator */}
        {activeTab === 'cctv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Select Premise Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'shop', label: 'Retail Shop / Pharmacy' },
                      { id: 'showroom', label: 'Showroom / Godown' },
                      { id: 'office', label: 'Corporate Office' },
                      { id: 'school', label: 'School / Institution' },
                      { id: 'home', label: 'Residence / Villa' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPremise(p.id as typeof premise)}
                        className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                          premise === p.id
                            ? 'bg-[#7B1B5A]/12 text-[#E9A51A] border-cyan-500/50 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      2. Number of Cameras Needed
                    </label>
                    <span className="px-3 py-1 rounded-lg bg-[#7B1B5A]/15 text-[#E9A51A] font-extrabold font-mono text-sm border border-[#7B1B5A]/25">
                      {cameraCount} Cameras
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    step="2"
                    value={cameraCount}
                    onChange={(e) => setCameraCount(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>2 Cameras</span>
                    <span>4 Cams</span>
                    <span>8 Cams</span>
                    <span>16 Cams</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setIsColorVu(!isColorVu)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isColorVu
                        ? 'bg-[#7B1B5A]/10 border-[#7B1B5A]/30 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-[#E9A51A]" />
                        <span>ColorVu 24/7 Full Color</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Crystal color night vision
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={isColorVu}
                      onChange={() => {}}
                      className="accent-cyan-500"
                    />
                  </div>

                  <div
                    onClick={() => setIncludeAudio(!includeAudio)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      includeAudio
                        ? 'bg-[#7B1B5A]/10 border-[#7B1B5A]/30 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#E9A51A]" />
                        <span>Built-in Mic Audio</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Live audio recording
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeAudio}
                      onChange={() => {}}
                      className="accent-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#c44a8a]" />
                  <span>Includes 2-Year OEM Warranty + Mobile App Setup</span>
                </div>
              </div>
            </div>

            {/* Results Preview Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border border-[#7B1B5A]/25 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#7B1B5A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E9A51A]">
                    Live Setup Configuration
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#c44a8a]/20 text-emerald-300 text-[10px] font-bold">
                    Hikvision / CP Plus
                  </span>
                </div>

                <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Cameras:</span>
                    <span className="font-bold text-white">
                      {cameraCount}x 2MP {isColorVu ? 'ColorVu HD' : 'Standard IR'}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>DVR Channel:</span>
                    <span className="font-bold text-white">
                      {cameraCount <= 4 ? '4-Channel' : cameraCount <= 8 ? '8-Channel' : '16-Channel'} HD DVR
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Hard Drive:</span>
                    <span className="font-bold text-[#E9A51A]">{hddSize}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Recording Retention:</span>
                    <span className="font-bold text-[#c44a8a]">{estimatedDays}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Remote Mobile View:</span>
                    <span className="font-bold text-white">Included (iOS &amp; Android)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#7B1B5A]/10 border border-[#7B1B5A]/20 text-center">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#E9A51A] block">
                    Estimated Complete Setup Price
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-white mt-1">
                    â‚¹ {approxTotal.toLocaleString('en-IN')}*
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    *Includes installation, cabling, SMPS power &amp; GST billing in Suri
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    openQuoteModal({
                      type: 'cctv_survey',
                      service_or_product_name: `${cameraCount}-Camera ${isColorVu ? 'ColorVu' : 'HD'} CCTV Setup`,
                      subject: `CCTV Estimate: ${cameraCount} Cameras for ${premise} (Approx â‚¹${approxTotal})`,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-teal-500 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Site Survey in Suri</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Lab Diagnostic Tool */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Symptom Selectors */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 space-y-4 shadow-2xl">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Your Laptop Fault / Symptom:
              </label>

              <div className="space-y-2.5">
                {[
                  { id: 'no_power', label: '1. No Power / Dead / Charging Light Blinks', icon: Zap },
                  { id: 'water_damage', label: '2. Liquid / Tea / Water Spill Damage', icon: Sparkles },
                  { id: 'no_display', label: '3. Power ON but Blank / Flickering Screen', icon: Eye },
                  { id: 'overheating', label: '4. Thermal Overheating & Sudden Shutdowns', icon: Sliders },
                  { id: 'bios_locked', label: '5. BIOS Corrupted / Password Locked', icon: ShieldCheck },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = symptom === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSymptom(item.id as typeof symptom)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#c44a8a]/15 text-emerald-300 border-emerald-500/50 shadow-md scale-[1.01]'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#c44a8a]' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnostic Breakdown Card */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border border-[#c44a8a]/25 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c44a8a]">
                    Laboratory Diagnostic Breakdown
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#c44a8a]/20 text-emerald-300 text-[10px] font-bold">
                    Comtech Infosys Lab
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-white">
                  {currentDiag.title}
                </h3>

                <div className="space-y-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Root Cause Analysis:
                    </span>
                    <span className="text-slate-200 font-medium">{currentDiag.likelyCause}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Diagnostic &amp; Repair Procedure:
                    </span>
                    <span className="text-emerald-300 font-medium">{currentDiag.labProcedure}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400">Turnaround Time:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {currentDiag.estTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Average Lab Cost:</span>
                    <span className="font-extrabold text-[#E9A51A] text-sm font-mono">
                      {currentDiag.estPrice}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#c44a8a]/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold text-center">
                  âœ¨ {currentDiag.savingVsNew} (30-Day Warranty Included)
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    openQuoteModal({
                      type: 'service',
                      service_or_product_name: 'Chip-Level Laptop Motherboard Lab',
                      subject: `Diagnostic Booking: ${currentDiag.title}`,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Lab Inspection in Suri</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

