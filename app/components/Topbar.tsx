"use client";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="app-topbar">
      <h1 className="text-[17px] font-bold text-slate-800 tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
        {title}
      </h1>
      <div className="flex items-center gap-5">
        <span className="text-[13px] text-slate-400 font-medium">Greenfield Pharmacy, London SE15</span>
        <div className="h-5 w-px bg-slate-200" />
        <div className="relative cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center transition-colors group-hover:bg-emerald-50 group-hover:border-emerald-200">
            <span className="text-base">🔔</span>
          </div>
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            3
          </span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
          SC
        </div>
      </div>
    </header>
  );
}
