import React from 'react';
import { ASSETS } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b0e13] py-16 border-t border-[#3b494c]/20">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img
              alt="VOLT//GARAGE Logo"
              className="h-6 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-display text-lg tracking-tight text-[#c3f5ff] font-bold">
              VOLT<span className="text-[#fd5915]">//</span>GARAGE
            </span>
          </div>
          <p className="text-xs text-[#bac9cc] leading-relaxed">
            High-torque cybernetic tuning lab and factory-grade electric powertrain telemetry diagnostics.
          </p>
          <div className="font-mono-tech text-[10px] text-[#00e5ff] mt-1">
            SYS.LOC: BAY-NORTH // SPEC-V8.4
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#00e5ff] mb-3">
            OPERATIONAL PROTOCOLS
          </div>
          <ul className="flex flex-col gap-2 text-xs text-[#bac9cc]">
            <li>
              <a className="hover:text-[#00e5ff] transition-colors" href="#diagnostic-scanner">
                Battery Cell Calibration
              </a>
            </li>
            <li>
              <a className="hover:text-[#00e5ff] transition-colors" href="#diagnostic-scanner">
                High-Torque Motor Dyno
              </a>
            </li>
            <li>
              <a className="hover:text-[#00e5ff] transition-colors" href="#services-matrix">
                Regenerative Braking Tuning
              </a>
            </li>
            <li>
              <a className="hover:text-[#00e5ff] transition-colors" href="#services-matrix">
                Firmware HUD Reflash
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#00e5ff] mb-3">
            TELEMETRY UPTIME
          </div>
          <ul className="flex flex-col gap-2 font-mono-tech text-[11px] text-[#bac9cc]">
            <li>WORKSHOP MATRIX: 99.98%</li>
            <li>ACTIVE BMS NODES: 1,420</li>
            <li>MEAN REPAIR LATENCY: 2.4 HRS</li>
            <li>EMERGENCY DISPATCH: ARMED</li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#00e5ff] mb-3">
            DIRECT DISPATCH
          </div>
          <p className="text-xs text-[#bac9cc] mb-1">
            Sub-Level 3, Neo-Industrial Sector 9
          </p>
          <p className="font-mono-tech text-xs text-[#00daf3] font-bold">
            SECURE FEED: +1 (800) 555-VOLT
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-pulse" />
            <span className="font-mono-tech text-[10px] text-[#a8ffd2]">
              HIGH-VOLTAGE RATED TECHNICIANS ON-DUTY
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-10 mt-12 pt-6 border-t border-[#3b494c]/20 flex flex-col md:flex-row items-center justify-between gap-3 font-mono-tech text-[11px] text-[#bac9cc]">
        <div>
          © 2025 VOLT//GARAGE PERFORMANCE MOBILITY CORP. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:text-[#e1e2ea] transition-colors" href="#">
            DATA PRIVACY PROTOCOL
          </a>
          <a className="hover:text-[#e1e2ea] transition-colors" href="#">
            SYSTEM SPECIFICATIONS
          </a>
          <a className="hover:text-[#e1e2ea] transition-colors" href="#">
            SECURITY CLEARANCE
          </a>
        </div>
      </div>
    </footer>
  );
};
