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
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Match Confirmed!</h3>
          <p className="text-sm text-slate-400">Both pharmacies have been notified</p>
          <button onClick={onClose} className="mt-6 bg-emerald-400 text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Confirm Request</h3>

        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Medicine</span>
            <span className="font-medium text-slate-800">{medicineName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Quantity</span>
            <span className="font-medium text-slate-800">{quantity} packs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">From</span>
            <span className="font-medium text-slate-800">{pharmacyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total</span>
            <span className="font-medium text-slate-800">£{(pricePerPack * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-semibold">You save</span>
            <span className="text-emerald-600 font-bold text-lg">£{totalSavings.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery toggle */}
        <div className="mb-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wide mb-2">Delivery Method</div>
          <div className="flex gap-2">
            <button
              onClick={() => setDelivery("courier")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                delivery === "courier"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              🚐 Courier — arrives by 2pm
            </button>
            <button
              onClick={() => setDelivery("pickup")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                delivery === "pickup"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              🏪 Pickup
            </button>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mb-4">
          A digital chain-of-custody record will be created automatically.
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-500">
            Cancel
          </button>
          <button
            onClick={() => setConfirmed(true)}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-emerald-400 hover:bg-emerald-500 text-white transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
