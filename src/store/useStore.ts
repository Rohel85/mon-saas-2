// src/store/useStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Map, Plan } from "@/types"

// ─── Generation Store ─────────────────────────────────────────
interface GenerationState {
  isGenerating: boolean
  logs: string[]
  progress: number
  currentMapId: string | null
  downloadUrl: string | null
  generationTime: number | null
  setGenerating: (val: boolean) => void
  addLog: (log: string) => void
  setProgress: (val: number) => void
  setResult: (mapId: string, url: string, time: number) => void
  reset: () => void
}

export const useGenerationStore = create<GenerationState>((set) => ({
  isGenerating: false,
  logs: [],
  progress: 0,
  currentMapId: null,
  downloadUrl: null,
  generationTime: null,
  setGenerating: (val) => set({ isGenerating: val }),
  addLog: (log) => set((s) => ({ logs: [...s.logs, log] })),
  setProgress: (val) => set({ progress: val }),
  setResult: (mapId, url, time) =>
    set({ currentMapId: mapId, downloadUrl: url, generationTime: time }),
  reset: () =>
    set({
      isGenerating: false,
      logs: [],
      progress: 0,
      currentMapId: null,
      downloadUrl: null,
      generationTime: null,
    }),
}))

// ─── Dashboard Store ──────────────────────────────────────────
interface DashboardState {
  maps: Map[]
  totalMaps: number
  creditsUsed: number
  isLoading: boolean
  setMaps: (maps: Map[]) => void
  addMap: (map: Map) => void
  deleteMap: (id: string) => void
  setLoading: (val: boolean) => void
  setCreditsUsed: (val: number) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  maps: [],
  totalMaps: 0,
  creditsUsed: 0,
  isLoading: false,
  setMaps: (maps) => set({ maps, totalMaps: maps.length }),
  addMap: (map) => set((s) => ({ maps: [map, ...s.maps], totalMaps: s.totalMaps + 1 })),
  deleteMap: (id) =>
    set((s) => ({
      maps: s.maps.filter((m) => m.id !== id),
      totalMaps: s.totalMaps - 1,
    })),
  setLoading: (val) => set({ isLoading: val }),
  setCreditsUsed: (val) => set({ creditsUsed: val }),
}))

// ─── UI Store ─────────────────────────────────────────────────
interface UIState {
  sidebarOpen: boolean
  theme: "dark" | "light"
  setSidebarOpen: (val: boolean) => void
  toggleSidebar: () => void
  setTheme: (val: "dark" | "light") => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: "dark",
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setTheme: (val) => set({ theme: val }),
    }),
    { name: "roboxai-ui" }
  )
)
