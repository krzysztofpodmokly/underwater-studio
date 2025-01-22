import type { Metadata } from "next";
import localFont from "next/font/local";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import dynamic from "next/dynamic";

import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import ViewCanvas from "@/components/3d/ViewCanvas";
import Loader from "@/components/loader/Loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Palette
// #001011
// #093a3e
// #3aafb9
// #64e9ee
// #97c8eb
// #fe9000

const nunito = localFont({
  src: "../../public/fonts/Nunito.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="overflow-x-hidden bg-[#000] antialiased">
        {/* <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/textures/noisetexture.jpg')] opacity-20 mix-blend-soft-light" /> */}
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
