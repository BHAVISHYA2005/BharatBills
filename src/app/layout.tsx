import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatBills - GST Invoicing",
  description: "Simple GST billing software for Indian businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
