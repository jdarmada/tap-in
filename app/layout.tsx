import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { DotBackground } from "./components/dotbackground";
import "./globals.css";
import Navbar from "./components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TapIn",
  description: "Network with other creatives",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <ApolloWrapper>
          <DotBackground />
          {children}

        </ApolloWrapper>
        
        
          </body>
    </html>
  )
}
