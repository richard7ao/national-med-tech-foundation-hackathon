"use client";

import { useState } from "react";

interface RequestModalProps {
  medicineName: string;
  quantity: number;
  pricePerPack: number;
  wholesalePrice: number;
  pharmacyName: string;
  onClose: () => void;
}

export default function RequestModal({
  medicineName,
  quantity,
  pricePerPack,
  wholesalePrice,
  pharmacyName,
  onClose,
}: RequestModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const totalSavings = (wholesalePrice - pricePerPack) * quantity;
  const [delivery, setDelivery] = useState<"courier" | "pickup">("courier");

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
        <div className="glass-card-static p-10 max-w-md w-full mx-4 text-center shadow-[0_24px_48px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_8px_24px_rgba(52,211,153,0.3)]">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-outfit)" }}>Match Confirmed!</h3>
          <p className="text-sm text-slate-400">Both pharmacies have been notified</p>
          <button onClick={onClose} className="mt-7 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)]">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="glass-card-static p-8 max-w-md w-full mx-4 shadow-[0_24px_48px_rgba(0,0,0,0.12)]" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-slate-800 mb-6" style={{ fontFamily: "var(--font-outfit)" }}>Confirm Request</h3>

        <div className="space-y-4 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-slate-400">Medicine</span>
            <span className="font-semibold text-slate-800">{medicineName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Quantity</span>
            <span className="font-semibold text-slate-800">{quantity} packs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">From</span>
            <span className="font-semibold text-slate-800">{pharmacyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total</span>
            <span className="font-semibold text-slate-800">£{(pricePerPack * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-emerald-600 font-semibold">You save</span>
            <span className="text-emerald-600 font-bold text-lg">£{totalSavings.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-[10px] text-slate-500 uppercase tracking-[2px] font-semibold mb-3" style={{ fontFamily: "var(--font-outfit)" }}>Delivery Method</div>
          <div className="flex gap-3">
            <button
              onClick={() => setDelivery("courier")}
              className={`flex-1 py-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                delivery === "courier"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-[0_2px_8px_rgba(52,211,153,0.15)]"
                  : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              🚐 Courier — arrives by 2pm
            </button>
            <button
              onClick={() => setDelivery("pickup")}
              className={`flex-1 py-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                delivery === "pickup"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-[0_2px_8px_rgba(52,211,153,0.15)]"
                  : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
              }`}
            >
              🏪 Pickup
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 mb-6">
          A digital chain-of-custody record will be created automatically.
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => setConfirmed(true)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
