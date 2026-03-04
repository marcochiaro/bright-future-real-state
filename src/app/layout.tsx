import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StarBackground } from "@/components/ui/StarBackground";

export const metadata: Metadata = {
  title: "Astro Kabbalah - Eventos Celestiales en Tiempo Real",
  description:
    "Observatorio celestial interactivo con perspectiva cabalistica. Eventos astronomicos, astrologicos y su significado en el Arbol de la Vida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-cosmic-black text-cosmic-white font-sans antialiased">
        <StarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
