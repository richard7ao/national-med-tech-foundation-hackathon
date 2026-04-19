"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { networkStats } from "../data/stats";

const perf = networkStats.pharmacyPerformance;
const PERIODS = ["7D", "30D", "90D", "1Y"];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30D");

  return (
    <div>
      {/* Period Selector */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-bold text-slate-800">Your Performance</h2>
        <div className="flex gap-1 bg-slate-100 rounded-md p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                p === period
                  ? "bg-white text-slate-800 font-semibold shadow-sm"
                  : "text-slate-400"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Row: Revenue + Waste */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">Revenue Recovered</div>
          <div className="text-xl font-bold text-slate-800 mb-3">
            £{perf.revenueRecovered.toLocaleString()}{" "}
            <span className="text-xs text-emerald-500 font-medium">+18% ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={perf.revenueHistory}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">Waste Avoided (packs)</div>
          <div className="text-xl font-bold text-slate-800 mb-3">
            47{" "}
            <span className="text-xs text-emerald-500 font-medium">+12% ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={perf.wasteAvoided}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#34d399" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Top Medicines + CO2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-sm font-semibold text-slate-800 mb-3">Top Traded Medicines</div>
          <div className="flex flex-col gap-2.5">
            {perf.topMedicines.map((m) => (
              <div key={m.medicineId} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{m.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${(m.count / perf.topMedicines[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 w-7 text-right">{m.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">CO₂ Avoided This Month</div>
          <div className="text-xl font-bold text-emerald-600 mb-3">142 kg</div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={perf.co2Avoided}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
