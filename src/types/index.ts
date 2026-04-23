// src/types/index.ts

export type Plan = "FREE" | "PRO" | "BOSS"
export type MapStatus = "GENERATING" | "COMPLETED" | "FAILED"
export type GenerationStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"

export interface User {
  id: string
  name?: string | null
  email: string
  image?: string | null
  plan: Plan
  apiKey?: string | null
  stripeCustomerId?: string | null
  stripeSubscriptionId?: string | null
  stripePriceId?: string | null
  stripeCurrentPeriodEnd?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Map {
  id: string
  userId: string
  name: string
  prompt: string
  style: string
  resolution: string
  scripts: string[]
  status: MapStatus
  downloadUrl?: string | null
  fileSize?: string | null
  rating?: number | null
  isPublic: boolean
  generationTime?: number | null
  createdAt: Date
  updatedAt: Date
}

export interface Generation {
  id: string
  userId: string
  prompt: string
  style: string
  resolution: string
  status: GenerationStatus
  creditsUsed: number
  error?: string | null
  createdAt: Date
}

export interface PlanConfig {
  name: string
  price: number
  priceId?: string
  credits: number
  resolution: string
  styles: number
  features: string[]
  notIncluded: string[]
}

export interface GenerateRequest {
  prompt: string
  style: string
  resolution: string
  scripts: string
}

export interface GenerateResponse {
  success: boolean
  mapId?: string
  mapName?: string
  downloadUrl?: string
  generationTime?: number
  creditsRemaining?: number
  error?: string
}

export interface ApiUsage {
  plan: Plan
  creditsUsed: number
  creditsTotal: number
  resetDate: string
  apiCallsToday: number
}

export const PLAN_CONFIG: Record<Plan, PlanConfig> = {
  FREE: {
    name: "Free",
    price: 0,
    credits: 5,
    resolution: "128x128",
    styles: 5,
    features: ["5 maps / mois", "Résolution 128x128", "5 styles basiques", "Export .rbxl"],
    notIncluded: ["Scripts IA", "Jeux complets", "Priorité serveur", "Support prioritaire"],
  },
  PRO: {
    name: "Pro",
    price: 19,
    credits: 100,
    resolution: "512x512",
    styles: 30,
    features: [
      "100 maps / mois",
      "Résolution HD 512x512",
      "30+ styles artistiques",
      "Scripts IA (NPC, économie)",
      "Jeux complets",
      "Priorité serveur",
      "Support prioritaire",
      "Accès API",
    ],
    notIncluded: ["Générations illimitées", "Résolution 2048x2048", "Licence commerciale"],
  },
  BOSS: {
    name: "Boss",
    price: 79,
    credits: Infinity,
    resolution: "2048x2048",
    styles: 50,
    features: [
      "Générations illimitées",
      "Résolution MAX 2048x2048",
      "50+ styles + exclusifs",
      "IA autonome",
      "Serveur dédié",
      "Support 24/7",
      "Accès API + webhooks",
      "Licence commerciale",
      "Accès bêta",
    ],
    notIncluded: [],
  },
}

export const PLAN_CREDITS: Record<Plan, number> = {
  FREE: 5,
  PRO: 100,
  BOSS: Infinity,
}
