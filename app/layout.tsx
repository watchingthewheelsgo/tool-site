import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/headers";
import { Footer } from "./components/footer";
import Tuggle from "./components/tuggle";

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
          <div className="grid grid-cols-12">
            <div className="hidden overflow-hidden relative z-10 lg:block lg:col-span-3 mt-8 pr-4 px-4 w-[300px]">
              <Tuggle />
            </div>
            <div className="col-span-12 px-16 lg:col-span-9 xl:col-span-7 xl:px-48 lg:px-32 mt-10 sm:px-16 justify-center">
              {children}
            </div>
            <div className="hidden z-10 xl:flex xl:col-span-2 mt-8 pl-4">
              
            </div>
          </div>
          {/* <Footer /> */}
        </NextUIProvider>
      </body>
    </html>
  );
}
