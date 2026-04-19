type BadgeVariant =
  | "available"
  | "verified"
  | "matched"
  | "requested"
  | "critical"
  | "high"
  | "medium";

const variantStyles: Record<BadgeVariant, string> = {
  available: "bg-emerald-50 text-emerald-600",
  verified: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  matched: "bg-teal-50 text-teal-700",
  requested: "bg-amber-50 text-amber-700",
  critical: "bg-red-50 text-red-600",
  high: "bg-amber-50 text-amber-700",
  medium: "bg-yellow-50 text-yellow-700",
};

const variantLabels: Record<BadgeVariant, string> = {
  available: "Available",
  verified: "FMD Verified",
  matched: "Matched",
  requested: "Requested",
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  pulse?: boolean;
}

export default function Badge({ variant, label, pulse }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${variantStyles[variant]} ${pulse ? "animate-badge-pulse" : ""}`}
    >
      {label ?? variantLabels[variant]}
    </span>
  );
}
