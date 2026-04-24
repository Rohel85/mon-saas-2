"use client"
// src/components/layout/Navbar.tsx
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { Menu, X, Zap, ChevronDown, LogOut, LayoutDashboard, Settings, Key } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#2a2a3d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-purple-400 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">ROBOXAI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/#features" className="nav-link">Fonctionnalités</Link>
          <Link href="/#gallery" className="nav-link">Galerie</Link>
          <Link href="/pricing" className="nav-link">Tarifs</Link>
          <Link href="/api-docs" className="nav-link">API</Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-[#1a1a28] border border-[#2a2a3d] rounded-full pl-1 pr-3 py-1 hover:border-purple-500/50 transition-all"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-purple-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {session.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm text-[#e2e0ff]">{session.user?.name || "User"}</span>
                <span className={cn("badge text-[10px]", {
                  "badge-free": session.user?.plan === "FREE",
                  "badge-pro": session.user?.plan === "PRO",
                  "badge-boss": session.user?.plan === "BOSS",
                })}>
                  {session.user?.plan}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7070a0]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#12121a] border border-[#2a2a3d] rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-[#2a2a3d]">
                    <p className="text-sm font-medium text-[#e2e0ff]">{session.user?.name}</p>
                    <p className="text-xs text-[#7070a0]">{session.user?.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#e2e0ff] hover:bg-[#1a1a28] rounded-lg transition-colors">
                      <LayoutDashboard className="w-4 h-4 text-[#7070a0]" /> Dashboard
                    </Link>
                    <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#e2e0ff] hover:bg-[#1a1a28] rounded-lg transition-colors">
                      <Settings className="w-4 h-4 text-[#7070a0]" /> Paramètres
                    </Link>
                    <Link href="/dashboard/api-keys" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#e2e0ff] hover:bg-[#1a1a28] rounded-lg transition-colors">
                      <Key className="w-4 h-4 text-[#7070a0]" /> Clé API
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-1">
                      <LogOut className="w-4 h-4" /> Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost text-sm">Connexion</Link>
              <Link href="/auth/signup" className="btn-primary text-sm">Commencer →</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[#7070a0]">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#2a2a3d] bg-[#0a0a0f] px-4 py-4 space-y-2">
          <Link href="/#features" className="block nav-link" onClick={() => setMobileOpen(false)}>Fonctionnalités</Link>
          <Link href="/pricing" className="block nav-link" onClick={() => setMobileOpen(false)}>Tarifs</Link>
          <Link href="/api-docs" className="block nav-link" onClick={() => setMobileOpen(false)}>API</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block nav-link" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full text-left nav-link text-red-400">
                Déconnexion
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link href="/auth/login" className="btn-secondary flex-1 text-center" onClick={() => setMobileOpen(false)}>Connexion</Link>
              <Link href="/auth/signup" className="btn-primary flex-1 text-center" onClick={() => setMobileOpen(false)}>Commencer</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
