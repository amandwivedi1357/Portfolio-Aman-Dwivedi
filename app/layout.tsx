import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import "./globals.css";
import { FloatingDockDemo } from "@/components/floating-dock";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { TopLoader } from "@/components/ui/top-loader";
import { SinglePageContent } from "@/components/single-page-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Dwivedi | Portfolio",
  description: "Full Stack Web Developer Portfolio",
};

export default function RootLayout() {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-black relative`}
        suppressHydrationWarning
      >
        <TopLoader />
        <SinglePageContent />
        <div >
          <FloatingDockDemo />
        </div>
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <HamburgerMenu />
        </div>
      </body>
    </html>
  );
}
