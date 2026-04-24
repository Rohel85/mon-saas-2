// src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import Providers from "../components/layout/Providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RoboxAI — Génère des maps Roblox avec l'IA",
  description:
    "Génère des maps Roblox et des jeux complets en quelques secondes grâce à notre IA de nouvelle génération.",
  keywords: ["roblox", "ia", "générateur", "maps", "jeux", "roblox studio"],
  openGraph: {
    title: "RoboxAI",
    description: "Génère des maps Roblox avec l'IA en moins de 8 secondes",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            richColors
            toastOptions={{
              style: {
                background: "#12121a",
                border: "1px solid #2a2a3d",
                color: "#e2e0ff",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
