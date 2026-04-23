// src/app/page.tsx
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { HeroDemo } from "@/components/demo/HeroDemo"
import { Zap, Map, Gamepad2, Download, Palette, Bot, ArrowRight, Check } from "lucide-react"

const features = [
  { icon: Map, title: "Génération de Maps", desc: "Terrains, biomes, structures, ambiances — générés en langage naturel." },
  { icon: Gamepad2, title: "Jeux Complets", desc: "Systèmes de jeu, scripts Lua, interfaces UI — ton jeu Roblox clé en main." },
  { icon: Zap, title: "Génération Instantanée", desc: "Moins de 8 secondes pour une map complète. Infrastructure distribuée." },
  { icon: Download, title: "Export Roblox Studio", desc: "Fichiers .rbxl prêts à l'emploi. Importe directement en un clic." },
  { icon: Palette, title: "Styles Personnalisés", desc: "Fantasy, sci-fi, réaliste, cartoon — 50+ styles artistiques disponibles." },
  { icon: Bot, title: "Scripts IA Avancés", desc: "NPC intelligents, systèmes économiques, quêtes dynamiques en Lua." },
]

const steps = [
  { num: "01", icon: "💬", title: "Décris ton idée", desc: "En langage naturel, français ou anglais. L'IA comprend les concepts complexes." },
  { num: "02", icon: "🧠", title: "L'IA génère", desc: "Terrain, scripts, assets, ambiances — tout créé automatiquement en quelques secondes." },
  { num: "03", icon: "🚀", title: "Exporte & joue", desc: "Télécharge ton fichier .rbxl et importe dans Roblox Studio. Prêt à publier." },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-xs text-purple-300 mb-6">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            IA en ligne · Génération instantanée
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Crée ton monde avec<br />
            <span className="gradient-text">l'Intelligence Artificielle</span>
          </h1>

          <p className="text-lg text-[#7070a0] max-w-2xl mx-auto mb-10 leading-relaxed">
            Génère des maps Roblox et des jeux complets en quelques secondes grâce à notre IA de
            nouvelle génération. Décris ton idée, l'IA construit tout.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="btn-primary text-base px-8 py-3">
              Créer ma map IA
            </Link>
            <Link href="#demo" className="btn-secondary text-base px-8 py-3">
              Voir la démo
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { n: "48K+", l: "Maps créées" },
            { n: "12K+", l: "Créateurs actifs" },
            { n: "<8s", l: "Temps de génération" },
            { n: "99.8%", l: "Uptime IA" },
          ].map((s) => (
            <div key={s.l} className="stat-card">
              <div className="text-2xl font-bold text-purple-300">{s.n}</div>
              <div className="text-xs text-[#7070a0] mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div id="demo">
          <HeroDemo />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-purple-400 font-mono mb-3">// Fonctionnalités</p>
          <h2 className="text-3xl md:text-4xl font-bold">Une IA conçue pour Roblox</h2>
          <p className="text-[#7070a0] mt-4 max-w-xl mx-auto">
            Notre modèle est entraîné spécifiquement sur des milliers de maps et jeux Roblox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="card-hover group">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <f.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-[#e2e0ff] mb-2">{f.title}</h3>
              <p className="text-sm text-[#7070a0] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-purple-400 font-mono mb-3">// Comment ça marche</p>
          <h2 className="text-3xl md:text-4xl font-bold">3 étapes pour créer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <div className="card text-center">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-xs font-mono text-purple-400 mb-2">{s.num}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-[#7070a0]">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2a2a3d] z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center card border-purple-500/20">
          <h2 className="text-3xl font-bold mb-4">Prêt à créer ?</h2>
          <p className="text-[#7070a0] mb-8">5 maps gratuites pour commencer. Aucune carte bancaire requise.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/signup" className="btn-primary px-8 py-3 text-base">
              Commencer gratuitement →
            </Link>
            <Link href="/pricing" className="btn-secondary px-8 py-3 text-base">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a3d] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-purple-400 rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="gradient-text">ROBOXAI</span>
          </div>
          <p className="text-xs text-[#7070a0]">© 2026 RoboxAI · Tous droits réservés</p>
          <div className="flex gap-4 text-xs text-[#7070a0]">
            <Link href="/legal/terms" className="hover:text-[#e2e0ff] transition-colors">Conditions</Link>
            <Link href="/legal/privacy" className="hover:text-[#e2e0ff] transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
