import type { AuditEvent } from "../data/transactions";

interface TimelineProps {
  events: AuditEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-300 via-emerald-200 to-slate-200" />

      {events.map((event, i) => {
        const isChain = event.type === "supply-chain";

        return (
          <div key={event.step} className={`relative ${i < events.length - 1 ? "mb-6" : ""}`}>
            <div
              className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-[3px] border-white ${
                isChain ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" : "bg-teal-500 shadow-[0_0_0_3px_rgba(20,184,166,0.2)]"
              }`}
            />
            <div className="text-[11px] text-slate-400 font-medium mb-0.5">Step {event.step}</div>
            <div className="font-semibold text-sm text-slate-800">{event.title}</div>
            <div className="text-xs text-slate-500 mt-0.5">{event.description}</div>
            <div className="text-[11px] text-slate-400 mt-1">
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
        );
      })}
    </div>
  );
}
