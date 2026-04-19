"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScannerUI from "../components/ScannerUI";
import Badge from "../components/Badge";

const STEPS = ["Scan", "Confirm", "List"];

const MOCK_SCAN_RESULT = {
  name: "Metformin 500mg Tablets",
  batchNumber: "AZ20260112",
  expiryDate: "Aug 2026",
  manufacturer: "AstraZeneca",
  packSize: "56 tablets",
  fmdSerial: "01-08714789-012345-AZ",
};

type InventoryStatus = "in-stock" | "low" | "expiring-soon" | "surplus";

interface InventoryItem {
  sku: string;
  name: string;
  strength: string;
  form: string;
  packSize: number;
  qtyOnHand: number;
  qtyAllocated: number;
  reorderLevel: number;
  batchNumber: string;
  expiryDate: string;
  wholesalePrice: number;
  status: InventoryStatus;
  manufacturer: string;
  lastDispensed: string;
}

const MOCK_INVENTORY: InventoryItem[] = [
  { sku: "PIP-03220811", name: "Metformin", strength: "500mg", form: "Tablets", packSize: 56, qtyOnHand: 47, qtyAllocated: 12, reorderLevel: 10, batchNumber: "AZ-2026-0112", expiryDate: "2026-08-14", wholesalePrice: 5.34, status: "surplus", manufacturer: "AstraZeneca", lastDispensed: "2026-04-18" },
  { sku: "PIP-04891502", name: "Amoxicillin", strength: "250mg", form: "Capsules", packSize: 21, qtyOnHand: 3, qtyAllocated: 8, reorderLevel: 10, batchNumber: "SZ-2026-0388", expiryDate: "2026-12-01", wholesalePrice: 3.12, status: "low", manufacturer: "Sandoz", lastDispensed: "2026-04-19" },
  { sku: "PIP-07654310", name: "Levothyroxine", strength: "50mcg", form: "Tablets", packSize: 28, qtyOnHand: 22, qtyAllocated: 6, reorderLevel: 8, batchNumber: "MP-2026-0199", expiryDate: "2027-03-20", wholesalePrice: 3.65, status: "in-stock", manufacturer: "Mercury Pharma", lastDispensed: "2026-04-17" },
  { sku: "PIP-09120044", name: "Sertraline", strength: "50mg", form: "Tablets", packSize: 28, qtyOnHand: 31, qtyAllocated: 4, reorderLevel: 8, batchNumber: "AC-2026-0567", expiryDate: "2026-06-10", wholesalePrice: 4.20, status: "expiring-soon", manufacturer: "Accord", lastDispensed: "2026-04-15" },
  { sku: "PIP-11003298", name: "Evorel Conti", strength: "HRT", form: "Patches", packSize: 8, qtyOnHand: 14, qtyAllocated: 2, reorderLevel: 4, batchNumber: "TH-2026-0042", expiryDate: "2027-01-15", wholesalePrice: 14.80, status: "surplus", manufacturer: "Theramex", lastDispensed: "2026-04-12" },
  { sku: "PIP-05437821", name: "Amlodipine", strength: "5mg", form: "Tablets", packSize: 28, qtyOnHand: 18, qtyAllocated: 7, reorderLevel: 10, batchNumber: "PF-2026-0821", expiryDate: "2027-06-30", wholesalePrice: 2.80, status: "in-stock", manufacturer: "Pfizer", lastDispensed: "2026-04-19" },
  { sku: "PIP-06219930", name: "Omeprazole", strength: "20mg", form: "Capsules", packSize: 28, qtyOnHand: 42, qtyAllocated: 5, reorderLevel: 8, batchNumber: "DX-2026-0134", expiryDate: "2026-05-22", wholesalePrice: 3.45, status: "expiring-soon", manufacturer: "Dexcel", lastDispensed: "2026-04-16" },
  { sku: "PIP-08743100", name: "Ramipril", strength: "5mg", form: "Capsules", packSize: 28, qtyOnHand: 9, qtyAllocated: 6, reorderLevel: 8, batchNumber: "SF-2026-0299", expiryDate: "2027-02-28", wholesalePrice: 2.90, status: "in-stock", manufacturer: "Sanofi", lastDispensed: "2026-04-18" },
  { sku: "PIP-02156740", name: "Atorvastatin", strength: "20mg", form: "Tablets", packSize: 28, qtyOnHand: 55, qtyAllocated: 8, reorderLevel: 10, batchNumber: "TV-2026-0455", expiryDate: "2026-07-18", wholesalePrice: 3.15, status: "surplus", manufacturer: "Teva", lastDispensed: "2026-04-19" },
  { sku: "PIP-10384562", name: "Salbutamol", strength: "100mcg", form: "Inhaler", packSize: 1, qtyOnHand: 6, qtyAllocated: 3, reorderLevel: 5, batchNumber: "GK-2026-0087", expiryDate: "2027-09-10", wholesalePrice: 6.50, status: "in-stock", manufacturer: "GlaxoSmithKline", lastDispensed: "2026-04-14" },
  { sku: "PIP-04521873", name: "Lansoprazole", strength: "30mg", form: "Capsules", packSize: 28, qtyOnHand: 2, qtyAllocated: 9, reorderLevel: 10, batchNumber: "MY-2026-0612", expiryDate: "2026-11-05", wholesalePrice: 4.10, status: "low", manufacturer: "Mylan", lastDispensed: "2026-04-19" },
  { sku: "PIP-07890215", name: "Bisoprolol", strength: "2.5mg", form: "Tablets", packSize: 28, qtyOnHand: 26, qtyAllocated: 3, reorderLevel: 6, batchNumber: "AC-2026-0890", expiryDate: "2027-04-22", wholesalePrice: 2.35, status: "surplus", manufacturer: "Accord", lastDispensed: "2026-04-13" },
  { sku: "PIP-03389741", name: "Doxycycline", strength: "100mg", form: "Capsules", packSize: 8, qtyOnHand: 11, qtyAllocated: 4, reorderLevel: 6, batchNumber: "AT-2026-0321", expiryDate: "2026-10-30", wholesalePrice: 5.70, status: "in-stock", manufacturer: "Actavis", lastDispensed: "2026-04-17" },
  { sku: "PIP-06612349", name: "Naproxen", strength: "250mg", form: "Tablets", packSize: 56, qtyOnHand: 38, qtyAllocated: 2, reorderLevel: 6, batchNumber: "RM-2026-0178", expiryDate: "2026-06-02", wholesalePrice: 4.85, status: "expiring-soon", manufacturer: "Rosemont", lastDispensed: "2026-04-10" },
  { sku: "PIP-09987430", name: "Codeine Phosphate", strength: "30mg", form: "Tablets", packSize: 28, qtyOnHand: 15, qtyAllocated: 5, reorderLevel: 8, batchNumber: "ZT-2026-0543", expiryDate: "2027-08-15", wholesalePrice: 3.95, status: "in-stock", manufacturer: "Zentiva", lastDispensed: "2026-04-16" },
  { sku: "PIP-01247860", name: "Simvastatin", strength: "40mg", form: "Tablets", packSize: 28, qtyOnHand: 60, qtyAllocated: 3, reorderLevel: 8, batchNumber: "TV-2026-0667", expiryDate: "2026-05-30", wholesalePrice: 2.10, status: "expiring-soon", manufacturer: "Teva", lastDispensed: "2026-04-11" },
  { sku: "PIP-08321540", name: "Fluoxetine", strength: "20mg", form: "Capsules", packSize: 30, qtyOnHand: 19, qtyAllocated: 7, reorderLevel: 10, batchNumber: "AC-2026-0734", expiryDate: "2027-05-18", wholesalePrice: 3.80, status: "in-stock", manufacturer: "Accord", lastDispensed: "2026-04-18" },
  { sku: "PIP-05670123", name: "Bendroflumethiazide", strength: "2.5mg", form: "Tablets", packSize: 28, qtyOnHand: 44, qtyAllocated: 1, reorderLevel: 4, batchNumber: "AC-2026-0901", expiryDate: "2026-07-25", wholesalePrice: 1.85, status: "surplus", manufacturer: "Accord", lastDispensed: "2026-04-09" },
  { sku: "PIP-02894310", name: "Co-codamol", strength: "30/500mg", form: "Tablets", packSize: 100, qtyOnHand: 4, qtyAllocated: 6, reorderLevel: 8, batchNumber: "ZT-2026-0112", expiryDate: "2027-01-28", wholesalePrice: 7.20, status: "low", manufacturer: "Zentiva", lastDispensed: "2026-04-19" },
  { sku: "PIP-07134589", name: "Furosemide", strength: "40mg", form: "Tablets", packSize: 28, qtyOnHand: 33, qtyAllocated: 4, reorderLevel: 6, batchNumber: "SF-2026-0445", expiryDate: "2027-07-12", wholesalePrice: 2.45, status: "surplus", manufacturer: "Sanofi", lastDispensed: "2026-04-15" },
];

const PMR_SYSTEMS = [
  { name: "Pharmacy Manager", vendor: "Cegedim Rx", color: "#2563eb", connected: true },
  { name: "ProScript", vendor: "Positive Solutions", color: "#7c3aed", connected: false },
  { name: "Rx Web", vendor: "Rx Systems", color: "#0891b2", connected: false },
  { name: "Titan", vendor: "Invatech Health", color: "#ea580c", connected: false },
];

function statusBadge(status: InventoryStatus) {
  const styles: Record<InventoryStatus, { bg: string; text: string; label: string }> = {
    "in-stock": { bg: "bg-slate-100", text: "text-slate-600", label: "In Stock" },
    "low": { bg: "bg-amber-50", text: "text-amber-700", label: "Low Stock" },
    "expiring-soon": { bg: "bg-red-50", text: "text-red-600", label: "Expiring Soon" },
    "surplus": { bg: "bg-emerald-50", text: "text-emerald-700", label: "Surplus" },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${s.bg} ${s.text}`}>
      {s.label}
    </span>
  );
}

function daysUntilExpiry(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function ListSurplusPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"inventory" | "manual">("inventory");
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<"all" | InventoryStatus>("all");

  const handleScanComplete = () => setStep(1);

  const handleList = () => {
    setStep(2);
    setShowSuccess(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  const toggleItem = (sku: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(sku)) next.delete(sku);
      else next.add(sku);
      return next;
    });
  };

  const filteredInventory = filterStatus === "all"
    ? MOCK_INVENTORY
    : MOCK_INVENTORY.filter((item) => item.status === filterStatus);

  const surplusCount = MOCK_INVENTORY.filter((i) => i.status === "surplus").length;
  const expiringCount = MOCK_INVENTORY.filter((i) => i.status === "expiring-soon").length;
  const totalStockValue = MOCK_INVENTORY.reduce((sum, i) => sum + i.qtyOnHand * i.wholesalePrice, 0);

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "inventory"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M1 6h14M5 6v8M11 6v8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            PMR Inventory
          </span>
        </button>
        <button
          onClick={() => setActiveTab("manual")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "manual"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Manual Add
          </span>
        </button>
      </div>

      {activeTab === "inventory" ? (
        <InventoryTab
          inventory={filteredInventory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          selectedItems={selectedItems}
          toggleItem={toggleItem}
          surplusCount={surplusCount}
          expiringCount={expiringCount}
          totalStockValue={totalStockValue}
        />
      ) : (
        <ManualAddTab
          step={step}
          showSuccess={showSuccess}
          handleScanComplete={handleScanComplete}
          handleList={handleList}
        />
      )}
    </div>
  );
}

function InventoryTab({
  inventory,
  filterStatus,
  setFilterStatus,
  selectedItems,
  toggleItem,
  surplusCount,
  expiringCount,
  totalStockValue,
}: {
  inventory: InventoryItem[];
  filterStatus: "all" | InventoryStatus;
  setFilterStatus: (s: "all" | InventoryStatus) => void;
  selectedItems: Set<string>;
  toggleItem: (sku: string) => void;
  surplusCount: number;
  expiringCount: number;
  totalStockValue: number;
}) {
  const listableItems = inventory.filter((i) => selectedItems.has(i.sku));
  const listableValue = listableItems.reduce((sum, i) => sum + (i.qtyOnHand - i.qtyAllocated) * i.wholesalePrice * 0.6, 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Connection Card */}
      <div className="glass-card-static p-0 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 live-pulse-dot" />
            </div>
            <span
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-sm font-bold text-slate-800"
            >
              LIVE
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Connected to Pharmacy Manager &mdash; last sync 12s ago
            </span>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg font-semibold uppercase tracking-wider">
            Boots Pharmacy &mdash; Headington, Oxford &mdash; GPhC #1089234
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Import from PMR System
            </span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              Connect to API
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PMR_SYSTEMS.map((sys) => (
              <div
                key={sys.name}
                className={`relative rounded-xl border-2 p-4 transition-all cursor-pointer ${
                  sys.connected
                    ? "border-emerald-300 bg-emerald-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {sys.connected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2"
                  style={{ backgroundColor: sys.color }}
                >
                  {sys.name.charAt(0)}
                </div>
                <div style={{ fontFamily: "var(--font-outfit)" }} className="text-sm font-semibold text-slate-800">
                  {sys.name}
                </div>
                <div className="text-[11px] text-slate-400">{sys.vendor}</div>
                {sys.connected ? (
                  <div className="mt-2 text-[10px] font-semibold text-emerald-600">Connected</div>
                ) : (
                  <div className="mt-2 text-[10px] font-semibold text-slate-400">Click to connect</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card-static p-4">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>Total Lines</div>
          <div className="text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-outfit)" }}>{MOCK_INVENTORY.length}</div>
        </div>
        <div className="glass-card-static p-4">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>Surplus Items</div>
          <div className="text-2xl font-bold text-emerald-600" style={{ fontFamily: "var(--font-outfit)" }}>{surplusCount}</div>
        </div>
        <div className="glass-card-static p-4">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-red-500 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>Expiring Soon</div>
          <div className="text-2xl font-bold text-red-500" style={{ fontFamily: "var(--font-outfit)" }}>{expiringCount}</div>
        </div>
        <div className="glass-card-static p-4">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1" style={{ fontFamily: "var(--font-outfit)" }}>Total Stock Value</div>
          <div className="text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-outfit)" }}>£{totalStockValue.toLocaleString("en-GB", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      {/* Filters + Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(["all", "surplus", "expiring-soon", "low", "in-stock"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === f
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {f === "all" ? "All" : f === "surplus" ? "Surplus" : f === "expiring-soon" ? "Expiring Soon" : f === "low" ? "Low Stock" : "In Stock"}
            </button>
          ))}
        </div>
        {selectedItems.size > 0 && (
          <button
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)]"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            List {selectedItems.size} item{selectedItems.size > 1 ? "s" : ""} as surplus
            {listableValue > 0 && (
              <span className="ml-2 text-emerald-200">
                (~£{listableValue.toFixed(0)} recoverable)
              </span>
            )}
          </button>
        )}
      </div>

      {/* Inventory Table */}
      <div className="glass-card-static p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="pl-5 pr-2 py-3 text-left w-10">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 accent-emerald-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      const all = new Set(inventory.map((i) => i.sku));
                      // We trigger a state update by toggling each
                      inventory.forEach((i) => {
                        if (!selectedItems.has(i.sku)) toggleItem(i.sku);
                      });
                    } else {
                      inventory.forEach((i) => {
                        if (selectedItems.has(i.sku)) toggleItem(i.sku);
                      });
                    }
                  }}
                />
              </th>
              {["SKU / PIP Code", "Medicine", "Qty on Hand", "Allocated", "Free", "Batch", "Expiry", "Status", "Value"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-3 text-left text-[10px] uppercase tracking-wider font-semibold text-slate-400"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, idx) => {
              const freeQty = item.qtyOnHand - item.qtyAllocated;
              const daysLeft = daysUntilExpiry(item.expiryDate);
              return (
                <tr
                  key={item.sku}
                  className={`border-b border-slate-50 transition-colors ${
                    selectedItems.has(item.sku)
                      ? "bg-emerald-50/40"
                      : idx % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50/30"
                  } hover:bg-emerald-50/30`}
                >
                  <td className="pl-5 pr-2 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.sku)}
                      onChange={() => toggleItem(item.sku)}
                      className="rounded border-slate-300 accent-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-400">{item.sku}</td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-slate-800">{item.name} {item.strength}</div>
                    <div className="text-[11px] text-slate-400">{item.form} &middot; {item.manufacturer} &middot; {item.packSize}pk</div>
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-700">{item.qtyOnHand}</td>
                  <td className="px-3 py-3 text-slate-500">{item.qtyAllocated}</td>
                  <td className={`px-3 py-3 font-semibold ${freeQty > 10 ? "text-emerald-600" : "text-slate-700"}`}>{freeQty}</td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-400">{item.batchNumber}</td>
                  <td className="px-3 py-3">
                    <div className={`text-xs font-medium ${daysLeft < 60 ? "text-red-500" : daysLeft < 120 ? "text-amber-600" : "text-slate-500"}`}>
                      {new Date(item.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </div>
                    {daysLeft < 90 && (
                      <div className="text-[10px] text-red-400">{daysLeft}d left</div>
                    )}
                  </td>
                  <td className="px-3 py-3">{statusBadge(item.status)}</td>
                  <td className="px-3 py-3 text-slate-600 font-medium">£{(item.qtyOnHand * item.wholesalePrice).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManualAddTab({
  step,
  showSuccess,
  handleScanComplete,
  handleList,
}: {
  step: number;
  showSuccess: boolean;
  handleScanComplete: () => void;
  handleList: () => void;
}) {
  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  i <= step
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-[0_4px_12px_rgba(52,211,153,0.3)]"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                style={{ fontFamily: "var(--font-outfit)" }}
                className={`text-sm font-semibold ${
                  i <= step ? "text-emerald-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-20 h-0.5 bg-slate-200" />
            )}
          </div>
        ))}
      </div>

      {/* Success State */}
      {showSuccess ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_24px_rgba(52,211,153,0.35)]">
            <span className="text-3xl text-white font-bold">✓</span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-outfit)" }}
            className="text-2xl font-bold text-slate-800 mb-2"
          >
            Medicine Listed!
          </h2>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Scanner */}
          <ScannerUI onScanComplete={handleScanComplete} />

          {/* Right: Form */}
          <div>
            {step === 0 ? (
              <div className="glass-card-static p-8 flex items-center justify-center min-h-[340px]">
                <p className="text-slate-400 text-sm">Scan a barcode to begin</p>
              </div>
            ) : (
              <div className="glass-card-static p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Badge variant="verified" pulse />
                  <span className="text-[11px] text-slate-400 font-medium">
                    Pack authenticated via EMVS
                  </span>
                </div>

                <div className="flex flex-col gap-4 text-sm">
                  <Field label="Medicine Name" value={MOCK_SCAN_RESULT.name} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Batch Number" value={MOCK_SCAN_RESULT.batchNumber} />
                    <Field label="Expiry Date" value={MOCK_SCAN_RESULT.expiryDate} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Manufacturer" value={MOCK_SCAN_RESULT.manufacturer} />
                    <Field label="Pack Size" value={MOCK_SCAN_RESULT.packSize} />
                  </div>

                  <hr className="border-slate-100 my-1" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        style={{ fontFamily: "var(--font-outfit)" }}
                        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
                      >
                        Quantity
                      </div>
                      <div className="bg-slate-50/80 border border-emerald-300 rounded-xl px-4 py-3 font-semibold text-slate-800">
                        5 packs
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ fontFamily: "var(--font-outfit)" }}
                        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
                      >
                        Price per Pack
                      </div>
                      <div className="bg-slate-50/80 border border-emerald-300 rounded-xl px-4 py-3 font-semibold text-slate-800">
                        £3.20
                      </div>
                      <div className="text-[10px] text-emerald-600 mt-1.5 font-medium">
                        40% below wholesale (£5.34)
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleList}
                  className="w-full mt-7 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-xl text-sm font-semibold transition-all shadow-[0_4px_16px_rgba(52,211,153,0.3)] hover:shadow-[0_6px_20px_rgba(52,211,153,0.4)]"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  List Medicine
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{ fontFamily: "var(--font-outfit)" }}
        className="text-[10px] uppercase tracking-[2px] font-semibold text-slate-400 mb-1.5"
      >
        {label}
      </div>
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium">
        {value}
      </div>
    </div>
  );
}
