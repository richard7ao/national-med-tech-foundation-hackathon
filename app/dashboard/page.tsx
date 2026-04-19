"use client";

import Link from "next/link";
import { getListingsForPharmacy } from "../data/listings";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import { networkStats } from "../data/stats";
import Badge from "../components/Badge";

const greenfieldListings = getListingsForPharmacy("ph-greenfield");
const perf = networkStats.pharmacyPerformance;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Alert Banner */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-8 py-6 flex items-center gap-5 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-[0_4px_12px_rgba(52,211,153,0.3)]">
          3
        </div>
        <span className="text-sm text-emerald-800">
          <strong>3 items on your watch list are available nearby</strong> — Metformin 500mg highlighted
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Active Listings", value: perf.activeListings },
          { label: "Completed Sales", value: perf.completedSales, color: "text-emerald-600" },
          { label: "Revenue Recovered", value: `£${perf.revenueRecovered.toLocaleString()}`, color: "text-emerald-600" },
          { label: "Expiring Soon", value: perf.expiringSoon, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-8 border-2 border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            <div
              className="text-[10px] uppercase tracking-[1px] font-semibold text-slate-400 mb-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {stat.label}
            </div>
            <div
              className={`text-2xl font-extrabold ${stat.color ?? "text-slate-800"}`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-center">
          <h2
            className="font-bold text-lg text-slate-800"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Your Surplus Listings
          </h2>
          <Link
            href="/list-surplus"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
          >
            + List Surplus
          </Link>
        </div>

        {/* Table Header */}
        <div
          className="grid grid-cols-[3fr_1fr_1fr_1fr_1.5fr] px-8 py-4 bg-slate-50 text-[10px] uppercase tracking-[1px] text-slate-400 font-semibold border-b border-slate-200"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <div>Medicine</div>
          <div>Qty</div>
          <div>Expiry</div>
          <div>Price</div>
          <div>Status</div>
        </div>

        {/* Table Rows */}
        {greenfieldListings.map((listing) => {
          const med = getMedicineById(listing.medicineId);
          if (!med) return null;
          const badgeVariant = listing.status === "available" ? "available"
            : listing.status === "requested" ? "requested"
            : "matched";
          const badgeLabel = listing.status === "requested" ? "1 Request" : undefined;
          return (
            <div
              key={listing.id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr_1.5fr] px-8 py-5 border-b border-slate-100 items-center text-sm hover:bg-slate-50/60 transition-colors"
            >
              <div className="pr-4">
                <div
                  className="font-semibold text-slate-800"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {formatMedicineName(med)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {med.packSize} {med.form} · {med.manufacturer}
                </div>
              </div>
              <div className="text-slate-600">{listing.quantity} packs</div>
              <div className="text-slate-600">
                {new Date(listing.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </div>
              <div className="text-slate-600 font-medium">£{listing.pricePerPack.toFixed(2)}/pack</div>
              <div className="flex items-center gap-2">
                <Badge variant={badgeVariant} label={badgeLabel} />
                {listing.fmdVerified && <Badge variant="verified" label="✓ FMD" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
