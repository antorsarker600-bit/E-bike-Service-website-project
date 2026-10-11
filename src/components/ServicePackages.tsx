import React, { useState } from 'react';
import { SERVICE_PACKAGES } from '../data/mockData';
import { ServicePackage } from '../types';

interface ServicePackagesProps {
  onSelectServicePackage: (pkg: ServicePackage) => void;
}

export const ServicePackages: React.FC<ServicePackagesProps> = ({
  onSelectServicePackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'commuter' | 'emtb' | 'speed'>('all');

  const filteredPackages = SERVICE_PACKAGES.filter((pkg) => {
    if (selectedFilter === 'all') return true;
    return pkg.categories.includes(selectedFilter);
  });

  return (
    <section className="py-16 lg:py-24 bg-[#191c21] relative" id="services-matrix">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Top Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#fd5915] mb-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#fd5915]" />
              FACTORY-TIER BENCH PROGRAMS
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#e1e2ea]">
              CALIBRATION &amp; SERVICE PACKAGES
            </h2>
            <p className="text-sm md:text-base text-[#bac9cc] max-w-xl mt-1">
              From rapid firmware sweeps to track-ready overhauls. Fixed-pricing,
              transparent metrics, zero dealer fluff.
            </p>
          </div>

          {/* Filter Selector */}
          <div className="flex items-center gap-1 bg-[#1d2025] p-1 rounded-xl border border-[#3b494c]/30 overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-mono-tech text-[11px] uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#e1e2ea]'
              }`}
            >
              ALL CLASSES
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('commuter')}
              className={`px-4 py-2 rounded-lg font-mono-tech text-[11px] uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'commuter'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#e1e2ea]'
              }`}
            >
              COMMUTER / CARGO
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('emtb')}
              className={`px-4 py-2 rounded-lg font-mono-tech text-[11px] uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'emtb'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#e1e2ea]'
              }`}
            >
              E-MTB / ENDURO
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('speed')}
              className={`px-4 py-2 rounded-lg font-mono-tech text-[11px] uppercase font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'speed'
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'text-[#bac9cc] hover:text-[#e1e2ea]'
              }`}
            >
              SPEED PEDELEC
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const isMaster = pkg.featured;

            if (isMaster) {
              return (
                <div
                  key={pkg.id}
                  className="group bg-[#272a30] rounded-2xl border-2 border-[#fd5915] p-6 lg:p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(253,89,21,0.25)] relative overflow-hidden md:col-span-2 lg:col-span-2"
                >
                  <div className="absolute top-0 right-0 bg-[#fd5915] text-[#511500] font-mono-tech text-[10px] px-4 py-1 font-bold uppercase tracking-widest">
                    MOST COMPLETE SPEC
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[#bac9cc] font-mono-tech text-[11px] mb-2">
                      <span className="text-[#fd5915] tracking-wider">
                        // CODE: {pkg.code}
                      </span>
                      <span className="text-[#5be9ad] font-mono-tech">
                        {pkg.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl font-bold text-[#e1e2ea] group-hover:text-[#fd5915] transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-sm md:text-base text-[#bac9cc] mt-2 mb-4 max-w-2xl leading-relaxed">
                      {pkg.desc}
                    </p>

                    <div className="flex flex-wrap items-baseline gap-2 mb-6">
                      <span className="font-display text-4xl font-bold text-[#e1e2ea]">
                        ${pkg.price}
                      </span>
                      <span className="font-mono-tech text-[11px] text-[#bac9cc]">
                        {pkg.priceUnit}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#3b494c]/30 pt-4">
                      <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#e1e2ea]">
                        {pkg.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[#fd5915] text-[18px] shrink-0">
                              verified
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="flex flex-col gap-2 text-xs md:text-sm text-[#e1e2ea]">
                        {pkg.features.slice(3).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[#fd5915] text-[18px] shrink-0">
                              verified
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectServicePackage(pkg)}
                    className="mt-8 w-full py-4 inline-flex items-center justify-center gap-2 rounded bg-[#fd5915] text-[#511500] font-display text-base uppercase font-bold hover:shadow-[0_0_25px_rgba(253,89,21,0.7)] transition-all cursor-pointer"
                  >
                    BOOK MASTER OVERHAUL (${pkg.price})
                  </button>
                </div>
              );
            }

            return (
              <div
                key={pkg.id}
                className="group bg-[#101319] rounded-2xl border border-[#3b494c]/30 p-6 flex flex-col justify-between hover:border-[#00e5ff]/60 hover:shadow-[0_0_24px_rgba(0,229,255,0.15)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-[#bac9cc] font-mono-tech text-[11px] mb-2">
                    <span className="text-[#00e5ff] tracking-wider">
                      // CODE: {pkg.code}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded bg-[#272a30] text-[10px] ${
                        pkg.badgeColor ? pkg.badgeColor : 'text-[#e1e2ea]'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#e1e2ea] group-hover:text-[#c3f5ff] transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs md:text-sm text-[#bac9cc] mt-1.5 mb-4 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="font-display text-3xl font-bold text-[#e1e2ea]">
                      ${pkg.price}
                    </span>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc]">
                      {pkg.priceUnit}
                    </span>
                  </div>

                  <div className="border-t border-[#3b494c]/20 pt-3">
                    <ul className="flex flex-col gap-2 text-xs text-[#bac9cc]">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#00e5ff] text-[16px] shrink-0 mt-0.5">
                            check
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectServicePackage(pkg)}
                  className="mt-6 w-full py-2.5 inline-flex items-center justify-center gap-2 rounded bg-[#272a30] border border-[#3b494c]/40 font-display text-sm uppercase text-[#c3f5ff] hover:bg-[#00e5ff] hover:text-[#00363d] hover:border-transparent transition-all cursor-pointer"
                >
                  SELECT TIER
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
