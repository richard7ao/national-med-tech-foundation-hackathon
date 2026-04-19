"use client";

import { useState } from "react";

interface ScannerUIProps {
  onScanComplete: () => void;
}

export default function ScannerUI({ onScanComplete }: ScannerUIProps) {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanComplete();
    }, 1500);
  };

  return (
    <div>
      <div className="bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]" style={{ aspectRatio: "4/3" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />

        {/* Viewfinder */}
        <div className="w-[60%] h-[60%] border-2 border-white/30 rounded-xl relative">
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-emerald-400 rounded-tl-lg" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-emerald-400 rounded-tr-lg" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-emerald-400 rounded-bl-lg" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-emerald-400 rounded-br-lg" />

          {/* Mock barcode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[2px] items-end h-10">
            {[2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1].map((w, i) => (
              <div
                key={i}
                className="bg-white/60"
                style={{
                  width: `${w}px`,
                  height: `${60 + (i % 3) * 15}%`,
                }}
              />
            ))}
          </div>

          {/* Scan line */}
          {scanning && (
            <div
              className="absolute left-[5%] right-[5%] h-[2px] animate-scan-line"
              style={{ background: "linear-gradient(90deg, transparent, #34d399, transparent)" }}
            />
          )}
        </div>

        <div className="absolute bottom-5 left-0 right-0 text-center text-white/40 text-[12px] font-medium tracking-wide">
          Position FMD barcode within frame
        </div>
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-emerald-300 disabled:to-teal-300 text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
      >
        {scanning ? "Scanning..." : "Scan Barcode"}
      </button>
    </div>
  );
}
