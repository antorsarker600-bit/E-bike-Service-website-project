import React from 'react';

export const TrustMetricsBar: React.FC = () => {
  return (
    <section className="w-full bg-[#191c21] border-y border-[#3b494c]/20 py-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest text-[#c3f5ff] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-pulse" />
            <span>DATA LAB BENCHMARK // UPDATED REAL-TIME</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8 w-full lg:w-auto text-left">
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-[#e1e2ea]">
                1,420+
              </span>
              <span className="text-[12px] text-[#bac9cc]">
                E-Bikes Calibrated (Verified Log)
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-display text-xl font-bold text-[#e1e2ea]">
                  4.96
                </span>
                <span className="material-symbols-outlined text-[#ffb59d] text-[16px]">
                  star
                </span>
              </div>
              <span className="text-[12px] text-[#bac9cc]">
                5.0 Star Rating (Rider Index)
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-[#00e5ff]">
                15-MIN
              </span>
              <span className="text-[12px] text-[#bac9cc]">
                Rapid CAN Diagnostic Scan
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-xl font-bold text-[#a8ffd2]">
                TIER-1 OEM
              </span>
              <span className="text-[12px] text-[#bac9cc]">
                Bosch, Shimano, Bafang, Brose
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
