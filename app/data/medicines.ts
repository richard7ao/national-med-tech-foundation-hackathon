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
  { id: "med-cetirizine", name: "Cetirizine", strength: "10mg", form: "tablets", packSize: 30, manufacturer: "UCB Pharma", wholesalePrice: 3.95 },
];

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((m) => m.id === id);
}

export function formatMedicineName(med: Medicine): string {
  return `${med.name} ${med.strength}`;
}
