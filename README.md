# PharmaBridge

**Stop burning good medicine.**

PharmaBridge is a pharmacy-to-pharmacy surplus medicine redistribution platform. It connects pharmacies that have excess stock with nearby pharmacies facing shortages — reducing NHS waste, saving money, and getting medicines to patients faster.

Built for the [National MedTech Foundation Hackathon 2026](https://github.com/richard7ao/national-med-tech-foundation-hackathon).

![Dashboard](screenshots/current-dashboard.png)

**[Pitch Deck (PDF)](slides/PharmaBridge_PitchDeck.pdf)** | **[Google Slides](https://docs.google.com/presentation/d/17eHKXIJ_EW2OGeLTDQH7t8wBVRN3LwaoNOzKdpp8rB0/edit)**

## The Problem

- **£110M** of medicines destroyed by the NHS every year
- **700+** pharmacies closed since 2022
- **28** shortage warnings per week

Pharmacies incinerate perfectly good stock while the pharmacy down the road turns patients away. There's no system for them to share.

## How It Works

1. **List Surplus** — Pharmacy scans a barcode (FMD-verified), sets quantity and price, and lists surplus stock
2. **Search & Match** — Nearby pharmacies search available stock on an interactive map, see prices and distances, and request what they need
3. **Audit Trail** — Every transaction generates an immutable, step-by-step chain of custody record ready for GPhC/MHRA inspection
4. **Track Impact** — Network-wide dashboards show medicines redistributed, revenue recovered, waste avoided, and CO2 saved

## Features

| Page | Description |
|------|-------------|
| **Dashboard** | Pharmacy overview with surplus listings, stats, and alerts |
| **List Surplus** | PMR inventory integration + manual barcode scan flow |
| **Search** | Map-based search for nearby available medicines |
| **Transactions** | Full audit trail timeline for every transaction |
| **Analytics** | Revenue, waste reduction, and top traded medicines |
| **Impact** | Network-wide stats, shortage heatmap, and CO2 tracking |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Maps**: Leaflet + React Leaflet
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx              # Landing page
├── dashboard/            # Pharmacy dashboard with surplus listings
├── list-surplus/         # PMR inventory + manual barcode scan
├── search/               # Map-based medicine search
├── transactions/         # Audit trail timeline
├── analytics/            # Performance charts and stats
├── impact/               # Network-wide impact dashboard
├── components/           # Shared UI components
└── data/                 # Mock data (medicines, listings, transactions, pharmacies)
```

## Team

Built by the Serac Tech team at the National MedTech Foundation Hackathon 2026.

## License

[MIT](LICENSE)
