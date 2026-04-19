# PharmaBridge Webapp — Design Spec

> **Stop burning good medicine.** A real-time pharmacy-to-pharmacy surplus matching platform with verified digital chain-of-custody.

## Overview

PharmaBridge is a hackathon demo webapp that shows how pharmacies can safely redistribute surplus medicines instead of incinerating them. The demo follows a single pharmacy's perspective (Greenfield Pharmacy, London SE15) with other pharmacies appearing as mock users on the network map.

**Target**: 3-minute screen recording with voiceover, following the narrative in `DEMO_SCRIPT.md`.

## Architecture

### Approach: A+ (Shared Mock Data, Independent Pages)

- One central mock data layer (`app/data/`) imported by all pages
- Pages are independent — no runtime state management
- All data is consistent across pages because it comes from the same source files
- Prefetching for instant page transitions

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (utility-first, no component library)
- **Maps**: Leaflet + react-leaflet + OpenStreetMap tiles (free, no API key)
- **Charts**: Recharts (area charts, bar charts, line charts)
- **Font**: DM Sans (already configured)

### Dependencies to Add

```
tailwindcss @tailwindcss/postcss
leaflet react-leaflet @types/leaflet
recharts
```

### Prefetching Strategy

- Next.js `<Link>` prefetch (default App Router behavior) — all sidebar links prefetch on hover
- Leaflet tile preload — map tiles for London SE15 area loaded on app mount via hidden map init
- Static mock data — all data files imported at build time, zero runtime fetch overhead
- Dynamic imports — Leaflet components loaded with `next/dynamic` to avoid SSR issues

## Route Structure

```
app/
  page.tsx                    — Landing page (stat cards, problem statement)
  layout.tsx                  — AppShell with sidebar + topbar
  data/
    pharmacies.ts             — 20 pharmacies with GPS, names, ratings
    medicines.ts              — 50 medicine definitions with names, manufacturers, pack sizes
    listings.ts               — Active surplus listings linked to pharmacies + medicines
    transactions.ts           — 10 completed transactions with full audit trails
    stats.ts                  — Network-wide counters, trends, analytics data
  dashboard/
    page.tsx                  — Tab 1: Greenfield's surplus listings + alerts
  list-surplus/
    page.tsx                  — Tab 2: Barcode scanner UI + auto-populate form
  search/
    page.tsx                  — Tab 3: Leaflet map + nearby surplus list
  transactions/
    page.tsx                  — Tab 4: Audit trail timeline + chain of custody
  analytics/
    page.tsx                  — Tab 5: Charts, trends, pharmacy performance
  impact/
    page.tsx                  — Tab 6: ICB admin view, animated counters, pharmacy map
  components/
    AppShell.tsx              — Layout wrapper (sidebar + topbar + content)
    Sidebar.tsx               — PharmaBridge nav with 6 tabs + logo
    Topbar.tsx                — Pharmacy name, notifications, user avatar
    StatCard.tsx              — Reusable animated stat card with count-up
    PharmacyMap.tsx            — Leaflet map wrapper (used by Search + Impact)
    AnimatedCounter.tsx        — Count-up animation component
    Badge.tsx                 — Status badges (Available, Verified, Matched, etc.)
    Timeline.tsx              — Vertical timeline for audit trail
    ScannerUI.tsx             — Fake barcode scanner viewfinder
```

## Shared Components

### AppShell
- Sidebar (fixed left, 224px) + Topbar (sticky top, 46px) + content area
- Rebrand from "Octuple" to "PharmaBridge" with new logo/colours
- Sidebar nav items: Home, Dashboard, List Surplus, Search, Transactions, Analytics, Impact

### Topbar
- Left: page title
- Right: "Greenfield Pharmacy, London SE15" label + notification bell + user avatar

### StatCard
- Displays label, animated number (count-up from 0), subtitle
- Accepts colour accent (red, amber, teal, green)
- Fade-in + slide-up animation on mount

### PharmacyMap
- Leaflet + OpenStreetMap tiles
- Centred on London SE15 (~51.474, -0.069)
- Accepts array of pharmacy markers with lat/lng, label, count/badge
- "You" marker in dark emerald for Greenfield, lighter green markers for other pharmacies
- Clickable markers with popup showing pharmacy name + listing count
- Used by both `/search` and `/impact` pages with different marker data

### AnimatedCounter
- Counts up from 0 to target number over ~2 seconds on mount
- Supports formatting (currency prefix, comma separators, "kg" suffix)
- Uses `requestAnimationFrame` for smooth animation

### Badge
- Variants: Available (green), Verified (green outline), Matched (teal), Request (amber), Critical (red), High (amber), Medium (yellow)

### Timeline
- Vertical timeline with coloured dots and connecting line
- Each event: step label, title, description, timestamp
- Green dots for supply chain events, teal dots for platform events

### ScannerUI
- Dark background with camera viewfinder (corner brackets)
- Mock barcode lines inside the viewfinder frame
- Animated scan line (horizontal line sweeping vertically)
- "Scan Barcode" button triggers the animation

## Page Designs

### Landing Page — `/`

**Purpose**: Scene 1 of the demo — present the problem with visual impact.

**Layout**:
- Pastel gradient hero (emerald-100 → emerald-200 → teal-200): headline "Stop Burning Good Medicine" in dark emerald text, subtitle, transition text
- 3 StatCards in a grid below:
  - £110m medicines destroyed/year (red accent)
  - 700+ pharmacies closed since 2022 (amber accent)
  - 28 shortage warnings/week (teal accent)
- Cards animate in sequentially (left → middle → right) with staggered delay (0ms, 200ms, 400ms)
- Numbers count up from 0
- Transition text fades in last: "What if they could just... share?"

### Dashboard — `/dashboard`

**Purpose**: Scene 2 — Greenfield Pharmacy's view of their surplus inventory.

**Layout**:
- Alert banner (green): "3 items on your watch list are available nearby"
- 4 quick stat cards in a row: Active Listings (7), Completed Sales (12), Revenue Recovered (£1,240), Expiring Soon (2)
- Surplus listings table:
  - Columns: Medicine (name + pack info), Qty, Expiry, Price, Status
  - 4 rows of mock data (Metformin, Amoxicillin, Levothyroxine, Sertraline)
  - Status badges: Available (green), 1 Request (amber), Matched (teal)
  - FMD verified shield icon on each row
  - Header with "+ List Surplus" button (links to `/list-surplus`)

### List Surplus — `/list-surplus`

**Purpose**: Scene 2 continued — barcode scanning and listing flow.

**Layout**:
- 3-step progress indicator: Scan → Confirm → List (step 1 active by default)
- Two-column layout:
  - **Left**: Fake scanner UI
    - Dark background, camera viewfinder with corner brackets
    - Mock barcode image inside the frame
    - Animated scanning line
    - "Scan Barcode" button
  - **Right**: Auto-populated form (shown after scan)
    - FMD Verified badge at top
    - Read-only fields (auto-filled): Medicine Name, Batch Number, Expiry Date, Manufacturer, Pack Size
    - Editable fields (highlighted with emerald border): Quantity, Price per Pack
    - Price field shows "40% below wholesale (£5.34)" hint
- "List Medicine" button (green) at bottom

**Interaction flow**:
1. Initial state: Scanner visible, form area shows placeholder "Scan a barcode to begin"
2. Click "Scan Barcode" → scanning line animates for 1.5s → step indicator advances to step 2
3. Form auto-populates with Metformin 500mg mock data → FMD Verified flash
4. User sees pre-filled quantity (5) and price (£3.20)
5. Click "List Medicine" → step indicator advances to step 3 → success state with checkmark → auto-redirect to dashboard after 2s

### Search/Map — `/search`

**Purpose**: Scene 3 — finding nearby surplus stock.

**Layout**:
- Search bar at top with text input, distance filter (5 miles dropdown), sort filter (Distance dropdown)
- Split layout below:
  - **Left (50%)**: Leaflet map
    - Centred on Greenfield Pharmacy (SE15)
    - Dark emerald "You" pin for Greenfield
    - Green pins for nearby pharmacies with listing count badges
    - Clicking a pin highlights the corresponding result card
  - **Right (50%)**: Results list
    - Count label: "Showing 4 pharmacies with Metformin 500mg within 5 miles"
    - Result cards with: pharmacy name, distance, star rating, medicine name + quantity, FMD Verified badge, expiry, price, wholesale savings %, "Request" button

**Request flow** (triggered by clicking "Request"):
- Modal/overlay with confirmation details:
  - Item details (medicine, quantity, seller pharmacy)
  - Savings vs wholesale: "£32.40 saved on this order"
  - Pickup/courier toggle (courier selected: "arrives by 2pm today")
  - Digital chain-of-custody notice
- "Confirm" button → success state → "Match confirmed" notification

### Transactions — `/transactions`

**Purpose**: Scene 4 — chain of custody and audit trail.

**Layout**:
- Two-column layout:
  - **Left (280px)**: Transaction list
    - Clickable cards with medicine name, counterparty pharmacy, pack count, timestamp
    - Arrow direction indicates sold (→) vs bought (←)
    - Active card highlighted in emerald
  - **Right (flex)**: Audit trail detail
    - Header: medicine name, batch number, pack details
    - "Download PDF" button (mock — no real download needed, just the button)
    - 7-step vertical timeline:
      1. Pack Manufactured (AstraZeneca, Macclesfield, batch number)
      2. FMD Serialisation Verified (serial number, EMVS check)
      3. Listed by Greenfield Pharmacy (pharmacist name + GPhC ID, price)
      4. Storage Conditions Confirmed (ambient temp, no cold chain breach)
      5. Matched to Park Lane Pharmacy (pharmacist name + GPhC ID, savings)
      6. Courier Collected (Alliance Healthcare driver, route, ETA)
      7. Received & Countersigned (digital signature recorded)
    - Footer: "This record is immutable and available to GPhC/MHRA inspectors"

### Analytics — `/analytics`

**Purpose**: Pharmacy-level performance data and trends.

**Layout**:
- Period selector (7D / 30D / 90D / 1Y toggle, 30D selected by default)
- Top row (2 columns):
  - Revenue Recovered: £1,240, +18% indicator, Recharts area chart (emerald)
  - Waste Avoided: 47 packs, +12% indicator, Recharts bar chart (emerald bars)
- Bottom row (2 columns):
  - Top Traded Medicines: ranked list with horizontal progress bars (Metformin, Amoxicillin, Levothyroxine, Sertraline)
  - CO₂ Avoided This Month: 142 kg, Recharts line chart (green)

### Impact Dashboard — `/impact`

**Purpose**: Scene 5 — ICB admin/network-wide view.

**Layout**:
- 4 animated counter cards in a row:
  - Medicines Redistributed: 12,847 packs (emerald)
  - Value Saved: £483,210 (green)
  - CO₂ Avoided: 4,200 kg (green)
  - Pharmacies Active: 127 (teal)
- Bottom row (2 columns):
  - **Left**: Network map (Leaflet)
    - Wider borough view of SE London
    - Pharmacy cluster icons with count badges (e.g., hospital emoji + "12" showing 12 active pharmacies in an area)
    - Clusters represent groups of pharmacies per neighbourhood
  - **Right** (stacked):
    - Trending Shortages panel: top 5 medicines with severity badges (Critical/High/Medium) — Metformin, Levothyroxine, HRT Patches, Amoxicillin, Sertraline
    - Waste Reduction Trend: Recharts line chart showing month-over-month decline (Nov → Apr), "↓ 34% month-over-month decline" label

## Mock Data Schema

### pharmacies.ts
```typescript
interface Pharmacy {
  id: string;
  name: string;
  address: string;
  postcode: string;
  lat: number;
  lng: number;
  rating: number;
  totalRatings: number;
  isCurrentUser: boolean; // true only for Greenfield
}
```
20 pharmacies with real London SE postcodes and GPS coordinates. Greenfield Pharmacy (SE15) is the current user.

### medicines.ts
```typescript
interface Medicine {
  id: string;
  name: string;
  strength: string;
  form: string; // tablets, capsules, patches
  packSize: number;
  manufacturer: string;
  wholesalePrice: number; // per pack
}
```
Approximately 15 unique medicines including: Metformin 500mg, Amoxicillin 250mg, Levothyroxine 50mcg, Sertraline 50mg, HRT Patches, Amlodipine 5mg, Omeprazole 20mg, Ramipril 5mg, Atorvastatin 20mg, Salbutamol inhaler, Lansoprazole 30mg, Bisoprolol 2.5mg, Doxycycline 100mg, Naproxen 250mg, Cetirizine 10mg.

### listings.ts
```typescript
interface Listing {
  id: string;
  pharmacyId: string;
  medicineId: string;
  quantity: number;
  pricePerPack: number;
  batchNumber: string;
  expiryDate: string; // ISO date
  fmdVerified: boolean;
  fmdSerial: string;
  status: 'available' | 'requested' | 'matched' | 'completed';
  listedAt: string; // ISO datetime
}
```
Approximately 50 listings spread across the 20 pharmacies. Greenfield has 7 active listings. Ensure Metformin 500mg listings exist at multiple pharmacies for the search demo.

### transactions.ts
```typescript
interface Transaction {
  id: string;
  listingId: string;
  sellerPharmacyId: string;
  buyerPharmacyId: string;
  medicineId: string;
  quantity: number;
  pricePerPack: number;
  totalPrice: number;
  wholesaleSavings: number;
  status: 'confirmed' | 'in-transit' | 'delivered' | 'completed';
  auditTrail: AuditEvent[];
  createdAt: string;
}

interface AuditEvent {
  step: number;
  title: string;
  description: string;
  timestamp: string;
  type: 'supply-chain' | 'platform'; // green vs teal dot
}
```
10 completed transactions. The primary one is Metformin 500mg from Greenfield → Park Lane with £32.40 savings and full 7-step audit trail.

### stats.ts
```typescript
interface NetworkStats {
  totalRedistributed: number;   // 12,847
  totalValueSaved: number;      // 483210
  totalCO2Avoided: number;      // 4200
  activePharmacies: number;     // 127
  trendingShortages: Shortage[];
  wasteReductionTrend: MonthlyDataPoint[];
  pharmacyPerformance: {
    activeListing: number;
    completedSales: number;
    revenueRecovered: number;
    expiringSoon: number;
    revenueHistory: MonthlyDataPoint[];
    wasteAvoided: MonthlyDataPoint[];
    co2Avoided: MonthlyDataPoint[];
    topMedicines: { medicineId: string; count: number }[];
  };
}
```

## Design Tokens / Styling

### Colour Palette — Pastel Emerald / Sustainability (Tailwind)
- **Primary**: Emerald-400 `#34d399` (buttons, active states, primary actions)
- **Primary Dark**: Emerald-600 `#059669` (text on light backgrounds, secondary emphasis)
- **Primary Text on Hero**: Emerald-900 `#064e3b` (dark text on pastel gradient hero)
- **Accent**: Cyan-300 `#67e8f9` (secondary highlights, map accents)
- **Pastel Surfaces**: Emerald-300 `#6ee7b7`, Emerald-200 `#a7f3d0`, Emerald-100 `#d1fae5` (gradients, tinted cards)
- **Warning/Amber**: Amber-400 `#fbbf24` (borders), Amber-600 `#d97706` (text)
- **Danger/Red**: Red-500 `#ef4444` (destruction stats, critical alerts)
- **Backgrounds**: Green-50 `#f0fdf4` page, White `#ffffff` card surfaces
- **Text**: Slate-800 `#1e293b` primary, Slate-400 `#94a3b8` muted
- **Borders**: Slate-200 `#e2e8f0`, Emerald-200 `#a7f3d0` (accent borders)
- **Hero Gradient**: `linear-gradient(135deg, #d1fae5, #a7f3d0, #99f6e4)` — pastel green to teal
- **Sidebar Active**: Emerald-100 `#d1fae5` background, Emerald-400 `#34d399` left border, Emerald-600 `#059669` text
- **Chart Fills**: Emerald-400 `#34d399` primary, Teal-300 `#5eead4` secondary

### Spacing & Layout
- Sidebar: 224px fixed left
- Topbar: 46px sticky top
- Content padding: 24px
- Card border-radius: 8-12px
- Card shadow: `0 1px 2px rgba(0,0,0,0.05)` for subtle, `0 1px 3px rgba(0,0,0,0.08)` for prominent

### Animations
- Stat card entrance: fade-in + translateY(10px→0) over 500ms, staggered 200ms
- Counter count-up: 2s duration using requestAnimationFrame with easeOutQuart
- Scanner line: CSS animation, sweeping top-to-bottom over 1.5s
- Page transitions: handled by Next.js prefetch (near-instant)
- Badge pulse: subtle scale pulse on "FMD Verified" badge when it first appears

## Key Interactions

1. **Landing → Dashboard**: Click sidebar or scroll CTA
2. **Dashboard → List Surplus**: Click "+ List Surplus" button
3. **List Surplus scan flow**: Click "Scan" → animation → form populates → click "List" → redirect to dashboard
4. **Search → Request**: Click "Request" on a listing → confirmation modal → "Confirm" → success notification
5. **Transaction list → detail**: Click a transaction card → right panel updates with that transaction's audit trail
6. **Analytics period toggle**: Click 7D/30D/90D/1Y → charts update (swap mock data sets)
7. **Impact counters**: Animate on page mount from 0 to final values

## Out of Scope

- Real barcode scanning (camera access)
- Real database or API integration
- User authentication / login
- Real courier/logistics
- PDF export functionality
- Real-time notifications
- Mobile responsive design (desktop-only for screen recording)
- Multiple pharmacy login/switching
