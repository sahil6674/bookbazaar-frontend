import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import { Suspense } from "react";
import SearchBar from "@/components/shared/SearchBar";

export default function HeroSection() {
  return (
    // min-h sets minimum height, bg-gradient makes the gradient background
    <section className="min-h-[90vh] bg-linear-to-br from-primary/10 via-background to-secondary/10 flex items-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">

        {/* Two column layout on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT COLUMN: Text Content ── */}
          <div className="flex flex-col gap-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium w-fit">
              <BookOpen className="h-4 w-4" />
              <span>Student Book Marketplace of India</span>
            </div>

            {/* Main Heading */}
            {/* text-5xl on desktop, text-3xl on mobile */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Buy & Sell Books{" "}
              {/* {" "} adds a space between words across lines */}
              <span className="text-primary">Without</span>{" "}
              Breaking the Bank
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground max-w-lg">
              A marketplace built for students. Find textbooks, notes, and
              notebooks at prices that actually make sense — starting at just{" "}
              <span className="text-primary font-semibold">₹49</span>.
            </p>

            {/* Search Bar */}
            <Suspense fallback={
              <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 shadow-sm max-w-md">
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading search...</span>
              </div>
            }>
              <div className="max-w-md">
                <SearchBar
                  redirectTo="/books"
                  placeholder="Search for books, notes, subjects..."
                  showButton={true}
                />
              </div>
            </Suspense>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button size="lg" asChild>
                <Link href="/books" className="flex items-center gap-2">
                  Browse Books
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sell">Sell Your Books</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <p className="text-sm text-muted-foreground">
              ✅ Free to list &nbsp; ✅ Safe transactions &nbsp; ✅ Student verified
            </p>

          </div>

          {/* ── RIGHT COLUMN: Visual Card ── */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-sm">

              {/* Main card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Physics NCERT Class 12</p>
                    <p className="text-sm text-muted-foreground">Good Condition</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹120</p>
                    <p className="text-xs text-muted-foreground line-through">MRP ₹350</p>
                  </div>
                  <Button size="sm">Buy Now</Button>
                </div>
              </div>

              {/* Floating badge: top right */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md">
                66% OFF
              </div>

              {/* Floating badge: bottom left */}
              <div className="absolute -bottom-12 -left-12 bg-background border border-border rounded-xl px-4 py-2 shadow-md">
                <p className="text-xs text-muted-foreground">New listing</p>
                <p className="text-sm font-semibold text-foreground">Chemistry Notes</p>
                <p className="text-sm text-primary font-bold">₹49</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}