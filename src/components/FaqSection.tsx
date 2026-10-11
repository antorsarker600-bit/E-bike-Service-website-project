import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-28 bg-[#101319] relative" id="faq">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: FAQ Accordion (Cols 1-7) */}
          <div className="lg:col-span-7">
            <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#00e5ff] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00e5ff]" />
              KNOWLEDGE BASE // PROTOCOLS
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#e1e2ea] mb-8">
              FREQUENTLY ANSWERED QUESTIONS
            </h2>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#1d2025] border border-[#3b494c]/30 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between font-display text-sm md:text-base text-[#e1e2ea] font-bold hover:text-[#00e5ff] transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{item.q}</span>
                      <span
                        className={`material-symbols-outlined text-[#00e5ff] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs md:text-sm text-[#bac9cc] border-t border-[#3b494c]/20 pt-3 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Workshop Physical Telemetry & Location HUD (Cols 8-12) */}
          <div className="lg:col-span-5 bg-[#1d2025] rounded-2xl border border-[#3b494c]/30 p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#3b494c]/20 mb-4">
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#00e5ff]">
                  // PHYSICAL WORKSHOP HUD
                </span>
                <span className="font-mono-tech text-[11px] text-[#5be9ad] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5be9ad] animate-ping" />
                  WORKSHOP OPEN
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#e1e2ea] mb-1">
                VOLT//GARAGE HQ
              </h3>
              <p className="text-xs md:text-sm text-[#bac9cc] mb-4 leading-relaxed">
                Sub-Level 3, Neo-Industrial Sector 9
                <br />
                Apex Technology Park, Bay 4 West
              </p>

              <div className="space-y-1.5 font-mono-tech text-[11px] text-[#bac9cc] mb-4">
                <div className="flex justify-between">
                  <span>MON - FRI:</span>
                  <span className="text-[#e1e2ea] font-bold">08:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>SATURDAY:</span>
                  <span className="text-[#e1e2ea] font-bold">09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>SUNDAY:</span>
                  <span className="text-[#ffb59d] font-bold">
                    EMERGENCY RECOVERY ONLY
                  </span>
                </div>
              </div>

              {/* Location Visual Container */}
              <div className="w-full h-44 rounded-xl overflow-hidden relative border border-[#3b494c]/30 mb-4 bg-[#0b0e13]">
                {/* Visual coordinate grid overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="absolute inset-0 bg-[#1d2025]/70 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[32px] mb-1 animate-pulse">
                    location_on
                  </span>
                  <span className="font-display text-base font-bold text-[#e1e2ea]">
                    BAY-NORTH // WORKSHOP 04
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#00e5ff]">
                    GPS: 37.7749° N, 122.4194° W
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#3b494c]/20 flex flex-col gap-1.5 font-mono-tech text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#bac9cc]">DIRECT TELEMETRY FEED:</span>
                <a
                  className="text-[#00e5ff] hover:underline font-bold"
                  href="tel:+18005558658"
                >
                  +1 (800) 555-VOLT
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#bac9cc]">ROADSIDE RECOVERY HOTLINE:</span>
                <span className="text-[#fd5915] font-bold">
                  CHANNEL 16 DISPATCH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
