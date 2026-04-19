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
  { id: "med-metformin", name: "Paracetamol", strength: "500mg", form: "tablets", packSize: 56, manufacturer: "AstraZeneca", wholesalePrice: 5.34 },
  { id: "med-amoxicillin", name: "Ibuprofen", strength: "400mg", form: "tablets", packSize: 24, manufacturer: "Sandoz", wholesalePrice: 3.12 },
  { id: "med-levothyroxine", name: "Loratadine", strength: "10mg", form: "tablets", packSize: 30, manufacturer: "Mercury Pharma", wholesalePrice: 3.65 },
  { id: "med-sertraline", name: "Cetirizine", strength: "10mg", form: "tablets", packSize: 30, manufacturer: "Accord", wholesalePrice: 4.20 },
  { id: "med-hrt-patches", name: "Vitamin D3", strength: "800IU", form: "capsules", packSize: 30, manufacturer: "Theramex", wholesalePrice: 14.80 },
  { id: "med-amlodipine", name: "Aspirin", strength: "75mg", form: "tablets", packSize: 28, manufacturer: "Pfizer", wholesalePrice: 2.80 },
  { id: "med-omeprazole", name: "Famotidine", strength: "20mg", form: "tablets", packSize: 28, manufacturer: "Dexcel", wholesalePrice: 3.45 },
  { id: "med-ramipril", name: "Chlorphenamine", strength: "4mg", form: "tablets", packSize: 28, manufacturer: "Sanofi", wholesalePrice: 2.90 },
  { id: "med-atorvastatin", name: "Senna", strength: "7.5mg", form: "tablets", packSize: 60, manufacturer: "Teva", wholesalePrice: 3.15 },
  { id: "med-salbutamol", name: "Salbutamol", strength: "100mcg", form: "inhaler", packSize: 1, manufacturer: "GlaxoSmithKline", wholesalePrice: 6.50 },
  { id: "med-lansoprazole", name: "Mebeverine", strength: "135mg", form: "tablets", packSize: 28, manufacturer: "Mylan", wholesalePrice: 4.10 },
  { id: "med-bisoprolol", name: "Folic Acid", strength: "400mcg", form: "tablets", packSize: 90, manufacturer: "Accord", wholesalePrice: 2.35 },
  { id: "med-doxycycline", name: "Loperamide", strength: "2mg", form: "capsules", packSize: 12, manufacturer: "Actavis", wholesalePrice: 5.70 },
  { id: "med-naproxen", name: "Glucosamine", strength: "500mg", form: "tablets", packSize: 60, manufacturer: "Rosemont", wholesalePrice: 4.85 },
  { id: "med-cetirizine", name: "Acrivastine", strength: "8mg", form: "capsules", packSize: 24, manufacturer: "UCB Pharma", wholesalePrice: 3.95 },
];

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((m) => m.id === id);
}

export function formatMedicineName(med: Medicine): string {
  return `${med.name} ${med.strength}`;
}
