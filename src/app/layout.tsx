import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";

import ConvexClientProvider from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./../_styles/globals.css";
import { UserSync } from "./UserSync";

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Mood Tracker",
  description: "Track your mood and sleep data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="min-h-screen">
        <body
          className={`${redditSans.className} antialiased bg-linear-to-b from-[#f5f7ff] from-0% via-[#F5F5FF] via-73% to-[#E0E0FF] to-100%`}
        >
          <ConvexClientProvider>
            <UserSync />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
