import type { AuditEvent } from "../data/transactions";

interface TimelineProps {
  events: AuditEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-7">
      {/* Connecting line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />

      {events.map((event, i) => {
        const dotColor = event.type === "supply-chain" ? "bg-emerald-500" : "bg-teal-500";
        const ringColor = event.type === "supply-chain" ? "shadow-[0_0_0_2px_#059669]" : "shadow-[0_0_0_2px_#0d9488]";

        return (
          <div key={event.step} className={`relative ${i < events.length - 1 ? "mb-5" : ""}`}>
            <div
              className={`absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dotColor} ${ringColor}`}
            />
            <div className="text-[11px] text-slate-400 mb-0.5">Step {event.step}</div>
            <div className="font-semibold text-sm text-slate-800">{event.title}</div>
            <div className="text-xs text-slate-500">{event.description}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
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
