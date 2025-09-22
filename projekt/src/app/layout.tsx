import type { Metadata } from "next";
import React from "react";



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
        {children}
      </body>
    </html>
  );
}
