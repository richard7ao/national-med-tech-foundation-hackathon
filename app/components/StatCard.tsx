"use client";

import AnimatedCounter from "./AnimatedCounter";

type AccentColor = "red" | "amber" | "teal" | "green";

const accentStyles: Record<AccentColor, { border: string; text: string }> = {
  red: { border: "border-l-red-500", text: "text-red-500" },
  amber: { border: "border-l-amber-500", text: "text-amber-600" },
  teal: { border: "border-l-teal-500", text: "text-teal-600" },
  green: { border: "border-l-emerald-400", text: "text-emerald-600" },
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
      className={`bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-l-4 ${styles.border} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </div>
      <div className={`text-3xl font-extrabold ${styles.text}`}>
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      {subtitle && (
        <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
