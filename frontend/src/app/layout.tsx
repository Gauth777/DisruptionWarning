import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Early Warning Supply Chain Predictor",
  description:
    "Hierarchical cascading impact predictor for supply chain disruptions across Indian regions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main className="max-w-[1440px] mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
