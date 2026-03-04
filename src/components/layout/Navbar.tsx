"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio", icon: "◉" },
  { href: "/eventos", label: "Eventos", icon: "☄" },
  { href: "/mapa-celeste", label: "Mapa Celeste", icon: "✦" },
  { href: "/arbol-de-la-vida", label: "Arbol de la Vida", icon: "🌳" },
  { href: "/calendario", label: "Calendario", icon: "📅" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-cosmic-black/80 backdrop-blur-md border-b border-gold-400/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✡</span>
            <span className="text-gradient-gold font-mystical text-lg font-bold hidden sm:inline">
              Astro Kabbalah
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                    isActive
                      ? "bg-gold-400/20 text-gold-400 shadow-glow-gold"
                      : "text-cosmic-muted hover:text-cosmic-white hover:bg-cosmic-navy/50"
                  }`}
                >
                  <span className="sm:hidden">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
