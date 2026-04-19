# PharmaBridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete PharmaBridge hackathon demo webapp — 7 pages, shared mock data, pastel emerald theme — ready for a 3-minute screen recording.

**Architecture:** A+ approach — one shared mock data layer in `app/data/` imported by all pages. Pages are independent (no runtime state management). Prefetching via Next.js Link + dynamic imports for Leaflet. All data mocked per AGENTS.md.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Leaflet + react-leaflet, Recharts

**Note:** Per AGENTS.md — this is a hackathon. Skip unit tests. Focus on the demo-able happy path. Speed over perfection.

---

## File Map

### Files to Create

```
app/data/pharmacies.ts          — 20 mock pharmacies with GPS coordinates
app/data/medicines.ts           — 15 mock medicines with NHS-realistic details
app/data/listings.ts            — ~50 surplus listings across pharmacies
app/data/transactions.ts        — 10 completed transactions with audit trails
app/data/stats.ts               — Network counters, trends, analytics data
app/components/StatCard.tsx     — Animated stat card with count-up
app/components/AnimatedCounter.tsx — requestAnimationFrame count-up
app/components/Badge.tsx        — Status badge variants
app/components/Timeline.tsx     — Vertical audit trail timeline
app/components/ScannerUI.tsx    — Fake barcode scanner viewfinder
app/components/PharmacyMap.tsx  — Leaflet map wrapper (dynamic import)
app/components/RequestModal.tsx — Confirmation modal for search page
app/dashboard/page.tsx          — Surplus listings dashboard
app/list-surplus/page.tsx       — Barcode scan + listing flow
app/search/page.tsx             — Map + nearby surplus results
app/transactions/page.tsx       — Audit trail timeline
app/analytics/page.tsx          — Charts and trends
app/impact/page.tsx             — ICB admin impact dashboard
postcss.config.mjs              — PostCSS config for Tailwind v4
```

### Files to Modify

```
app/layout.tsx                  — Update metadata to PharmaBridge
app/page.tsx                    — Replace greeting with landing page
app/globals.css                 — Replace with Tailwind v4 imports + custom styles
app/components/AppShell.tsx     — Update route map for new pages
app/components/Sidebar.tsx      — Rebrand to PharmaBridge, new nav items
app/components/Topbar.tsx       — Add pharmacy name, notification bell, avatar
package.json                    — Add dependencies (via npm install)
```

### Files to Delete

```
app/tab-1/page.tsx
app/tab-2/page.tsx
app/tab-3/page.tsx
app/tab-4/page.tsx
app/tab-5/page.tsx
```

---

## Task 1: Install Dependencies & Configure Tailwind v4

**Files:**
- Create: `postcss.config.mjs`
- Modify: `app/globals.css`, `package.json`

- [ ] **Step 1: Install all dependencies**

```bash
npm install tailwindcss @tailwindcss/postcss leaflet react-leaflet recharts
npm install -D @types/leaflet
```

- [ ] **Step 2: Create PostCSS config**

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 3: Replace globals.css with Tailwind v4 setup**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --font-dm-sans: "DM Sans", system-ui, -apple-system, sans-serif;

  --color-primary: #34d399;
  --color-primary-dark: #059669;
  --color-primary-text: #064e3b;
  --color-accent: #67e8f9;
  --color-surface-green: #f0fdf4;
  --color-surface-emerald: #d1fae5;

  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-card-lg: 0 1px 3px rgba(0, 0, 0, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-dm-sans);
  background: var(--color-surface-green);
  color: #1e293b;
}

/* App Shell Layout */
.app-shell {
  display: flex;
  height: 100vh;
}

.app-sidebar {
  width: 224px;
  flex-shrink: 0;
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  overflow-y: auto;
}

.app-main {
  margin-left: 224px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-topbar {
  height: 46px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 40;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

/* Sidebar */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 700;
  font-size: 15px;
  color: #064e3b;
  text-decoration: none;
}

.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13.5px;
  font-weight: 500;
  color: #94a3b8;
  text-decoration: none;
  transition: background 0.12s, color 0.12s;
  cursor: pointer;
}

.sidebar-item:hover {
  background: #f0fdf4;
  color: #1e293b;
}

.sidebar-item.active {
  background: #d1fae5;
  color: #059669;
  font-weight: 600;
  border-left: 3px solid #34d399;
  padding-left: 7px;
  border-radius: 0 6px 6px 0;
}

.sidebar-item-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.6;
}

.sidebar-item.active .sidebar-item-icon {
  opacity: 1;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scanLine {
  0% { top: 10%; }
  50% { top: 85%; }
  100% { top: 10%; }
}

@keyframes badgePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.animate-scan-line {
  animation: scanLine 1.5s ease-in-out;
}

.animate-badge-pulse {
  animation: badgePulse 0.6s ease-in-out;
}

/* Leaflet overrides */
.leaflet-container {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}
```

- [ ] **Step 4: Verify the dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — the app should render with the green-tinted background. Existing shell may look broken (font classes changed) — that's fine, we fix it in Task 3.

- [ ] **Step 5: Commit**

```bash
git add postcss.config.mjs app/globals.css package.json package-lock.json
git commit -m "chore: install deps and configure Tailwind v4 with pastel emerald theme"
```

---

## Task 2: Mock Data Layer

**Files:**
- Create: `app/data/pharmacies.ts`, `app/data/medicines.ts`, `app/data/listings.ts`, `app/data/transactions.ts`, `app/data/stats.ts`

- [ ] **Step 1: Create `app/data/pharmacies.ts`**

```typescript
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  rating: number;
  totalRatings: number;
  isCurrentUser: boolean;
}

export const CURRENT_PHARMACY_ID = "ph-greenfield";

export const pharmacies: Pharmacy[] = [
  { id: "ph-greenfield", name: "Greenfield Pharmacy", address: "42 Rye Lane", postcode: "SE15 5BS", lat: 51.4741, lng: -0.0693, rating: 4.8, totalRatings: 124, isCurrentUser: true },
  { id: "ph-parklane", name: "Park Lane Pharmacy", address: "18 Homerton High St", postcode: "E8 1JN", lat: 51.5465, lng: -0.0524, rating: 4.6, totalRatings: 89, isCurrentUser: false },
  { id: "ph-peckham", name: "Peckham Health Pharmacy", address: "97 Peckham High St", postcode: "SE15 5RS", lat: 51.4732, lng: -0.0637, rating: 4.5, totalRatings: 67, isCurrentUser: false },
  { id: "ph-camberwell", name: "Camberwell Pharmacy", address: "55 Camberwell Church St", postcode: "SE5 8TR", lat: 51.4735, lng: -0.0935, rating: 4.9, totalRatings: 201, isCurrentUser: false },
  { id: "ph-dulwich", name: "Dulwich Pharmacy", address: "31 Lordship Lane", postcode: "SE22 8EW", lat: 51.4553, lng: -0.0749, rating: 4.7, totalRatings: 156, isCurrentUser: false },
  { id: "ph-bermondsey", name: "Bermondsey Pharmacy", address: "12 Jamaica Rd", postcode: "SE1 2RN", lat: 51.4975, lng: -0.0631, rating: 4.3, totalRatings: 45, isCurrentUser: false },
  { id: "ph-deptford", name: "Deptford Pharmacy", address: "8 Deptford High St", postcode: "SE8 4AF", lat: 51.4773, lng: -0.0266, rating: 4.4, totalRatings: 78, isCurrentUser: false },
  { id: "ph-lewisham", name: "Lewisham Health Pharmacy", address: "22 Lewisham High St", postcode: "SE13 5JX", lat: 51.4613, lng: -0.0133, rating: 4.6, totalRatings: 134, isCurrentUser: false },
  { id: "ph-brixton", name: "Brixton Pharmacy", address: "45 Brixton Rd", postcode: "SW9 6DE", lat: 51.4613, lng: -0.1145, rating: 4.2, totalRatings: 92, isCurrentUser: false },
  { id: "ph-walworth", name: "Walworth Pharmacy", address: "67 Walworth Rd", postcode: "SE17 1RL", lat: 51.4895, lng: -0.0945, rating: 4.5, totalRatings: 63, isCurrentUser: false },
  { id: "ph-rotherhithe", name: "Rotherhithe Pharmacy", address: "3 Plough Way", postcode: "SE16 2LJ", lat: 51.4953, lng: -0.0483, rating: 4.1, totalRatings: 34, isCurrentUser: false },
  { id: "ph-catford", name: "Catford Pharmacy", address: "14 Rushey Green", postcode: "SE6 4JF", lat: 51.4451, lng: -0.0203, rating: 4.7, totalRatings: 112, isCurrentUser: false },
  { id: "ph-forest-hill", name: "Forest Hill Pharmacy", address: "29 Dartmouth Rd", postcode: "SE23 3HN", lat: 51.4393, lng: -0.0533, rating: 4.8, totalRatings: 98, isCurrentUser: false },
  { id: "ph-nunhead", name: "Nunhead Pharmacy", address: "5 Evelina Rd", postcode: "SE15 3HL", lat: 51.4636, lng: -0.0599, rating: 4.3, totalRatings: 41, isCurrentUser: false },
  { id: "ph-newcross", name: "New Cross Pharmacy", address: "101 New Cross Rd", postcode: "SE14 5DJ", lat: 51.4749, lng: -0.0366, rating: 4.0, totalRatings: 29, isCurrentUser: false },
  { id: "ph-herne-hill", name: "Herne Hill Pharmacy", address: "17 Half Moon Lane", postcode: "SE24 9JU", lat: 51.4533, lng: -0.0883, rating: 4.6, totalRatings: 87, isCurrentUser: false },
  { id: "ph-sydenham", name: "Sydenham Pharmacy", address: "43 Sydenham Rd", postcode: "SE26 5EX", lat: 51.4276, lng: -0.0533, rating: 4.4, totalRatings: 56, isCurrentUser: false },
  { id: "ph-brockley", name: "Brockley Pharmacy", address: "9 Brockley Rd", postcode: "SE4 2AB", lat: 51.4633, lng: -0.0383, rating: 4.5, totalRatings: 73, isCurrentUser: false },
  { id: "ph-crystal-palace", name: "Crystal Palace Pharmacy", address: "21 Westow Hill", postcode: "SE19 1TQ", lat: 51.4183, lng: -0.0766, rating: 4.8, totalRatings: 145, isCurrentUser: false },
  { id: "ph-elephant", name: "Elephant Pharmacy", address: "33 New Kent Rd", postcode: "SE1 6TT", lat: 51.4953, lng: -0.0983, rating: 4.2, totalRatings: 58, isCurrentUser: false },
];

export const currentPharmacy = pharmacies.find((p) => p.isCurrentUser)!;

export function getPharmacyById(id: string): Pharmacy | undefined {
  return pharmacies.find((p) => p.id === id);
}
```

- [ ] **Step 2: Create `app/data/medicines.ts`**

```typescript
export interface Medicine {
  id: string;
  name: string;
  strength: string;
  form: string;
  packSize: number;
  manufacturer: string;
  wholesalePrice: number;
}

export const medicines: Medicine[] = [
  { id: "med-metformin", name: "Metformin", strength: "500mg", form: "tablets", packSize: 56, manufacturer: "AstraZeneca", wholesalePrice: 5.34 },
  { id: "med-amoxicillin", name: "Amoxicillin", strength: "250mg", form: "capsules", packSize: 21, manufacturer: "Sandoz", wholesalePrice: 3.12 },
  { id: "med-levothyroxine", name: "Levothyroxine", strength: "50mcg", form: "tablets", packSize: 28, manufacturer: "Mercury Pharma", wholesalePrice: 3.65 },
  { id: "med-sertraline", name: "Sertraline", strength: "50mg", form: "tablets", packSize: 28, manufacturer: "Accord", wholesalePrice: 4.20 },
  { id: "med-hrt-patches", name: "Evorel Conti", strength: "HRT", form: "patches", packSize: 8, manufacturer: "Theramex", wholesalePrice: 14.80 },
  { id: "med-amlodipine", name: "Amlodipine", strength: "5mg", form: "tablets", packSize: 28, manufacturer: "Pfizer", wholesalePrice: 2.80 },
  { id: "med-omeprazole", name: "Omeprazole", strength: "20mg", form: "capsules", packSize: 28, manufacturer: "Dexcel", wholesalePrice: 3.45 },
  { id: "med-ramipril", name: "Ramipril", strength: "5mg", form: "capsules", packSize: 28, manufacturer: "Sanofi", wholesalePrice: 2.90 },
  { id: "med-atorvastatin", name: "Atorvastatin", strength: "20mg", form: "tablets", packSize: 28, manufacturer: "Teva", wholesalePrice: 3.15 },
  { id: "med-salbutamol", name: "Salbutamol", strength: "100mcg", form: "inhaler", packSize: 1, manufacturer: "GlaxoSmithKline", wholesalePrice: 6.50 },
  { id: "med-lansoprazole", name: "Lansoprazole", strength: "30mg", form: "capsules", packSize: 28, manufacturer: "Mylan", wholesalePrice: 4.10 },
  { id: "med-bisoprolol", name: "Bisoprolol", strength: "2.5mg", form: "tablets", packSize: 28, manufacturer: "Accord", wholesalePrice: 2.35 },
  { id: "med-doxycycline", name: "Doxycycline", strength: "100mg", form: "capsules", packSize: 8, manufacturer: "Actavis", wholesalePrice: 5.70 },
  { id: "med-naproxen", name: "Naproxen", strength: "250mg", form: "tablets", packSize: 56, manufacturer: "Rosemont", wholesalePrice: 4.85 },
  { id: "med-codeine", name: "Codeine Phosphate", strength: "30mg", form: "tablets", packSize: 28, manufacturer: "Zentiva", wholesalePrice: 3.95 },
];

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((m) => m.id === id);
}

export function formatMedicineName(med: Medicine): string {
  return `${med.name} ${med.strength}`;
}
```

- [ ] **Step 3: Create `app/data/listings.ts`**

```typescript
export interface Listing {
  id: string;
  pharmacyId: string;
  medicineId: string;
  quantity: number;
  pricePerPack: number;
  batchNumber: string;
  expiryDate: string;
  fmdVerified: boolean;
  fmdSerial: string;
  status: "available" | "requested" | "matched" | "completed";
  listedAt: string;
}

export const listings: Listing[] = [
  // Greenfield Pharmacy listings (7 active)
  { id: "lst-001", pharmacyId: "ph-greenfield", medicineId: "med-metformin", quantity: 5, pricePerPack: 3.20, batchNumber: "AZ20260112", expiryDate: "2026-08-15", fmdVerified: true, fmdSerial: "01-08714789-012345-AZ", status: "available", listedAt: "2026-04-19T09:14:00Z" },
  { id: "lst-002", pharmacyId: "ph-greenfield", medicineId: "med-amoxicillin", quantity: 3, pricePerPack: 1.80, batchNumber: "SZ20260305", expiryDate: "2026-06-20", fmdVerified: true, fmdSerial: "01-08714789-023456-SZ", status: "available", listedAt: "2026-04-18T14:30:00Z" },
  { id: "lst-003", pharmacyId: "ph-greenfield", medicineId: "med-levothyroxine", quantity: 8, pricePerPack: 2.10, batchNumber: "MP20260201", expiryDate: "2026-10-01", fmdVerified: true, fmdSerial: "01-08714789-034567-MP", status: "requested", listedAt: "2026-04-17T11:00:00Z" },
  { id: "lst-004", pharmacyId: "ph-greenfield", medicineId: "med-sertraline", quantity: 2, pricePerPack: 2.50, batchNumber: "AC20260115", expiryDate: "2026-07-10", fmdVerified: true, fmdSerial: "01-08714789-045678-AC", status: "matched", listedAt: "2026-04-16T16:45:00Z" },
  { id: "lst-005", pharmacyId: "ph-greenfield", medicineId: "med-omeprazole", quantity: 4, pricePerPack: 2.00, batchNumber: "DX20260220", expiryDate: "2026-09-30", fmdVerified: true, fmdSerial: "01-08714789-056789-DX", status: "available", listedAt: "2026-04-15T10:20:00Z" },
  { id: "lst-006", pharmacyId: "ph-greenfield", medicineId: "med-ramipril", quantity: 6, pricePerPack: 1.70, batchNumber: "SN20260310", expiryDate: "2026-11-15", fmdVerified: true, fmdSerial: "01-08714789-067890-SN", status: "available", listedAt: "2026-04-14T09:00:00Z" },
  { id: "lst-007", pharmacyId: "ph-greenfield", medicineId: "med-amlodipine", quantity: 10, pricePerPack: 1.60, batchNumber: "PF20260118", expiryDate: "2026-12-01", fmdVerified: true, fmdSerial: "01-08714789-078901-PF", status: "available", listedAt: "2026-04-13T15:30:00Z" },

  // Peckham Health Pharmacy
  { id: "lst-010", pharmacyId: "ph-peckham", medicineId: "med-metformin", quantity: 3, pricePerPack: 3.50, batchNumber: "AZ20260118", expiryDate: "2026-07-20", fmdVerified: true, fmdSerial: "01-08714789-112345-AZ", status: "available", listedAt: "2026-04-18T08:00:00Z" },
  { id: "lst-011", pharmacyId: "ph-peckham", medicineId: "med-salbutamol", quantity: 7, pricePerPack: 3.90, batchNumber: "GK20260201", expiryDate: "2026-09-10", fmdVerified: true, fmdSerial: "01-08714789-123456-GK", status: "available", listedAt: "2026-04-17T13:00:00Z" },
  { id: "lst-012", pharmacyId: "ph-peckham", medicineId: "med-lansoprazole", quantity: 5, pricePerPack: 2.40, batchNumber: "MY20260215", expiryDate: "2026-08-25", fmdVerified: true, fmdSerial: "01-08714789-134567-MY", status: "available", listedAt: "2026-04-16T10:30:00Z" },

  // Camberwell Pharmacy
  { id: "lst-020", pharmacyId: "ph-camberwell", medicineId: "med-metformin", quantity: 10, pricePerPack: 2.90, batchNumber: "AZ20260125", expiryDate: "2026-09-05", fmdVerified: true, fmdSerial: "01-08714789-212345-AZ", status: "available", listedAt: "2026-04-19T07:30:00Z" },
  { id: "lst-021", pharmacyId: "ph-camberwell", medicineId: "med-sertraline", quantity: 4, pricePerPack: 2.30, batchNumber: "AC20260130", expiryDate: "2026-08-18", fmdVerified: true, fmdSerial: "01-08714789-223456-AC", status: "available", listedAt: "2026-04-18T09:15:00Z" },
  { id: "lst-022", pharmacyId: "ph-camberwell", medicineId: "med-atorvastatin", quantity: 12, pricePerPack: 1.85, batchNumber: "TV20260210", expiryDate: "2026-11-30", fmdVerified: true, fmdSerial: "01-08714789-234567-TV", status: "available", listedAt: "2026-04-17T14:45:00Z" },
  { id: "lst-023", pharmacyId: "ph-camberwell", medicineId: "med-bisoprolol", quantity: 6, pricePerPack: 1.40, batchNumber: "AC20260205", expiryDate: "2026-10-20", fmdVerified: true, fmdSerial: "01-08714789-245678-AC", status: "available", listedAt: "2026-04-16T11:00:00Z" },
  { id: "lst-024", pharmacyId: "ph-camberwell", medicineId: "med-hrt-patches", quantity: 2, pricePerPack: 8.90, batchNumber: "TM20260115", expiryDate: "2026-07-01", fmdVerified: true, fmdSerial: "01-08714789-256789-TM", status: "requested", listedAt: "2026-04-15T16:00:00Z" },

  // Dulwich Pharmacy
  { id: "lst-030", pharmacyId: "ph-dulwich", medicineId: "med-levothyroxine", quantity: 15, pricePerPack: 2.20, batchNumber: "MP20260220", expiryDate: "2026-10-15", fmdVerified: true, fmdSerial: "01-08714789-312345-MP", status: "available", listedAt: "2026-04-19T08:00:00Z" },
  { id: "lst-031", pharmacyId: "ph-dulwich", medicineId: "med-naproxen", quantity: 8, pricePerPack: 2.90, batchNumber: "RM20260218", expiryDate: "2026-09-22", fmdVerified: true, fmdSerial: "01-08714789-323456-RM", status: "available", listedAt: "2026-04-18T12:00:00Z" },
  { id: "lst-032", pharmacyId: "ph-dulwich", medicineId: "med-doxycycline", quantity: 4, pricePerPack: 3.40, batchNumber: "AT20260225", expiryDate: "2026-08-05", fmdVerified: true, fmdSerial: "01-08714789-334567-AT", status: "available", listedAt: "2026-04-17T09:30:00Z" },

  // Bermondsey Pharmacy
  { id: "lst-040", pharmacyId: "ph-bermondsey", medicineId: "med-amoxicillin", quantity: 6, pricePerPack: 1.90, batchNumber: "SZ20260312", expiryDate: "2026-07-15", fmdVerified: true, fmdSerial: "01-08714789-412345-SZ", status: "available", listedAt: "2026-04-18T15:00:00Z" },
  { id: "lst-041", pharmacyId: "ph-bermondsey", medicineId: "med-codeine", quantity: 3, pricePerPack: 2.35, batchNumber: "ZV20260301", expiryDate: "2026-08-28", fmdVerified: true, fmdSerial: "01-08714789-423456-ZV", status: "available", listedAt: "2026-04-17T10:00:00Z" },

  // Park Lane Pharmacy
  { id: "lst-050", pharmacyId: "ph-parklane", medicineId: "med-omeprazole", quantity: 9, pricePerPack: 2.10, batchNumber: "DX20260228", expiryDate: "2026-10-10", fmdVerified: true, fmdSerial: "01-08714789-512345-DX", status: "available", listedAt: "2026-04-19T10:00:00Z" },
  { id: "lst-051", pharmacyId: "ph-parklane", medicineId: "med-amlodipine", quantity: 5, pricePerPack: 1.65, batchNumber: "PF20260205", expiryDate: "2026-11-20", fmdVerified: true, fmdSerial: "01-08714789-523456-PF", status: "available", listedAt: "2026-04-18T11:30:00Z" },

  // Deptford Pharmacy
  { id: "lst-060", pharmacyId: "ph-deptford", medicineId: "med-metformin", quantity: 7, pricePerPack: 3.10, batchNumber: "AZ20260130", expiryDate: "2026-08-22", fmdVerified: true, fmdSerial: "01-08714789-612345-AZ", status: "available", listedAt: "2026-04-18T09:00:00Z" },
  { id: "lst-061", pharmacyId: "ph-deptford", medicineId: "med-ramipril", quantity: 4, pricePerPack: 1.75, batchNumber: "SN20260315", expiryDate: "2026-10-05", fmdVerified: true, fmdSerial: "01-08714789-623456-SN", status: "available", listedAt: "2026-04-17T15:00:00Z" },

  // Lewisham Health Pharmacy
  { id: "lst-070", pharmacyId: "ph-lewisham", medicineId: "med-sertraline", quantity: 8, pricePerPack: 2.45, batchNumber: "AC20260210", expiryDate: "2026-09-15", fmdVerified: true, fmdSerial: "01-08714789-712345-AC", status: "available", listedAt: "2026-04-19T11:00:00Z" },
  { id: "lst-071", pharmacyId: "ph-lewisham", medicineId: "med-salbutamol", quantity: 3, pricePerPack: 3.85, batchNumber: "GK20260215", expiryDate: "2026-08-10", fmdVerified: true, fmdSerial: "01-08714789-723456-GK", status: "available", listedAt: "2026-04-18T10:00:00Z" },
  { id: "lst-072", pharmacyId: "ph-lewisham", medicineId: "med-hrt-patches", quantity: 5, pricePerPack: 8.50, batchNumber: "TM20260120", expiryDate: "2026-07-25", fmdVerified: true, fmdSerial: "01-08714789-734567-TM", status: "available", listedAt: "2026-04-17T08:30:00Z" },

  // Brixton Pharmacy
  { id: "lst-080", pharmacyId: "ph-brixton", medicineId: "med-levothyroxine", quantity: 6, pricePerPack: 2.15, batchNumber: "MP20260228", expiryDate: "2026-09-30", fmdVerified: true, fmdSerial: "01-08714789-812345-MP", status: "available", listedAt: "2026-04-18T14:00:00Z" },
  { id: "lst-081", pharmacyId: "ph-brixton", medicineId: "med-lansoprazole", quantity: 4, pricePerPack: 2.50, batchNumber: "MY20260225", expiryDate: "2026-08-15", fmdVerified: true, fmdSerial: "01-08714789-823456-MY", status: "available", listedAt: "2026-04-17T12:00:00Z" },

  // Walworth Pharmacy
  { id: "lst-090", pharmacyId: "ph-walworth", medicineId: "med-metformin", quantity: 4, pricePerPack: 3.30, batchNumber: "AZ20260205", expiryDate: "2026-08-01", fmdVerified: true, fmdSerial: "01-08714789-912345-AZ", status: "available", listedAt: "2026-04-19T09:30:00Z" },
  { id: "lst-091", pharmacyId: "ph-walworth", medicineId: "med-omeprazole", quantity: 7, pricePerPack: 2.05, batchNumber: "DX20260310", expiryDate: "2026-10-25", fmdVerified: true, fmdSerial: "01-08714789-923456-DX", status: "available", listedAt: "2026-04-18T08:30:00Z" },

  // Herne Hill Pharmacy
  { id: "lst-100", pharmacyId: "ph-herne-hill", medicineId: "med-atorvastatin", quantity: 9, pricePerPack: 1.90, batchNumber: "TV20260220", expiryDate: "2026-11-10", fmdVerified: true, fmdSerial: "01-08714789-A12345-TV", status: "available", listedAt: "2026-04-18T13:00:00Z" },
  { id: "lst-101", pharmacyId: "ph-herne-hill", medicineId: "med-bisoprolol", quantity: 5, pricePerPack: 1.35, batchNumber: "AC20260215", expiryDate: "2026-09-18", fmdVerified: true, fmdSerial: "01-08714789-A23456-AC", status: "available", listedAt: "2026-04-17T11:30:00Z" },

  // Nunhead Pharmacy
  { id: "lst-110", pharmacyId: "ph-nunhead", medicineId: "med-amoxicillin", quantity: 5, pricePerPack: 1.85, batchNumber: "SZ20260318", expiryDate: "2026-07-28", fmdVerified: true, fmdSerial: "01-08714789-B12345-SZ", status: "available", listedAt: "2026-04-19T10:30:00Z" },
  { id: "lst-111", pharmacyId: "ph-nunhead", medicineId: "med-naproxen", quantity: 3, pricePerPack: 2.85, batchNumber: "RM20260228", expiryDate: "2026-09-05", fmdVerified: true, fmdSerial: "01-08714789-B23456-RM", status: "available", listedAt: "2026-04-18T16:00:00Z" },

  // New Cross Pharmacy
  { id: "lst-120", pharmacyId: "ph-newcross", medicineId: "med-sertraline", quantity: 6, pricePerPack: 2.40, batchNumber: "AC20260220", expiryDate: "2026-08-30", fmdVerified: true, fmdSerial: "01-08714789-C12345-AC", status: "available", listedAt: "2026-04-18T07:00:00Z" },

  // Brockley Pharmacy
  { id: "lst-130", pharmacyId: "ph-brockley", medicineId: "med-doxycycline", quantity: 3, pricePerPack: 3.35, batchNumber: "AT20260305", expiryDate: "2026-07-20", fmdVerified: true, fmdSerial: "01-08714789-D12345-AT", status: "available", listedAt: "2026-04-17T16:30:00Z" },
  { id: "lst-131", pharmacyId: "ph-brockley", medicineId: "med-codeine", quantity: 2, pricePerPack: 2.30, batchNumber: "ZV20260310", expiryDate: "2026-09-12", fmdVerified: true, fmdSerial: "01-08714789-D23456-ZV", status: "available", listedAt: "2026-04-16T14:00:00Z" },

  // Catford, Forest Hill, Rotherhithe, Sydenham, Crystal Palace, Elephant — 1-2 each
  { id: "lst-140", pharmacyId: "ph-catford", medicineId: "med-amlodipine", quantity: 8, pricePerPack: 1.55, batchNumber: "PF20260215", expiryDate: "2026-12-15", fmdVerified: true, fmdSerial: "01-08714789-E12345-PF", status: "available", listedAt: "2026-04-18T11:00:00Z" },
  { id: "lst-150", pharmacyId: "ph-forest-hill", medicineId: "med-levothyroxine", quantity: 10, pricePerPack: 2.05, batchNumber: "MP20260310", expiryDate: "2026-11-25", fmdVerified: true, fmdSerial: "01-08714789-F12345-MP", status: "available", listedAt: "2026-04-17T09:00:00Z" },
  { id: "lst-160", pharmacyId: "ph-rotherhithe", medicineId: "med-ramipril", quantity: 3, pricePerPack: 1.80, batchNumber: "SN20260320", expiryDate: "2026-10-18", fmdVerified: true, fmdSerial: "01-08714789-G12345-SN", status: "available", listedAt: "2026-04-16T15:30:00Z" },
  { id: "lst-170", pharmacyId: "ph-sydenham", medicineId: "med-salbutamol", quantity: 4, pricePerPack: 3.80, batchNumber: "GK20260225", expiryDate: "2026-08-20", fmdVerified: true, fmdSerial: "01-08714789-H12345-GK", status: "available", listedAt: "2026-04-18T10:30:00Z" },
  { id: "lst-180", pharmacyId: "ph-crystal-palace", medicineId: "med-hrt-patches", quantity: 3, pricePerPack: 8.60, batchNumber: "TM20260130", expiryDate: "2026-07-30", fmdVerified: true, fmdSerial: "01-08714789-I12345-TM", status: "available", listedAt: "2026-04-17T14:00:00Z" },
  { id: "lst-190", pharmacyId: "ph-elephant", medicineId: "med-metformin", quantity: 6, pricePerPack: 3.15, batchNumber: "AZ20260210", expiryDate: "2026-08-10", fmdVerified: true, fmdSerial: "01-08714789-J12345-AZ", status: "available", listedAt: "2026-04-19T08:30:00Z" },
];

export function getListingsForPharmacy(pharmacyId: string): Listing[] {
  return listings.filter((l) => l.pharmacyId === pharmacyId);
}

export function getListingsByMedicine(medicineId: string): Listing[] {
  return listings.filter((l) => l.medicineId === medicineId && l.status === "available");
}
```

- [ ] **Step 4: Create `app/data/transactions.ts`**

```typescript
export interface AuditEvent {
  step: number;
  title: string;
  description: string;
  timestamp: string;
  type: "supply-chain" | "platform";
}

export interface Transaction {
  id: string;
  listingId: string;
  sellerPharmacyId: string;
  buyerPharmacyId: string;
  medicineId: string;
  quantity: number;
  pricePerPack: number;
  totalPrice: number;
  wholesaleSavings: number;
  status: "confirmed" | "in-transit" | "delivered" | "completed";
  auditTrail: AuditEvent[];
  createdAt: string;
}

export const transactions: Transaction[] = [
  {
    id: "txn-001",
    listingId: "lst-001",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-parklane",
    medicineId: "med-metformin",
    quantity: 5,
    pricePerPack: 3.20,
    totalPrice: 16.00,
    wholesaleSavings: 32.40,
    status: "completed",
    createdAt: "2026-04-19T10:23:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "AstraZeneca · Macclesfield, UK · Batch #AZ20260112", timestamp: "2026-01-12T08:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-012345-AZ · EMVS check passed", timestamp: "2026-01-12T08:30:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Greenfield Pharmacy", description: "Pharmacist: Sarah Chen (GPhC #2089431) · 5 packs at £3.20", timestamp: "2026-04-19T09:14:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · Cold chain: N/A · No storage breach detected", timestamp: "2026-04-19T09:14:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Park Lane Pharmacy", description: "Requested by James Okafor (GPhC #2091287) · Savings: £32.40", timestamp: "2026-04-19T10:23:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE15→E8 · ETA 1:45 PM", timestamp: "2026-04-19T12:30:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "James Okafor at Park Lane Pharmacy · Digital signature recorded", timestamp: "2026-04-19T13:38:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-002",
    listingId: "lst-003",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-dulwich",
    medicineId: "med-levothyroxine",
    quantity: 8,
    pricePerPack: 2.10,
    totalPrice: 16.80,
    wholesaleSavings: 12.40,
    status: "completed",
    createdAt: "2026-04-18T15:15:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Mercury Pharma · Croydon, UK · Batch #MP20260201", timestamp: "2026-02-01T09:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-034567-MP · EMVS check passed", timestamp: "2026-02-01T09:15:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Greenfield Pharmacy", description: "Pharmacist: Sarah Chen (GPhC #2089431) · 8 packs at £2.10", timestamp: "2026-04-17T11:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · Cold chain: N/A · No storage breach", timestamp: "2026-04-17T11:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Dulwich Pharmacy", description: "Requested by Priya Patel (GPhC #2087654) · Savings: £12.40", timestamp: "2026-04-18T15:15:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE15→SE22 · ETA 4:30 PM", timestamp: "2026-04-18T15:45:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Priya Patel at Dulwich Pharmacy · Digital signature recorded", timestamp: "2026-04-18T16:22:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-003",
    listingId: "lst-040",
    sellerPharmacyId: "ph-bermondsey",
    buyerPharmacyId: "ph-greenfield",
    medicineId: "med-amoxicillin",
    quantity: 3,
    pricePerPack: 1.90,
    totalPrice: 5.70,
    wholesaleSavings: 3.66,
    status: "completed",
    createdAt: "2026-04-17T09:20:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Sandoz · Holzkirchen, Germany · Batch #SZ20260312", timestamp: "2026-03-12T07:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-412345-SZ · EMVS check passed", timestamp: "2026-03-12T07:20:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Bermondsey Pharmacy", description: "Pharmacist: David Kim (GPhC #2093102) · 6 packs at £1.90", timestamp: "2026-04-16T15:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · Cold chain: N/A · No storage breach", timestamp: "2026-04-16T15:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Greenfield Pharmacy", description: "Requested by Sarah Chen (GPhC #2089431) · Savings: £3.66", timestamp: "2026-04-17T09:20:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE1→SE15", timestamp: "2026-04-17T10:00:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Sarah Chen at Greenfield Pharmacy · Digital signature recorded", timestamp: "2026-04-17T10:48:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-004",
    listingId: "lst-004",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-bermondsey",
    medicineId: "med-sertraline",
    quantity: 2,
    pricePerPack: 2.50,
    totalPrice: 5.00,
    wholesaleSavings: 3.40,
    status: "completed",
    createdAt: "2026-04-16T14:45:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Accord · Barnstaple, UK · Batch #AC20260115", timestamp: "2026-01-15T10:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-045678-AC · EMVS check passed", timestamp: "2026-01-15T10:20:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Greenfield Pharmacy", description: "Pharmacist: Sarah Chen (GPhC #2089431) · 2 packs at £2.50", timestamp: "2026-04-16T16:45:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · Cold chain: N/A", timestamp: "2026-04-16T16:45:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Bermondsey Pharmacy", description: "Requested by David Kim (GPhC #2093102) · Savings: £3.40", timestamp: "2026-04-16T14:45:00Z", type: "platform" },
      { step: 6, title: "Pickup by Buyer", description: "David Kim collected in person from Greenfield Pharmacy", timestamp: "2026-04-16T17:15:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "David Kim · Digital signature recorded at point of collection", timestamp: "2026-04-16T17:15:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-005",
    listingId: "lst-020",
    sellerPharmacyId: "ph-camberwell",
    buyerPharmacyId: "ph-parklane",
    medicineId: "med-metformin",
    quantity: 5,
    pricePerPack: 2.90,
    totalPrice: 14.50,
    wholesaleSavings: 12.20,
    status: "completed",
    createdAt: "2026-04-15T11:30:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "AstraZeneca · Macclesfield, UK · Batch #AZ20260125", timestamp: "2026-01-25T08:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-212345-AZ · EMVS check passed", timestamp: "2026-01-25T08:15:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Camberwell Pharmacy", description: "Pharmacist: Amara Osei (GPhC #2085519) · 10 packs at £2.90", timestamp: "2026-04-14T08:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · Cold chain: N/A", timestamp: "2026-04-14T08:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Park Lane Pharmacy", description: "Requested by James Okafor (GPhC #2091287) · Savings: £12.20", timestamp: "2026-04-15T11:30:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE5→E8", timestamp: "2026-04-15T12:15:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "James Okafor at Park Lane Pharmacy · Digital signature recorded", timestamp: "2026-04-15T14:02:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-006",
    listingId: "lst-030",
    sellerPharmacyId: "ph-dulwich",
    buyerPharmacyId: "ph-lewisham",
    medicineId: "med-levothyroxine",
    quantity: 5,
    pricePerPack: 2.20,
    totalPrice: 11.00,
    wholesaleSavings: 7.25,
    status: "in-transit",
    createdAt: "2026-04-19T11:00:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Mercury Pharma · Croydon, UK · Batch #MP20260220", timestamp: "2026-02-20T09:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-312345-MP · EMVS check passed", timestamp: "2026-02-20T09:10:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Dulwich Pharmacy", description: "Pharmacist: Priya Patel (GPhC #2087654) · 15 packs at £2.20", timestamp: "2026-04-19T08:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · No storage breach detected", timestamp: "2026-04-19T08:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Lewisham Health Pharmacy", description: "Requested by Helen Zhang (GPhC #2090833) · Savings: £7.25", timestamp: "2026-04-19T11:00:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE22→SE13 · ETA 2:30 PM", timestamp: "2026-04-19T13:00:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-007",
    listingId: "lst-070",
    sellerPharmacyId: "ph-lewisham",
    buyerPharmacyId: "ph-greenfield",
    medicineId: "med-sertraline",
    quantity: 3,
    pricePerPack: 2.45,
    totalPrice: 7.35,
    wholesaleSavings: 5.25,
    status: "completed",
    createdAt: "2026-04-14T09:00:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Accord · Barnstaple, UK · Batch #AC20260210", timestamp: "2026-02-10T10:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "Serial: 01-08714789-712345-AC · EMVS check passed", timestamp: "2026-02-10T10:15:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Lewisham Health Pharmacy", description: "Pharmacist: Helen Zhang (GPhC #2090833) · 8 packs at £2.45", timestamp: "2026-04-13T11:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C) · No storage breach", timestamp: "2026-04-13T11:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Greenfield Pharmacy", description: "Requested by Sarah Chen (GPhC #2089431) · Savings: £5.25", timestamp: "2026-04-14T09:00:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE13→SE15", timestamp: "2026-04-14T10:30:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Sarah Chen at Greenfield Pharmacy · Digital signature recorded", timestamp: "2026-04-14T11:15:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-008",
    listingId: "lst-080",
    sellerPharmacyId: "ph-brixton",
    buyerPharmacyId: "ph-camberwell",
    medicineId: "med-levothyroxine",
    quantity: 3,
    pricePerPack: 2.15,
    totalPrice: 6.45,
    wholesaleSavings: 4.50,
    status: "completed",
    createdAt: "2026-04-13T14:00:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Mercury Pharma · Croydon, UK · Batch #MP20260228", timestamp: "2026-02-28T08:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "EMVS check passed", timestamp: "2026-02-28T08:15:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Brixton Pharmacy", description: "Pharmacist: Marcus Johnson (GPhC #2086401) · 6 packs at £2.15", timestamp: "2026-04-12T14:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C)", timestamp: "2026-04-12T14:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Camberwell Pharmacy", description: "Requested by Amara Osei (GPhC #2085519) · Savings: £4.50", timestamp: "2026-04-13T14:00:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SW9→SE5", timestamp: "2026-04-13T15:00:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Amara Osei at Camberwell Pharmacy · Digital signature recorded", timestamp: "2026-04-13T15:35:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-009",
    listingId: "lst-060",
    sellerPharmacyId: "ph-deptford",
    buyerPharmacyId: "ph-nunhead",
    medicineId: "med-metformin",
    quantity: 3,
    pricePerPack: 3.10,
    totalPrice: 9.30,
    wholesaleSavings: 6.72,
    status: "completed",
    createdAt: "2026-04-12T10:00:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "AstraZeneca · Macclesfield, UK · Batch #AZ20260130", timestamp: "2026-01-30T08:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "EMVS check passed", timestamp: "2026-01-30T08:10:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Deptford Pharmacy", description: "Pharmacist: Lisa Brown (GPhC #2088745)", timestamp: "2026-04-11T09:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C)", timestamp: "2026-04-11T09:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Nunhead Pharmacy", description: "Savings: £6.72", timestamp: "2026-04-12T10:00:00Z", type: "platform" },
      { step: 6, title: "Courier Collected", description: "Alliance Healthcare driver · Route SE8→SE15", timestamp: "2026-04-12T11:30:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Digital signature recorded", timestamp: "2026-04-12T12:10:00Z", type: "platform" },
    ],
  },
  {
    id: "txn-010",
    listingId: "lst-100",
    sellerPharmacyId: "ph-herne-hill",
    buyerPharmacyId: "ph-brixton",
    medicineId: "med-atorvastatin",
    quantity: 4,
    pricePerPack: 1.90,
    totalPrice: 7.60,
    wholesaleSavings: 5.00,
    status: "completed",
    createdAt: "2026-04-11T13:30:00Z",
    auditTrail: [
      { step: 1, title: "Pack Manufactured", description: "Teva · Castleford, UK · Batch #TV20260220", timestamp: "2026-02-20T09:00:00Z", type: "supply-chain" },
      { step: 2, title: "FMD Serialisation Verified", description: "EMVS check passed", timestamp: "2026-02-20T09:10:00Z", type: "supply-chain" },
      { step: 3, title: "Listed by Herne Hill Pharmacy", description: "9 packs at £1.90", timestamp: "2026-04-10T13:00:00Z", type: "platform" },
      { step: 4, title: "Storage Conditions Confirmed", description: "Ambient (15-25°C)", timestamp: "2026-04-10T13:00:00Z", type: "supply-chain" },
      { step: 5, title: "Matched to Brixton Pharmacy", description: "Savings: £5.00", timestamp: "2026-04-11T13:30:00Z", type: "platform" },
      { step: 6, title: "Pickup by Buyer", description: "Marcus Johnson collected in person", timestamp: "2026-04-11T16:00:00Z", type: "platform" },
      { step: 7, title: "Received & Countersigned", description: "Digital signature recorded at collection", timestamp: "2026-04-11T16:00:00Z", type: "platform" },
    ],
  },
];

export function getTransactionsForPharmacy(pharmacyId: string): Transaction[] {
  return transactions.filter(
    (t) => t.sellerPharmacyId === pharmacyId || t.buyerPharmacyId === pharmacyId
  );
}
```

- [ ] **Step 5: Create `app/data/stats.ts`**

```typescript
export interface MonthlyDataPoint {
  month: string;
  value: number;
}

export interface Shortage {
  medicineId: string;
  medicineName: string;
  severity: "critical" | "high" | "medium";
}

export interface NetworkStats {
  totalRedistributed: number;
  totalValueSaved: number;
  totalCO2Avoided: number;
  activePharmacies: number;
  trendingShortages: Shortage[];
  wasteReductionTrend: MonthlyDataPoint[];
  pharmacyPerformance: {
    activeListings: number;
    completedSales: number;
    revenueRecovered: number;
    expiringSoon: number;
    revenueHistory: MonthlyDataPoint[];
    wasteAvoided: MonthlyDataPoint[];
    co2Avoided: MonthlyDataPoint[];
    topMedicines: { medicineId: string; name: string; count: number }[];
  };
}

export const networkStats: NetworkStats = {
  totalRedistributed: 12847,
  totalValueSaved: 483210,
  totalCO2Avoided: 4200,
  activePharmacies: 127,
  trendingShortages: [
    { medicineId: "med-metformin", medicineName: "Metformin 500mg", severity: "critical" },
    { medicineId: "med-levothyroxine", medicineName: "Levothyroxine 50mcg", severity: "high" },
    { medicineId: "med-hrt-patches", medicineName: "HRT Patches", severity: "high" },
    { medicineId: "med-amoxicillin", medicineName: "Amoxicillin 250mg", severity: "medium" },
    { medicineId: "med-sertraline", medicineName: "Sertraline 50mg", severity: "medium" },
  ],
  wasteReductionTrend: [
    { month: "Nov", value: 8200 },
    { month: "Dec", value: 7400 },
    { month: "Jan", value: 6100 },
    { month: "Feb", value: 5300 },
    { month: "Mar", value: 4200 },
    { month: "Apr", value: 3400 },
  ],
  pharmacyPerformance: {
    activeListings: 7,
    completedSales: 12,
    revenueRecovered: 1240,
    expiringSoon: 2,
    revenueHistory: [
      { month: "Nov", value: 320 },
      { month: "Dec", value: 480 },
      { month: "Jan", value: 590 },
      { month: "Feb", value: 720 },
      { month: "Mar", value: 890 },
      { month: "Apr", value: 1240 },
    ],
    wasteAvoided: [
      { month: "Nov", value: 12 },
      { month: "Dec", value: 18 },
      { month: "Jan", value: 15 },
      { month: "Feb", value: 22 },
      { month: "Mar", value: 28 },
      { month: "Apr", value: 35 },
      { month: "Apr W2", value: 38 },
      { month: "Apr W3", value: 47 },
    ],
    co2Avoided: [
      { month: "Nov", value: 18 },
      { month: "Dec", value: 35 },
      { month: "Jan", value: 52 },
      { month: "Feb", value: 78 },
      { month: "Mar", value: 110 },
      { month: "Apr", value: 142 },
    ],
    topMedicines: [
      { medicineId: "med-metformin", name: "Metformin 500mg", count: 17 },
      { medicineId: "med-amoxicillin", name: "Amoxicillin 250mg", count: 12 },
      { medicineId: "med-levothyroxine", name: "Levothyroxine 50mcg", count: 9 },
      { medicineId: "med-sertraline", name: "Sertraline 50mg", count: 7 },
    ],
  },
};

export const pharmacyClusters = [
  { label: "Peckham / Camberwell", lat: 51.4735, lng: -0.0780, count: 15 },
  { label: "Bermondsey / Rotherhithe", lat: 51.4960, lng: -0.0550, count: 8 },
  { label: "Lewisham / Catford", lat: 51.4530, lng: -0.0170, count: 12 },
  { label: "Deptford / New Cross", lat: 51.4760, lng: -0.0320, count: 6 },
  { label: "Dulwich / Forest Hill", lat: 51.4470, lng: -0.0640, count: 9 },
  { label: "Brixton / Herne Hill", lat: 51.4570, lng: -0.1010, count: 11 },
  { label: "Sydenham / Crystal Palace", lat: 51.4230, lng: -0.0650, count: 7 },
  { label: "Walworth / Elephant", lat: 51.4920, lng: -0.0960, count: 9 },
];
```

- [ ] **Step 6: Commit**

```bash
git add app/data/
git commit -m "feat: add complete mock data layer (pharmacies, medicines, listings, transactions, stats)"
```

---

## Task 3: Rebrand Shell — Sidebar, Topbar, AppShell, Layout

**Files:**
- Modify: `app/components/Sidebar.tsx`, `app/components/Topbar.tsx`, `app/components/AppShell.tsx`, `app/layout.tsx`
- Delete: `app/tab-1/page.tsx`, `app/tab-2/page.tsx`, `app/tab-3/page.tsx`, `app/tab-4/page.tsx`, `app/tab-5/page.tsx`

- [ ] **Step 1: Rewrite `app/components/Sidebar.tsx`**

```tsx
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
```

- [ ] **Step 2: Rewrite `app/components/Topbar.tsx`**

```tsx
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
```

- [ ] **Step 3: Update `app/components/AppShell.tsx`**

```tsx
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
```

- [ ] **Step 4: Update `app/layout.tsx` metadata**

```tsx
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "./components/AppShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PharmaBridge",
  description: "Stop burning good medicine — pharmacy-to-pharmacy surplus matching",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head />
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Delete old tab pages**

```bash
rm -rf app/tab-1 app/tab-2 app/tab-3 app/tab-4 app/tab-5
```

- [ ] **Step 6: Create placeholder pages for all new routes**

Create each of these with a simple heading so the sidebar navigation works immediately:

`app/dashboard/page.tsx`:
```tsx
export default function DashboardPage() {
  return <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>;
}
```

`app/list-surplus/page.tsx`:
```tsx
export default function ListSurplusPage() {
  return <h1 className="text-xl font-bold text-slate-800">List Surplus</h1>;
}
```

`app/search/page.tsx`:
```tsx
export default function SearchPage() {
  return <h1 className="text-xl font-bold text-slate-800">Search Nearby</h1>;
}
```

`app/transactions/page.tsx`:
```tsx
export default function TransactionsPage() {
  return <h1 className="text-xl font-bold text-slate-800">Transactions</h1>;
}
```

`app/analytics/page.tsx`:
```tsx
export default function AnalyticsPage() {
  return <h1 className="text-xl font-bold text-slate-800">Analytics</h1>;
}
```

`app/impact/page.tsx`:
```tsx
export default function ImpactPage() {
  return <h1 className="text-xl font-bold text-slate-800">Network Impact</h1>;
}
```

- [ ] **Step 7: Verify — run dev server, click through all sidebar links**

```bash
npm run dev
```

All 7 sidebar links should navigate, show correct titles in topbar, and highlight the active state in green.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: rebrand shell to PharmaBridge with emerald theme and new route structure"
```

---

## Task 4: Shared Components — StatCard, AnimatedCounter, Badge

**Files:**
- Create: `app/components/AnimatedCounter.tsx`, `app/components/StatCard.tsx`, `app/components/Badge.tsx`

- [ ] **Step 1: Create `app/components/AnimatedCounter.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setValue(easedProgress * target);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [target, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-GB");

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Create `app/components/StatCard.tsx`**

```tsx
"use client";

import AnimatedCounter from "./AnimatedCounter";

type AccentColor = "red" | "amber" | "teal" | "green";

const accentStyles: Record<AccentColor, { border: string; text: string }> = {
  red: { border: "border-l-red-500", text: "text-red-500" },
  amber: { border: "border-l-amber-500", text: "text-amber-600" },
  teal: { border: "border-l-teal-500", text: "text-teal-600" },
  green: { border: "border-l-emerald-400", text: "text-emerald-600" },
};

interface StatCardProps {
  label: string;
  value: number;
  subtitle?: string;
  accent?: AccentColor;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  subtitle,
  accent = "green",
  prefix = "",
  suffix = "",
  delay = 0,
}: StatCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-l-4 ${styles.border} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </div>
      <div className={`text-3xl font-extrabold ${styles.text}`}>
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      {subtitle && (
        <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `app/components/Badge.tsx`**

```tsx
type BadgeVariant =
  | "available"
  | "verified"
  | "matched"
  | "requested"
  | "critical"
  | "high"
  | "medium";

const variantStyles: Record<BadgeVariant, string> = {
  available: "bg-emerald-50 text-emerald-600",
  verified: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  matched: "bg-teal-50 text-teal-700",
  requested: "bg-amber-50 text-amber-700",
  critical: "bg-red-50 text-red-600",
  high: "bg-amber-50 text-amber-700",
  medium: "bg-yellow-50 text-yellow-700",
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
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${variantStyles[variant]} ${pulse ? "animate-badge-pulse" : ""}`}
    >
      {label ?? variantLabels[variant]}
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/components/AnimatedCounter.tsx app/components/StatCard.tsx app/components/Badge.tsx
git commit -m "feat: add shared components — AnimatedCounter, StatCard, Badge"
```

---

## Task 5: Landing Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
"use client";

import StatCard from "./components/StatCard";

export default function LandingPage() {
  return (
    <div className="-m-6">
      {/* Hero */}
      <div
        className="px-10 py-12 text-center"
        style={{ background: "linear-gradient(135deg, #d1fae5, #a7f3d0, #99f6e4)" }}
      >
        <div className="text-xs uppercase tracking-[2px] text-emerald-700/60 mb-2">
          The Problem
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-3">
          Stop Burning Good Medicine
        </h1>
        <p className="text-sm text-emerald-800/70 max-w-lg mx-auto">
          One pharmacy incinerates stock while another turns patients away.
          What if they could just... share?
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-5 px-10 py-8">
        <StatCard
          label="Medicines Destroyed / Year"
          value={110}
          prefix="£"
          suffix="m"
          subtitle="Perfectly good, unopened, in-date"
          accent="red"
          delay={0}
        />
        <StatCard
          label="Pharmacies Closed Since 2022"
          value={700}
          suffix="+"
          subtitle="4 closures per week in 2024"
          accent="amber"
          delay={200}
        />
        <StatCard
          label="Shortage Warnings / Week"
          value={28}
          subtitle="Patients turned away or delayed"
          accent="teal"
          delay={400}
        />
      </div>

      {/* Transition */}
      <div
        className="text-center pb-10 text-slate-500 italic text-[15px] animate-fade-in-up"
        style={{ animationDelay: "800ms" }}
      >
        &ldquo;What if they could just... share?&rdquo;
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — check the landing page renders with animated stat cards**

```bash
npm run dev
```

Open http://localhost:3000 — hero gradient, 3 stat cards animating in with count-up, transition text.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build landing page with hero gradient and animated stat cards"
```

---

## Task 6: Dashboard Page

**Files:**
- Modify: `app/dashboard/page.tsx`

- [ ] **Step 1: Rewrite `app/dashboard/page.tsx`**

```tsx
"use client";

import Link from "next/link";
import { getListingsForPharmacy } from "../data/listings";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import { networkStats } from "../data/stats";
import Badge from "../components/Badge";

const greenfieldListings = getListingsForPharmacy("ph-greenfield");
const perf = networkStats.pharmacyPerformance;

export default function DashboardPage() {
  return (
    <div>
      {/* Alert Banner */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-4 py-3 mb-5 flex items-center gap-3">
        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
          3
        </div>
        <span className="text-sm text-emerald-800">
          <strong>3 items on your watch list are available nearby</strong> — Metformin 500mg highlighted
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Active Listings", value: perf.activeListings },
          { label: "Completed Sales", value: perf.completedSales, color: "text-emerald-600" },
          { label: "Revenue Recovered", value: `£${perf.revenueRecovered.toLocaleString()}`, color: "text-emerald-600" },
          { label: "Expiring Soon", value: perf.expiringSoon, color: "text-red-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="text-[11px] text-slate-400 uppercase tracking-wide">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color ?? "text-slate-800"}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
          <span className="font-semibold text-[15px] text-slate-800">Your Surplus Listings</span>
          <Link
            href="/list-surplus"
            className="bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors"
          >
            + List Surplus
          </Link>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-2.5 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400 font-semibold">
          <div>Medicine</div>
          <div>Qty</div>
          <div>Expiry</div>
          <div>Price</div>
          <div>Status</div>
        </div>

        {/* Table Rows */}
        {greenfieldListings.map((listing) => {
          const med = getMedicineById(listing.medicineId);
          if (!med) return null;
          const badgeVariant = listing.status === "available" ? "available"
            : listing.status === "requested" ? "requested"
            : "matched";
          const badgeLabel = listing.status === "requested" ? "1 Request" : undefined;
          return (
            <div
              key={listing.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-5 py-3 border-b border-slate-100 items-center text-sm"
            >
              <div>
                <div className="font-semibold text-slate-800">{formatMedicineName(med)}</div>
                <div className="text-[11px] text-slate-400">
                  {med.packSize} {med.form} · {med.manufacturer}
                </div>
              </div>
              <div className="text-slate-600">{listing.quantity} packs</div>
              <div className="text-slate-600">
                {new Date(listing.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </div>
              <div className="text-slate-600">£{listing.pricePerPack.toFixed(2)}/pack</div>
              <div className="flex items-center gap-2">
                <Badge variant={badgeVariant} label={badgeLabel} />
                {listing.fmdVerified && <Badge variant="verified" label="✓ FMD" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — dashboard shows alert, stats, and listings table**

- [ ] **Step 3: Commit**

```bash
git add app/dashboard/page.tsx
git commit -m "feat: build dashboard with alert banner, stats, and surplus listings table"
```

---

## Task 7: Shared Components — ScannerUI, Timeline

**Files:**
- Create: `app/components/ScannerUI.tsx`, `app/components/Timeline.tsx`

- [ ] **Step 1: Create `app/components/ScannerUI.tsx`**

```tsx
"use client";

import { useState } from "react";

interface ScannerUIProps {
  onScanComplete: () => void;
}

export default function ScannerUI({ onScanComplete }: ScannerUIProps) {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanComplete();
    }, 1500);
  };

  return (
    <div>
      <div className="bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
        {/* Viewfinder */}
        <div className="w-[60%] h-[60%] border-2 border-white/40 rounded-lg relative">
          {/* Corner brackets */}
          <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-[3px] border-l-[3px] border-emerald-400 rounded-tl" />
          <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-[3px] border-r-[3px] border-emerald-400 rounded-tr" />
          <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-[3px] border-l-[3px] border-emerald-400 rounded-bl" />
          <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-[3px] border-r-[3px] border-emerald-400 rounded-br" />

          {/* Mock barcode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[2px] items-end h-10">
            {[2, 1, 3, 1, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 1].map((w, i) => (
              <div
                key={i}
                className="bg-white/70"
                style={{
                  width: `${w}px`,
                  height: `${60 + (i % 3) * 15}%`,
                }}
              />
            ))}
          </div>

          {/* Scan line */}
          {scanning && (
            <div
              className="absolute left-[5%] right-[5%] h-[2px] animate-scan-line"
              style={{ background: "linear-gradient(90deg, transparent, #34d399, transparent)" }}
            />
          )}
        </div>

        {/* Label */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-white/50 text-[11px]">
          Position FMD barcode within frame
        </div>
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full mt-3 bg-emerald-400 hover:bg-emerald-500 disabled:bg-emerald-300 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
      >
        {scanning ? "Scanning..." : "Scan Barcode"}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/components/Timeline.tsx`**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add app/components/ScannerUI.tsx app/components/Timeline.tsx
git commit -m "feat: add ScannerUI and Timeline shared components"
```

---

## Task 8: List Surplus Page

**Files:**
- Modify: `app/list-surplus/page.tsx`

- [ ] **Step 1: Rewrite `app/list-surplus/page.tsx`**

```tsx
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

export default function ListSurplusPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleScanComplete = () => setStep(1);

  const handleList = () => {
    setStep(2);
    setShowSuccess(true);
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-7">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= step
                    ? "bg-emerald-400 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm ${
                  i <= step ? "font-semibold text-emerald-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-10 h-0.5 bg-slate-200 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Success State */}
      {showSuccess ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Medicine Listed!</h2>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Scanner */}
          <ScannerUI onScanComplete={handleScanComplete} />

          {/* Right: Form */}
          <div>
            {step === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex items-center justify-center min-h-[300px]">
                <p className="text-slate-400 text-sm">Scan a barcode to begin</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="verified" pulse />
                  <span className="text-[11px] text-slate-400">Pack authenticated via EMVS</span>
                </div>

                <div className="flex flex-col gap-3.5 text-sm">
                  <Field label="Medicine Name" value={MOCK_SCAN_RESULT.name} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Batch Number" value={MOCK_SCAN_RESULT.batchNumber} />
                    <Field label="Expiry Date" value={MOCK_SCAN_RESULT.expiryDate} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Manufacturer" value={MOCK_SCAN_RESULT.manufacturer} />
                    <Field label="Pack Size" value={MOCK_SCAN_RESULT.packSize} />
                  </div>

                  <hr className="border-slate-200" />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Quantity</div>
                      <div className="border-2 border-emerald-400 rounded-md px-3 py-2 font-semibold text-slate-800">5 packs</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">Price per Pack</div>
                      <div className="border-2 border-emerald-400 rounded-md px-3 py-2 font-semibold text-slate-800">£3.20</div>
                      <div className="text-[10px] text-emerald-600 mt-0.5">40% below wholesale (£5.34)</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleList}
                  className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
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
      <div className="text-[11px] text-slate-500 uppercase tracking-wide mb-1">{label}</div>
      <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-800 font-medium">
        {value}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — test the scan → form → list → redirect flow**

- [ ] **Step 3: Commit**

```bash
git add app/list-surplus/page.tsx
git commit -m "feat: build list surplus page with fake barcode scanner and 3-step flow"
```

---

## Task 9: Shared Component — PharmacyMap

**Files:**
- Create: `app/components/PharmacyMap.tsx`

- [ ] **Step 1: Create `app/components/PharmacyMap.tsx`**

```tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  count?: number;
  isCurrentUser?: boolean;
}

interface PharmacyMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (id: string) => void;
}

function createIcon(isCurrentUser: boolean, count?: number): L.DivIcon {
  const bg = isCurrentUser ? "#064e3b" : "#34d399";
  const text = isCurrentUser ? "You" : (count?.toString() ?? "•");
  const size = isCurrentUser ? 36 : 30;

  return L.divIcon({
    html: `<div style="
      background: ${bg};
      color: white;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isCurrentUser ? 11 : 10}px;
      font-weight: 700;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      border: 2px solid white;
      font-family: 'DM Sans', system-ui, sans-serif;
    ">${text}</div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function PharmacyMap({
  markers,
  center = [51.474, -0.069],
  zoom = 13,
  onMarkerClick,
}: PharmacyMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={createIcon(!!m.isCurrentUser, m.count)}
          eventHandlers={{
            click: () => onMarkerClick?.(m.id),
          }}
        >
          <Popup>
            <strong>{m.label}</strong>
            {m.count !== undefined && <div>{m.count} listings</div>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/PharmacyMap.tsx
git commit -m "feat: add PharmacyMap Leaflet wrapper component"
```

---

## Task 10: Search Page

**Files:**
- Modify: `app/search/page.tsx`
- Create: `app/components/RequestModal.tsx`

- [ ] **Step 1: Create `app/components/RequestModal.tsx`**

```tsx
"use client";

import { useState } from "react";

interface RequestModalProps {
  medicineName: string;
  quantity: number;
  pricePerPack: number;
  wholesalePrice: number;
  pharmacyName: string;
  onClose: () => void;
}

export default function RequestModal({
  medicineName,
  quantity,
  pricePerPack,
  wholesalePrice,
  pharmacyName,
  onClose,
}: RequestModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const totalSavings = (wholesalePrice - pricePerPack) * quantity;
  const [delivery, setDelivery] = useState<"courier" | "pickup">("courier");

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Match Confirmed!</h3>
          <p className="text-sm text-slate-400">Both pharmacies have been notified</p>
          <button onClick={onClose} className="mt-6 bg-emerald-400 text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Confirm Request</h3>

        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Medicine</span>
            <span className="font-medium text-slate-800">{medicineName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Quantity</span>
            <span className="font-medium text-slate-800">{quantity} packs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">From</span>
            <span className="font-medium text-slate-800">{pharmacyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total</span>
            <span className="font-medium text-slate-800">£{(pricePerPack * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-emerald-600 font-semibold">You save</span>
            <span className="text-emerald-600 font-bold text-lg">£{totalSavings.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery toggle */}
        <div className="mb-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-wide mb-2">Delivery Method</div>
          <div className="flex gap-2">
            <button
              onClick={() => setDelivery("courier")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                delivery === "courier"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              🚐 Courier — arrives by 2pm
            </button>
            <button
              onClick={() => setDelivery("pickup")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                delivery === "pickup"
                  ? "bg-emerald-50 border-emerald-400 text-emerald-700"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              🏪 Pickup
            </button>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mb-4">
          A digital chain-of-custody record will be created automatically.
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-500">
            Cancel
          </button>
          <button
            onClick={() => setConfirmed(true)}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-emerald-400 hover:bg-emerald-500 text-white transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `app/search/page.tsx`**

```tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { listings } from "../data/listings";
import { pharmacies, currentPharmacy } from "../data/pharmacies";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import Badge from "../components/Badge";
import RequestModal from "../components/RequestModal";
import type { MapMarker } from "../components/PharmacyMap";

const PharmacyMap = dynamic(() => import("../components/PharmacyMap"), { ssr: false });

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function kmToMiles(km: number): number {
  return km * 0.621371;
}

export default function SearchPage() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [highlightPharmacy, setHighlightPharmacy] = useState<string | null>(null);

  const availableListings = useMemo(() => {
    return listings
      .filter((l) => l.status === "available" && l.pharmacyId !== currentPharmacy.id)
      .map((l) => {
        const pharmacy = pharmacies.find((p) => p.id === l.pharmacyId)!;
        const med = getMedicineById(l.medicineId)!;
        const dist = distanceKm(currentPharmacy.lat, currentPharmacy.lng, pharmacy.lat, pharmacy.lng);
        return { listing: l, pharmacy, medicine: med, distanceMiles: kmToMiles(dist) };
      })
      .sort((a, b) => a.distanceMiles - b.distanceMiles);
  }, []);

  const markers: MapMarker[] = useMemo(() => {
    const pharmacyListingCounts = new Map<string, number>();
    availableListings.forEach(({ listing }) => {
      pharmacyListingCounts.set(listing.pharmacyId, (pharmacyListingCounts.get(listing.pharmacyId) ?? 0) + 1);
    });

    const markerList: MapMarker[] = [
      { id: currentPharmacy.id, lat: currentPharmacy.lat, lng: currentPharmacy.lng, label: currentPharmacy.name, isCurrentUser: true },
    ];

    pharmacyListingCounts.forEach((count, pharmacyId) => {
      const ph = pharmacies.find((p) => p.id === pharmacyId)!;
      markerList.push({ id: ph.id, lat: ph.lat, lng: ph.lng, label: ph.name, count });
    });

    return markerList;
  }, [availableListings]);

  const modalListing = selectedListing
    ? availableListings.find((a) => a.listing.id === selectedListing)
    : null;

  return (
    <div>
      {/* Search Bar */}
      <div className="bg-white rounded-lg px-4 py-3 mb-4 flex gap-3 items-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <input
          type="text"
          placeholder='Search medicines... e.g. "Metformin 500mg"'
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400"
        />
        <select className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-600">
          <option>Within: 5 miles</option>
          <option>Within: 2 miles</option>
          <option>Within: 10 miles</option>
        </select>
        <select className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-600">
          <option>Sort: Distance</option>
          <option>Sort: Price</option>
          <option>Sort: Expiry</option>
        </select>
      </div>

      {/* Split: Map + Results */}
      <div className="grid grid-cols-2 gap-4" style={{ height: "calc(100vh - 200px)" }}>
        {/* Map */}
        <div className="rounded-lg overflow-hidden">
          <PharmacyMap
            markers={markers}
            onMarkerClick={(id) => setHighlightPharmacy(id)}
          />
        </div>

        {/* Results */}
        <div className="overflow-y-auto pr-1">
          <div className="text-xs text-slate-400 mb-3">
            Showing <strong className="text-slate-600">{availableListings.length} listings</strong> from nearby pharmacies
          </div>

          <div className="flex flex-col gap-2.5">
            {availableListings.map(({ listing, pharmacy, medicine, distanceMiles }) => {
              const savingsPercent = Math.round(((medicine.wholesalePrice - listing.pricePerPack) / medicine.wholesalePrice) * 100);
              const isHighlighted = highlightPharmacy === pharmacy.id;

              return (
                <div
                  key={listing.id}
                  className={`bg-white border rounded-lg p-3.5 transition-colors ${
                    isHighlighted ? "border-emerald-400 shadow-md" : "border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-sm text-slate-800">{pharmacy.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {pharmacy.postcode} · {distanceMiles.toFixed(1)} miles
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-xs">{"★".repeat(Math.round(pharmacy.rating))}</span>
                      <span className="text-[11px] text-slate-400">{pharmacy.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-slate-700">
                        {formatMedicineName(medicine)} · {listing.quantity} packs
                      </div>
                      <div className="flex gap-1.5 mt-1">
                        <Badge variant="verified" />
                        <span className="text-[11px] text-slate-400">
                          Exp: {new Date(listing.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-600">£{listing.pricePerPack.toFixed(2)}</div>
                      <div className="text-[10px] text-emerald-500">{savingsPercent}% below wholesale</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedListing(listing.id)}
                    className="w-full mt-2.5 bg-emerald-400 hover:bg-emerald-500 text-white py-2 rounded-md text-xs font-semibold transition-colors"
                  >
                    Request
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {modalListing && (
        <RequestModal
          medicineName={formatMedicineName(modalListing.medicine)}
          quantity={modalListing.listing.quantity}
          pricePerPack={modalListing.listing.pricePerPack}
          wholesalePrice={modalListing.medicine.wholesalePrice}
          pharmacyName={modalListing.pharmacy.name}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify — map renders with pins, results list scrolls, Request opens modal**

- [ ] **Step 4: Commit**

```bash
git add app/search/page.tsx app/components/RequestModal.tsx
git commit -m "feat: build search page with Leaflet map, results list, and request modal"
```

---

## Task 11: Transactions Page

**Files:**
- Modify: `app/transactions/page.tsx`

- [ ] **Step 1: Rewrite `app/transactions/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { getTransactionsForPharmacy } from "../data/transactions";
import { getMedicineById, formatMedicineName } from "../data/medicines";
import { getPharmacyById, CURRENT_PHARMACY_ID } from "../data/pharmacies";
import Timeline from "../components/Timeline";

const myTransactions = getTransactionsForPharmacy(CURRENT_PHARMACY_ID);

export default function TransactionsPage() {
  const [selectedId, setSelectedId] = useState(myTransactions[0]?.id ?? "");
  const selected = myTransactions.find((t) => t.id === selectedId);

  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: "280px 1fr", height: "calc(100vh - 120px)" }}>
      {/* Left: Transaction List */}
      <div className="overflow-y-auto">
        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">
          Recent Transactions
        </div>
        <div className="flex flex-col gap-1.5">
          {myTransactions.map((txn) => {
            const med = getMedicineById(txn.medicineId);
            const isSeller = txn.sellerPharmacyId === CURRENT_PHARMACY_ID;
            const counterpartyId = isSeller ? txn.buyerPharmacyId : txn.sellerPharmacyId;
            const counterparty = getPharmacyById(counterpartyId);
            const isActive = txn.id === selectedId;

            return (
              <button
                key={txn.id}
                onClick={() => setSelectedId(txn.id)}
                className={`text-left rounded-lg p-3 transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white"
                    : "bg-white border border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className={`font-semibold text-sm ${isActive ? "" : "text-slate-800"}`}>
                  {med ? formatMedicineName(med) : "Unknown"}
                </div>
                <div className={`text-[11px] ${isActive ? "opacity-80" : "text-slate-400"}`}>
                  {isSeller ? "→" : "←"} {counterparty?.name ?? "Unknown"} · {txn.quantity} packs
                </div>
                <div className={`text-[10px] mt-1 ${isActive ? "opacity-60" : "text-slate-300"}`}>
                  {new Date(txn.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Audit Trail */}
      {selected && (
        <div className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-y-auto">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {getMedicineById(selected.medicineId)
                  ? formatMedicineName(getMedicineById(selected.medicineId)!)
                  : "Unknown"}
              </h2>
              <div className="text-sm text-slate-500">
                Batch #{selected.auditTrail[0]?.description.match(/#(\w+)/)?.[1] ?? "N/A"} · {selected.quantity} packs
              </div>
            </div>
            <button className="bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-500 font-medium hover:bg-slate-100">
              Download PDF ↓
            </button>
          </div>

          <Timeline events={selected.auditTrail} />

          <div className="mt-5 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
            This record is immutable and available to GPhC/MHRA inspectors on request.
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify — click transaction cards, timeline updates**

- [ ] **Step 3: Commit**

```bash
git add app/transactions/page.tsx
git commit -m "feat: build transactions page with audit trail timeline"
```

---

## Task 12: Analytics Page

**Files:**
- Modify: `app/analytics/page.tsx`

- [ ] **Step 1: Rewrite `app/analytics/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { networkStats } from "../data/stats";

const perf = networkStats.pharmacyPerformance;
const PERIODS = ["7D", "30D", "90D", "1Y"];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30D");

  return (
    <div>
      {/* Period Selector */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-bold text-slate-800">Your Performance</h2>
        <div className="flex gap-1 bg-slate-100 rounded-md p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                p === period
                  ? "bg-white text-slate-800 font-semibold shadow-sm"
                  : "text-slate-400"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top Row: Revenue + Waste */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">Revenue Recovered</div>
          <div className="text-xl font-bold text-slate-800 mb-3">
            £{perf.revenueRecovered.toLocaleString()}{" "}
            <span className="text-xs text-emerald-500 font-medium">+18% ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={perf.revenueHistory}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">Waste Avoided (packs)</div>
          <div className="text-xl font-bold text-slate-800 mb-3">
            47{" "}
            <span className="text-xs text-emerald-500 font-medium">+12% ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={perf.wasteAvoided}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="value" fill="#34d399" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Top Medicines + CO2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-sm font-semibold text-slate-800 mb-3">Top Traded Medicines</div>
          <div className="flex flex-col gap-2.5">
            {perf.topMedicines.map((m) => (
              <div key={m.medicineId} className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{m.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${(m.count / perf.topMedicines[0].count) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 w-7 text-right">{m.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="text-xs text-slate-400 mb-1">CO₂ Avoided This Month</div>
          <div className="text-xl font-bold text-emerald-600 mb-3">142 kg</div>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={perf.co2Avoided}>
              <defs>
                <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — charts render, period toggle switches**

- [ ] **Step 3: Commit**

```bash
git add app/analytics/page.tsx
git commit -m "feat: build analytics page with Recharts (revenue, waste, CO2, top medicines)"
```

---

## Task 13: Impact Dashboard Page

**Files:**
- Modify: `app/impact/page.tsx`

- [ ] **Step 1: Rewrite `app/impact/page.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { networkStats, pharmacyClusters } from "../data/stats";
import AnimatedCounter from "../components/AnimatedCounter";
import Badge from "../components/Badge";
import type { MapMarker } from "../components/PharmacyMap";

const PharmacyMap = dynamic(() => import("../components/PharmacyMap"), { ssr: false });

const clusterMarkers: MapMarker[] = pharmacyClusters.map((c, i) => ({
  id: `cluster-${i}`,
  lat: c.lat,
  lng: c.lng,
  label: c.label,
  count: c.count,
}));

export default function ImpactPage() {
  return (
    <div>
      {/* Animated Counters */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Medicines Redistributed", value: networkStats.totalRedistributed, suffix: " packs", color: "text-emerald-600" },
          { label: "Value Saved", value: networkStats.totalValueSaved, prefix: "£", color: "text-emerald-600" },
          { label: "CO₂ Avoided", value: networkStats.totalCO2Avoided, suffix: " kg", color: "text-green-600" },
          { label: "Pharmacies Active", value: networkStats.activePharmacies, color: "text-teal-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">{stat.label}</div>
            <div className={`text-[28px] font-extrabold ${stat.color}`}>
              <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
          </div>
        ))}
      </div>

      {/* Map + Side Panels */}
      <div className="grid grid-cols-2 gap-4">
        {/* Map */}
        <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <div className="px-4 py-3 border-b border-slate-200 text-sm font-semibold text-slate-800">
            Network Map — SE London
          </div>
          <div style={{ height: 300 }}>
            <PharmacyMap
              markers={clusterMarkers}
              center={[51.462, -0.065]}
              zoom={12}
            />
          </div>
        </div>

        {/* Right: Shortages + Waste Trend */}
        <div className="flex flex-col gap-4">
          {/* Trending Shortages */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="text-sm font-semibold text-slate-800 mb-3">Trending Shortages</div>
            <div className="flex flex-col gap-2">
              {networkStats.trendingShortages.map((s) => (
                <div key={s.medicineId} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        s.severity === "critical" ? "bg-red-500"
                          : s.severity === "high" ? "bg-amber-500"
                          : "bg-yellow-400"
                      }`}
                    />
                    <span className="text-slate-600">{s.medicineName}</span>
                  </div>
                  <Badge variant={s.severity} />
                </div>
              ))}
            </div>
          </div>

          {/* Waste Reduction Trend */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex-1">
            <div className="text-sm font-semibold text-slate-800 mb-1">Waste Reduction Trend</div>
            <div className="text-[11px] text-emerald-600 mb-2">↓ 34% month-over-month decline</div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={networkStats.wasteReductionTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify — counters animate, map shows cluster pins, charts render**

- [ ] **Step 3: Commit**

```bash
git add app/impact/page.tsx
git commit -m "feat: build impact dashboard with animated counters, network map, and shortage trends"
```

---

## Task 14: Final Polish & AGENTS.md Update

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Update AGENTS.md to reflect new structure**

Update the App Structure section to reflect the new route structure (replace the old tab-1 through tab-5 description):

```markdown
### App Structure

- The app uses a dashboard layout with a sidebar and 7 pages
- Landing page at `/` (problem statement + stats)
- 6 feature pages: `/dashboard`, `/list-surplus`, `/search`, `/transactions`, `/analytics`, `/impact`
- Shared UI components go in `app/components/`
- Mock data layer in `app/data/` — all pages import from the same data source for consistency
```

- [ ] **Step 2: Run `npm run build` to verify no build errors**

```bash
npm run build
```

Fix any TypeScript or build errors that surface.

- [ ] **Step 3: Run dev server and click through every page in demo order**

```bash
npm run dev
```

Walk through the demo script:
1. `/` — landing page with animated stats
2. `/dashboard` — surplus listings, click "+ List Surplus"
3. `/list-surplus` — scan, form populates, click "List"
4. `/search` — map with pins, results list, click "Request", confirm
5. `/transactions` — click through transaction list, audit timeline
6. `/analytics` — charts, toggle period
7. `/impact` — animated counters, network map, shortages

- [ ] **Step 4: Commit everything**

```bash
git add -A
git commit -m "chore: update AGENTS.md and final polish"
```

---

## Dependency Graph

Tasks 1-2 are foundational and must complete first. Task 3 depends on Task 1. Tasks 4-7 depend on Tasks 1-2. Tasks 8-13 depend on Tasks 1-4 and can be parallelised. Task 14 runs last.

```
Task 1 (Tailwind setup) ──┐
                           ├── Task 3 (Shell rebrand) ──┐
Task 2 (Mock data)     ───┤                             ├── Tasks 5-6, 8, 10-13 (pages)
                           ├── Task 4 (StatCard etc.) ──┤
                           └── Task 7 (Scanner, Timeline)┘
                                                         └── Task 9 (PharmacyMap) ──┐
                                                                                     ├── Task 14 (polish)
                                                                                     └──────────────────┘
```

**Parallelisable groups after foundation (Tasks 1-4, 7, 9):**
- Group A: Task 5 (Landing), Task 6 (Dashboard)
- Group B: Task 8 (List Surplus), Task 10 (Search)
- Group C: Task 11 (Transactions), Task 12 (Analytics), Task 13 (Impact)
