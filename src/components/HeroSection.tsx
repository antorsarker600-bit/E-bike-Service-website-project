import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/mockData';

interface HeroSectionProps {
  onBookServiceClick: () => void;
  onExploreServicesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookServiceClick,
  onExploreServicesClick,
}) => {
  const [cellDelta, setCellDelta] = useState(3.842);
  const [torqueNm, setTorqueNm] = useState(98.4);
  const [canLatency, setCanLatency] = useState(11.8);
  const [dynoRunning, setDynoRunning] = useState(false);

  // Live Jitter Simulation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setCellDelta((prev) => {
        const delta = Number((3.84 + (Math.random() * 0.006 - 0.003)).toFixed(3));
        return delta;
      });

      setCanLatency((prev) => {
        const val = Number((11.5 + Math.random() * 0.8).toFixed(1));
        return val;
      });

      if (dynoRunning) {
        setTorqueNm((prev) => {
          const t = Number((98.0 + Math.random() * 5.2).toFixed(1));
          return t;
        });
      }
    }, 1800);

    return () => clearInterval(timer);
  }, [dynoRunning]);

  const triggerDynoBurst = () => {
    setDynoRunning(true);
    setTorqueNm(104.2);
    setTimeout(() => {
      setDynoRunning(false);
      setTorqueNm(98.4);
    }, 4000);
  };

  return (
    <section
      id="hero"
      className="relative -mt-20 pt-24 min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0b0e13]"
    >
      {/* Atmospheric Workshop Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          alt="VOLT//GARAGE Electric Bike Lab"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.15] opacity-60 scale-105 transition-transform duration-1000 ease-out"
          src={ASSETS.bikeLabHero}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101319] via-[#101319]/70 to-[#101319]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101319] via-transparent to-[#101319]" />

        {/* Cybernetic Laser Scanline Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent opacity-75 shadow-[0_0_15px_#00e5ff] animate-laser" />
        </div>
      </div>

      {/* HUD Frame Accents */}
      <div className="absolute top-28 left-6 md:left-12 hidden md:flex items-center gap-2 font-mono-tech text-[10px] text-[#c3f5ff] tracking-widest z-10 select-none">
        <span className="w-2 h-2 bg-[#00e5ff] rounded-none animate-ping" />
        <span>// LAB.CORE.V8.4 // PROTOCOL_ONLINE</span>
      </div>

      <div className="absolute top-28 right-6 md:right-12 hidden md:flex items-center gap-3 font-mono-tech text-[10px] text-[#bac9cc] z-10 select-none">
        <span className="text-[#5be9ad]">CAN_BUS: 1Mb/s</span>
        <span className="opacity-30">|</span>
        <span>CALIBRATION MATRIX: ARMED</span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-10 py-10 flex flex-col items-center text-center">
        {/* Top Technical System Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#272a30]/90 text-[#c3f5ff] border border-[#3b494c]/40 shadow-[0_0_20px_rgba(0,229,255,0.15)] mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#9cf0ff]">
            SYSTEM STATUS: READY // E-MOBILITY PRECISION LAB
          </span>
        </div>

        {/* Main Headline with Gradient Radiance */}
        <h1 className="font-display text-4xl md:text-7xl uppercase tracking-tighter text-[#e1e2ea] max-w-5xl leading-none font-bold">
          YOUR RIDE.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e1e2ea] via-[#00e5ff] to-[#9cf0ff] drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">
            RECHARGED.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#bac9cc] text-base md:text-lg max-w-2xl mt-4 mb-8 font-light tracking-wide">
          High-torque motor dyno testing, micro-level BMS cell calibration, and
          factory-certified electric powertrain restoration.
        </p>

        {/* Action Group CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBookServiceClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 font-display text-base uppercase tracking-wider bg-[#fd5915] text-[#511500] font-bold rounded shadow-[0_0_28px_rgba(253,89,21,0.55)] hover:shadow-[0_0_40px_rgba(253,89,21,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">bolt</span>
            <span>BOOK A SERVICE</span>
          </button>

          <button
            type="button"
            onClick={onExploreServicesClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 font-display text-base uppercase tracking-wider bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/60 rounded shadow-[0_0_16px_rgba(0,229,255,0.2)] hover:bg-[#00e5ff] hover:text-[#00363d] transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              troubleshoot
            </span>
            <span>EXPLORE SERVICES</span>
          </button>
        </div>

        {/* Quick-Stat & Accuracy Chip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono-tech text-[11px] uppercase tracking-widest text-[#bac9cc]/80">
          <span className="text-[#c3f5ff] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              verified
            </span>
            DIAGNOSTIC ACCURACY 99.8%
          </span>
          <span className="opacity-40">•</span>
          <span className="text-[#5be9ad] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">memory</span>
            OEM CERTIFIED TECHNICIANS
          </span>
          <span className="opacity-40">•</span>
          <span className="text-[#e1e2ea]">RAPID 15-MIN TELEMETRY SCAN</span>
        </div>

        {/* Real-time Interactive HUD Telemetry Card Mosaic */}
        <div className="w-full max-w-4xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* Telemetry Card 1: Pack Cell Delta */}
          <div className="bg-[#1d2025]/80 backdrop-blur-xl p-4 rounded-xl border border-[#3b494c]/30 relative overflow-hidden group hover:border-[#00e5ff]/50 transition-colors">
            <div className="flex items-center justify-between text-[#bac9cc] font-mono-tech text-[10px] mb-1">
              <span>PACK CELL DELTA</span>
              <span className="text-[#00e5ff] animate-pulse flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                LIVE TELEMETRY
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl text-[#e1e2ea] font-bold tracking-tight">
                {cellDelta.toFixed(3)}
              </span>
              <span className="font-mono-tech text-sm text-[#c3f5ff]">V</span>
              <span className="font-mono-tech text-[10px] text-[#5be9ad] ml-auto">
                ±0.018 V
              </span>
            </div>
            <div className="w-full bg-[#32353b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#00e5ff] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#00e5ff]"
                style={{ width: '94%' }}
              />
            </div>
            <div className="flex justify-between font-mono-tech text-[10px] text-[#bac9cc] mt-1.5">
              <span>BALANCE: OPTIMAL</span>
              <span>48V / 21Ah PACK</span>
            </div>
          </div>

          {/* Telemetry Card 2: Torque Sensor Cal */}
          <div
            onClick={triggerDynoBurst}
            title="Click to run dyno simulated burst test"
            className="bg-[#1d2025]/80 backdrop-blur-xl p-4 rounded-xl border border-[#3b494c]/30 relative overflow-hidden group hover:border-[#fd5915]/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center justify-between text-[#bac9cc] font-mono-tech text-[10px] mb-1">
              <span>TORQUE SENSOR CAL</span>
              <span className="text-[#fd5915] flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-[#fd5915] ${
                    dynoRunning ? 'animate-ping' : ''
                  }`}
                />
                {dynoRunning ? 'DYNO BURST ACTIVE' : 'DYNO ACTIVE'}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl text-[#e1e2ea] font-bold tracking-tight">
                {torqueNm.toFixed(1)}
              </span>
              <span className="font-mono-tech text-sm text-[#ffb59d]">Nm</span>
              <span className="font-mono-tech text-[10px] text-[#bac9cc] ml-auto">
                @ {dynoRunning ? '5200' : '4500'} RPM
              </span>
            </div>
            <div className="w-full bg-[#32353b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#fd5915] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#fd5915]"
                style={{ width: dynoRunning ? '96%' : '88%' }}
              />
            </div>
            <div className="flex justify-between font-mono-tech text-[10px] text-[#bac9cc] mt-1.5">
              <span>MOTOR: MID-DRIVE</span>
              <span className="text-[#ffb59d]">
                {dynoRunning ? 'PEAK 104Nm' : 'EFFICIENCY: 93.2%'}
              </span>
            </div>
          </div>

          {/* Telemetry Card 3: CAN Diagnostic Latency */}
          <div className="bg-[#1d2025]/80 backdrop-blur-xl p-4 rounded-xl border border-[#3b494c]/30 relative overflow-hidden group hover:border-[#5be9ad]/50 transition-colors">
            <div className="flex items-center justify-between text-[#bac9cc] font-mono-tech text-[10px] mb-1">
              <span>CAN DIAGNOSTIC LATENCY</span>
              <span className="text-[#5be9ad]">PORT 04</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl text-[#e1e2ea] font-bold tracking-tight">
                {canLatency.toFixed(1)}
              </span>
              <span className="font-mono-tech text-sm text-[#5be9ad]">ms</span>
              <span className="font-mono-tech text-[10px] text-[#a8ffd2] ml-auto">
                0 PACKET LOSS
              </span>
            </div>
            <div className="w-full bg-[#32353b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#5be9ad] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#5be9ad]"
                style={{ width: '98%' }}
              />
            </div>
            <div className="flex justify-between font-mono-tech text-[10px] text-[#bac9cc] mt-1.5">
              <span>BMS FIRMWARE: V4.18</span>
              <span>ISO 26262 OK</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
