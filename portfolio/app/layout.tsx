import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Navaneeth Dev G",
  description: "portfolio development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black selection:bg-cyan-500 selection:text-white">

        <NavBar />
        {children}</body>
    </html>
  );
}
