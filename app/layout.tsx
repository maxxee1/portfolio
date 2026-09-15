import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { InlineScript } from "@/components/ui/inline-script";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

// DM Sans es la tipografía de Horizon UI.
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

const SITE_URL = "https://my-portfolio-maximiliano.vercel.app";
const TITLE = "Maximiliano Solorza — Ciberseguridad & IA";
const DESCRIPTION =
  "Portafolio de Maximiliano Solorza, estudiante de Ingeniería Civil en Informática y Telecomunicaciones enfocado en ciberseguridad potenciada con inteligencia artificial. Proyectos, experiencia y certificaciones.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: "Maximiliano Solorza" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description:
      "Estudiante de Ingeniería enfocado en ciberseguridad potenciada con IA. Proyectos, experiencia y certificaciones.",
    locale: "es_CL",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      "Estudiante de Ingeniería enfocado en ciberseguridad potenciada con IA. Proyectos, experiencia y certificaciones.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} className="dark" suppressHydrationWarning>
      <head>
        <InlineScript html={THEME_SCRIPT} />
        {/* Los íconos de habilidades vienen de estos CDN: adelantar el DNS */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
      </head>
      <body className={dmSans.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
