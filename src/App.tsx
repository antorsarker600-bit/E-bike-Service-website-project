/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustMetricsBar } from './components/TrustMetricsBar';
import { InteractiveDiagnosticScanner } from './components/InteractiveDiagnosticScanner';
import { ServicePackages } from './components/ServicePackages';
import { WorkflowTimeline } from './components/WorkflowTimeline';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { BookingSuite } from './components/BookingSuite';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TelemetryCheckModal } from './components/TelemetryCheckModal';
import { UserAccountModal } from './components/UserAccountModal';
import { ConfirmedBooking, ServicePackage } from './types';
import { SERVICE_PACKAGES } from './data/mockData';

export default function App() {
  const [telemetryModalOpen, setTelemetryModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<ServicePackage | null>(null);

  // Initial persistent bookings
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem('volt_garage_bookings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        bookingId: 'VOLT-2025-4819',
        timestamp: new Date().toISOString(),
        status: 'BAY_RESERVED',
        bikeType: 'Fat Tire / Moto',
        motorSystem: 'Specialized / Brose / Other',
        serviceTier: 'Master Volt Overhaul',
        servicePrice: 249,
        date: '2025-05-15',
        timeSlot: '09:00 AM (Morning Shift)',
        bay: 'Bay 04 - Master Overhaul Clean Room',
        riderName: 'Marcus Vance',
        riderEmail: 'marcus@voltlab.io',
        riderPhone: '+1 (415) 555-0192',
        bikeModel: 'Super73-RX Mojave',
        riderNotes: 'Phase wire junction inspection after wet trail ride.',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('volt_garage_bookings', JSON.stringify(confirmedBookings));
    } catch {
      // ignore
    }
  }, [confirmedBookings]);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-suite');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScanner = () => {
    const el = document.getElementById('diagnostic-scanner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServicePackage = (pkg: ServicePackage) => {
    setPreselectedPackage(pkg);
    scrollToBooking();
  };

  const handleBookServiceWithTierCode = (code: string) => {
    const matched = SERVICE_PACKAGES.find((p) => p.code.startsWith(code));
    if (matched) {
      setPreselectedPackage(matched);
    }
    scrollToBooking();
  };

  const handleApplyDiagnosticToBooking = (serviceName: string, notes: string) => {
    const matched = SERVICE_PACKAGES.find(
      (p) =>
        p.name.toLowerCase().includes(serviceName.toLowerCase()) ||
        serviceName.toLowerCase().includes(p.name.toLowerCase())
    );
    if (matched) {
      setPreselectedPackage(matched);
    }
    scrollToBooking();
  };

  const handleBookingConfirmed = (newBooking: ConfirmedBooking) => {
    setConfirmedBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setConfirmedBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
  };

  return (
    <div className="bg-[#101319] font-sans text-[#e1e2ea] antialiased tech-grid-bg min-h-screen selection:bg-[#00e5ff] selection:text-[#00363d]">
      {/* Global Fixed Navigation Header */}
      <Header
        onOpenTelemetryModal={() => setTelemetryModalOpen(true)}
        onOpenAccountModal={() => setAccountModalOpen(true)}
        onBookServiceClick={scrollToBooking}
        confirmedBookingsCount={confirmedBookings.length}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 bg-[#101319] min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full text-[#e1e2ea]">
          {/* 1. Hero Section: Industrial Lab HUD */}
          <HeroSection
            onBookServiceClick={scrollToBooking}
            onExploreServicesClick={scrollToScanner}
          />

          {/* 2. Verified Trust Metrics Bar */}
          <TrustMetricsBar />

          {/* 3. Interactive Electric Bike Diagnostic Scanner */}
          <InteractiveDiagnosticScanner
            onBookServiceWithTier={handleBookServiceWithTierCode}
          />

          {/* 4. Animated Service Packages & Lab Matrix */}
          <ServicePackages
            onSelectServicePackage={handleSelectServicePackage}
          />

          {/* 5. Scroll-Driven 4-Stage Precision Protocol */}
          <WorkflowTimeline />

          {/* 6. Interactive Before-and-After Restoration Gallery */}
          <BeforeAfterGallery onBookRepairClick={scrollToBooking} />

          {/* 7. Verified Customer Reviews */}
          <ReviewsSection />

          {/* 8. Accessible Multi-Step Booking Suite */}
          <BookingSuite
            onBookingConfirmed={handleBookingConfirmed}
            preselectedPackage={preselectedPackage}
          />

          {/* 9. FAQ & Physical Workshop Telemetry Location */}
          <FaqSection />
        </div>
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Modals */}
      <TelemetryCheckModal
        isOpen={telemetryModalOpen}
        onClose={() => setTelemetryModalOpen(false)}
        onApplyDiagnosticToBooking={handleApplyDiagnosticToBooking}
      />

      <UserAccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        bookings={confirmedBookings}
        onCancelBooking={handleCancelBooking}
        onNewBookingClick={scrollToBooking}
      />
    </div>
  );
}
