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
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i <= step
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm ${
                  i <= step ? "font-semibold text-emerald-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-16 h-0.5 bg-slate-200 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Success State */}
      {showSuccess ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl text-emerald-600">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Medicine Listed!</h2>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Scanner */}
          <ScannerUI onScanComplete={handleScanComplete} />

          {/* Right: Form */}
          <div>
            {step === 0 ? (
              <div className="bg-white rounded-2xl p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center min-h-[340px]">
                <p className="text-slate-400 text-sm">Scan a barcode to begin</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100">
                <div className="flex items-center gap-2.5 mb-5">
                  <Badge variant="verified" pulse />
                  <span className="text-[11px] text-slate-400 font-medium">Pack authenticated via EMVS</span>
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
                      <div className="text-[10px] text-slate-500 uppercase tracking-[1.5px] font-medium mb-1.5">Quantity</div>
                      <div className="border-2 border-emerald-400 rounded-lg px-4 py-2.5 font-semibold text-slate-800">5 packs</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-[1.5px] font-medium mb-1.5">Price per Pack</div>
                      <div className="border-2 border-emerald-400 rounded-lg px-4 py-2.5 font-semibold text-slate-800">£3.20</div>
                      <div className="text-[10px] text-emerald-600 mt-1">40% below wholesale (£5.34)</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleList}
                  className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
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
      <div className="text-[10px] text-slate-500 uppercase tracking-[1.5px] font-medium mb-1.5">{label}</div>
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-800 font-medium">
        {value}
      </div>
    </div>
  );
}
