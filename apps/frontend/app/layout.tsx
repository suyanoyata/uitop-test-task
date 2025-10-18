import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "~/components/ui/sonner";
import { ReactQueryProvider } from "~/providers/react-query-provider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Junior/Strong Junior FullStack test task",
  description: "Small full-stack application for managing tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <NuqsAdapter>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
