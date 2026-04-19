"use client";

import StatCard from "./components/StatCard";

export default function LandingPage() {
  return (
    <div className="-m-8">
      {/* Hero */}
      <div className="relative overflow-hidden px-16 py-28 text-center flex flex-col items-center">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 40%, #99f6e4 70%, #ccfbf1 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #064e3b 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />

        <div className="relative z-10">
          <div
            className="inline-block text-[11px] uppercase tracking-[4px] text-emerald-700/60 mb-4 font-semibold"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            The Problem
          </div>
          <h1
            className="text-5xl font-extrabold text-emerald-900 mb-5 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Stop Burning<br />Good Medicine
          </h1>
          <p className="text-base text-emerald-800/50 max-w-lg mx-auto leading-relaxed">
            One pharmacy incinerates stock while another turns patients away.
            What if they could just... share?
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="max-w-4xl mx-auto -mt-12 relative z-10 px-8">
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
        className="text-center py-20 text-slate-400 italic text-lg animate-fade-in-up"
        style={{ animationDelay: "800ms", fontFamily: "var(--font-outfit)" }}
      >
        &ldquo;What if they could just... share?&rdquo;
      </div>
    </div>
  );
}
