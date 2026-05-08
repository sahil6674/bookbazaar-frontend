import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "BookBazar - Buy & Sell Books",
  description: "A marketplace for students to buy and sell books, notes and notebooks at affordable prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* AuthProvider wraps everything so all pages can access user */}
        <AuthProvider>
          {/* Navbar appears on every page */}
          <Navbar/>

          {/* 'children' is whatever the current page renders */}
          {/* flex-1 makes main take all available space, pushing footer down */}
          <main className="flex-1">
            {children}
          </main>

          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}