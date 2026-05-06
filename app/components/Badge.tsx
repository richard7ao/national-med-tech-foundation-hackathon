type BadgeVariant =
  | "available"
  | "verified"
  | "matched"
  | "requested"
  | "critical"
  | "high"
  | "medium";

const variantStyles: Record<BadgeVariant, string> = {
  available: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  verified: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  matched: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  requested: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  critical: "bg-red-50 text-red-600 ring-1 ring-red-200",
  high: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  medium: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
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
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide ${variantStyles[variant]} ${pulse ? "animate-badge-pulse" : ""}`}
    >
      {label ?? variantLabels[variant]}
    </span>
  );
}
