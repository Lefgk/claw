import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Web3Provider from "@/providers/Web3Provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERC-8004 on PulseChain",
  description:
    "Trustless AI Agent Identity, Reputation & Validation — deployed on PulseChain for the first time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
