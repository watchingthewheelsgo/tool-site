import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/headers";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X-Tools",
  description: "Discover, Learn, Create: The Ultimate Toolkit Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <NextUIProvider>
          <Header />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
