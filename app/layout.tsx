import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/topBar";
import Providers from "./components/Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "NoteApp",
  description: "Une plate forme de Prise de Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Providers>
          <TopBar />
          {children}
          <Toaster position="top-center" className="bg-red-400" richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
