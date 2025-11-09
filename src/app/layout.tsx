import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import localFont from "next/font/local";

import ViewCanvas from "@/components/3d/ViewCanvas";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";
import Header from "@/components/navigation/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Underwater Studio | Creative 3D Web",
  description:
    "I create interactive websites, apps, 3D visuals, and cinematic drone videos — a full-spectrum creative studio pushing digital boundaries.",
  keywords: [
    "Underwater Studio",
    "web design",
    "website development",
    "React developer",
    "Next.js",
    "Three.js",
    "3D modelling",
    "drone filming",
    "video montage",
    "creative studio",
    "app development",
    "motion design",
    "branding",
  ],
  openGraph: {
    title: "Underwater Studio | Creative 3D Web",
    description:
      "I create interactive websites, apps, 3D visuals, and cinematic drone videos — a full-spectrum creative studio pushing digital boundaries.",
    url: "https://underwater-studio.com",
    siteName: "Underwater Studio",
    images: [
      {
        url: "/images/underwater-studio-og.webp",
        width: 1200,
        height: 630,
        alt: "Underwater Studio – Creative Web Services",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  icons: {
    icon: "/icons/favicon.png",
    shortcut: "/icons/favicon.png",
    apple: "/icons/favicon.png",
  },
  metadataBase: new URL("https://underwater-studio.com"),
};

// Palette
// #001011
// #093a3e
// #3aafb9
// #64e9ee
// #97c8eb
// #fe9000

const merriweather = localFont({
  src: "../../public/fonts/Merriweather-Light.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-merriweather",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriweather.variable}>
      <body className="overflow-x-hidden bg-[#001011] text-slate-200 antialiased">
        <main>
          <Header />
          {children}
          <ViewCanvas />
          <Footer />
          <Loader />
        </main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
