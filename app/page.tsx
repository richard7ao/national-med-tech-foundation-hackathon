"use client";

import StatCard from "./components/StatCard";

export default function LandingPage() {
  return (
    <div className="-m-8">
      {/* Hero */}
      <div
        className="px-16 py-24 text-center flex flex-col items-center"
        style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0, #99f6e4)" }}
      >
        <div className="text-[11px] uppercase tracking-[3px] text-emerald-700/50 mb-3 font-medium">
          The Problem
        </div>
        <h1 className="text-4xl font-extrabold text-emerald-900 mb-4 tracking-tight">
          Stop Burning Good Medicine
        </h1>
        <p className="text-base text-emerald-800/60 max-w-xl mx-auto leading-relaxed">
          One pharmacy incinerates stock while another turns patients away.
          What if they could just... share?
        </p>
      </div>

      {/* Stat Cards */}
      <div className="max-w-4xl mx-auto -mt-10 relative z-10 px-8">
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            label="Medicines Destroyed / Year"
            value={110}
            prefix="£"
            suffix="m"
            subtitle="Perfectly good, unopened, in-date"
            accent="red"
            delay={0}
          />
          <StatCard
            label="Pharmacies Closed Since 2022"
            value={700}
            suffix="+"
            subtitle="4 closures per week in 2024"
            accent="amber"
            delay={200}
          />
          <StatCard
            label="Shortage Warnings / Week"
            value={28}
            subtitle="Patients turned away or delayed"
            accent="teal"
            delay={400}
          />
        </div>
      </div>

      {/* Transition */}
      <div
        className="text-center py-16 text-slate-400 italic text-base animate-fade-in-up"
        style={{ animationDelay: "800ms" }}
      >
        &ldquo;What if they could just... share?&rdquo;
      </div>
    </div>
  );
}
