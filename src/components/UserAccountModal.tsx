import React from 'react';
import { ConfirmedBooking } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConfirmedBooking[];
  onCancelBooking: (id: string) => void;
  onNewBookingClick: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onNewBookingClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#191c21] rounded-2xl border border-[#3b494c]/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#3b494c]/30 mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">
              badge
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-[#e1e2ea]">
                RIDER TELEMETRY LOGS
              </h3>
              <p className="font-mono-tech text-[10px] text-[#bac9cc]">
                ACTIVE LAB RESERVATIONS &amp; DIAGNOSTIC TOKENS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#bac9cc] hover:text-[#e1e2ea] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <span className="material-symbols-outlined text-[#3b494c] text-[48px]">
              pending_actions
            </span>
            <p className="text-sm text-[#bac9cc]">
              No active bay reservations logged on this terminal yet.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNewBookingClick();
              }}
              className="px-6 py-2.5 rounded bg-[#00e5ff] text-[#00363d] font-display text-sm uppercase font-bold hover:shadow-[0_0_15px_#00e5ff] cursor-pointer"
            >
              BOOK FIRST LAB SLOT
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#bac9cc] font-mono-tech">
              <span>{bookings.length} RESERVATION(S) ON RECORD</span>
              <span className="text-[#5be9ad]">ALL BAYS READY</span>
            </div>

            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-[#101319] rounded-xl p-5 border border-[#3b494c]/40 space-y-3 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3b494c]/20 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech font-bold text-[#00e5ff] text-sm">
                      {b.bookingId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#272a30] text-[#5be9ad] font-mono-tech text-[10px]">
                      {b.status}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[11px] text-[#bac9cc]">
                    {b.date} @ {b.timeSlot.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#bac9cc] block font-mono-tech text-[10px]">
                      VEHICLE:
                    </span>
                    <span className="text-[#e1e2ea] font-bold">
                      {b.bikeModel} ({b.bikeType})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#bac9cc] block font-mono-tech text-[10px]">
                      PACKAGE:
                    </span>
                    <span className="text-[#c3f5ff] font-bold">
                      {b.serviceTier} (${b.servicePrice})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#bac9cc] block font-mono-tech text-[10px]">
                      BAY:
                    </span>
                    <span className="text-[#e1e2ea]">{b.bay}</span>
                  </div>
                  <div>
                    <span className="text-[#bac9cc] block font-mono-tech text-[10px]">
                      RIDER:
                    </span>
                    <span className="text-[#e1e2ea]">
                      {b.riderName} ({b.riderPhone})
                    </span>
                  </div>
                </div>

                {b.riderNotes && (
                  <div className="text-[11px] text-[#bac9cc] bg-[#191c21] p-2 rounded border border-[#3b494c]/20">
                    <span className="text-[#e1e2ea] font-mono-tech font-bold">
                      Notes:
                    </span>{' '}
                    {b.riderNotes}
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => onCancelBooking(b.bookingId)}
                    className="text-[#ffb4ab] hover:underline font-mono-tech text-[11px] cursor-pointer"
                  >
                    Cancel Reservation
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded bg-[#272a30] text-[#c3f5ff] font-mono-tech text-[11px] hover:bg-[#32353b] cursor-pointer"
                  >
                    Print Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
