"use client";

import StatCard from "./components/StatCard";

export default function LandingPage() {
  return (
    <div className="-m-6">
      {/* Hero */}
      <div
        className="px-10 py-12 text-center"
        style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0, #99f6e4)" }}
      >
        <div className="text-xs uppercase tracking-[2px] text-emerald-700/60 mb-2">
          The Problem
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-3">
          Stop Burning Good Medicine
        </h1>
        <p className="text-sm text-emerald-800/70 max-w-lg mx-auto">
          One pharmacy incinerates stock while another turns patients away.
          What if they could just... share?
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-5 px-10 py-8">
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

      {/* Transition */}
      <div
        className="text-center pb-10 text-slate-500 italic text-[15px] animate-fade-in-up"
        style={{ animationDelay: "800ms" }}
      >
        &ldquo;What if they could just... share?&rdquo;
      </div>
    </div>
  );
}
