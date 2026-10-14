import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { Preloader } from "@/components/layout/Preloader";
import { RouteScrollReset } from "@/components/layout/RouteScrollReset";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MediaCursor } from "@/components/ui/MediaCursor";
import { siteConfig } from "@/content/site";
import { resolveImage } from "@/lib/data/images";
import { getHeaderData } from "@/lib/data/navigation";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Journeys in Uttarakhand & Himachal`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

const preloaderImages = [
  resolveImage({ destination: "spiti-valley", index: 0 }, "Key Monastery, Spiti"),
  resolveImage({ destination: "kedarnath", index: 1 }, "Kedarnath"),
  resolveImage({ destination: "chandratal", index: 0 }, "Chandratal"),
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <SmoothScroll>
          <Preloader images={preloaderImages} />
          <RouteScrollReset />
          <Header data={getHeaderData()} />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <MediaCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
