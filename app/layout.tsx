import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CityModal } from "@/components/city-modal";
import { SwRegister } from "@/components/SwRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "CLICK", template: "%s — CLICK" },
  description: "Marketplace hondureño. Importaciones Amazon y tiendas locales en un solo carrito.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "CLICK" },
  other: { "mobile-web-app-capable": "yes" },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] antialiased" style={{ background: "var(--cl-canvas)" }}>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-[480px] px-4 pb-24 pt-2 sm:max-w-2xl">
            {children}
          </main>
          <BottomNav />
          <CityModal />
          <SwRegister />
        </Providers>
      </body>
    </html>
  );
}
