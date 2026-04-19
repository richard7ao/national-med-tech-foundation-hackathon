# PharmaBridge Demo Script

**Format**: Screen recording with voiceover
**Duration**: 3 minutes
**Personas**: Two pharmacies — "Greenfield Pharmacy" (has surplus) and "Park Lane Pharmacy" (has shortage)

---

## Scene 1: The Problem (0:00–0:25)

**Screen**: Simple animated stat cards or a "problem slide" within the app's landing page.

**Narration**:
> "Every year, the NHS destroys £110 million worth of perfectly good medicines — simply because the pharmacy down the road doesn't know they exist. 700 pharmacies have closed since 2022. Meanwhile, medicine shortages hit 28 warnings per week. One pharmacy incinerates stock while another turns patients away."

**Action**: Show three stat cards animating in:
- £110m medicines destroyed/year
- 700 pharmacies closed since 2022
- 28 shortage warnings/week

Transition: "What if they could just... share?"

---

## Scene 2: Listing Surplus — Greenfield Pharmacy's View (0:25–1:05)

**Screen**: PharmaBridge dashboard, logged in as "Greenfield Pharmacy, London SE15"

**Narration**:
> "Sarah at Greenfield Pharmacy just received a delivery, but she's overstocked on Metformin 500mg. It expires in 4 months. Under the current system, she'd watch it expire and incinerate it. With PharmaBridge, she scans the barcode."

**Actions** (show each step):
1. Dashboard shows current listed surplus items (2-3 existing listings for realism)
2. Click **"+ List Surplus"** button
3. **Scan barcode** — camera/scanner UI activates, scans a mock FMD barcode
4. System **auto-populates**: Medicine name (Metformin 500mg tablets), batch number, expiry date (Aug 2026), manufacturer, pack size (56 tablets), FMD verification status: Verified
5. Sarah enters: **Quantity** (5 packs), **Price** (40% below wholesale — system suggests a range)
6. Click **"List"**
7. Listing goes live — card appears with a green "Available" badge and a map pin showing her location

**Key detail to show**: The FMD verification badge — this is the safety/trust moment. The system verifies the pack hasn't been tampered with via the existing serialisation system.

---

## Scene 3: Finding Stock — Park Lane Pharmacy's View (1:05–1:45)

**Screen**: Switch to Park Lane Pharmacy's dashboard, 1.2 miles away

**Narration**:
> "Meanwhile, James at Park Lane Pharmacy has a patient waiting for Metformin but his wholesaler is out of stock until Thursday. He searches PharmaBridge."

**Actions**:
1. Dashboard shows an **alert banner**: "3 items on your watch list are available nearby" — Metformin 500mg is highlighted
2. Click into the **search/browse** view — a map shows nearby pharmacies with available surplus as pins
3. **Metformin 500mg** listing from Greenfield appears: price, expiry, distance (1.2 miles), FMD verified, seller rating
4. Click **"Request"**
5. Confirmation screen shows:
   - Item details
   - Savings vs. wholesale price: **£32.40 saved** on this order
   - Pickup/courier toggle (select "Courier — arrives by 2pm today")
   - Digital chain-of-custody record auto-created
6. Click **"Confirm"**
7. Both pharmacies get a notification — **"Match confirmed"**

**Key detail to show**: The savings calculation and the speed — patient gets their medicine today instead of Thursday.

---

## Scene 4: Chain of Custody & Audit Trail (1:45–2:15)

**Screen**: Transaction detail view

**Narration**:
> "Every transaction creates a complete digital audit trail — exactly the kind of evidence the MHRA needs to see."

**Actions**:
1. Show the **transaction timeline**:
   - Pack manufactured (AstraZeneca, batch #AZ20260112)
   - FMD serialisation verified
   - Listed by Greenfield Pharmacy (date, time, pharmacist ID)
   - Storage conditions confirmed (ambient, never broken cold chain flag)
   - Matched to Park Lane Pharmacy
   - Collected/delivered (timestamped)
   - Received and countersigned by pharmacist at Park Lane
2. Show a **"Download PDF"** button — regulatory-ready audit report
3. Briefly show one line: "This record is immutable and available to GPhC/MHRA inspectors"

**Key detail to show**: This isn't just commerce — it's a safety infrastructure. Every pack is traceable end-to-end.

---

## Scene 5: The Impact Dashboard (2:15–2:50)

**Screen**: Network-wide impact dashboard (ICB/admin view)

**Narration**:
> "Now zoom out. This is what an ICB medicines optimisation lead sees across their network."

**Actions**:
1. **Live counters** ticking up:
   - Medicines redistributed: 12,847 packs
   - Value saved: £483,210
   - CO2 avoided: 4,200 kg
   - Pharmacies active: 127
2. **Map view**: Heatmap of surplus/shortage hotspots across a borough — red (shortage) and green (surplus) zones visible. Show connections (animated lines) between matched pharmacies
3. **Trending shortages panel**: Top 5 medicines in short supply across the network — Metformin, Levothyroxine, HRT patches, Amoxicillin, Sertraline
4. **Waste reduction trend**: Line chart showing month-over-month decline in medicines destroyed

**Key detail to show**: This is commissioning-ready. An ICB can see exactly where waste is happening and where redistribution is working.

---

## Scene 6: The Close (2:50–3:00)

**Screen**: Split screen — Greenfield Pharmacy's surplus listed, Park Lane Pharmacy's patient served. Impact numbers below.

**Narration**:
> "PharmaBridge turns pharmacy waste into pharmacy income, patient shortages into same-day access, and incinerated medicines into measurable carbon savings. Everyone wins."

**Final card**:
> **PharmaBridge** — Stop burning good medicine.

---

## MVP Build Checklist

For the screen recording, these functional screens are needed:

| Screen | Type | Priority |
|---|---|---|
| Landing/problem stats | Static | P0 |
| Pharmacy dashboard (surplus list) | Dynamic | P0 |
| List surplus flow (barcode scan, auto-populate, submit) | Dynamic | P0 |
| Search/map view (nearby surplus) | Dynamic | P0 |
| Request/match confirmation | Dynamic | P0 |
| Transaction audit trail timeline | Static/Dynamic | P1 |
| Network impact dashboard (counters, map, charts) | Dynamic | P1 |

**Mock data needed**: ~20 pharmacies with GPS coordinates, ~50 medicine listings with realistic names/batches/expiry dates, 5-10 completed transactions for the dashboard history.

**Can be faked for the recording**: Barcode scanner (trigger auto-populate on any scan/click), courier logistics, PDF export, real-time counter animations (CSS/JS animation on static numbers).
