export type CategoryId =
  | "veterinary-clinics"
  | "animal-hospitals"
  | "boarding-daycare"
  | "diagnostics-labs"
  | "ambulances"
  | "ngo-rescue";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string; // tailwind color utility class (e.g. "bg-practo-primary-light")
  textColor: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  "veterinary-clinics": {
    id: "veterinary-clinics",
    name: "Veterinary Clinics",
    icon: "Stethoscope",
    color: "bg-practo-primary-light text-practo-primary",
    textColor: "text-practo-primary",
  },
  "animal-hospitals": {
    id: "animal-hospitals",
    name: "Animal Hospitals",
    icon: "Hospital",
    color: "bg-red-50 text-red-700",
    textColor: "text-red-700",
  },
  "boarding-daycare": {
    id: "boarding-daycare",
    name: "Boarding & Daycare",
    icon: "Bed",
    color: "bg-amber-50 text-amber-700",
    textColor: "text-amber-700",
  },
  "diagnostics-labs": {
    id: "diagnostics-labs",
    name: "Diagnostics & Labs",
    icon: "Microscope",
    color: "bg-indigo-50 text-indigo-700",
    textColor: "text-indigo-700",
  },
  ambulances: {
    id: "ambulances",
    name: "Ambulances",
    icon: "Ambulance",
    color: "bg-practo-emergency text-white",
    textColor: "text-white",
  },
  "ngo-rescue": {
    id: "ngo-rescue",
    name: "NGOs & Rescue",
    icon: "HandHeart",
    color: "bg-purple-50 text-purple-700",
    textColor: "text-purple-700",
  },
} as const;

export const ALL_SPECIES = ["Dog", "Cat", "Bird", "Exotic", "Livestock"] as const;

export type Species = (typeof ALL_SPECIES)[number];

export interface Provider {
  id: string;
  name: string;
  category: CategoryId;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp?: string;
  hours: Record<string, string>;
  is24x7: boolean;
  species: Species[];
  services: string[];
  priceBand: "₹" | "₹₹" | "₹₹₹";
  verified: boolean;
  lastVerifiedAt: string;
  facilities: string[];
  rating: number;
  reviewCount: number;
  emergency: boolean;
  homeVisit: boolean;
  ambulance: boolean;
  about: string;
  doctors: string[];
}

export interface Review {
  id: string;
  providerId: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface CorrectionSubmission {
  providerId: string;
  field: string;
  suggestedValue: string;
  contact: string;
  message?: string;
}

export interface ListingSubmission {
  businessName: string;
  category: CategoryId;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  services: string[];
  message?: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  status: "student" | "professional" | "other";
  interest: string;
}

export interface ProviderFilters {
  category?: string;
  species?: string;
  openNow?: string;
  open24x7?: string;
  is24x7?: string;
  emergency?: string;
  ambulance?: string;
  homeVisit?: string;
  verifiedOnly?: string;
  where?: string;
  distance?: string;
  sort?: string;
  q?: string;
}
