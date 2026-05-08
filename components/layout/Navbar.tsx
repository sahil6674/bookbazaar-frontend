"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Books", href: "/books" },
  { label: "Sell a Book", href: "/sell" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-primary">BookBazaar</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted ? null : isLoggedIn ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hi, {user?.name.split(" ")[0]}!
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen
              ? <X className="h-6 w-6" />
              : <Menu className="h-6 w-6" />
            }
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border">
            {!mounted ? null : isLoggedIn ? (
              <>
                <p className="text-sm text-center text-muted-foreground">
                  Hi, {user?.name.split(" ")[0]}!
                </p>
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}