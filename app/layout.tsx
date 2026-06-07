import type { Metadata } from "next";

import "./globals.css";

import NavBar from "@/components/Navbar.jsx"
import { Orbitron, Geist } from 'next/font/google';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'], // choose what you need
});

export const metadata: Metadata = {
  title: "Navaneeth Dev G",
  description: "Portfolio for 3d animation and editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", orbitron.className, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
      {/* <NavBar/> */}
      

        
        
      
        {children}
        </body>
    </html>
  );
}
