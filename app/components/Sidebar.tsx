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
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-400 text-white font-extrabold text-xs">
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
    </aside>
  );
}
