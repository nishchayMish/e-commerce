import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AURUM — Premium Lifestyle Store",
  description:
    "Curated luxury essentials for those who demand the very best. Explore our premium collection of fashion, electronics, beauty, and more.",
  keywords: [
    "luxury",
    "premium",
    "fashion",
    "electronics",
    "beauty",
    "e-commerce",
  ],
  openGraph: {
    title: "AURUM — Premium Lifestyle Store",
    description: "Curated luxury essentials for the discerning few.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
