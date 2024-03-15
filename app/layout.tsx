import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/utils/apollo-client";
import { DotBackground } from "./components/dotbackground";
import "./globals.css";


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
        <ApolloProvider client={apolloClient}>
          <DotBackground />
          {children}
        </ApolloProvider>
          </body>
    </html>
  )
}
