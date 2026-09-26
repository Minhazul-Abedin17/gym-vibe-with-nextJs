import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { WorkoutProvider } from "./context/WorkoutContext";
import Navbar from "./components/Navbar";
import Footer from "./components/shared/Footer";
import Toast from "./components/shared/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion. Pick a lift, build your plan, and track your workouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#0B0D10] text-white">
        <WorkoutProvider>
          <Navbar />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
          <Toast />
        </WorkoutProvider>
      </body>
    </html>
  );
}