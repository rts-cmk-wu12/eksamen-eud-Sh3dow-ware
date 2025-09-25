import type { Metadata } from "next";
import React from "react";
import "@/styles/main.sass"
import {HeaderComponent} from "@/components/header/Header";
import {Footer} from "@/components/footer/Footer";
import {SearchProvider} from "@/components/section/products/search/provider/SearchProvider";



export const metadata: Metadata = {
  title: "SwapHub",
  description: "Website has been made by SwapHub",
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
        <HeaderComponent></HeaderComponent>
         {children}
         <Footer></Footer>
      </SearchProvider>
      </body>
    </html>
  );
}
