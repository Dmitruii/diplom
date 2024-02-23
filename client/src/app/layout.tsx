import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import StoreProvider from "@/components/layouts/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/google.svg" />
      </Head> 
      <body className={inter.className + ' h-screen flex flex-col'}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
