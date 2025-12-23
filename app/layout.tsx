import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Honey Herbal Beauty Parlor | Premium Herbal Beauty Services",
  description: "Experience the power of nature for your beauty at Honey Herbal Beauty Parlor. We offer herbal facials, hair care, bridal makeup, and more using 100% organic products.",
  keywords: "beauty parlor, herbal, organic, facial, hair care, bridal makeup, Mumbai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
