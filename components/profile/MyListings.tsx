import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Pencil, Trash2 } from "lucide-react";

// Type for a real book from MongoDB
type Book = {
  _id: string;
  title: string;
  subject: string;
  price: number;
  originalPrice: number;
  condition: string;
  status: string;
};

type MyListingsProps = {
  listings: Book[];
};

const conditionColor: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-yellow-100 text-yellow-700",
};

const statusColor: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  sold: "bg-gray-100 text-gray-600",
};

export default function MyListings({ listings }: MyListingsProps) {

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <BookOpen className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-muted-foreground font-medium">No listings yet</p>
        <Button asChild>
          <Link href="/sell">List Your First Book</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {listings.length} listing{listings.length !== 1 ? "s" : ""}
        </p>
        <Button size="sm" asChild>
          <Link href="/sell">+ Add New</Link>
        </Button>
      </div>

      {listings.map((book) => {
        const discount = book.originalPrice
          ? Math.round(
              ((book.originalPrice - book.price) / book.originalPrice) * 100
            )
          : 0;

        return (
          <div
            key={book._id}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
          >
            {/* Book icon */}
            <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center shrink-0">
              <BookOpen className="h-7 w-7 text-primary/30" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground text-sm truncate">
                  {book.title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    statusColor[book.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {book.status === "available" ? "Active" : "Sold"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{book.subject}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                  conditionColor[book.condition] || ""
                }`}
              >
                {book.condition}
              </span>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <p className="font-bold text-primary">₹{book.price}</p>
              {book.originalPrice > 0 && (
                <>
                  <p className="text-xs text-muted-foreground line-through">
                    ₹{book.originalPrice}
                  </p>
                  {discount > 0 && (
                    <p className="text-xs text-green-600">{discount}% off</p>
                  )}
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 shrink-0">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>

          </div>
        );
      })}
    </div>
  );
}