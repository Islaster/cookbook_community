import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { SearchProvider } from "@/contexts/searchContext";

export const metadata: Metadata = {
  title: "Cookbook Community",
  description: "Created by Isaac Laster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <Navbar />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
