import React, { useState } from 'react';
import { BookingData, ConfirmedBooking, ServicePackage } from '../types';

interface BookingSuiteProps {
  onBookingConfirmed: (booking: ConfirmedBooking) => void;
  preselectedPackage?: ServicePackage | null;
}

export const BookingSuite: React.FC<BookingSuiteProps> = ({
  onBookingConfirmed,
  preselectedPackage,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields State
  const [bikeType, setBikeType] = useState('Commuter E-Bike');
  const [motorSystem, setMotorSystem] = useState('Bosch eBike System');
  const [selectedService, setSelectedService] = useState('Master Volt Overhaul');
  const [servicePrice, setServicePrice] = useState(249);
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingBay, setBookingBay] = useState('Bay 04 - Master Overhaul Clean Room');
  const [bookingTime, setBookingTime] = useState('09:00 AM (Morning Shift)');
  const [riderName, setRiderName] = useState('');
  const [riderEmail, setRiderEmail] = useState('');
  const [riderPhone, setRiderPhone] = useState('');
  const [bikeModel, setBikeModel] = useState('');
  const [riderNotes, setRiderNotes] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  // Confirmation Success State
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Update selected service if preselected from other components
  React.useEffect(() => {
    if (preselectedPackage) {
      setSelectedService(preselectedPackage.name);
      setServicePrice(preselectedPackage.price);
      setCurrentStep(2);
    }
  }, [preselectedPackage]);

  const frameOptions = [
    { label: 'COMMUTER', sub: 'City & Urban', value: 'Commuter E-Bike', icon: 'pedal_bike' },
    { label: 'CARGO & FLEET', sub: 'Long-Tail / Box', value: 'Cargo / Utility', icon: 'local_shipping' },
    { label: 'E-MTB', sub: 'Trail & Downhill', value: 'E-MTB / Enduro', icon: 'terrain' },
    { label: 'FAT TIRE / MOTO', sub: 'Super73 / Scrambler', value: 'Fat Tire / Moto', icon: 'two_wheeler' },
    { label: 'SPEED PEDELEC', sub: 'Class 3 (45 km/h)', value: 'Speed Pedelec (45km/h)', icon: 'electric_bolt' },
    { label: 'CUSTOM / 72V', sub: 'Custom Builds', value: 'Custom / High Voltage', icon: 'precision_manufacturing' },
  ];

  const motorOptions = [
    { name: 'BOSCH', sub: 'Performance / CX', value: 'Bosch eBike System' },
    { name: 'SHIMANO', sub: 'EP8 / E8000', value: 'Shimano STEPS' },
    { name: 'BAFANG', sub: 'M620 / BBSHD / Hub', value: 'Bafang M-Series/Hub' },
    { name: 'BROSE / OTHER', sub: 'Specialized / Custom', value: 'Specialized / Brose / Other' },
  ];

  const serviceTiers = [
    {
      name: 'Rapid Telemetry Scan',
      title: '01. RAPID TELEMETRY & BMS SCAN',
      desc: 'Full CAN diagnostic, health certificate, firmware flash (15 mins)',
      price: 49,
    },
    {
      name: 'Hydraulic Brake Overhaul',
      title: '02. HYDRAULIC BRAKE OVERHAUL & BLEED',
      desc: 'Front + Rear dual vacuum flush, pad bed-in & dial rotor truing',
      price: 65,
    },
    {
      name: 'Battery Restoration & Load Test',
      title: '03. BATTERY RESTORATION & LOAD BENCH',
      desc: 'Cell rebalancing, high-draw discharge curve, terminal resealing',
      price: 129,
    },
    {
      name: 'Master Volt Overhaul',
      title: '04. MASTER VOLT OVERHAUL (FLAGSHIP)',
      desc: 'Complete motor grease rebuild, dyno run, 42-point safety signoff',
      price: 249,
      recommended: true,
    },
  ];

  const handleServiceSelect = (name: string, price: number) => {
    setSelectedService(name);
    setServicePrice(price);
  };

  const validateStep3 = () => {
    const errs: { name?: string; email?: string; phone?: string } = {};

    if (!riderName.trim()) {
      errs.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!riderEmail.trim() || !emailRegex.test(riderEmail.trim())) {
      errs.email = 'Valid email required for confirmation.';
    }

    if (!riderPhone.trim() || riderPhone.trim().length < 7) {
      errs.phone = 'Valid phone number required (+1).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToReview = () => {
    if (validateStep3()) {
      setCurrentStep(4);
    }
  };

  const handleFinalizeBooking = () => {
    const randomToken = `VOLT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: ConfirmedBooking = {
      bookingId: randomToken,
      timestamp: new Date().toISOString(),
      status: 'BAY_RESERVED',
      bikeType,
      motorSystem,
      serviceTier: selectedService,
      servicePrice,
      date: bookingDate,
      timeSlot: bookingTime,
      bay: bookingBay,
      riderName: riderName.trim(),
      riderEmail: riderEmail.trim(),
      riderPhone: riderPhone.trim(),
      bikeModel: bikeModel.trim() || 'Unspecified Platform Model',
      riderNotes: riderNotes.trim(),
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setRiderName('');
    setRiderEmail('');
    setRiderPhone('');
    setRiderNotes('');
  };

  return (
    <section
      className="py-16 lg:py-28 bg-[#191c21] border-t border-[#3b494c]/20 relative"
      id="booking-suite"
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="font-mono-tech text-[12px] uppercase tracking-widest text-[#fd5915] mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fd5915] animate-pulse" />
            REAL-TIME BAY RESERVATION
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#e1e2ea]">
            BOOK YOUR LAB SERVICE
          </h2>
          <p className="text-sm md:text-base text-[#bac9cc] mt-1">
            Select your e-bike platform, required inspection tier, and reserve an active work-bay in seconds.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="w-full bg-[#1d2025] rounded-2xl p-4 border border-[#3b494c]/30 mb-8">
          <div className="grid grid-cols-4 gap-2 text-center font-mono-tech text-[11px] uppercase">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                currentStep === 1
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : currentStep > 1
                  ? 'bg-[#5be9ad] text-[#003824]'
                  : 'bg-[#272a30] text-[#bac9cc]'
              }`}
            >
              1. PLATFORM
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                currentStep === 2
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : currentStep > 2
                  ? 'bg-[#5be9ad] text-[#003824]'
                  : 'bg-[#272a30] text-[#bac9cc]'
              }`}
            >
              2. SERVICE TIER
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                currentStep === 3
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : currentStep > 3
                  ? 'bg-[#5be9ad] text-[#003824]'
                  : 'bg-[#272a30] text-[#bac9cc]'
              }`}
            >
              3. BAY &amp; TIME
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep3()) setCurrentStep(4);
              }}
              className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                currentStep === 4
                  ? 'bg-[#00e5ff] text-[#00363d]'
                  : 'bg-[#272a30] text-[#bac9cc]'
              }`}
            >
              4. CONFIRM
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#101319] rounded-2xl border border-[#3b494c]/30 p-6 lg:p-10 shadow-2xl relative">
          {/* STEP 1: BIKE PLATFORM & DRIVE SYSTEM */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#e1e2ea] mb-1">
                  SELECT YOUR E-BIKE PLATFORM
                </h3>
                <p className="text-xs md:text-sm text-[#bac9cc]">
                  Different motor and frame architectures require specialized test benches.
                </p>
              </div>

              {/* Bike Type Radios */}
              <div>
                <label className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block mb-2">
                  FRAME CATEGORY
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {frameOptions.map((f) => {
                    const isSelected = bikeType === f.value;
                    return (
                      <div
                        key={f.value}
                        onClick={() => setBikeType(f.value)}
                        className={`cursor-pointer p-4 rounded-xl bg-[#1d2025] border flex flex-col items-center text-center transition-all ${
                          isSelected
                            ? 'border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-[#272a30]'
                            : 'border-[#3b494c]/30 hover:border-[#00e5ff]/50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[#00e5ff] mb-1 text-[24px]">
                          {f.icon}
                        </span>
                        <span className="font-display font-bold text-[#e1e2ea] text-sm">
                          {f.label}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[#bac9cc] mt-0.5">
                          {f.sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motor Manufacturer Selection */}
              <div>
                <label className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block mb-2">
                  DRIVE MOTOR ECOSYSTEM
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {motorOptions.map((m) => {
                    const isSelected = motorSystem === m.value;
                    return (
                      <div
                        key={m.value}
                        onClick={() => setMotorSystem(m.value)}
                        className={`cursor-pointer p-3 rounded-lg bg-[#1d2025] border text-center transition-all ${
                          isSelected
                            ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)] bg-[#272a30]'
                            : 'border-[#3b494c]/30 hover:border-[#00e5ff]/50'
                        }`}
                      >
                        <span className="font-display font-bold text-[#e1e2ea] text-sm block">
                          {m.name}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[#bac9cc]">
                          {m.sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#3b494c]/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3 rounded bg-[#00e5ff] text-[#00363d] font-display text-sm uppercase font-bold hover:shadow-[0_0_20px_#00e5ff] transition-all cursor-pointer"
                >
                  NEXT: SERVICE TIER &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE TIER SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#e1e2ea] mb-1">
                  CHOOSE LAB SERVICE TIER
                </h3>
                <p className="text-xs md:text-sm text-[#bac9cc]">
                  Select your primary service package. Additional parts billed at transparent trade rates.
                </p>
              </div>

              <div className="space-y-3">
                {serviceTiers.map((tier) => {
                  const isSelected = selectedService === tier.name || selectedService === tier.title;
                  const isFlagship = tier.recommended;

                  return (
                    <div
                      key={tier.name}
                      onClick={() => handleServiceSelect(tier.name, tier.price)}
                      className={`cursor-pointer p-4 rounded-xl bg-[#1d2025] border flex items-center justify-between transition-all ${
                        isFlagship
                          ? isSelected
                            ? 'border-2 border-[#fd5915] shadow-[0_0_25px_rgba(253,89,21,0.4)] bg-[#272a30]'
                            : 'border-2 border-[#fd5915]/60 hover:border-[#fd5915]'
                          : isSelected
                          ? 'border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-[#272a30]'
                          : 'border-[#3b494c]/30 hover:border-[#00e5ff]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isFlagship
                              ? 'border-[#fd5915]'
                              : isSelected
                              ? 'border-[#00e5ff]'
                              : 'border-[#3b494c]'
                          }`}
                        >
                          {isSelected && (
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${
                                isFlagship ? 'bg-[#fd5915]' : 'bg-[#00e5ff]'
                              }`}
                            />
                          )}
                        </div>

                        <div>
                          <span className="font-display text-base font-bold text-[#e1e2ea] flex items-center gap-2">
                            {tier.title}
                            {isFlagship && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-[#fd5915] text-[#511500] font-mono-tech font-bold">
                                RECOMMENDED
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-[#bac9cc] block mt-0.5">
                            {tier.desc}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`font-display text-2xl font-bold ${
                          isFlagship ? 'text-[#fd5915]' : 'text-[#00e5ff]'
                        }`}
                      >
                        ${tier.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4 border-t border-[#3b494c]/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2.5 rounded bg-[#272a30] text-[#e1e2ea] font-display text-sm uppercase font-bold hover:bg-[#32353b] transition-all cursor-pointer"
                >
                  &lt; BACK
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 rounded bg-[#00e5ff] text-[#00363d] font-display text-sm uppercase font-bold hover:shadow-[0_0_20px_#00e5ff] transition-all cursor-pointer"
                >
                  NEXT: BAY &amp; SCHEDULE &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE, TIME & BAY SELECTION */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#e1e2ea] mb-1">
                  SELECT SERVICE BAY &amp; TIME
                </h3>
                <p className="text-xs md:text-sm text-[#bac9cc]">
                  We dedicate a clean-room bay and technician exclusively to your bike.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking_date"
                    className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block mb-1.5"
                  >
                    PREFERRED DATE
                  </label>
                  <input
                    id="booking_date"
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 font-mono-tech text-sm text-[#e1e2ea] focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking_bay"
                    className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block mb-1.5"
                  >
                    WORKSHOP BAY ALLOCATION
                  </label>
                  <select
                    id="booking_bay"
                    value={bookingBay}
                    onChange={(e) => setBookingBay(e.target.value)}
                    className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 font-mono-tech text-sm text-[#e1e2ea] focus:border-[#00e5ff] focus:outline-none"
                  >
                    <option value="Bay 01 - Dyno Bench (Bosch/Shimano)">
                      Bay 01 - Dyno Bench (Bosch/Shimano)
                    </option>
                    <option value="Bay 02 - High-Voltage Lab (72V/Custom)">
                      Bay 02 - High-Voltage Lab (72V/Custom)
                    </option>
                    <option value="Bay 03 - Rapid Service & Hydraulic Bleed">
                      Bay 03 - Rapid Service &amp; Hydraulic Bleed
                    </option>
                    <option value="Bay 04 - Master Overhaul Clean Room">
                      Bay 04 - Master Overhaul Clean Room
                    </option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block mb-1.5">
                  DROP-OFF WINDOW
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { slot: '09:00 AM', tag: '2 BAYS OPEN', full: '09:00 AM (Morning Shift)' },
                    { slot: '01:00 PM', tag: '1 BAY OPEN', full: '01:00 PM (Midday Shift)' },
                    { slot: '05:00 PM', tag: '3 BAYS OPEN', full: '05:00 PM (Evening Express)' },
                  ].map((t) => {
                    const isSelected = bookingTime === t.full;
                    return (
                      <div
                        key={t.slot}
                        onClick={() => setBookingTime(t.full)}
                        className={`cursor-pointer p-3 rounded-lg bg-[#1d2025] border text-center transition-all ${
                          isSelected
                            ? 'border-[#00e5ff] bg-[#272a30] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                            : 'border-[#3b494c]/30 hover:border-[#00e5ff]/40'
                        }`}
                      >
                        <span className="font-display font-bold text-[#e1e2ea] text-sm block">
                          {t.slot}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[#5be9ad]">
                          {t.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rider Details */}
              <div className="space-y-3 pt-3 border-t border-[#3b494c]/20">
                <label className="font-mono-tech text-[11px] uppercase text-[#bac9cc] block">
                  RIDER CONTACT &amp; SYMPTOMS
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="FULL NAME"
                      value={riderName}
                      onChange={(e) => {
                        setRiderName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 text-xs text-[#e1e2ea] placeholder:text-[#bac9cc]/50 focus:border-[#00e5ff] focus:outline-none"
                    />
                    {errors.name && (
                      <span className="text-[#ffb4ab] font-mono-tech text-[10px] block mt-1">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      value={riderEmail}
                      onChange={(e) => {
                        setRiderEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 text-xs text-[#e1e2ea] placeholder:text-[#bac9cc]/50 focus:border-[#00e5ff] focus:outline-none"
                    />
                    {errors.email && (
                      <span className="text-[#ffb4ab] font-mono-tech text-[10px] block mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      placeholder="PHONE NUMBER (+1)"
                      value={riderPhone}
                      onChange={(e) => {
                        setRiderPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 text-xs text-[#e1e2ea] placeholder:text-[#bac9cc]/50 focus:border-[#00e5ff] focus:outline-none"
                    />
                    {errors.phone && (
                      <span className="text-[#ffb4ab] font-mono-tech text-[10px] block mt-1">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="BIKE BRAND & MODEL (e.g. Turbo Levo Gen 3)"
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 text-xs text-[#e1e2ea] placeholder:text-[#bac9cc]/50 focus:border-[#00e5ff] focus:outline-none"
                  />
                </div>

                <textarea
                  rows={2}
                  placeholder="OBSERVED SYMPTOMS OR CUSTOM REQUESTS (e.g., motor cutting out under 500W, spongy rear brake, error code)"
                  value={riderNotes}
                  onChange={(e) => setRiderNotes(e.target.value)}
                  className="w-full bg-[#1d2025] rounded-lg border border-[#3b494c]/40 px-4 py-2.5 text-xs text-[#e1e2ea] placeholder:text-[#bac9cc]/50 focus:border-[#00e5ff] focus:outline-none"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-[#3b494c]/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded bg-[#272a30] text-[#e1e2ea] font-display text-sm uppercase font-bold hover:bg-[#32353b] transition-all cursor-pointer"
                >
                  &lt; BACK
                </button>
                <button
                  type="button"
                  onClick={handleNextToReview}
                  className="px-8 py-3 rounded bg-[#fd5915] text-[#511500] font-display text-sm uppercase font-bold hover:shadow-[0_0_20px_rgba(253,89,21,0.5)] transition-all cursor-pointer"
                >
                  REVIEW &amp; CONFIRM &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW, BREAKDOWN & CONFIRMATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <div className="font-mono-tech text-[11px] text-[#00e5ff] uppercase mb-1">
                  // BAY_CONFIRMATION_TELEMETRY
                </div>
                <h3 className="font-display text-2xl font-bold text-[#e1e2ea] mb-1">
                  CONFIRM RESERVATION SPECIFICATION
                </h3>
                <p className="text-xs md:text-sm text-[#bac9cc]">
                  Verify your appointment details. No upfront payment required until final inspection.
                </p>
              </div>

              {/* Dynamic Telemetry Summary Box */}
              <div className="bg-[#191c21] rounded-xl p-6 border border-[#3b494c]/30 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs md:text-sm">
                  <div>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                      PLATFORM &amp; MOTOR
                    </span>
                    <span className="font-display font-bold text-[#e1e2ea] block text-base">
                      {bikeType} // {motorSystem}
                    </span>
                    <span className="text-[#bac9cc] text-xs">
                      {bikeModel || 'Unspecified Model'}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                      SERVICE PACKAGE
                    </span>
                    <span className="font-display font-bold text-[#00e5ff] block text-base">
                      {selectedService}
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#5be9ad]">
                      42-Point Laser &amp; BMS Signoff
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                      SCHEDULED SLOT
                    </span>
                    <span className="font-bold text-[#e1e2ea] block">
                      {bookingDate} @ {bookingTime}
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#bac9cc]">
                      {bookingBay}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                      RIDER ASSIGNED
                    </span>
                    <span className="font-bold text-[#e1e2ea] block">
                      {riderName || 'Rider Contact'}
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#bac9cc]">
                      {riderEmail} // {riderPhone}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-[#3b494c]/20 pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                      ESTIMATED SERVICE FEE
                    </span>
                    <span className="font-mono-tech text-[10px] text-[#5be9ad]">
                      Taxes &amp; Shop Supplies Included
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold text-[#e1e2ea]">
                      ${servicePrice}.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Transmission Readiness Notice */}
              <div className="bg-[#1d2025] rounded-xl p-4 border border-[#3b494c]/40 flex items-start gap-3 text-left">
                <span className="material-symbols-outlined text-[#00e5ff] text-[22px] shrink-0 mt-0.5">
                  info
                </span>
                <div className="font-mono-tech text-[11px] text-[#bac9cc] leading-relaxed">
                  <span className="text-[#c3f5ff] font-bold block mb-0.5">
                    TRANSMISSION READINESS PROTOCOL
                  </span>
                  Submitting transmits a provisional bay reservation. Our Service Advisor
                  calls within 15 minutes during operating hours to verify parts compatibility.
                  Backend ready for webhook integration (Stripe, Square, Cal.com).
                </div>
              </div>

              {/* Success State Box */}
              {confirmedBooking && (
                <div className="bg-[#272a30] rounded-xl p-6 border-2 border-[#00e5ff] text-center space-y-3 shadow-[0_0_30px_rgba(0,229,255,0.25)]">
                  <span className="material-symbols-outlined text-[#5be9ad] text-[48px] animate-bounce">
                    check_circle
                  </span>
                  <h4 className="font-display text-2xl font-bold text-[#e1e2ea]">
                    BAY RESERVATION TRANSMITTED
                  </h4>
                  <p className="text-xs md:text-sm text-[#bac9cc] max-w-md mx-auto">
                    Your provisional diagnostic slot is locked into our workshop log. Diagnostic token generated:
                  </p>
                  <div className="inline-block bg-[#0b0e13] px-6 py-2 rounded border border-[#00e5ff] font-mono-tech font-bold text-[#00e5ff] tracking-widest text-lg">
                    {confirmedBooking.bookingId}
                  </div>
                  <p className="font-mono-tech text-[11px] text-[#bac9cc]/80">
                    A confirmation SMS with drop-off directions and telemetry prep instructions has been logged.
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded bg-[#101319] border border-[#3b494c] font-mono-tech text-xs text-[#c3f5ff] hover:bg-[#1d2025] cursor-pointer"
                    >
                      PRINT DIAGNOSTIC SLIP
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded bg-[#00e5ff] text-[#00363d] font-mono-tech text-xs font-bold hover:shadow-[0_0_15px_#00e5ff] cursor-pointer"
                    >
                      BOOK ANOTHER BIKE
                    </button>
                  </div>
                </div>
              )}

              {/* Buttons when not yet confirmed */}
              {!confirmedBooking && (
                <div className="flex justify-between pt-4 border-t border-[#3b494c]/20">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 rounded bg-[#272a30] text-[#e1e2ea] font-display text-sm uppercase font-bold hover:bg-[#32353b] transition-all cursor-pointer"
                  >
                    &lt; BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizeBooking}
                    className="px-8 py-3 rounded bg-[#fd5915] text-[#511500] font-display text-sm uppercase font-bold shadow-[0_0_20px_rgba(253,89,21,0.5)] hover:shadow-[0_0_30px_rgba(253,89,21,0.8)] transition-all cursor-pointer"
                  >
                    CONFIRM &amp; TRANSMIT BOOKING
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
