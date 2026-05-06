"use client";

import { useState } from "react";
import { getTransactionsForPharmacy } from "../data/transactions";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import { getPharmacyById, CURRENT_PHARMACY_ID } from "../data/pharmacies";
import Timeline from "../components/Timeline";

const myTransactions = getTransactionsForPharmacy(CURRENT_PHARMACY_ID);

export default function TransactionsPage() {
  const [selectedId, setSelectedId] = useState(myTransactions[0]?.id ?? "");
  const selected = myTransactions.find((t) => t.id === selectedId);

  return (
    <div
      className="grid gap-10"
      style={{ gridTemplateColumns: "340px 1fr", height: "calc(100vh - 120px)" }}
    >
      {/* Left: Transaction List */}
      <div className="overflow-y-auto">
        <div
          className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-4"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Recent Transactions
        </div>
        <div className="flex flex-col gap-4">
          {myTransactions.map((txn) => {
            const med = getMedicineById(txn.medicineId);
            const isSeller = txn.sellerPharmacyId === CURRENT_PHARMACY_ID;
            const counterpartyId = isSeller ? txn.buyerPharmacyId : txn.sellerPharmacyId;
            const counterparty = getPharmacyById(counterpartyId);
            const isActive = txn.id === selectedId;

            return (
              <button
                key={txn.id}
                onClick={() => setSelectedId(txn.id)}
                className={`text-left rounded-2xl p-7 border-2 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
                    : "bg-white border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-emerald-300"
                }`}
              >
                <div
                  className={`font-semibold text-sm ${isActive ? "" : "text-slate-800"}`}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {med ? formatMedicineName(med) : "Unknown"}
                </div>
                <div className={`text-[11px] mt-1 ${isActive ? "opacity-80" : "text-slate-400"}`}>
                  {isSeller ? "→" : "←"} {counterparty?.name ?? "Unknown"} · {txn.quantity} packs
                </div>
                <div className={`text-[10px] mt-1.5 ${isActive ? "opacity-60" : "text-slate-300"}`}>
                  {new Date(txn.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Audit Trail */}
      {selected && (
        <div className="glass-card-static p-10 overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2
                className="text-xl font-bold text-slate-800"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {getMedicineById(selected.medicineId)
                  ? formatMedicineName(getMedicineById(selected.medicineId)!)
                  : "Unknown"}
              </h2>
              <div
                className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mt-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Batch #{selected.auditTrail[0]?.description.match(/#(\w+)/)?.[1] ?? "N/A"} · {selected.quantity} packs
              </div>
            </div>
            <button className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 font-medium hover:bg-slate-100 transition-colors">
              Download PDF ↓
            </button>
          </div>

          <Timeline events={selected.auditTrail} />

          <div
            className="text-[11px] text-slate-400 mt-8 pt-6 border-t border-slate-200"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            This record is immutable and available to GPhC/MHRA inspectors on request.
          </div>
        </div>
      )}
    </div>
  );
}
