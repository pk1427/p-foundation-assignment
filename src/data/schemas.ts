import { z } from "zod";

import type { CategoryId } from "./models";

export const CATEGORY_IDS: CategoryId[] = [
  "veterinary-clinics",
  "animal-hospitals",
  "boarding-daycare",
  "diagnostics-labs",
  "ambulances",
  "ngo-rescue",
];

export const correctionSchema = z.object({
  providerId: z.string().min(1),
  field: z.string().min(1).max(100),
  suggestedValue: z.string().min(1).max(500),
  contact: z.string().min(3).max(200),
  message: z.string().max(1000).optional(),
});

export const listingSchema = z.object({
  businessName: z.string().min(2).max(100),
  category: z.string().refine((v) => CATEGORY_IDS.includes(v as CategoryId), {
    message: "Select a valid category",
  }),
  contactName: z.string().min(2).max(100),
  phone: z.string().min(6).max(20),
  email: z.string().email(),
  address: z.string().min(5).max(200),
  services: z.array(z.string().min(1).max(80)).max(10),
  message: z.string().max(1000).optional(),
});

export const MODULES = [
  "Prompting & AI fundamentals",
  "AI tools for work",
  "Automation with no-code tools",
  "Building with AI",
  "Content & design with AI",
  "Shipping a portfolio project",
] as const;

export type Module = (typeof MODULES)[number];

export const registrationSchema = z.object({
  type: z.literal("registration"),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20).optional(),
  status: z.enum(["student", "professional", "career-switcher"]),
  interest: z.enum(MODULES),
  message: z.string().max(1000).optional(),
});

export const syllabusSchema = z.object({
  type: z.literal("syllabus"),
  email: z.string().email(),
});

export const leadSchema = z.discriminatedUnion("type", [
  registrationSchema,
  syllabusSchema,
]);

export type LeadInput = z.infer<typeof leadSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type SyllabusInput = z.infer<typeof syllabusSchema>;
