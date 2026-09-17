import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import { InlineScript } from "@/components/ui/inline-script";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";

import "./globals.css";

// DM Sans es la tipografía de Horizon UI.
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

const OG_DESCRIPTION =
  "Estudiante de Ingeniería enfocado en ciberseguridad potenciada con IA. Proyectos, experiencia y certificaciones.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Maximiliano Solorza",
  authors: [{ name: "Maximiliano Solorza", url: SITE_URL }],
  creator: "Maximiliano Solorza",
  keywords: [
    "Maximiliano Solorza",
    "ciberseguridad",
    "cybersecurity",
    "inteligencia artificial",
    "machine learning",
    "pentesting",
    "desarrollador",
    "portafolio",
    "Universidad Diego Portales",
    "Santiago de Chile",
  ],
  alternates: {
    canonical: "/",
    // Versión en texto plano de todo el contenido, pensada para IAs.
    types: { "text/markdown": [{ url: "/llms.txt", title: "llms.txt" }] },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Maximiliano Solorza",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    locale: "es_CL",
    alternateLocale: ["en_US", "de_DE", "it_IT", "nl_NL"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
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
