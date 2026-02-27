import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BharatBills — GST Invoicing Software",
  description: "Simple, powerful GST invoicing software for Indian small businesses. Create professional invoices with automatic CGST, SGST, and IGST calculations.",
  keywords: ["GST", "invoicing", "billing", "India", "small business", "CGST", "SGST", "IGST"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
