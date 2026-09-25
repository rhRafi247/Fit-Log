import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import { PlanProvider } from "@/context/PlanContext";

export const metadata = {
  title: "FITLOG | Workout Tracker & Exercise Library",
  description: "Track your daily fitness routines, explore exercise libraries, and build your custom workout plan with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
    >
      <body className="min-h-screen flex flex-col bg-[#0d0f14] text-white">
        <PlanProvider>
          <Nav />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
