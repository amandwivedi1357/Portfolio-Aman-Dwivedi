import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/ui/page-transition";
import { FloatingDockDemo } from "@/components/floating-dock";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark:bg-black relative`}
        suppressHydrationWarning
      >
        <PageTransition>{children}</PageTransition>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <FloatingDockDemo />
        </div>
      </body>
    </html>
  );
}
