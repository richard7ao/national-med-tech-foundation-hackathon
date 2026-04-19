"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScannerUI from "../components/ScannerUI";
import Badge from "../components/Badge";

const STEPS = ["Scan", "Confirm", "List"];

const MOCK_SCAN_RESULT = {
  name: "Metformin 500mg Tablets",
  batchNumber: "AZ20260112",
  expiryDate: "Aug 2026",
  manufacturer: "AstraZeneca",
  packSize: "56 tablets",
  fmdSerial: "01-08714789-012345-AZ",
};

export default function ListSurplusPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleScanComplete = () => setStep(1);

  const handleList = () => {
    setStep(2);
    setShowSuccess(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  i <= step
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_4px_12px_rgba(52,211,153,0.3)]"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                style={{ fontFamily: "var(--font-outfit)" }}
                className={`text-sm font-semibold ${
                  i <= step ? "text-emerald-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-20 h-0.5 bg-slate-200" />
            )}
          </div>
        ))}
      </div>

      {/* Success State */}
      {showSuccess ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(52,211,153,0.35)]">
            <span className="text-3xl text-white font-bold">✓</span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-outfit)" }}
            className="text-2xl font-bold text-slate-800 mb-2"
          >
            Medicine Listed!
          </h2>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Scanner */}
          <ScannerUI onScanComplete={handleScanComplete} />

          {/* Right: Form */}
          <div>
            {step === 0 ? (
              <div className="glass-card-static p-8 flex items-center justify-center min-h-[340px]">
                <p className="text-slate-400 text-sm">Scan a barcode to begin</p>
              </div>
            ) : (
              <div className="glass-card-static p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Badge variant="verified" pulse />
                  <span className="text-[11px] text-slate-400 font-medium">
                    Pack authenticated via EMVS
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-sm">
                  <Field label="Medicine Name" value={MOCK_SCAN_RESULT.name} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Batch Number" value={MOCK_SCAN_RESULT.batchNumber} />
                    <Field label="Expiry Date" value={MOCK_SCAN_RESULT.expiryDate} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Manufacturer" value={MOCK_SCAN_RESULT.manufacturer} />
                    <Field label="Pack Size" value={MOCK_SCAN_RESULT.packSize} />
                  </div>

                  <hr className="border-slate-100 my-1" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        style={{ fontFamily: "var(--font-outfit)" }}
                        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
                      >
                        Quantity
                      </div>
                      <div className="bg-slate-50/80 border border-emerald-300 rounded-xl px-4 py-3 font-semibold text-slate-800">
                        5 packs
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ fontFamily: "var(--font-outfit)" }}
                        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
                      >
                        Price per Pack
                      </div>
                      <div className="bg-slate-50/80 border border-emerald-300 rounded-xl px-4 py-3 font-semibold text-slate-800">
                        £3.20
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-1.5 font-medium">
                        40% below wholesale (£5.34)
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleList}
                  className="w-full mt-7 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)] hover:shadow-[0_6px_20px_rgba(52,211,153,0.4)]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  List Medicine
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{ fontFamily: "var(--font-outfit)" }}
        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
      >
        {label}
      </div>
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium">
        {value}
      </div>
    </div>
  );
}
