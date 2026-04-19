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
    <div>
      {/* Animated Counters */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Medicines Redistributed", value: networkStats.totalRedistributed, suffix: " packs", color: "text-emerald-600" },
          { label: "Value Saved", value: networkStats.totalValueSaved, prefix: "£", color: "text-emerald-600" },
          { label: "CO₂ Avoided", value: networkStats.totalCO2Avoided, suffix: " kg", color: "text-green-600" },
          { label: "Pharmacies Active", value: networkStats.activePharmacies, color: "text-teal-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">{stat.label}</div>
            <div className={`text-[28px] font-extrabold ${stat.color}`}>
              <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
          </div>
        ))}
      </div>

      {/* Map + Side Panels */}
      <div className="grid grid-cols-2 gap-4">
        {/* Map */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-800">
            Network Map — SE London
          </div>
          <div style={{ height: 300 }}>
            <PharmacyMap
              markers={clusterMarkers}
              center={[51.462, -0.065]}
              zoom={12}
            />
          </div>
        </div>

        {/* Right: Shortages + Waste Trend */}
        <div className="flex flex-col gap-4">
          {/* Trending Shortages */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="text-sm font-semibold text-slate-800 mb-3">Trending Shortages</div>
            <div className="flex flex-col gap-2">
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
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex-1">
            <div className="text-sm font-semibold text-slate-800 mb-1">Waste Reduction Trend</div>
            <div className="text-[11px] text-emerald-600 mb-2">↓ 34% month-over-month decline</div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={networkStats.wasteReductionTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
