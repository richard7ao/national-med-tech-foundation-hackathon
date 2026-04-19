"use client";

import AnimatedCounter from "./AnimatedCounter";

type AccentColor = "red" | "amber" | "teal" | "green";

const accentStyles: Record<AccentColor, { gradient: string; text: string; glow: string }> = {
  red: { gradient: "from-red-500 to-rose-500", text: "text-red-500", glow: "shadow-[0_4px_20px_rgba(239,68,68,0.15)]" },
  amber: { gradient: "from-amber-500 to-orange-500", text: "text-amber-600", glow: "shadow-[0_4px_20px_rgba(245,158,11,0.15)]" },
  teal: { gradient: "from-teal-500 to-cyan-500", text: "text-teal-600", glow: "shadow-[0_4px_20px_rgba(20,184,166,0.15)]" },
  green: { gradient: "from-emerald-400 to-emerald-600", text: "text-emerald-600", glow: "shadow-[0_4px_20px_rgba(52,211,153,0.15)]" },
};

interface StatCardProps {
  label: string;
  value: number;
  subtitle?: string;
  accent?: AccentColor;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  subtitle,
  accent = "green",
  prefix = "",
  suffix = "",
  delay = 0,
}: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      className={`glass-card p-7 animate-fade-in-up ${styles.glow}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-10 h-1 rounded-full bg-gradient-to-r ${styles.gradient} mb-5`} />
      <div className="text-[10px] uppercase tracking-[2px] text-slate-400 mb-3 font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>
        {label}
      </div>
      <div className={`text-3xl font-extrabold ${styles.text} mb-1`} style={{ fontFamily: "var(--font-outfit)" }}>
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      {subtitle && (
        <div className="text-[13px] text-slate-400 mt-2 leading-relaxed">{subtitle}</div>
      )}
    </div>
  );
}
