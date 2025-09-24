import type { Metadata } from "next";
import React from "react";
import "@/styles/main.sass"
import {HeaderComponent} from "@/components/header/Header";
import {Footer} from "@/components/footer/Footer";



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
        <HeaderComponent></HeaderComponent>
        {children}
         <Footer></Footer>
      </body>
    </html>
  );
}
