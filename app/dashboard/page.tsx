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
    <div>
      {/* Alert Banner */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-4 py-3 mb-5 flex items-center gap-3">
        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
          3
        </div>
        <span className="text-sm text-emerald-800">
          <strong>3 items on your watch list are available nearby</strong> — Metformin 500mg highlighted
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Active Listings", value: perf.activeListings },
          { label: "Completed Sales", value: perf.completedSales, color: "text-emerald-600" },
          { label: "Revenue Recovered", value: `£${perf.revenueRecovered.toLocaleString()}`, color: "text-emerald-600" },
          { label: "Expiring Soon", value: perf.expiringSoon, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="text-[11px] text-slate-400 uppercase tracking-wide">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color ?? "text-slate-800"}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <span className="font-semibold text-[15px] text-slate-800">Your Surplus Listings</span>
          <Link
            href="/list-surplus"
            className="bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors"
          >
            + List Surplus
          </Link>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-2.5 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
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
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-slate-100 items-center text-sm"
            >
              <div>
                <div className="font-semibold text-slate-800">{formatMedicineName(med)}</div>
                <div className="text-[11px] text-slate-400">
                  {med.packSize} {med.form} · {med.manufacturer}
                </div>
              </div>
              <div className="text-slate-600">{listing.quantity} packs</div>
              <div className="text-slate-600">
                {new Date(listing.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </div>
              <div className="text-slate-600">£{listing.pricePerPack.toFixed(2)}/pack</div>
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
