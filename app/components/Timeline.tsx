import type { AuditEvent } from "../data/transactions";

interface TimelineProps {
  events: AuditEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="flex flex-col gap-1">
      {events.map((event, i) => {
        const isChain = event.type === "supply-chain";

        return (
          <div key={event.step}>
            <div
              className={`rounded-xl border-2 p-5 ${
                isChain
                  ? "border-emerald-200 bg-emerald-50/50"
                  : "border-teal-200 bg-teal-50/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold text-white ${
                    isChain ? "bg-emerald-500" : "bg-teal-500"
                  }`}
                >
                  {event.step}
                </span>
                <span
                  className="font-semibold text-sm text-slate-800"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {event.title}
                </span>
              </div>
              <div className="text-xs text-slate-500 ml-9">{event.description}</div>
              <div className="text-[11px] text-slate-400 mt-2 ml-9">
                {new Date(event.timestamp).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })},{" "}
                {new Date(event.timestamp).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {i < events.length - 1 && (
              <div className="flex justify-center py-2.5">
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
                  <path d="M10 0 L10 18" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 16 L10 26 L16 16" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
