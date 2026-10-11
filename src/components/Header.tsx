import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ConfirmedBooking } from '../types';

interface HeaderProps {
  onOpenTelemetryModal: () => void;
  onOpenAccountModal: () => void;
  onBookServiceClick: () => void;
  confirmedBookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTelemetryModal,
  onOpenAccountModal,
  onBookServiceClick,
  confirmedBookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  const navLinks = [
    { label: 'SERVICES', href: '#services-matrix', id: 'services' },
    { label: 'DIAGNOSTICS & TELEMETRY', href: '#diagnostic-scanner', id: 'diagnostics' },
    { label: 'SERVICE WORKFLOW', href: '#service-workflow', id: 'workflow' },
    { label: 'BEFORE & AFTER', href: '#before-after', id: 'before-after' },
    { label: 'REVIEWS', href: '#reviews', id: 'reviews' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleNavClick = (href: string, id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#101319]/90 backdrop-blur-xl border-b border-[#3b494c]/20">
      <div className="h-20 w-full px-5 lg:px-10 flex items-center justify-between gap-4">
        {/* Logo and workshop live indicator */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              alt="VOLT//GARAGE Logo"
              className="h-8 w-auto object-contain"
              src={ASSETS.logo}
            />
            <span className="font-display text-xl tracking-tight text-[#c3f5ff] font-bold">
              VOLT<span className="text-[#fd5915]">//</span>GARAGE
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-[#272a30]/80 border border-[#3b494c]/40">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#c3f5ff]">
              STATUS: WORKSHOP ONLINE // 4 BAYS ACTIVE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[12px] font-mono-tech uppercase tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.id);
                }}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-[#00e5ff] font-semibold border-b-2 border-[#00e5ff]'
                    : 'text-[#bac9cc] hover:text-[#c3f5ff]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenTelemetryModal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 font-mono-tech text-[12px] uppercase tracking-wider text-[#00e5ff] bg-[#00e5ff]/10 rounded border border-[#00e5ff]/30 hover:bg-[#00e5ff] hover:text-[#00363d] transition-all shadow-[0_0_12px_rgba(0,229,255,0.15)] cursor-pointer"
          >
            TELEMETRY CHECK
          </button>

          <button
            type="button"
            onClick={onBookServiceClick}
            className="inline-flex items-center justify-center px-4 py-2 font-display text-[15px] uppercase tracking-wider bg-[#fd5915] text-[#511500] font-bold rounded hover:shadow-[0_0_24px_rgba(253,89,21,0.5)] transition-all cursor-pointer"
          >
            BOOK SERVICE
          </button>

          {/* User Profile / Bookings Indicator */}
          <button
            type="button"
            onClick={onOpenAccountModal}
            aria-label="User Account and Reservations"
            className="w-8 h-8 rounded-full bg-[#c3f5ff] flex items-center justify-center relative hover:scale-105 transition-transform cursor-pointer"
            title="View Active Reservations & Workshop Logs"
          >
            <span className="material-symbols-outlined text-[#00363d] text-[18px]">
              person
            </span>
            {confirmedBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fd5915] text-[#511500] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#101319]">
                {confirmedBookingsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1.5 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101319]/95 border-b border-[#3b494c]/30 px-5 py-4 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#3b494c]/20">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="font-mono-tech text-[10px] text-[#00e5ff] uppercase">
              WORKSHOP READY // 4 BAYS ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1 font-mono-tech text-[13px]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href, link.id);
                }}
                className="py-2 text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTelemetryModal();
              }}
              className="w-full py-2.5 text-center font-mono-tech text-[12px] uppercase text-[#00e5ff] bg-[#00e5ff]/10 rounded border border-[#00e5ff]/30"
            >
              RUN TELEMETRY CHECK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
