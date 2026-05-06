"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/list-surplus": "List Surplus",
  "/search": "Search Nearby",
  "/transactions": "Transactions",
  "/analytics": "Analytics",
  "/impact": "Network Impact",
};

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "PharmaBridge";

  return (
    <div className="app-shell">
      <Sidebar pathname={pathname} />
      <div className="app-main">
        <Topbar title={title} />
        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
