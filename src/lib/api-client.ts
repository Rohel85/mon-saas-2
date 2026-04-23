// src/lib/api-client.ts

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    })
    const json = await res.json()
    if (!res.ok) return { error: json.error || "Une erreur est survenue" }
    return { data: json }
  } catch {
    return { error: "Erreur réseau, réessaie dans un moment" }
  }
}

// ─── Auth ─────────────────────────────────────────────────────
export async function signupUser(data: {
  name: string
  email: string
  password: string
}) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export async function resetPasswordRequest(email: string) {
  return request("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })
}

// ─── Generate ─────────────────────────────────────────────────
export async function generateMap(data: {
  prompt: string
  style: string
  resolution: string
  scripts: string
}) {
  return request<{
    mapId: string
    mapName: string
    downloadUrl: string
    generationTime: number
    creditsRemaining: number
  }>("/api/generate", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

// ─── Maps ─────────────────────────────────────────────────────
export async function getMaps(page = 1, limit = 12) {
  return request<{ maps: any[]; total: number; page: number }>(
    `/api/maps?page=${page}&limit=${limit}`
  )
}

export async function deleteMap(mapId: string) {
  return request(`/api/maps/${mapId}`, { method: "DELETE" })
}

export async function toggleMapVisibility(mapId: string, isPublic: boolean) {
  return request(`/api/maps/${mapId}`, {
    method: "PATCH",
    body: JSON.stringify({ isPublic }),
  })
}

// ─── User ─────────────────────────────────────────────────────
export async function getUsage() {
  return request<{
    plan: string
    creditsUsed: number
    creditsTotal: number
    resetDate: string
    apiCallsToday: number
  }>("/api/user/usage")
}

export async function updateProfile(data: { name?: string; image?: string }) {
  return request("/api/user/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  })
}

export async function regenerateApiKey() {
  return request<{ apiKey: string }>("/api/user/api-key", { method: "POST" })
}

// ─── Billing ──────────────────────────────────────────────────
export async function createCheckout(plan: "PRO" | "BOSS") {
  return request<{ url: string }>("/api/billing/checkout", {
    method: "POST",
    body: JSON.stringify({ plan }),
  })
}

export async function openBillingPortal() {
  return request<{ url: string }>("/api/billing/portal", { method: "POST" })
}
