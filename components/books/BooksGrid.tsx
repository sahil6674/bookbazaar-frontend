import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

// TypeScript type for a book from MongoDB
type Book = {
  _id: string;           // MongoDB uses _id not id
  title: string;
  subject: string;
  price: number;
  originalPrice: number;
  condition: string;
  seller: {
    name: string;
    location: string;
  };
  category: string;
};

// Books come as props from the page
// No more hardcoded dummy data in this file!
type BooksGridProps = {
  books: Book[];
};

const conditionColor: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-yellow-100 text-yellow-700",
};

export default function BooksGrid({ books }: BooksGridProps) {

  // Empty state
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <BookOpen className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-muted-foreground text-lg font-medium">
          No books found
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {books.map((book) => {
        const discount = book.originalPrice
          ? Math.round(
              ((book.originalPrice - book.price) / book.originalPrice) * 100
            )
          : 0;

        return (
          <div
            key={book._id}
            className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
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
              {/* seller is now an object from populate() */}
              <p className="text-xs text-muted-foreground">
                {book.subject} • by {book.seller?.name || "Unknown"}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-lg font-bold text-primary">
                  ₹{book.price}
                </p>
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
              {/* Use _id for MongoDB documents */}
              <Button size="sm" asChild>
                <Link href={`/books/${book._id}`}>View</Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}