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
  // txn-001: Metformin from Greenfield → Park Lane (primary demo transaction)
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
    createdAt: "2026-03-15T09:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by AstraZeneca at Macclesfield facility. Batch #AZ20260112 passed QC.",
        timestamp: "2026-01-12T06:30:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-08714789-012345-AZ verified against EMVS database. Unique identifier confirmed.",
        timestamp: "2026-01-12T08:15:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) listed 5 packs at £3.20/pack surplus stock.",
        timestamp: "2026-03-14T10:22:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C confirmed. No cold chain requirement. Humidity within range.",
        timestamp: "2026-03-14T10:25:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Park Lane Pharmacy",
        description: "James Okafor (GPhC #2091287) accepted listing. Savings of £32.40 vs NHS wholesale.",
        timestamp: "2026-03-15T09:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Alliance Healthcare courier collected from SE15. Destination E8. ETA 1:45 PM same day.",
        timestamp: "2026-03-15T11:30:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "James Okafor at Park Lane Pharmacy received and countersigned. Digital signature logged.",
        timestamp: "2026-03-15T13:48:00Z",
        type: "platform",
      },
    ],
  },

  // txn-002: Amoxicillin from Peckham → Greenfield (Greenfield buys)
  {
    id: "txn-002",
    listingId: "lst-027",
    sellerPharmacyId: "ph-peckham",
    buyerPharmacyId: "ph-greenfield",
    medicineId: "med-amoxicillin",
    quantity: 4,
    pricePerPack: 2.00,
    totalPrice: 8.00,
    wholesaleSavings: 4.48,
    status: "completed",
    createdAt: "2026-03-10T11:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Sandoz at Kundl facility. Batch #SZ20260205 passed QC.",
        timestamp: "2026-02-05T07:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-04099999-023456-SZ verified against EMVS database. Confirmed authentic.",
        timestamp: "2026-02-05T08:45:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Peckham Health Pharmacy",
        description: "Aisha Patel (GPhC #2076543) listed 5 packs at £2.00/pack.",
        timestamp: "2026-03-08T14:10:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C. Humidity levels within acceptable range. No cold chain needed.",
        timestamp: "2026-03-08T14:12:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) accepted listing. Savings of £4.48 vs NHS wholesale.",
        timestamp: "2026-03-10T11:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Lloyds Pharmacy logistics collected from SE15 5RS. Destination SE15 5BS. ETA 2:30 PM.",
        timestamp: "2026-03-10T13:00:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Sarah Chen at Greenfield Pharmacy received and countersigned. Digital signature logged.",
        timestamp: "2026-03-10T14:22:00Z",
        type: "platform",
      },
    ],
  },

  // txn-003: Levothyroxine from Camberwell → Greenfield (Greenfield buys)
  {
    id: "txn-003",
    listingId: "lst-025",
    sellerPharmacyId: "ph-camberwell",
    buyerPharmacyId: "ph-greenfield",
    medicineId: "med-levothyroxine",
    quantity: 6,
    pricePerPack: 2.30,
    totalPrice: 13.80,
    wholesaleSavings: 8.10,
    status: "completed",
    createdAt: "2026-03-05T10:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Mercury Pharma at Gloucester facility. Batch #MP20260201 passed QC.",
        timestamp: "2026-02-01T06:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-05012345-034567-MP verified against EMVS. Temperature-sensitive product confirmed.",
        timestamp: "2026-02-01T07:30:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Camberwell Pharmacy",
        description: "Dr. Fatima Olu (GPhC #2054321) listed 6 packs at £2.30/pack surplus thyroid medication.",
        timestamp: "2026-03-03T09:15:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Cool storage 8–15°C monitored. Temperature log reviewed and within specification.",
        timestamp: "2026-03-03T09:18:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) accepted listing. Savings of £8.10 vs NHS wholesale.",
        timestamp: "2026-03-05T10:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Coldchain Express collected from SE5 8TR. Refrigerated van. Destination SE15 5BS. ETA 12:00 PM.",
        timestamp: "2026-03-05T10:45:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Sarah Chen at Greenfield Pharmacy received and countersigned temperature log intact.",
        timestamp: "2026-03-05T12:05:00Z",
        type: "platform",
      },
    ],
  },

  // txn-004: Sertraline from Greenfield → Dulwich (Greenfield sells)
  {
    id: "txn-004",
    listingId: "lst-004",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-dulwich",
    medicineId: "med-sertraline",
    quantity: 2,
    pricePerPack: 2.50,
    totalPrice: 5.00,
    wholesaleSavings: 3.40,
    status: "in-transit",
    createdAt: "2026-04-10T09:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Accord Healthcare at Barnstaple facility. Batch #AC20260115 passed QC.",
        timestamp: "2026-01-15T07:30:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-06543210-045678-AC verified against EMVS. Antidepressant controlled confirmed.",
        timestamp: "2026-01-15T09:00:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) listed 2 packs at £2.50/pack.",
        timestamp: "2026-04-04T12:00:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C confirmed. Humidity within range. No special requirements.",
        timestamp: "2026-04-04T12:02:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Dulwich Pharmacy",
        description: "Kevin Mensah (GPhC #2067890) accepted listing. Savings of £3.40 vs NHS wholesale.",
        timestamp: "2026-04-10T09:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Alliance Healthcare courier collected from SE15 5BS. Destination SE22 8EW. ETA 2:00 PM.",
        timestamp: "2026-04-10T11:30:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Awaiting Delivery Confirmation",
        description: "Package in transit. Estimated arrival 2:00 PM. Tracking reference AHC-2026-4891.",
        timestamp: "2026-04-10T11:30:00Z",
        type: "platform",
      },
    ],
  },

  // txn-005: Amlodipine from Greenfield → Lewisham (Greenfield sells)
  {
    id: "txn-005",
    listingId: "lst-007",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-lewisham",
    medicineId: "med-amlodipine",
    quantity: 5,
    pricePerPack: 1.60,
    totalPrice: 8.00,
    wholesaleSavings: 6.00,
    status: "completed",
    createdAt: "2026-03-20T10:30:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Pfizer at Sandwich facility. Batch #PF20260118 passed QC inspection.",
        timestamp: "2026-01-18T06:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-09876543-078901-PF verified against EMVS database. Product authenticated.",
        timestamp: "2026-01-18T07:45:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) listed 10 packs at £1.60/pack. Overstock clearance.",
        timestamp: "2026-03-18T09:00:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C. No special handling. Humidity within acceptable range.",
        timestamp: "2026-03-18T09:03:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Lewisham Health Pharmacy",
        description: "Grace Thompson (GPhC #2078901) accepted 5 packs. Savings of £6.00 vs NHS wholesale.",
        timestamp: "2026-03-20T10:30:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "DHL Pharma collected from SE15 5BS. Destination SE13 5JX. ETA 1:15 PM.",
        timestamp: "2026-03-20T12:00:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Grace Thompson at Lewisham Health Pharmacy signed receipt. Stock reconciled.",
        timestamp: "2026-03-20T13:10:00Z",
        type: "platform",
      },
    ],
  },

  // txn-006: HRT Patches from Camberwell → Brixton
  {
    id: "txn-006",
    listingId: "lst-013",
    sellerPharmacyId: "ph-camberwell",
    buyerPharmacyId: "ph-brixton",
    medicineId: "med-hrt-patches",
    quantity: 2,
    pricePerPack: 10.50,
    totalPrice: 21.00,
    wholesaleSavings: 8.60,
    status: "completed",
    createdAt: "2026-03-25T11:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Theramex at Chartres facility. Batch #TH20260120 passed QC.",
        timestamp: "2026-01-20T08:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-01234567-256789-TH verified against EMVS. Hormone therapy product confirmed.",
        timestamp: "2026-01-20T09:30:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Camberwell Pharmacy",
        description: "Dr. Fatima Olu (GPhC #2054321) listed 2 packs at £10.50/pack. Critical shortage item.",
        timestamp: "2026-03-22T14:00:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Cool dry storage 8–25°C. Sealed packaging verified. No cold chain deviation.",
        timestamp: "2026-03-22T14:05:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Brixton Pharmacy",
        description: "Marilyn Asante (GPhC #2045678) accepted listing. Savings of £8.60 vs NHS wholesale.",
        timestamp: "2026-03-25T11:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Alliance Healthcare collected from SE5 8TR. Destination SW9 6DE. ETA 2:45 PM.",
        timestamp: "2026-03-25T13:15:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Marilyn Asante at Brixton Pharmacy received and countersigned. Shortage resolved.",
        timestamp: "2026-03-25T14:52:00Z",
        type: "platform",
      },
    ],
  },

  // txn-007: Ramipril from Greenfield → Rotherhithe (Greenfield sells)
  {
    id: "txn-007",
    listingId: "lst-006",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-rotherhithe",
    medicineId: "med-ramipril",
    quantity: 4,
    pricePerPack: 1.70,
    totalPrice: 6.80,
    wholesaleSavings: 4.80,
    status: "delivered",
    createdAt: "2026-04-08T10:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Sanofi at Frankfurt facility. Batch #SN20260310 passed QC.",
        timestamp: "2026-03-10T07:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-08765432-067890-SN verified against EMVS. ACE inhibitor confirmed.",
        timestamp: "2026-03-10T08:30:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) listed 6 packs at £1.70/pack.",
        timestamp: "2026-04-06T10:30:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C. Humidity within range. Blister integrity confirmed.",
        timestamp: "2026-04-06T10:33:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Rotherhithe Pharmacy",
        description: "Ben Adeyemi (GPhC #2034567) accepted 4 packs. Savings of £4.80 vs NHS wholesale.",
        timestamp: "2026-04-08T10:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Lloyds logistics collected from SE15 5BS. Destination SE16 2LJ. ETA 12:30 PM.",
        timestamp: "2026-04-08T11:00:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Delivered — Awaiting Countersignature",
        description: "Package delivered to SE16 2LJ. Awaiting pharmacist countersignature to complete.",
        timestamp: "2026-04-08T12:28:00Z",
        type: "platform",
      },
    ],
  },

  // txn-008: Omeprazole from Greenfield → Walworth (Greenfield sells)
  {
    id: "txn-008",
    listingId: "lst-005",
    sellerPharmacyId: "ph-greenfield",
    buyerPharmacyId: "ph-walworth",
    medicineId: "med-omeprazole",
    quantity: 3,
    pricePerPack: 2.00,
    totalPrice: 6.00,
    wholesaleSavings: 4.35,
    status: "completed",
    createdAt: "2026-03-28T09:30:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Dexcel Pharma at Or Akiva facility. Batch #DX20260220 passed QC.",
        timestamp: "2026-02-20T06:30:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-07654321-056789-DX verified against EMVS. Proton pump inhibitor confirmed.",
        timestamp: "2026-02-20T08:00:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Greenfield Pharmacy",
        description: "Sarah Chen (GPhC #2089431) listed 4 packs at £2.00/pack.",
        timestamp: "2026-04-05T09:30:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C. Capsules intact. Humidity within acceptable range.",
        timestamp: "2026-04-05T09:32:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Walworth Pharmacy",
        description: "Priya Nair (GPhC #2023456) accepted 3 packs. Savings of £4.35 vs NHS wholesale.",
        timestamp: "2026-03-28T09:30:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Alliance Healthcare collected from SE15 5BS. Destination SE17 1RL. ETA 11:00 AM.",
        timestamp: "2026-03-28T10:00:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Priya Nair at Walworth Pharmacy received and countersigned. Stock updated.",
        timestamp: "2026-03-28T11:05:00Z",
        type: "platform",
      },
    ],
  },

  // txn-009: Atorvastatin from Dulwich → Elephant
  {
    id: "txn-009",
    listingId: "lst-026",
    sellerPharmacyId: "ph-dulwich",
    buyerPharmacyId: "ph-elephant",
    medicineId: "med-atorvastatin",
    quantity: 5,
    pricePerPack: 2.00,
    totalPrice: 10.00,
    wholesaleSavings: 5.75,
    status: "completed",
    createdAt: "2026-04-02T14:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by Teva at Petah Tikva facility. Batch #TV20260218 passed QC inspection.",
        timestamp: "2026-02-18T07:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-03456789-723456-TV verified against EMVS. Statin product confirmed.",
        timestamp: "2026-02-18T08:45:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Dulwich Pharmacy",
        description: "Kevin Mensah (GPhC #2067890) listed 8 packs at £2.00/pack. End-of-line surplus.",
        timestamp: "2026-04-04T13:00:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Ambient storage 15–25°C. Blister pack integrity confirmed. Within spec.",
        timestamp: "2026-04-04T13:03:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Elephant Pharmacy",
        description: "Tom Obi (GPhC #2012345) accepted 5 packs. Savings of £5.75 vs NHS wholesale.",
        timestamp: "2026-04-02T14:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "DHL Pharma collected from SE22 8EW. Destination SE1 6TT. ETA 4:00 PM.",
        timestamp: "2026-04-02T15:00:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Tom Obi at Elephant Pharmacy signed receipt. System reconciled.",
        timestamp: "2026-04-02T16:12:00Z",
        type: "platform",
      },
    ],
  },

  // txn-010: Salbutamol from Deptford → Catford
  {
    id: "txn-010",
    listingId: "lst-015",
    sellerPharmacyId: "ph-deptford",
    buyerPharmacyId: "ph-catford",
    medicineId: "med-salbutamol",
    quantity: 6,
    pricePerPack: 4.20,
    totalPrice: 25.20,
    wholesaleSavings: 13.80,
    status: "completed",
    createdAt: "2026-04-12T09:00:00Z",
    auditTrail: [
      {
        step: 1,
        title: "Pack Manufactured",
        description: "Manufactured by GlaxoSmithKline at Ware facility. Batch #GS20260310 passed QC.",
        timestamp: "2026-03-10T06:00:00Z",
        type: "supply-chain",
      },
      {
        step: 2,
        title: "FMD Serialisation Verified",
        description: "Serial: 01-07890123-367890-GS verified against EMVS. MDI product confirmed, propellant checked.",
        timestamp: "2026-03-10T07:30:00Z",
        type: "supply-chain",
      },
      {
        step: 3,
        title: "Listed by Deptford Pharmacy",
        description: "Nadia Kowalski (GPhC #2098765) listed 8 inhalers at £4.20 each. Overstock from bulk order.",
        timestamp: "2026-04-06T10:00:00Z",
        type: "platform",
      },
      {
        step: 4,
        title: "Storage Conditions Confirmed",
        description: "Pressurised canister stored below 30°C. No direct sunlight. Integrity confirmed.",
        timestamp: "2026-04-06T10:05:00Z",
        type: "supply-chain",
      },
      {
        step: 5,
        title: "Matched to Catford Pharmacy",
        description: "Linda Osei (GPhC #2087654) accepted 6 inhalers. Savings of £13.80 vs NHS wholesale.",
        timestamp: "2026-04-12T09:00:00Z",
        type: "platform",
      },
      {
        step: 6,
        title: "Courier Collected",
        description: "Alliance Healthcare collected from SE8 4AF. Destination SE6 4JF. ETA 11:30 AM.",
        timestamp: "2026-04-12T10:15:00Z",
        type: "platform",
      },
      {
        step: 7,
        title: "Received & Countersigned",
        description: "Linda Osei at Catford Pharmacy received all 6 inhalers. Countersigned digitally.",
        timestamp: "2026-04-12T11:28:00Z",
        type: "platform",
      },
    ],
  },
];

export function getTransactionsForPharmacy(pharmacyId: string): Transaction[] {
  return transactions.filter(
    (t) => t.sellerPharmacyId === pharmacyId || t.buyerPharmacyId === pharmacyId
  );
}
