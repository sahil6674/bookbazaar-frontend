import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

// TypeScript type matching our MongoDB book structure
type Book = {
  _id: string;
  title: string;
  subject: string;
  price: number;
  originalPrice: number;
  condition: string;
  category: string;
  seller: {
    name: string;
    location: string;
  };
};

const conditionColor: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-yellow-100 text-yellow-700",
};

// ── BOOK CARD ──
function BookCard({ book }: { book: Book }) {
  const discount =
    book.originalPrice > 0
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100
        )
      : 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">

      {/* Book image placeholder */}
      <div className="w-full h-36 bg-primary/5 rounded-xl flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-primary/30" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              conditionColor[book.condition] || "bg-gray-100 text-gray-600"
            }`}
          >
            {book.condition}
          </span>
        </div>
        <h3 className="font-semibold text-foreground text-sm leading-snug mt-1">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {book.subject} • by {book.seller?.name || "Unknown"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-lg font-bold text-primary">₹{book.price}</p>
          {book.originalPrice > 0 && (
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground line-through">
                ₹{book.originalPrice}
              </p>
              {discount > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  {discount}% off
                </span>
              )}
            </div>
          )}
        </div>
        {/* Use _id for MongoDB */}
        <Button size="sm" asChild>
          <Link href={`/books/${book._id}`}>View</Link>
        </Button>
      </div>

    </div>
  );
}

// ── MAIN COMPONENT ──
// async = can use await inside
export default async function FeaturedBooks() {

  // Fetch latest 4 books from backend
  let books: Book[] = [];
  try {
    const response = await fetch(
      "http://localhost:5000/api/books?limit=4",
      { cache: "no-store" }
    );
    const data = await response.json();
    if (data.success) books = data.books.slice(0, 4);
    // .slice(0, 4) ensures max 4 books even if API returns more
  } catch (error) {
    console.error("Failed to fetch featured books:", error);
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">
              Featured Books
            </h2>
            <p className="text-muted-foreground">
              Freshly listed by students near you
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/books" className="flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Empty state */}
        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              No books listed yet. Be the first to sell!
            </p>
            <Button asChild>
              <Link href="/sell">List a Book</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Mobile View All button */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/books" className="flex items-center gap-2">
              View All Books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}