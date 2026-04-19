"use client";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="app-topbar">
      <span className="text-[15px] font-semibold text-slate-800">{title}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400">Greenfield Pharmacy, London SE15</span>
        <div className="relative cursor-pointer">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center">
          SC
        </div>
      </div>
    </header>
  );
}
