"use client";

import type { ChildrenType } from "@/@types";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Providers from "@/providers/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const AuthLayout = ({ children }: ChildrenType) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default AuthLayout;
