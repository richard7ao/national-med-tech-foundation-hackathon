import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/dashboard", label: "Dashboard", icon: "📋" },
  { href: "/list-surplus", label: "List Surplus", icon: "📦" },
  { href: "/search", label: "Search", icon: "🔍" },
  { href: "/transactions", label: "Transactions", icon: "📄" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/impact", label: "Impact", icon: "🌍" },
];

interface SidebarProps {
  pathname: string;
}

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <aside className="app-sidebar">
      <Link href="/" className="sidebar-logo">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-extrabold text-xs shadow-[0_2px_8px_rgba(52,211,153,0.4)]">
          PB
        </div>
        <span>PharmaBridge</span>
      </Link>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item${isActive ? " active" : ""}`}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
            SC
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-200">Sarah Chen</div>
            <div className="text-[11px] text-slate-500">Pharmacist</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
