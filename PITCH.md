# PharmaBridge — Pitch & Product Plan

> **Stop burning good medicine.**

A real-time pharmacy-to-pharmacy surplus matching platform with verified digital chain-of-custody, enabling safe redistribution of unopened, in-date medicines between licensed pharmacies.

---

## Problem Restatement

How can digital solutions enable pharmacies to safely share surplus medicines, reducing the £300m+ annual waste while navigating UK regulations that currently prohibit medicine redistribution?

---

## The Players

| Stakeholder | Role | Primary Loss |
|---|---|---|
| Community Pharmacies | Dispense prescriptions, manage stock, dispose of returns | £45,000 average annual loss; expired stock write-offs on razor-thin 89p/item margins |
| Patients & Public | Receive and use prescribed medicines | £90m in unused medicines hoarded at home; 40% admit to throwing away prescriptions |
| GP Practices & Prescribers | Prescribe medicines, manage repeat prescriptions | 10% of all dispensed items are inappropriate or unnecessary (overprescribing review) |
| Care Homes | Administer medicines to 350,000+ residents | £50m/year in medicine disposal; ~£6,619 average waste per care home |
| NHS England / ICBs | Commission pharmacy services, manage budgets | £300m+ annual waste + £500m non-adherence = £800m lost annually |
| MHRA | Regulates medicine safety and distribution | Balancing patient safety rules against mounting waste; no framework for digital chain-of-custody |
| Pharmaceutical Wholesalers | Distribute 90%+ of NHS medicines | Returned/short-dated stock disrupts logistics; no mechanism to reroute surplus |
| Pharmaceutical Manufacturers | Produce medicines, set shelf lives | No commercial incentive to support redistribution; growing carbon reporting pressure from 2028 |
| Greener NHS / Environment | Drive NHS net zero by 2040/2045 | Medicines = 25% of NHS carbon footprint; 100% of returned medicines incinerated |
| GPhC | Regulates pharmacy premises and professionals | Must ensure any sharing scheme doesn't compromise safety standards |
| Emerging Tech Platforms (e.g. Medicycle) | Facilitate pharmacy-to-pharmacy stock transfers | Regulatory uncertainty; difficulty achieving network effects |

---

## The Losses — Quantified

### Community Pharmacies
- **Financial loss**: Average pharmacy loses **£45,000/year** — *The Pharmacist, 2024*
- **Margin squeeze**: Just **89p profit per item dispensed** — *Pharmaceutical Journal, 2024*
- **Funding cut**: **30% real-terms cut** since 2015; retained margin **£430m short** of inflation-adjusted value — *Company Chemists' Association, 2024*
- **Expired stock write-offs**: Share of the **£110m** in medicines returned to pharmacies annually — all destroyed — *YHEC/DoH, 2010*
- **Closures**: **700 pharmacies closed since 2022**; 4 per week in 2024; **51% are losing money** — *NPA, Jan 2025*
- **Trend**: **Getting worse** — second-highest closure rate on record in 2024; 63% say they'll close within a year without additional support

### Patients & Public
- **Unused medicines at home**: **£90m** worth stored in UK homes at any time — *YHEC, 2010*
- **Non-adherence**: **1/3 to 1/2** of long-term medicines not taken as directed; causes **200,000 deaths/year across Europe** — *NICE NG5; OECD*
- **Improper disposal**: **48%** thrown in bin, **25%** flushed down sink/toilet — *University of York, 2024*
- **Medicine shortages**: **28 shortage warnings per week** to DHSC; **45% of healthcare workers** saw patients' health deteriorate due to shortages — *House of Commons Library; NPA, 2025*
- **Trend**: **Getting worse** — supply disruption notifications up 20% in 2024 vs 2022/23

### GP Practices & Prescribers
- **Overprescribing**: **10% of all dispensed items** are inappropriate — *Government Overprescribing Review*
- **Repeat prescription inertia**: 75-80% of all items are repeats; often issued without review — *NICE*
- **Quantified waste**: One GP practice saved **£280,000** by tackling overprescribing alone — *The Pharmacist*
- **Trend**: **Stable/slowly improving** — NHSBSA Oversupply Dashboard now available but adoption is patchy

### Care Homes
- **Medicine waste**: **£50m/year** disposed of; mean **£6,619 per care home** (~£125/bed/year) — *Sustainable Healthcare / YHEC*
- **Mechanism**: High resident turnover + frequent medication changes = large volumes of unused, in-date medicines destroyed
- **Trend**: **Stable** — no significant policy intervention to date

### NHS England / ICBs
- **Total medicines bill**: **£21.6 billion** in 2024/25 — *NHSBSA, 2025*
- **Annual waste**: **£300m+** (likely higher; original figure based on 2009 data when bill was £8bn) — *YHEC, 2010*
- **Non-adherence cost**: Additional **£500m/year** in lost health value — *RPS/DoH*
- **Preventable share**: **50%** of waste (~£150m) is preventable — *YHEC*
- **Trend**: **Getting worse** — medicines bill has grown 2.7x since the waste baseline study; no updated comprehensive estimate published

### Environment / Greener NHS
- **Carbon footprint**: Medicines = **25% of NHS carbon emissions** — *NHS England Greener NHS, 2025*
- **River contamination**: Pharmaceuticals detected in **52 of 54 river sites** across 10 English national parks — *University of York, 2024*
- **Incineration**: **100%** of returned community medicines are incinerated; zero reuse — *NHS SPS*
- **Trend**: **Getting worse** — NHS targets net zero by 2040 (direct) and 2045 (supply chain) but medicine waste reduction lags other areas

---

## Lose-Lose Dynamics

### Dynamic 1: The Pharmacy Death Spiral — Surplus Stock Trapped While Pharmacies Go Bust

- **Who loses**: Community Pharmacies + NHS/ICBs + Patients
- **Mechanism**: Pharmacy A has surplus of Medicine X (approaching expiry, overstock). Pharmacy B 5 miles away has a shortage of Medicine X. Under current regulations, Pharmacy A **cannot transfer** the surplus to Pharmacy B without a wholesale dealer's licence. Instead, Pharmacy A writes off the stock (deepening its losses), while Pharmacy B either turns patients away or orders emergency stock at premium prices. The NHS pays for the medicine **twice** — once when it's dispensed and destroyed, once when the neighbouring pharmacy re-orders. Meanwhile, patients at Pharmacy B face delays or must travel further, and closures of unprofitable pharmacies reduce access.
- **Combined magnitude**: £110m/year in returned/destroyed pharmacy stock + pharmacy closure costs (700 since 2022) + unknown emergency-ordering premium costs + patient access harm from 46,823 hours of lost pharmacy services in 2023 alone
- **Why it persists**: MHRA/GPhC rules require wholesale dealer licences for pharmacy-to-pharmacy transfers. No digital infrastructure exists to match supply/demand between pharmacies in real time. Professional body consensus opposes redistribution on safety grounds.

### Dynamic 2: The Prescribing-Waste Flywheel — GPs Overprescribe, Patients Stockpile, Pharmacies Destroy

- **Who loses**: GP Practices + Patients + Pharmacies + NHS/ICBs
- **Mechanism**: GPs issue repeat prescriptions for months without medication review (75-80% of items are repeats). Patients order "just in case" — accumulating **£90m worth** of unused medicines in homes. Eventually, medicines expire or patients return them. Pharmacies bear the disposal cost and administrative burden. The NHS has paid for medicines that deliver **zero health benefit**. Meanwhile, 10% of all dispensed items are clinically inappropriate. The oversupply creates a false demand signal that distorts the supply chain.
- **Combined magnitude**: £150m/year in preventable waste + £500m/year in non-adherence losses + £90m patient-stockpiled medicines + GP time wasted on unnecessary repeat authorisations
- **Why it persists**: GPs lack real-time visibility into whether patients actually collect and use prescriptions. Pharmacy systems and GP systems are siloed. Patients fear losing access if they don't order. No feedback loop connects dispensing data back to prescribing decisions.

### Dynamic 3: The Green Paradox — Safety Rules Force Incineration of Usable Medicines

- **Who loses**: Environment/Greener NHS + NHS/ICBs + MHRA (reputationally)
- **Mechanism**: The NHS has committed to net zero by 2040, yet **100%** of returned community medicines are incinerated — contributing to the 25% of NHS carbon emissions from medicines. MHRA cannot permit redistribution without verified chain-of-custody data. But no digital chain-of-custody infrastructure exists, so the MHRA has no evidence base to justify regulatory change. This circular dependency — no infrastructure, no evidence, no regulatory change, no infrastructure — locks in the status quo.
- **Combined magnitude**: 25% of NHS carbon footprint (medicines), contamination of 52/54 tested national park river sites, £300m+ in destroyed-but-usable medicines
- **Why it persists**: Classic chicken-and-egg problem. Regulators need evidence of safe digital tracking to change rules. But rules prevent the pilots that would generate that evidence. The Welsh Government explicitly rejected reuse in 2018, citing cost of temperature monitoring vs. median prescription cost of just £1.59.

### Dynamic 4: Care Homes Burn Money While Residents Suffer Disruption

- **Who loses**: Care Homes + Patients (residents) + NHS/ICBs
- **Mechanism**: Care homes order medicines in bulk for efficiency, but residents' conditions change frequently (dose adjustments, transfers, deaths). Unused in-date medicines **cannot be returned to the supply chain** — they must be incinerated at the care home's cost. This means £50m/year destroyed, while nearby pharmacies may simultaneously face shortages of those same medicines. Care staff spend time on waste documentation instead of direct care.
- **Combined magnitude**: £50m/year in care home medicine waste + staff time diverted from care + patient impact from medicine shortages elsewhere
- **Why it persists**: Same regulatory barrier as Dynamic 1. Care homes have no digital link to nearby pharmacies' stock needs. Bulk ordering is the only cost-efficient model under current supply chain logistics.

---

## The Solution: PharmaBridge

### Lose-Lose Dynamics Addressed
- Dynamic 1: The Pharmacy Death Spiral
- Dynamic 3: The Green Paradox
- Dynamic 4: Care Home Waste

### Winner Table

| Stakeholder | Current State | With PharmaBridge | Estimated Improvement |
|---|---|---|---|
| Community Pharmacies | £110m/year in stock destroyed; average £45k loss | Sell surplus at discounted rate to nearby pharmacies; buy needed stock below wholesale price | Recover 25-40% of currently destroyed stock value (~£28-44m/year network-wide) — *based on Dutch PharmaSwap data showing 25% of returns meet reuse criteria* |
| NHS/ICBs | Paying twice for same medicine (destroyed + re-ordered) | Reduce duplicate purchasing; lower emergency supply costs | £28-44m/year in direct medicine cost savings — *projected from £110m returned stock x 25-40% recovery rate* |
| Care Homes | £50m/year incinerated; £6,619/home average | List surplus in-date stock on platform; nearby pharmacies claim it | Reduce care home waste by 20-30% (~£10-15m/year) — *based on Hampshire hospital reuse pilot recovery rates* |
| Environment / Greener NHS | 100% of returns incinerated | Every redistributed pack avoids incineration; platform tracks CO2 saved | Avoid thousands of tonnes CO2e/year — *Hampshire pilot cut 2,000+ kg CO2e in one month across 8 wards* |
| MHRA | No evidence base for regulatory change | Platform generates auditable safety data from real redistribution events | Provides the pilot evidence needed to justify formal regulatory pathway |
| Patients | Shortages (28 warnings/week); pharmacy closures | Better stock availability at local pharmacy; fewer "out of stock" encounters | Reduced shortage impact — *currently 45% of HCWs see patient health deteriorate from shortages* |

### How It Fits Existing Systems

- **Integrates with**: Pharmacy PMR systems (e.g., Cegedim Rx, Positive Solutions) via API for automatic surplus detection when stock approaches expiry threshold; NHS Spine for pharmacy registration verification; FMD serialisation system for pack-level authentication
- **Adoption path**: Start with a regional ICB pilot (e.g., 50-100 pharmacies in one ICS footprint). ICB commissions the service as a medicines optimisation initiative. Pharmacies opt in — surplus-listing pharmacy sets price (below wholesale); deficit pharmacy buys. Platform handles logistics matching with existing wholesaler delivery routes
- **Leverages**: Existing wholesale distribution infrastructure (HDA members already deliver to pharmacies multiple times per week); existing FMD barcode scanning at pharmacy level; NHSBSA prescribing data for demand forecasting
- **Does NOT require**: Changes to patient-facing dispensing processes; new legislation (pharmacy-to-pharmacy transfer of unopened stock under existing wholesale dealer licence framework, potentially via a shared platform licence); new cold chain infrastructure (medicines remain in licensed pharmacy premises until transfer)

---

## Key Sources

- York Health Economics Consortium / DoH (2010) — £300m annual waste baseline
- NHSBSA (2025) — £21.6bn total NHS prescribing costs 2024/25
- The Pharmacist (2024) — Average pharmacy £45k annual loss
- Pharmaceutical Journal (2024) — 89p profit per item dispensed
- NPA (Jan 2025) — 700 pharmacy closures since 2022; 4/week in 2024
- Company Chemists' Association (2024) — £430m retained margin shortfall
- Community Pharmacy England (2024) — 51% of pharmacies losing money
- NICE NG5 — 1/3 to 1/2 non-adherence on long-term conditions
- House of Commons Library CBP-9997 — 28 shortage warnings/week
- NHS England Greener NHS (2025) — Medicines = 25% of NHS carbon
- University of York (2024) — 52/54 national park river sites contaminated
- PMC 8167662 (2021) — Stakeholder views on medicines reuse in the UK
- Pharmaceutical Journal — Hampshire hospital reuse pilot results
- Sustainable Healthcare — Care home medicine waste data
- Government Overprescribing Review — 10% of dispensed items inappropriate
