import React from 'react';
import { TESTIMONIALS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#101319] relative" id="reviews">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#00e5ff] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00e5ff]" />
              CUSTOMER TELEMETRY FEED
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#e1e2ea]">
              VERIFIED RIDER LOG
            </h2>
            <p className="text-sm md:text-base text-[#bac9cc] max-w-xl mt-1">
              Real riders from city commuters to extreme enduro racers on why they trust VOLT//GARAGE.
            </p>
          </div>

          <div className="font-mono-tech text-[11px] text-[#bac9cc] border border-[#3b494c]/30 px-3 py-1.5 rounded bg-[#1d2025]">
            [ VERIFIED RIDER LOG // SAMPLE BENCHMARK TESTIMONIALS ]
          </div>
        </div>

        {/* Testimonial Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#1d2025] rounded-2xl border border-[#3b494c]/30 p-6 flex flex-col justify-between hover:border-[#00e5ff]/40 transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#ffb59d]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]">
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#5be9ad] uppercase px-2 py-0.5 rounded bg-[#272a30]">
                    VERIFIED REPAIR
                  </span>
                </div>

                <p className="text-sm md:text-base text-[#e1e2ea] mb-6 italic leading-relaxed">
                  {rev.quote}
                </p>
              </div>

              <div className="border-t border-[#3b494c]/20 pt-3 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-bold text-[#e1e2ea]">
                    {rev.name}
                  </div>
                  <div className="font-mono-tech text-[11px] text-[#bac9cc]">
                    {rev.bike}
                  </div>
                </div>
                <div className="font-mono-tech text-[11px] text-[#c3f5ff]">
                  {rev.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
