import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelDash - Bem vindo",
  description: "Gerenciador de negocios da  Pixel99",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-950 flex w-full`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
