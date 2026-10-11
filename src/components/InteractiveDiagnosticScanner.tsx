import React, { useState } from 'react';
import { ASSETS, SUBSYSTEM_DATA } from '../data/mockData';
import { SubsystemKey } from '../types';

interface InteractiveDiagnosticScannerProps {
  onBookServiceWithTier: (tierCode: string) => void;
}

export const InteractiveDiagnosticScanner: React.FC<InteractiveDiagnosticScannerProps> = ({
  onBookServiceWithTier,
}) => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemKey>('battery');

  const currentData = SUBSYSTEM_DATA[selectedSubsystem];

  const hotspots: {
    key: SubsystemKey;
    label: string;
    top: string;
    left: string;
    icon: string;
    accentColor: string;
    badgeSide: 'left' | 'right';
  }[] = [
    {
      key: 'battery',
      label: '01. BATTERY & BMS',
      top: '44%',
      left: '49%',
      icon: 'battery_charging_full',
      accentColor: '#00e5ff',
      badgeSide: 'left',
    },
    {
      key: 'motor',
      label: '02. MID-DRIVE MOTOR',
      top: '64%',
      left: '54%',
      icon: 'speed',
      accentColor: '#fd5915',
      badgeSide: 'right',
    },
    {
      key: 'brakes',
      label: '03. ROTOR & CALIPER',
      top: '65%',
      left: '34%',
      icon: 'disc_full',
      accentColor: '#00e5ff',
      badgeSide: 'right',
    },
    {
      key: 'drivetrain',
      label: '04. DRIVETRAIN / BELT',
      top: '68%',
      left: '70%',
      icon: 'settings',
      accentColor: '#00e5ff',
      badgeSide: 'left',
    },
    {
      key: 'suspension',
      label: '05. AIR FORK & DAMPER',
      top: '36%',
      left: '37%',
      icon: 'tune',
      accentColor: '#00e5ff',
      badgeSide: 'right',
    },
  ];

  const tabs: { key: SubsystemKey; label: string }[] = [
    { key: 'battery', label: 'Battery' },
    { key: 'motor', label: 'Motor' },
    { key: 'brakes', label: 'Brakes' },
    { key: 'drivetrain', label: 'Drivetrain' },
    { key: 'suspension', label: 'Fork' },
  ];

  return (
    <section className="py-16 lg:py-28 bg-[#101319] relative" id="diagnostic-scanner">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#00e5ff] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00e5ff]" />
              SYS.DIAG // ARCHITECTURE BREAKDOWN
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#e1e2ea]">
              INTERACTIVE SYSTEM HOTSPOTS
            </h2>
            <p className="text-sm md:text-base text-[#bac9cc] max-w-xl mt-1">
              Tap inspection nodes across the cybernetic chassis to run telemetry
              simulations and explore component tolerances.
            </p>
          </div>

          <div className="font-mono-tech text-[11px] text-[#bac9cc]/80 border border-[#3b494c]/30 px-3 py-1.5 rounded bg-[#1d2025]">
            SCHEMATIC: HYPER-MOTO 72V PROTOTYPE // ROTATION STATIC
          </div>
        </div>

        {/* Scanner Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Bike Schematic Canvas with Hotspots (Cols 1-7) */}
          <div className="lg:col-span-7 bg-[#191c21] rounded-2xl border border-[#3b494c]/30 p-4 relative overflow-hidden shadow-2xl">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d08_1px,transparent_1px),linear-gradient(to_bottom,#1f293d08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

            {/* Top Status Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#3b494c]/20 mb-3 font-mono-tech text-[11px] text-[#bac9cc]">
              <span className="text-[#c3f5ff] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                OPTICAL SCANNER FEED // BAY 02
              </span>
              <span className="text-[#e1e2ea]">TARGET: {currentData.title}</span>
            </div>

            {/* Schematic Image Area & Target Pins */}
            <div className="relative w-full aspect-[16/10] bg-[#0b0e13] rounded-xl overflow-hidden flex items-center justify-center">
              <img
                alt="Electric Bike Diagnostic Architecture"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
                src={ASSETS.bikeLabHero}
              />
              <div className="absolute inset-0 bg-[#101319]/45 backdrop-blur-[1px]" />

              {/* Hotspot triggers */}
              {hotspots.map((hs) => {
                const isSelected = selectedSubsystem === hs.key;
                const isOrange = hs.key === 'motor';

                return (
                  <button
                    key={hs.key}
                    type="button"
                    aria-label={`Inspect ${hs.label}`}
                    onClick={() => setSelectedSubsystem(hs.key)}
                    style={{ top: hs.top, left: hs.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20`}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute -inset-3 rounded-full transition-all ${
                        isSelected
                          ? isOrange
                            ? 'bg-[#fd5915]/30 animate-ping'
                            : 'bg-[#00e5ff]/30 animate-ping'
                          : 'bg-transparent group-hover:bg-[#00e5ff]/20'
                      }`}
                    />

                    {/* Main Target Dot */}
                    <span
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all shadow-lg ${
                        isSelected
                          ? isOrange
                            ? 'bg-[#fd5915] border-[#fd5915] text-[#511500] scale-110 shadow-[0_0_20px_#fd5915]'
                            : 'bg-[#00e5ff] border-[#00e5ff] text-[#00363d] scale-110 shadow-[0_0_20px_#00e5ff]'
                          : isOrange
                          ? 'bg-[#272a30] border-[#fd5915] text-[#fd5915] group-hover:scale-110 group-hover:bg-[#fd5915] group-hover:text-[#511500]'
                          : 'bg-[#272a30] border-[#3b494c] text-[#e1e2ea] group-hover:border-[#00e5ff] group-hover:text-[#00e5ff]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {hs.icon}
                      </span>
                    </span>

                    {/* Badge Label */}
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded border font-mono-tech text-[10px] uppercase transition-opacity ${
                        hs.badgeSide === 'left' ? 'left-10' : 'right-10'
                      } ${
                        isSelected
                          ? isOrange
                            ? 'bg-[#32353b]/95 border-[#fd5915] text-[#ffb59d] opacity-100'
                            : 'bg-[#32353b]/95 border-[#00e5ff] text-[#c3f5ff] opacity-100 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                          : 'bg-[#32353b]/85 border-[#3b494c] text-[#bac9cc] opacity-75 group-hover:opacity-100'
                      }`}
                    >
                      {hs.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Switch Strip */}
            <div className="mt-4 grid grid-cols-5 gap-1.5 text-center font-mono-tech text-[11px]">
              {tabs.map((tab) => {
                const isActive = selectedSubsystem === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedSubsystem(tab.key)}
                    className={`py-2 px-1 rounded uppercase font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00e5ff] text-[#00363d] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                        : 'bg-[#1d2025] hover:bg-[#272a30] text-[#bac9cc]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Telemetry Inspection Readout Card (Cols 8-12) */}
          <div className="lg:col-span-5 bg-[#1d2025] rounded-2xl border border-[#3b494c]/30 p-6 relative shadow-xl min-h-[460px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#3b494c]/20 mb-4">
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#00e5ff]">
                  {currentData.tag}
                </span>
                <span className="font-mono-tech text-[11px] text-[#5be9ad] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-pulse" />
                  TOLERANCE: NOMINAL
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#e1e2ea]">
                {currentData.title}
              </h3>
              <p className="text-sm text-[#bac9cc] mt-2 leading-relaxed">
                {currentData.desc}
              </p>

              {/* Technical Parameter Gauges */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-[#191c21] p-3 rounded-lg border border-[#3b494c]/20">
                  <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                    STATE OF HEALTH (SOH)
                  </span>
                  <span className="font-display text-xl font-bold text-[#c3f5ff] block mt-0.5">
                    {currentData.metric1}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#bac9cc] block mt-0.5">
                    {currentData.metric1Sub}
                  </span>
                </div>

                <div className="bg-[#191c21] p-3 rounded-lg border border-[#3b494c]/20">
                  <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                    INTERNAL RESISTANCE
                  </span>
                  <span className="font-display text-xl font-bold text-[#a8ffd2] block mt-0.5">
                    {currentData.metric2}
                  </span>
                  <span className="font-mono-tech text-[10px] text-[#bac9cc] block mt-0.5">
                    {currentData.metric2Sub}
                  </span>
                </div>
              </div>

              {/* Lab Checklist */}
              <div className="mt-5">
                <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#bac9cc] block mb-2">
                  LAB SERVICE CHECKLIST
                </span>
                <ul className="flex flex-col gap-2 text-xs text-[#e1e2ea]">
                  {currentData.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#00e5ff] text-[16px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action Row */}
            <div className="mt-6 pt-4 border-t border-[#3b494c]/20 flex items-center justify-between">
              <div>
                <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                  RECOMMENDED INTERVAL
                </span>
                <span className="font-mono-tech text-xs font-bold text-[#e1e2ea]">
                  {currentData.interval}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onBookServiceWithTier(currentData.recommendedServiceCode)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-[#00e5ff] text-[#00363d] font-display text-sm uppercase font-bold hover:shadow-[0_0_15px_#00e5ff] transition-all cursor-pointer"
              >
                <span>BOOK THIS SERVICE</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
