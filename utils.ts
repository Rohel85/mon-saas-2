// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Plan, PLAN_CREDITS } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCreditsForPlan(plan: Plan): number {
  return PLAN_CREDITS[plan]
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diff = now.getTime() - past.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `Il y a ${days}j`
  if (hours > 0) return `Il y a ${hours}h`
  if (minutes > 0) return `Il y a ${minutes}min`
  return "À l'instant"
}

export function generateMapName(style: string, prompt: string): string {
  const styleNames: Record<string, string[]> = {
    fantasy: ["Royaume de", "Forêt de", "Citadelle de", "Vallée de"],
    "sci-fi": ["Station", "Nexus", "Secteur", "Zone"],
    "post-apo": ["Zone 0", "Wasteland", "Ruines de", "Secteur Rouge"],
    moderne: ["District", "Quartier", "Cité", "Métropole"],
    arctique: ["Toundra", "Glacier", "Plaine de Glace", "Pic"],
    volcanique: ["Cratère", "Volcan", "Caldera", "Zone Lave"],
  }

  const styleLower = style.toLowerCase().replace(/[^a-z-]/g, "")
  const names = styleNames[styleLower] || ["Map"]
  const prefix = names[Math.floor(Math.random() * names.length)]
  const words = prompt.split(" ").slice(0, 2).join(" ")

  return `${prefix} ${words}`.substring(0, 30)
}

export function getResolutionFromPlan(plan: Plan): string {
  const map: Record<Plan, string> = {
    FREE: "128x128",
    PRO: "512x512",
    BOSS: "2048x2048",
  }
  return map[plan]
}

export function maskApiKey(key: string): string {
  if (!key) return ""
  return key.substring(0, 8) + "•".repeat(24)
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
