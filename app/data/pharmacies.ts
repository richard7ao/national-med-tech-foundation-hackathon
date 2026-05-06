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
