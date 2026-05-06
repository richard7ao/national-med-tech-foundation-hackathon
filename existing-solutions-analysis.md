# Existing Solutions Gap Analysis — PharmaBridge

## Landscape Overview

The UK pharmacy medicine waste problem (~£300m+/year) sits at the intersection of **inventory management**, **prescribing optimisation**, **regulatory compliance**, and **inter-pharmacy logistics**. No single platform addresses the full loop: identifying surplus, matching it to demand at another pharmacy, verifying safety/chain-of-custody, and facilitating the transfer. Existing solutions fall into four categories: marketplace platforms, PMR/inventory tools, prescribing decision support, and NHS data dashboards. Each tackles a slice of the problem; none closes the loop.

---

## Existing Solutions Analysis

### 1. Medicycle (UK)

- **What it is**: MHRA-registered online medicines marketplace for pharmacies to buy/sell surplus stock
- **Strengths**: Free for pharmacies (no commission); GPhC/MHRA-verified users; linked with C&D product directory; carbon-neutral certified; directly addresses pharmacy-to-pharmacy stock transfer
- **Shortcomings**:
  - **No controlled drugs or cold-chain items**: CD2-5 and fridge lines are excluded — these represent a significant share of high-value pharmacy stock. No quantitative data found on % of waste from excluded categories, but cold-chain biologics are among the fastest-growing NHS spend categories
  - **"Occasional and small quantity" constraint**: Transfers must be occasional, small, and not-for-profit — limiting scalability and commercial viability for pharmacies
  - **No PMR integration**: Surplus must be manually uploaded via dashboard — no automatic detection when stock approaches expiry
  - **No real-time demand matching**: Operates as a listing marketplace, not a live supply-demand matching engine
  - **Early stage / limited network**: Founded 2020, unfunded (per Tracxn); network size not publicly disclosed — likely well below critical mass needed for reliable matching
  - **No chain-of-custody tracking**: No published digital provenance trail from seller to buyer — the exact gap MHRA needs filled to justify regulatory change
- **User Pain Points**: No independent user reviews found specific to Medicycle; platform adoption data not publicly available

### 2. PharmaSwap (Netherlands)

- **What it is**: Sharing marketplace for Dutch pharmacies to trade surplus in-date medicines, hosted on the FLOOW2 platform
- **Strengths**: 836 of ~2,000 Dutch pharmacies registered (~42%); saved €1.17m and 9,719 packaging units; won KNMP innovation award (2020); collaborates with 8 wholesalers; EU Circular Economy Platform recognition
- **Shortcomings**:
  - **Legal workaround, not a proper framework**: EU law prohibited pharmacy-to-pharmacy sales — PharmaSwap had to restructure so the selling pharmacy "dispenses to the patient" on behalf of the buying pharmacy. This adds friction and complexity — [FLOOW2 article](https://www.floow2.com/news-detail/~/items/this-ingenious-plan-to-save-expiring-drugs-had-only-one-problem-it-was-illegal-9094.html)
  - **Modest financial impact at scale**: €1.17m saved across 836 pharmacies ≈ ~€1,400/pharmacy — vs. the pitch's figure of £45,000/year average pharmacy loss. Addresses <4% of the per-pharmacy waste problem
  - **No real-time matching**: Marketplace model requires manual listing and browsing
  - **58% of Dutch pharmacies not yet onboarded**: Despite 7+ years of operation, majority of pharmacies still not participating — [EU Circular Economy Platform](https://circulareconomy.europa.eu/platform/en/good-practices/pharmaswap-sharing-marketplace-reduce-medication-waste)
  - **Not transferable to UK**: UK regulatory framework (wholesale dealer licence requirement) differs from Dutch/EU rules; the "patient prescription transfer" workaround would not be viable under UK Human Medicines Regulations 2012
  - **No digital chain-of-custody**: No published evidence of pack-level tracking or FMD serialisation integration
- **User Pain Points**: Adoption ceiling — 42% after 7 years suggests network-effect barriers that a marketplace alone cannot overcome

### 3. NHSBSA Oversupply Dashboard

- **What it is**: NHS data dashboard highlighting potential overprescribing and oversupply at GP practice level
- **Strengths**: Free to all ICBs; uses national dispensing data; launched new patient-harm dashboard Nov 2025; includes polypharmacy comparators
- **Shortcomings**:
  - **Prescribing-side only**: Identifies overprescribing patterns but does nothing about surplus stock already in pharmacies. Does not connect to pharmacy inventory — [NHSBSA](https://www.nhsbsa.nhs.uk/access-our-data-products/epact2/dashboards-and-specifications/oversupply-dashboard)
  - **No actionable pharmacy-level output**: Dashboard informs ICBs and GP practices; pharmacies cannot use it to find or offer surplus
  - **Patchy adoption**: "Adoption is patchy" per Government Overprescribing Review — no published adoption rate across ICBs
  - **Retrospective, not real-time**: Based on historical dispensing data, not live stock levels
  - **No redistribution mechanism**: Even when oversupply is identified, there is no pathway to redirect existing stock to where it's needed
- **User Pain Points**: Information without action — identifies the problem but provides no tools to solve it at the pharmacy level

### 4. OptimiseRx (FDB / First Databank)

- **What it is**: Clinical decision support tool integrated into GP systems, delivering patient-specific prescribing alerts including shortage notifications
- **Strengths**: Used across 70% of English ICBs + all of Northern Ireland; >£500m cumulative NHS savings since 2014; patient-specific (considers morbidities, current meds); includes shortage alerts — [FDB Health](https://www.fdbhealth.co.uk/solutions/optimiserx-medicines-optimisation)
- **Shortcomings**:
  - **Prescriber-facing only**: Operates at the GP prescribing stage — does not touch pharmacy stock management or redistribution
  - **No inter-pharmacy communication**: Cannot facilitate transfers between pharmacies; has no visibility of pharmacy-level inventory
  - **Shortage alerts are reactive**: Alerts prescribers to switch away from shortage items, but doesn't help locate nearby supply of those items
  - **30% of ICBs not covered**: Despite 10+ years on market, 30% of ICBs still not using it — adoption ceiling even with strong commercial model
  - **Doesn't address existing waste**: All savings come from avoiding future unnecessary prescriptions, not recovering value from surplus already dispensed to pharmacies
- **User Pain Points**: No pharmacy-side counterpart — GPs optimise prescribing, but surplus already in the supply chain has no outlet

### 5. Cegedim Rx Pharmacy Manager (PMR)

- **What it is**: Leading UK pharmacy PMR system with stock management, expiry tracking, and dead/excess stock identification
- **Strengths**: Identifies Low/Excess/Dead Stock; PDF/CSV exports; auto-flags near-expiry items; syncs with ePOS; widely deployed across UK community pharmacies — [Cegedim Rx](https://cegedimrx.co.uk/pharmacymanager)
- **Shortcomings**:
  - **Single-pharmacy silo**: Identifies surplus within one pharmacy but has no mechanism to share that data with other pharmacies or match it to external demand
  - **No inter-pharmacy network**: Each pharmacy is an island — dead stock flagged in one PMR has no route to a pharmacy that needs it
  - **Expiry alerts ≠ redistribution**: Alerting a pharmacist to near-expiry stock does not solve the problem if the only option is destruction
  - **No chain-of-custody**: Stock management is internal-only; no provenance tracking for transfers
  - **Manual export only**: Surplus data can only be exported as PDF/CSV — no API for automated matching or platform integration
- **User Pain Points**: "I can see my surplus, but I can't do anything about it except destroy it"

### 6. Omnicell SupplyXpert

- **What it is**: Hospital pharmacy inventory automation platform with predictive analytics, used by 100+ NHS Trusts
- **Strengths**: Real-time stock visibility; expiry tracking; 30% waste reduction demonstrated; predictive analytics for demand forecasting — [Omnicell UK](https://www.omnicell.co.uk/digital-ecosystem-data-intelligence/supplyxpert-inventory-management-system/)
- **Shortcomings**:
  - **Hospital-only**: Designed for NHS Trust hospital pharmacies, not community pharmacies — does not serve the 11,000+ community pharmacy estate
  - **No community pharmacy integration**: Cannot connect hospital surplus to community pharmacy demand or vice versa
  - **High cost / enterprise sales**: Enterprise-grade solution priced for hospital budgets — inaccessible to independent community pharmacies operating on 89p/item margins
  - **Intra-trust only**: Even across hospitals, optimisation is within a single Trust, not across the regional network
  - **No regulatory framework for outbound transfers**: Even when hospital surplus is identified, no mechanism exists to legally redirect it to community pharmacies
- **User Pain Points**: Solves hospital waste effectively but creates no bridge to the community pharmacy sector where £110m/year of stock is destroyed

### 7. ScriptSwitch (Optum UK)

- **What it is**: Prescribing decision support tool that prompts GPs to switch to cost-effective or in-stock alternatives
- **Strengths**: Evidence-based switching prompts; integrated into GP workflow; contributes to medicines optimisation
- **Shortcomings**:
  - **Prescriber-side only**: Like OptimiseRx, operates at the GP prescribing point — no pharmacy stock visibility
  - **No surplus matching**: Does not address existing pharmacy stock or inter-pharmacy transfers
  - **Switching ≠ redistribution**: Redirecting future prescriptions doesn't recover value from medicines already in the supply chain
- **User Pain Points**: Same gap as OptimiseRx — optimises future flow but ignores the £110m/year stockpile already in pharmacies

### 8. NHS SPS Medicines Supply Tool (DHSC/NHSE)

- **What it is**: Online tool providing up-to-date information on medicine supply issues, plus Serious Shortage Protocols (SSPs)
- **Strengths**: National-level shortage visibility; enables alternative dispensing during shortages; accessible to all pharmacies
- **Shortcomings**:
  - **Information only**: Reports shortages but provides no mechanism to locate or transfer available stock between pharmacies
  - **Top-down, not peer-to-peer**: Communicates national supply issues but cannot facilitate local pharmacy-to-pharmacy matching
  - **Reactive**: SSPs issued only for severe shortages; does not address routine surplus/deficit imbalances
  - **28 shortage warnings per week**: Despite the tool's existence, shortages are worsening — supply disruption notifications up 20% in 2024 vs 2022/23 — [House of Commons Library CBP-9997]
- **User Pain Points**: "I know there's a shortage, but I can't find the pharmacy 5 miles away that has surplus"

---

## Problem Severity Ranking

| # | Problem | Solutions Affected | Est. Users/Value Impacted | Evidence Summary | Sources |
|---|---------|-------------------|--------------------------|------------------|---------|
| 1 | **No inter-pharmacy surplus matching** — surplus in one pharmacy cannot be routed to deficit in another | 7/8 (all except Medicycle, which partially addresses it) | £110m/year destroyed stock; ~11,400 community pharmacies | 100% of returned community medicines incinerated; no existing solution provides real-time, automated matching between pharmacies | [NHS SPS]; [YHEC/DoH 2010] |
| 2 | **No digital chain-of-custody** — regulators cannot permit redistribution without verifiable tracking | 8/8 (none provide this) | Blocks £28-44m/year in recoverable value; blocks regulatory pathway for MHRA | MHRA requires evidence of safe digital tracking to change rules; no existing platform provides pack-level provenance — chicken-and-egg deadlock | [PMC8167662]; [MHRA Inspectorate] |
| 3 | **PMR systems are single-pharmacy silos** — inventory data trapped within each pharmacy | 6/8 (Cegedim, Omnicell, NYMO, Signetor, Epos Direct — all silo'd) | ~11,400 pharmacies; each averaging £45k/year loss | PMRs flag surplus/expiry internally but offer no external sharing; manual CSV export is the best available pathway | [Cegedim Rx]; [The Pharmacist 2024] |
| 4 | **Prescribing optimisation doesn't address existing stock** — OptimiseRx/ScriptSwitch reduce future waste but ignore current surplus | 3/8 (OptimiseRx, ScriptSwitch, NHSBSA Dashboard) | £500m+ in cumulative savings from prescribing side, but £0 recovered from pharmacy surplus | All prescribing tools operate upstream; no downstream mechanism to salvage stock already in pharmacies | [FDB Health]; [NHSBSA] |
| 5 | **Hospital and community pharmacy systems don't interoperate** — Omnicell serves hospitals, PMRs serve community; no bridge | 2/8 (Omnicell, Cegedim) | 100+ NHS Trusts + 11,400 community pharmacies completely disconnected | Hospital waste reduction of 30% demonstrated (Omnicell) but community sector gets zero benefit from hospital data or surplus | [Omnicell UK] |
| 6 | **Controlled drugs and cold-chain excluded** — Medicycle (the closest competitor) excludes these categories entirely | 1/8 (Medicycle) | Unknown % of waste from CD/cold-chain; cold-chain biologics are fastest-growing NHS drug spend | No platform addresses these high-value, high-waste categories | [Medicycle FAQs] |
| 7 | **Network effect barriers** — even PharmaSwap at 42% adoption after 7 years shows marketplace models plateau | 2/8 (Medicycle, PharmaSwap) | 58% of Dutch pharmacies still not on PharmaSwap; Medicycle network size undisclosed | Marketplace-only models without PMR integration and automated listing hit adoption ceilings | [EU Circular Economy Platform]; [Holland Circular Hotspot] |

---

## Common Gaps Across Solutions

| Gap | Solutions Affected | Impact | Source |
|-----|-------------------|--------|--------|
| **No real-time pharmacy-to-pharmacy matching** | 8/8 | £110m/year in destroyed stock that could be redistributed; 28 shortage warnings/week to DHSC | [YHEC]; [House of Commons Library] |
| **No digital chain-of-custody / provenance trail** | 8/8 | Regulatory deadlock — MHRA cannot approve redistribution without evidence of safe tracking | [PMC8167662]; [MHRA] |
| **No PMR integration for automatic surplus detection** | 7/8 (Medicycle requires manual upload) | Adoption bottleneck — pharmacists won't manually list surplus when margins are 89p/item | [Pharmaceutical Journal 2024] |
| **No bridge between prescribing data and pharmacy stock** | 8/8 | Prescribing optimisation and pharmacy inventory exist in separate universes; no feedback loop | [NHSBSA]; [FDB Health] |
| **Community pharmacy sector ignored by enterprise solutions** | 6/8 | 11,400 community pharmacies with average £45k/year loss have no affordable, purpose-built tool | [NPA Jan 2025]; [The Pharmacist 2024] |
| **Regulatory workarounds rather than proper frameworks** | 2/2 marketplace platforms | PharmaSwap's "patient transfer" workaround adds friction; Medicycle's "occasional/small" constraint limits scale | [FLOOW2]; [Medicycle T&Cs] |

---

## Hackathon Opportunities

### 1. Real-Time Surplus Matching Engine with Chain-of-Custody (PharmaBridge core)
- **Problem it solves**: Gap #1 + #2 — no inter-pharmacy matching AND no digital provenance trail
- **Severity**: £110m/year destroyed + regulatory deadlock affecting entire sector (~11,400 pharmacies)
- **Why existing solutions fail**: Medicycle is a manual-upload marketplace with no chain-of-custody; PharmaSwap uses a legal workaround not viable in the UK; PMRs are siloed; prescribing tools are upstream-only
- **Better solution**: Automated surplus detection (via PMR API or manual entry as MVP) → real-time matching algorithm (geo-proximity + expiry urgency + demand signals) → digital chain-of-custody record (FMD barcode scan at send + receive) → auditable trail for MHRA
- **Hackathon feasibility**: HIGH — core matching algorithm + chain-of-custody data model + simple UI can be prototyped in 24-48 hours. Integration with real PMR APIs is post-hackathon, but the matching logic and provenance trail are the differentiating IP

### 2. PMR-to-Network Bridge API
- **Problem it solves**: Gap #3 — PMR inventory data trapped in silos
- **Severity**: 11,400 pharmacies each losing £45k/year; PMRs already flag surplus but with no outlet
- **Why existing solutions fail**: Cegedim/NYMO export CSV only; no API exists for external matching platforms to read surplus data
- **Better solution**: Lightweight API adapter that reads surplus/near-expiry flags from common PMR formats and pushes them to the PharmaBridge matching engine
- **Hackathon feasibility**: MEDIUM — can be mocked/simulated for demo; real PMR integration requires vendor partnerships

### 3. MHRA Evidence Generator Dashboard
- **Problem it solves**: Gap #2 — the chicken-and-egg regulatory deadlock
- **Severity**: Entire redistribution pathway blocked until MHRA has evidence base
- **Why existing solutions fail**: No platform generates the audit data MHRA would need to justify a formal regulatory pathway
- **Better solution**: Dashboard showing: packs transferred, chain-of-custody integrity %, temperature compliance, incident rate, CO2 saved — formatted to MHRA reporting requirements
- **Hackathon feasibility**: HIGH — dashboard over simulated or pilot data; the data model and visualisation are the deliverable

---

## Sources

- [Medicycle](https://medicycle.co.uk/)
- [Medicycle FAQs](https://medicycle.co.uk/faqs/)
- [PharmaSwap](https://www.pharmaswap.com/en.html)
- [PharmaSwap — EU Circular Economy Platform](https://circulareconomy.europa.eu/platform/en/good-practices/pharmaswap-sharing-marketplace-reduce-medication-waste)
- [PharmaSwap — Holland Circular Hotspot](https://hollandcircularhotspot.nl/case/pharmaswap-battle-medication-wastage/)
- [PharmaSwap legality issue — FLOOW2](https://www.floow2.com/news-detail/~/items/this-ingenious-plan-to-save-expiring-drugs-had-only-one-problem-it-was-illegal-9094.html)
- [Medicycle — Tracxn](https://tracxn.com/d/companies/medicycle/__hhZRaqma6VfPL8_taNub5_rbS7gUIqwqtVUhCJcF630)
- [NHSBSA Oversupply Dashboard](https://www.nhsbsa.nhs.uk/access-our-data-products/epact2/dashboards-and-specifications/oversupply-dashboard)
- [OptimiseRx — FDB Health](https://www.fdbhealth.co.uk/solutions/optimiserx-medicines-optimisation)
- [OptimiseRx £500m savings — FDB Press Release](https://www.fdbhealth.co.uk/about-us/press-releases/2025-07-04-fdbs-optimiserx-helps-nhs-save-over-500-million)
- [Cegedim Rx Pharmacy Manager](https://cegedimrx.co.uk/pharmacymanager)
- [Omnicell SupplyXpert UK](https://www.omnicell.co.uk/digital-ecosystem-data-intelligence/supplyxpert-inventory-management-system/)
- [Stakeholder Views on Medicines Reuse — PMC8167662](https://pmc.ncbi.nlm.nih.gov/articles/PMC8167662/)
- [MHRA Wholesale Dealer Licence](https://www.gov.uk/guidance/apply-for-manufacturer-or-wholesaler-of-medicines-licences)
- [NPA — 700 pharmacy closures](https://www.npa.co.uk/news/2025/january/2024-pharmacy-closures-second-highest-on-record/)
- [Healthwatch — Pharmacy closures England](https://www.healthwatch.co.uk/report/2024-09-26/pharmacy-closures-england)
- [NPA — Deprived areas worst hit](https://www.npa.co.uk/news/2025/october/deprived-areas-with-greatest-health-needs-worst-hit-by-pharmacy-closures-npa/)
- [NHS SPS — Managing pharmaceutical waste](https://www.sps.nhs.uk/articles/managing-pharmaceutical-waste/)
- [NHSBSA Serious Shortage Protocols](https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/serious-shortage-protocols-ssps)
- [FMD Source — UK FMD Working Group](https://fmdsource.co.uk/)
