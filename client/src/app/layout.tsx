import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import StoreProvider from "@/components/layouts/StoreProvider";
import Loader from "@/components/common/Loader";
import ToastModal from "@/components/common/ToastModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.TITLE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("redner");
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/google.svg" />
      </Head>
      <body className={inter.className + " h-screen flex flex-col"}>
        <StoreProvider>
          <Loader />
          <ToastModal />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
