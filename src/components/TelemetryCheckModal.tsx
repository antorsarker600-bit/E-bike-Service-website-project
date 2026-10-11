import React, { useState } from 'react';
import { OEM_ERROR_CODES } from '../data/mockData';

interface TelemetryCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiagnosticToBooking: (serviceName: string, notes: string) => void;
}

export const TelemetryCheckModal: React.FC<TelemetryCheckModalProps> = ({
  isOpen,
  onClose,
  onApplyDiagnosticToBooking,
}) => {
  const [motorType, setMotorType] = useState('Bosch');
  const [packVoltage, setPackVoltage] = useState('48V');
  const [symptom, setSymptom] = useState('Cutouts under 500W+ load');
  const [selectedErrorCode, setSelectedErrorCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    healthScore: number;
    faultCode: string;
    diagnosis: string;
    recommendedTier: string;
    recommendedBay: string;
    actionProtocol: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleRunDiagnostic = () => {
    setIsScanning(true);
    setDiagnosticResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (selectedErrorCode) {
        const found = OEM_ERROR_CODES.find((c) => c.code === selectedErrorCode);
        if (found) {
          setDiagnosticResult({
            healthScore: 78.4,
            faultCode: `${found.brand} #${found.code}`,
            diagnosis: found.desc,
            recommendedTier: found.tier,
            recommendedBay: 'Bay 01 - Dyno Bench',
            actionProtocol: found.solution,
          });
          return;
        }
      }

      // Default diagnosis according to symptom
      if (symptom.includes('Cutout') || symptom.includes('Battery')) {
        setDiagnosticResult({
          healthScore: 81.2,
          faultCode: 'ERR-BMS-DELTA-EXCEEDED',
          diagnosis: 'High internal resistance variance detected on cell group #04 (>0.080V delta under load).',
          recommendedTier: 'Battery Restoration & Load Bench ($129)',
          recommendedBay: 'Bay 02 - High-Voltage Lab',
          actionProtocol: 'Isolate pack in Bay 02 bunker, run 10A discharge load curve and balance cells to 0.005V.',
        });
      } else if (symptom.includes('Brake')) {
        setDiagnosticResult({
          healthScore: 89.0,
          faultCode: 'HYD-PRESSURE-LEAK-02',
          diagnosis: 'Air entrapment in rear hydraulic lever reservoir causing sponge caliper bite.',
          recommendedTier: 'Hydraulic Overhaul & Bleed ($65)',
          recommendedBay: 'Bay 03 - Rapid Service & Hydraulic Bleed',
          actionProtocol: 'Dual vacuum fluid flush (Mineral/DOT) and rotor runout truing under 0.05mm.',
        });
      } else {
        setDiagnosticResult({
          healthScore: 74.5,
          faultCode: 'DRIVE-GEAR-WEAR-V2',
          diagnosis: 'Clutch freewheel drag and grease breakdown in planetary gearbox casing.',
          recommendedTier: 'Master Volt Overhaul ($249)',
          recommendedBay: 'Bay 04 - Master Overhaul Clean Room',
          actionProtocol: 'Full motor teardown, ultrasonic wash, PTFE grease packing and 42-point dyno road run.',
        });
      }
    }, 1200);
  };

  const handleApplyToBooking = () => {
    if (!diagnosticResult) return;
    onApplyDiagnosticToBooking(
      diagnosticResult.recommendedTier,
      `Tele-Diagnostic Fault: [${diagnosticResult.faultCode}] ${diagnosticResult.diagnosis}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#191c21] rounded-2xl border border-[#00e5ff]/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-[0_0_40px_rgba(0,229,255,0.2)] relative">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3b494c]/30 mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">
              biotech
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-[#e1e2ea]">
                LIVE TELEMETRY SELF-DIAGNOSTIC
              </h3>
              <p className="font-mono-tech text-[10px] text-[#bac9cc]">
                SIMULATE OEM CAN-BUS BUS SWEEP &amp; CELL HEALTH
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

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-tech text-[10px] uppercase text-[#bac9cc] block mb-1">
                MOTOR SYSTEM
              </label>
              <select
                value={motorType}
                onChange={(e) => setMotorType(e.target.value)}
                className="w-full bg-[#101319] rounded-lg border border-[#3b494c]/50 p-2.5 text-[#e1e2ea] focus:border-[#00e5ff] focus:outline-none font-mono-tech"
              >
                <option value="Bosch">Bosch Performance / CX</option>
                <option value="Shimano">Shimano STEPS EP8</option>
                <option value="Bafang">Bafang M620 / BBSHD</option>
                <option value="Specialized">Specialized / Brose 2.2</option>
                <option value="72V Custom">Custom High-Voltage (72V)</option>
              </select>
            </div>

            <div>
              <label className="font-mono-tech text-[10px] uppercase text-[#bac9cc] block mb-1">
                PACK NOMINAL VOLTAGE
              </label>
              <select
                value={packVoltage}
                onChange={(e) => setPackVoltage(e.target.value)}
                className="w-full bg-[#101319] rounded-lg border border-[#3b494c]/50 p-2.5 text-[#e1e2ea] focus:border-[#00e5ff] focus:outline-none font-mono-tech"
              >
                <option value="36V">36V (10S Lithium)</option>
                <option value="48V">48V (13S Lithium Standard)</option>
                <option value="52V">52V (14S Performance)</option>
                <option value="72V">72V (20S Hyper-Moto)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono-tech text-[10px] uppercase text-[#bac9cc] block mb-1">
              OBSERVED ANOMALY / SYMPTOM
            </label>
            <select
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              className="w-full bg-[#101319] rounded-lg border border-[#3b494c]/50 p-2.5 text-[#e1e2ea] focus:border-[#00e5ff] focus:outline-none"
            >
              <option value="Cutouts under 500W+ load">
                Motor abruptly cuts out under high wattage / hill climb
              </option>
              <option value="Battery drops 40% to 0%">
                Battery state-of-charge suddenly plunges from 40% to zero
              </option>
              <option value="Spongy brake lever">
                Spongy rear brake lever and excessive rotor squeal
              </option>
              <option value="Grinding planetary noise">
                Acoustic grinding noise from mid-drive motor gear cluster
              </option>
              <option value="OEM Error Code on HUD">
                Specific OEM fault code showing on display computer
              </option>
            </select>
          </div>

          {/* Error code shortcuts */}
          <div>
            <label className="font-mono-tech text-[10px] uppercase text-[#bac9cc] block mb-1">
              OR LOOKUP KNOWN OEM ERROR CODE (OPTIONAL)
            </label>
            <div className="flex flex-wrap gap-2">
              {OEM_ERROR_CODES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedErrorCode(item.code)}
                  className={`font-mono-tech text-[10px] px-2.5 py-1 rounded transition-all cursor-pointer ${
                    selectedErrorCode === item.code
                      ? 'bg-[#00e5ff] text-[#00363d] font-bold'
                      : 'bg-[#101319] text-[#bac9cc] border border-[#3b494c]/40 hover:text-[#e1e2ea]'
                  }`}
                >
                  {item.brand} {item.code}
                </button>
              ))}
              {selectedErrorCode && (
                <button
                  type="button"
                  onClick={() => setSelectedErrorCode('')}
                  className="font-mono-tech text-[10px] px-2 py-1 text-[#ffb4ab] underline"
                >
                  Clear Code
                </button>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleRunDiagnostic}
              disabled={isScanning}
              className="w-full py-3 rounded bg-[#00e5ff] text-[#00363d] font-display text-sm uppercase font-bold hover:shadow-[0_0_20px_#00e5ff] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                troubleshoot
              </span>
              <span>{isScanning ? 'RUNNING CAN-BUS SIMULATION...' : 'EXECUTE TELEMETRY SWEEP'}</span>
            </button>
          </div>
        </div>

        {/* Scan in progress */}
        {isScanning && (
          <div className="mt-6 p-4 rounded-xl bg-[#101319] border border-[#00e5ff]/30 text-center space-y-2">
            <div className="w-full bg-[#1d2025] h-2 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full w-2/3 animate-pulse" />
            </div>
            <p className="font-mono-tech text-[11px] text-[#00e5ff]">
              INTERROGATING BMS CONTROLLER &amp; MOTOR ENCODER TOLERANCES...
            </p>
          </div>
        )}

        {/* Diagnostic Results */}
        {diagnosticResult && !isScanning && (
          <div className="mt-6 p-5 rounded-xl bg-[#101319] border-2 border-[#5be9ad] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono-tech text-[10px] text-[#5be9ad] uppercase">
                  SWEEP VERIFICATION COMPLETE
                </span>
                <h4 className="font-display text-lg font-bold text-[#e1e2ea]">
                  {diagnosticResult.faultCode}
                </h4>
              </div>
              <div className="text-right">
                <span className="font-mono-tech text-[10px] text-[#bac9cc] block">
                  HEALTH SCORE
                </span>
                <span className="font-display text-2xl font-bold text-[#5be9ad]">
                  {diagnosticResult.healthScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-[#bac9cc] leading-relaxed">
              {diagnosticResult.diagnosis}
            </p>

            <div className="p-3 rounded bg-[#1d2025] border border-[#3b494c]/40 font-mono-tech text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#bac9cc]">PRESCRIBED PROTOCOL:</span>
                <span className="text-[#c3f5ff] font-bold">
                  {diagnosticResult.recommendedTier}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#bac9cc]">RECOMMENDED WORKBAY:</span>
                <span className="text-[#5be9ad]">{diagnosticResult.recommendedBay}</span>
              </div>
            </div>

            <div className="text-[11px] text-[#bac9cc]">
              <span className="font-bold text-[#e1e2ea]">Action Step: </span>
              {diagnosticResult.actionProtocol}
            </div>

            <button
              type="button"
              onClick={handleApplyToBooking}
              className="w-full py-3 rounded bg-[#fd5915] text-[#511500] font-display text-sm uppercase font-bold hover:shadow-[0_0_20px_rgba(253,89,21,0.5)] transition-all cursor-pointer"
            >
              PRE-FILL RESERVATION WITH THIS REPORT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
