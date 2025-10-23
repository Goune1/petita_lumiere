import type { Metadata } from "next";
import { Geist, Geist_Mono, Chiron_Sung_HK } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

import AuthProvider from '@/components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chironSung = Chiron_Sung_HK({
  variable: "--chiron-sung-hk",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Petita Lumière",
  description: "Petita Lumière, by Severine & Phillipe. Made in France",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${chironSung.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
