import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/public/scss/styles.scss";
import Bootstrap from "@/components/Bootstrap";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { DynamicHead } from "@/components/DynamicHead";
import { StructuredData } from "@/components/StructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cristiansrc.com";
const siteName = "Cristian SRC - Full Stack Developer";
const defaultDescription = "Full Stack Developer y Tech Lead especializado en Java, React, Spring Boot, AWS y Python. Portfolio personal con experiencia, proyectos y habilidades.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Full Stack Developer",
    "Java Developer",
    "React Developer",
    "Spring Boot",
    "AWS",
    "Python",
    "Tech Lead",
    "Desarrollador Full Stack",
    "Portfolio",
    "Hoja de vida",
    "Bogotá",
    "Colombia",
  ],
  authors: [{ name: "Cristian SRC" }],
  creator: "Cristian SRC",
  publisher: "Cristian SRC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Cristian SRC - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    creator: "@cristiansrc",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
    languages: {
      "es-CO": `${siteUrl}?lang=es`,
      "en-US": `${siteUrl}?lang=en`,
    },
  },
  verification: {
    // Agregar códigos de verificación cuando los tengas
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};
type LayoutType = {
  children: React.ReactNode;
};
const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"],
  display: "swap",
  preload: false, // Desactivar preload para evitar warnings cuando el contenido se carga después
  adjustFontFallback: false,
});
export default function RootLayout({ children }: Readonly<LayoutType>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <LanguageProvider>
          <ResumeProvider>
            <LoadingProvider>
              <DynamicHead />
              <StructuredData />
              <Bootstrap>
                {children}
              </Bootstrap>
            </LoadingProvider>
          </ResumeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
