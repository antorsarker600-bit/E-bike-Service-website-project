import React, { useState } from 'react';
import { RESTORATION_CASES } from '../data/mockData';

interface BeforeAfterGalleryProps {
  onBookRepairClick: () => void;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  onBookRepairClick,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);

  const activeCase = RESTORATION_CASES[activeCaseIndex];

  return (
    <section
      className="py-16 lg:py-28 bg-[#0b0e13] border-y border-[#3b494c]/20 relative"
      id="before-after"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#00e5ff] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00e5ff]" />
              WORKSHOP CASE ARCHIVE // EVIDENCE LOG
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#e1e2ea]">
              BEFORE &amp; AFTER RESTORATION
            </h2>
            <p className="text-sm md:text-base text-[#bac9cc] max-w-xl mt-1">
              Drag the laser slider to inspect real workshop overhauls. We reverse
              severe water intrusion, corrosion, and degraded components.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {RESTORATION_CASES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCaseIndex(i)}
                className={`font-mono-tech text-[11px] px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeCaseIndex === i
                    ? 'bg-[#00e5ff] text-[#00363d] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#1d2025] text-[#bac9cc] hover:text-[#e1e2ea] border border-[#3b494c]/30'
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>

        {/* Case 1: Interactive Slider Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 bg-[#1d2025] rounded-2xl border border-[#3b494c]/30 p-2 overflow-hidden relative shadow-2xl">
            <div
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden select-none"
              id="comparison-container"
            >
              {/* "AFTER" Image (Base Layer) */}
              <img
                alt="Clean room rewire and sealed IP68 conduit after service"
                className="absolute inset-0 w-full h-full object-cover"
                src={activeCase.afterImg}
              />
              <div className="absolute bottom-4 right-4 bg-[#00e5ff] text-[#00363d] font-mono-tech text-[10px] px-3 py-1 rounded font-bold uppercase tracking-wider z-10 shadow-lg">
                {activeCase.afterLabel}
              </div>

              {/* "BEFORE" Image (Clipped Overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="absolute inset-0 h-full"
                  style={{ width: `${(100 / sliderPosition) * 100}%` }}
                >
                  <img
                    alt="Corroded battery harness and worn terminals before service"
                    className="w-full h-full object-cover filter contrast-150 saturate-50 brightness-50 sepia-[0.3]"
                    src={activeCase.beforeImg}
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-[#ffb4ab] text-[#690005] font-mono-tech text-[10px] px-3 py-1 rounded font-bold uppercase tracking-wider z-10 shadow-lg">
                  {activeCase.beforeLabel}
                </div>
              </div>

              {/* Interactive Divider Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-[#00e5ff] z-20 shadow-[0_0_15px_#00e5ff] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#272a30] border-2 border-[#00e5ff] text-[#00e5ff] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[16px]">
                    code
                  </span>
                </div>
              </div>

              {/* Range Input for Drag / Touch */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Before and after restoration slider"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>

            <div className="flex items-center justify-between px-2 pt-2 font-mono-tech text-[11px] text-[#bac9cc]">
              <span>SLIDER: DRAG OR TOUCH TO INSPECT</span>
              <span className="text-[#00e5ff]">RESTORE ACCURACY: 100%</span>
            </div>
          </div>

          {/* Case Data Breakdown Card */}
          <div className="lg:col-span-4 bg-[#1d2025] rounded-2xl border border-[#3b494c]/30 p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="font-mono-tech text-[11px] text-[#fd5915] mb-1 uppercase">
                {activeCase.code}
              </div>
              <h3 className="font-display text-xl font-bold text-[#e1e2ea] mb-2 leading-snug">
                {activeCase.title}
              </h3>
              <p className="text-xs md:text-sm text-[#bac9cc] mb-4 leading-relaxed">
                {activeCase.summary}
              </p>

              <div className="space-y-2 border-y border-[#3b494c]/20 py-3 font-mono-tech text-[11px]">
                {activeCase.metrics.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-2">
                    <span className="text-[#bac9cc] text-[10px]">
                      {m.label}
                    </span>
                    <span
                      className={`font-bold ${
                        m.status === 'erratic'
                          ? 'text-[#ffb4ab]'
                          : m.status === 'upgraded'
                          ? 'text-[#00e5ff]'
                          : 'text-[#5be9ad]'
                      }`}
                    >
                      {m.afterVal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onBookRepairClick}
                className="w-full py-3 inline-flex items-center justify-center gap-2 rounded bg-[#272a30] border border-[#3b494c]/40 font-display text-sm uppercase text-[#c3f5ff] hover:bg-[#00e5ff] hover:text-[#00363d] transition-all cursor-pointer"
              >
                HAVE A SIMILAR ISSUE? BOOK REPAIR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
