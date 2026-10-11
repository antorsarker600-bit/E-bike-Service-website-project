import React from 'react';
import { WORKFLOW_STEPS } from '../data/mockData';

export const WorkflowTimeline: React.FC = () => {
  return (
    <section className="py-16 lg:py-28 bg-[#101319] relative overflow-hidden" id="service-workflow">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#00e5ff] mb-2 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            LAB OPERATIONS TIMELINE
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#e1e2ea]">
            4-STAGE PRECISION PROTOCOL
          </h2>
          <p className="text-sm md:text-base text-[#bac9cc] mt-2">
            Transparent, trackable execution. From our online bay intake to your final dyno-certified ride report.
          </p>
        </div>

        {/* 4-Stage Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#1d2025] rounded-2xl p-6 border border-[#3b494c]/30 relative flex flex-col justify-between group hover:border-[#00e5ff] transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.12)]"
            >
              <div>
                <div className="font-display text-4xl font-bold text-[#3b494c]/50 group-hover:text-[#00e5ff] transition-colors mb-3 font-mono-tech">
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-bold text-[#e1e2ea] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-[#bac9cc] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 font-mono-tech text-[11px] text-[#c3f5ff] flex items-center gap-1.5 pt-3 border-t border-[#3b494c]/20">
                <span className="material-symbols-outlined text-[16px] text-[#00e5ff]">
                  {step.icon}
                </span>
                <span>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
