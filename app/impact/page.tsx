"use client";

import dynamic from "next/dynamic";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { networkStats, pharmacyClusters } from "../data/stats";
import AnimatedCounter from "../components/AnimatedCounter";
import Badge from "../components/Badge";
import type { MapMarker } from "../components/PharmacyMap";

const PharmacyMap = dynamic(() => import("../components/PharmacyMap"), { ssr: false });

const clusterMarkers: MapMarker[] = pharmacyClusters.map((c, i) => ({
  id: `cluster-${i}`,
  lat: c.lat,
  lng: c.lng,
  label: c.label,
  count: c.count,
}));

export default function ImpactPage() {
  return (
    <div className="space-y-7">
      {/* Animated Counters */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: "Medicines Redistributed", value: networkStats.totalRedistributed, suffix: " packs", color: "text-emerald-600" },
          { label: "Value Saved", value: networkStats.totalValueSaved, prefix: "£", color: "text-emerald-600" },
          { label: "CO₂ Avoided", value: networkStats.totalCO2Avoided, suffix: " kg", color: "text-green-600" },
          { label: "Pharmacies Active", value: networkStats.activePharmacies, color: "text-teal-600" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-7 text-center">
            <div
              className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-2"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {stat.label}
            </div>
            <div
              className={`text-[32px] font-extrabold ${stat.color}`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
          </div>
        ))}
      </div>

      {/* Map + Side Panels */}
      <div className="grid grid-cols-2 gap-7">
        {/* Map */}
        <div className="glass-card-static overflow-hidden">
          <div
            className="px-6 py-4 border-b border-white/30 text-base font-bold text-slate-800"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Network Map — SE London
          </div>
          <div style={{ height: "400px" }}>
            <PharmacyMap
              markers={clusterMarkers}
              center={[51.462, -0.065]}
              zoom={12}
            />
          </div>
        </div>

        {/* Right: Shortages + Waste Trend */}
        <div className="flex flex-col gap-7">
          {/* Trending Shortages */}
          <div className="glass-card p-7">
            <div
              className="text-base font-bold text-slate-800 mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Trending Shortages
            </div>
            <div className="flex flex-col gap-3">
              {networkStats.trendingShortages.map((s) => (
                <div key={s.medicineId} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        s.severity === "critical" ? "bg-red-500"
                          : s.severity === "high" ? "bg-amber-500"
                          : "bg-yellow-400"
                      }`}
                    />
                    <span className="text-slate-600">{s.medicineName}</span>
                  </div>
                  <Badge variant={s.severity} />
                </div>
              ))}
            </div>
          </div>

          {/* Waste Reduction Trend */}
          <div className="glass-card p-7 flex-1">
            <div
              className="text-base font-bold text-slate-800 mb-1"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Waste Reduction Trend
            </div>
            <div className="text-[11px] text-emerald-600 mb-3">↓ 34% month-over-month decline</div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={networkStats.wasteReductionTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
