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
      <div className="bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)]" style={{ aspectRatio: "4/3" }}>
        {/* Viewfinder */}
        <div className="w-[60%] h-[60%] border-2 border-white/40 rounded-lg relative">
          {/* Corner brackets */}
          <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-[3px] border-l-[3px] border-emerald-400 rounded-tl" />
          <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-[3px] border-r-[3px] border-emerald-400 rounded-tr" />
          <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-[3px] border-l-[3px] border-emerald-400 rounded-bl" />
          <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-[3px] border-r-[3px] border-emerald-400 rounded-br" />

          {/* Mock barcode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[2px] items-end h-10">
            {[2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1].map((w, i) => (
              <div
                key={i}
                className="bg-white/70"
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

        {/* Label */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-[11px]">
          Position FMD barcode within frame
        </div>
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
      >
        {scanning ? "Scanning..." : "Scan Barcode"}
      </button>
    </div>
  );
}
