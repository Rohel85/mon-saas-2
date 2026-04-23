"use client"
// src/components/demo/HeroDemo.tsx
import { useState, useRef, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { generateMap } from "@/lib/api-client"
import { useGenerationStore } from "@/store/useStore"
import { Download, Play, Square, Loader2 } from "lucide-react"

const STYLES = ["🌿 Fantasy", "🚀 Sci-Fi", "💀 Post-Apo", "🏙️ Moderne", "🧊 Arctique", "🌋 Volcanique"]
const RESOLUTIONS = ["128x128 (Free)", "512x512 (Pro)", "2048x2048 (Boss)"]
const SCRIPTS = ["Scripts basiques", "NPC + IA", "Systèmes complets"]

const DEMO_LOGS: Record<string, string[]> = {
  "🌿 Fantasy": [
    "Analyse du prompt — Monde fantastique détecté...",
    "Génération du terrain (Plaines enchantées 512x512)...",
    "Placement des structures : Château + 12 villages générés",
    "Système magie : sorts actifs, potions configurées",
    "NPC : 34 personnages avec dialogues IA créés",
    "Quêtes dynamiques : 8 scénarios narratifs générés",
    "Scripting Lua : systèmes économiques + combat activés",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
  "🚀 Sci-Fi": [
    "Scan du prompt — Architecture futuriste détectée...",
    "Génération terrain : Station orbitale (512x512)...",
    "Structures : 3 dômes + 47 modules pressurisés",
    "Physique gravité zéro : moteur IA configuré",
    "Tourelles défensives : scripting Lua activé",
    "Système de déplacement spatial : warp + jetpacks",
    "IA ennemis : 12 unités robotiques programmées",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
  "💀 Post-Apo": [
    "Analyse du prompt — Zone de danger détectée...",
    "Génération du terrain (512x512 blocs dévastés)...",
    "Placement des structures : 47 bâtiments détruits",
    "Système météo : ciel post-apo + radiations appliquées",
    "Zones de loot : 12 points stratégiques créés",
    "Scripting zone danger : expansion progressive activée",
    "NPC hostiles : 8 survivants ennemis générés",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
  "🏙️ Moderne": [
    "Analyse — Carte urbaine contemporaine détectée...",
    "Génération du plan de ville : 6 quartiers distincts",
    "Routes + réseau trafic IA : 120 intersections",
    "Bâtiments : 234 structures haute résolution",
    "Système économique Lua : commerces + emplois",
    "Transports : métro + bus + taxis scriptés",
    "Population NPC : 150 habitants avec routines",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
  "🧊 Arctique": [
    "Scan — Biome glaciaire extrême détecté...",
    "Terrain : toundra + glaciers (512x512)...",
    "Tempête de neige : système météo dynamique actif",
    "Faune : 12 créatures arctiques IA générées",
    "Ressources : minerais rares + cristaux de glace",
    "Mécaniques survie : température + hypothermie",
    "Abris : 6 structures résistantes au froid générées",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
  "🌋 Volcanique": [
    "Analyse — Zone volcanique active détectée...",
    "Terrain : lave + obsidienne (512x512)...",
    "Éruptions : événements aléatoires scriptés",
    "Créatures volcaniques : 8 NPC hostiles résistants",
    "Zones à risque : système de dommages par chaleur",
    "Minerais rares : géodes + cristaux volcaniques",
    "Mécaniques lave : physique fluide simulée",
    "Export Roblox Studio (.rbxl) — Prêt ✓",
  ],
}

export function HeroDemo() {
  const { data: session } = useSession()
  const router = useRouter()
  const { isGenerating, logs, setGenerating, addLog, reset, setResult } = useGenerationStore()
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState(STYLES[0])
  const [resolution, setResolution] = useState(RESOLUTIONS[0])
  const [scripts, setScripts] = useState(SCRIPTS[0])
  const [done, setDone] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [genTime, setGenTime] = useState<number | null>(null)
  const logsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight
    }
  }, [logs])

  async function handleGenerate() {
    if (!prompt.trim()) {
      toast.error("Entre une description pour ta map !")
      return
    }

    if (!session) {
      // Demo mode — simulate locally
      runLocalDemo()
      return
    }

    reset()
    setDone(false)
    setGenerating(true)

    const styleName = style.replace(/^[\S]+ /, "").toLowerCase()
    const res = resolution.split(" ")[0]

    // Start local animation immediately for UX
    const demoLogs = DEMO_LOGS[style] || DEMO_LOGS["💀 Post-Apo"]
    let i = 0
    const interval = setInterval(() => {
      if (i < demoLogs.length - 1) {
        addLog(demoLogs[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 380)

    const { data, error } = await generateMap({ prompt, style: styleName, resolution: res, scripts })

    clearInterval(interval)

    if (error) {
      setGenerating(false)
      toast.error(error)
      reset()
      return
    }

    if (data) {
      addLog(demoLogs[demoLogs.length - 1])
      setResult(data.mapId, data.downloadUrl, data.generationTime)
      setDownloadUrl(data.downloadUrl)
      setGenTime(data.generationTime)
      setDone(true)
      setGenerating(false)
      toast.success(`Map générée en ${data.generationTime.toFixed(1)}s ! ${data.creditsRemaining} crédits restants.`)
    }
  }

  function runLocalDemo() {
    reset()
    setDone(false)
    setGenerating(true)

    const demoLogs = DEMO_LOGS[style] || DEMO_LOGS["💀 Post-Apo"]
    const t0 = Date.now()
    let i = 0
    const interval = setInterval(() => {
      if (i < demoLogs.length) {
        addLog(demoLogs[i])
        i++
      } else {
        clearInterval(interval)
        const elapsed = (Date.now() - t0) / 1000
        setGenTime(elapsed)
        setDownloadUrl("#demo-download")
        setDone(true)
        setGenerating(false)
      }
    }, 380)
  }

  function handleDownload() {
    if (!session) {
      toast.info("Crée un compte gratuit pour télécharger tes maps !")
      router.push("/auth/signup")
      return
    }
    if (downloadUrl && downloadUrl !== "#demo-download") {
      window.open(downloadUrl, "_blank")
    } else {
      toast.success("Fichier .rbxl prêt — connecte-toi pour télécharger !")
    }
  }

  return (
    <div className="terminal max-w-3xl mx-auto">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-[#7070a0] text-xs ml-2 font-mono">ROBOXAI · Générateur de Maps</span>
        {isGenerating && (
          <span className="ml-auto text-xs text-green-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Génération en cours...
          </span>
        )}
      </div>

      {/* Prompt */}
      <div className="mb-3">
        <div className="text-[#7070a0] text-xs mb-1.5 font-mono">&gt;_ Décrivez votre map :</div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && handleGenerate()}
          placeholder='"Crée une map de survie post-apocalyptique avec des bâtiments détruits, un ciel orange, des zones de loot..."'
          className="w-full bg-[#0a0a14] border border-[#2a2a3d] rounded-lg text-[#a0e0ff] text-xs font-mono p-3 outline-none resize-none min-h-[72px] leading-relaxed focus:border-purple-500/50 placeholder:text-[#3a3a5a] transition-colors"
          disabled={isGenerating}
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-2 mb-3">
        {[
          { value: style, onChange: setStyle, options: STYLES },
          { value: resolution, onChange: setResolution, options: RESOLUTIONS },
          { value: scripts, onChange: setScripts, options: SCRIPTS },
        ].map((sel, i) => (
          <select
            key={i}
            value={sel.value}
            onChange={(e) => sel.onChange(e.target.value)}
            disabled={isGenerating}
            className="bg-[#0f0f1f] border border-[#2a2a3d] rounded-md text-[#e2e0ff] text-xs px-3 py-2 outline-none font-mono cursor-pointer focus:border-purple-500/50 disabled:opacity-50"
          >
            {sel.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}

        <button
          onClick={isGenerating ? () => {} : handleGenerate}
          disabled={isGenerating}
          className="ml-auto btn-primary text-xs px-5 py-2 flex items-center gap-2"
        >
          {isGenerating ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Génération...</>
          ) : (
            <><Play className="w-3.5 h-3.5 fill-current" /> Générer</>
          )}
        </button>
      </div>

      {/* Output */}
      {logs.length > 0 && (
        <div
          ref={logsRef}
          className="bg-[#05050d] rounded-lg p-3 max-h-52 overflow-y-auto space-y-0.5"
        >
          {logs.map((log, i) => (
            <div
              key={i}
              className={`log-line animate-slide-in ${
                log.includes("Prêt") || log.includes("Terminé")
                  ? "log-success font-semibold"
                  : "log-info"
              }`}
            >
              ✓ {log}
            </div>
          ))}
          {isGenerating && (
            <div className="log-line log-warn flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" /> Traitement...
            </div>
          )}
        </div>
      )}

      {/* Done state */}
      {done && genTime && (
        <div className="mt-3 flex items-center justify-between bg-green-500/5 border border-green-500/20 rounded-lg px-4 py-3">
          <div>
            <span className="text-green-400 font-semibold text-sm">
              ✓ Terminé en {genTime.toFixed(1)}s
            </span>
            {!session && (
              <span className="text-[#7070a0] text-xs ml-2">
                — <a href="/auth/signup" className="text-purple-400 hover:underline">Crée un compte</a> pour télécharger
              </span>
            )}
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold text-xs px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Télécharger .rbxl
          </button>
        </div>
      )}

      {/* Hint */}
      {!logs.length && (
        <div className="text-center text-[#3a3a5a] text-xs font-mono mt-2">
          Ctrl+Entrée pour générer · Aucune carte bancaire requise
        </div>
      )}
    </div>
  )
}
