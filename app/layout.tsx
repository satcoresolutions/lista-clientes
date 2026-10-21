import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lista de clientes · SatCore Solutions",
  description: "CRM extremadamente sencillo: clientes, estado y seguimientos.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-fg antialiased">{children}</body>
    </html>
  );
}
