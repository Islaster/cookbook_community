import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Community Cookbook — Share & Discover Recipes",
  description:
    "Post your favorite recipes, discover new meals, and follow home cooks you love. The Instagram of recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
