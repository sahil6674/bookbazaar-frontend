import { BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const myPurchases = [
  { id: 2, title: "Organic Chemistry Notes", subject: "Chemistry", price: 49, condition: "New", seller: "Priya M.", purchasedDate: "March 2024" },
  { id: 6, title: "Data Structures Notebook", subject: "Computer Science", price: 89, condition: "Good", seller: "Ananya T.", purchasedDate: "February 2024" },
];

const conditionColor: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-yellow-100 text-yellow-700",
};

export default function MyPurchases() {
  if (myPurchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <BookOpen className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-muted-foreground font-medium">No purchases yet</p>
        <Button asChild>
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {myPurchases.length} purchase{myPurchases.length !== 1 ? "s" : ""}
      </p>

      {myPurchases.map((book) => (
        <div
          key={book.id}
          className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
        >
          {/* Book icon */}
          <div className="w-14 h-14 bg-primary/5 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="h-7 w-7 text-primary/30" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground">{book.subject}</p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full ${conditionColor[book.condition]}`}>
                {book.condition}
              </span>
              <span className="text-xs text-muted-foreground">
                From {book.seller}
              </span>
              <span className="text-xs text-muted-foreground">
                {book.purchasedDate}
              </span>
            </div>
          </div>

          {/* Price + Rate */}
          <div className="text-right shrink-0 flex flex-col gap-2">
            <p className="font-bold text-primary">₹{book.price}</p>
            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs h-7">
              <Star className="h-3 w-3" />
              Rate
            </Button>
          </div>

        </div>
      ))}
    </div>
  );
}