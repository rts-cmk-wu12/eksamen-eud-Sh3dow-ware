import type { Metadata } from "next";
import React from "react";
import "@/styles/main.sass"
import {HeaderComponent} from "@/components/header/header";


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
      </body>
    </html>
  );
}
