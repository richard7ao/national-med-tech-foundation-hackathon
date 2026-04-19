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
