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
    <div className="space-y-7">
      {/* Header + Period Selector */}
      <div className="flex justify-between items-center">
        <h2
          className="text-xl font-bold text-slate-800"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Your Performance
        </h2>
        <div className="flex gap-1 bg-white/60 backdrop-blur rounded-xl p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-xs transition-colors ${
                p === period
                  ? "bg-white text-slate-800 font-semibold shadow-sm rounded-lg"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Row: Revenue + Waste */}
      <div className="grid grid-cols-2 gap-7">
        {/* Revenue Recovered */}
        <div className="glass-card p-7">
          <div
            className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Revenue Recovered
          </div>
          <div
            className="text-2xl font-bold text-slate-800 mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
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

        {/* Waste Avoided */}
        <div className="glass-card p-7">
          <div
            className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Waste Avoided (packs)
          </div>
          <div
            className="text-2xl font-bold text-slate-800 mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
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
      <div className="grid grid-cols-2 gap-7">
        {/* Top Traded Medicines */}
        <div className="glass-card p-7">
          <div
            className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Top Traded Medicines
          </div>
          <div className="flex flex-col gap-4">
            {perf.topMedicines.map((m) => (
              <div key={m.medicineId} className="flex justify-between items-center text-sm">
                <span
                  className="text-slate-600"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {m.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-emerald-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                      style={{ width: `${(m.count / perf.topMedicines[0].count) * 100}%` }}
                    />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 w-7 text-right"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {m.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CO₂ Avoided */}
        <div className="glass-card p-7">
          <div
            className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            CO₂ Avoided This Month
          </div>
          <div
            className="text-2xl font-bold text-emerald-600 mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            142 kg
          </div>
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
