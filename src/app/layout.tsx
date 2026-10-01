import type { Metadata, Viewport } from "next";
import { Gloria_Hallelujah, Inter, Oswald } from "next/font/google";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { RevealObserver } from "@/components/Reveal/RevealObserver";
import { contact, site } from "@/content/site";

import "./globals.css";

// Inter and Oswald are variable fonts — a single file covers every weight used on the site.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--font-oswald",
  display: "swap",
});

const gloria = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline.join(" · ")}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Konrad Kislo",
    "Red Pine Mushroom",
    "drummer",
    "music producer",
    "recording engineer",
    "mixing",
    "photography",
    "Tilburg",
    "Głogów",
    "post-rock",
  ],
  authors: [{ name: site.name }],
  robots: { index: site.allowIndexing, follow: site.allowIndexing },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: site.heroImage.src, width: site.heroImage.width, height: site.heroImage.height }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ede9de",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  jobTitle: "Musician, producer and photographer",
  memberOf: { "@type": "MusicGroup", name: "Red Pine Mushroom" },
  address: { "@type": "PostalAddress", addressLocality: "Tilburg", addressCountry: "NL" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${gloria.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" className="site-main">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
