import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ArrowLeft,
  User,
  Tag,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const conditionColor: Record<string, string> = {
  New: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-yellow-100 text-yellow-700",
};

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch real book from backend
  let book = null;
  try {
    const response = await fetch(
      `http://localhost:5000/api/books/${id}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    if (data.success) book = data.book;
  } catch (error) {
    console.error("Failed to fetch book:", error);
  }

  // Book not found
  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Book Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          This listing may have been removed.
        </p>
        <Button asChild>
          <Link href="/books">Browse Other Books</Link>
        </Button>
      </div>
    );
  }

  const discount =
    book.originalPrice > 0
      ? Math.round(
          ((book.originalPrice - book.price) / book.originalPrice) * 100
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back button */}
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Browse
      </Link>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── LEFT: Book Image ── */}
        <div className="flex flex-col gap-4">
          <div className="w-full aspect-square bg-primary/5 rounded-2xl flex items-center justify-center border border-border">
            <BookOpen className="h-32 w-32 text-primary/20" />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                conditionColor[book.condition] || "bg-gray-100 text-gray-600"
              }`}
            >
              {book.condition} Condition
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground capitalize">
              {book.category}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Book Info ── */}
        <div className="flex flex-col gap-6">

          {/* Title & subject */}
          <div>
            <p className="text-sm text-primary font-medium mb-1">
              {book.subject}
            </p>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              {book.title}
            </h1>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-primary">
              ₹{book.price}
            </span>
            {book.originalPrice > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through mb-1">
                  ₹{book.originalPrice}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-semibold text-green-600 mb-1">
                    {discount}% off
                  </span>
                )}
              </>
            )}
          </div>

          {/* Description */}
          <div className="bg-muted/30 rounded-xl p-4 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              About this listing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Book details grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: <Tag className="h-4 w-4" />,
                label: "Subject",
                value: book.subject,
              },
              {
                icon: <CheckCircle className="h-4 w-4" />,
                label: "Condition",
                value: book.condition,
              },
              {
                icon: <BookOpen className="h-4 w-4" />,
                label: "Category",
                value: book.category,
              },
              {
                icon: <User className="h-4 w-4" />,
                label: "Location",
                value: book.seller?.location || "Not specified",
              },
            ].map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-2 bg-muted/20 rounded-lg p-3"
              >
                <span className="text-primary">{detail.icon}</span>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Seller info */}
          <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl border border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Listed by</p>
              <p className="text-sm font-semibold text-foreground">
                {book.seller?.name || "Unknown"}
              </p>
              <p className="text-xs text-muted-foreground">
                {book.seller?.location || ""}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Contact
            </Button>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1">
              Buy Now — ₹{book.price}
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              Add to Wishlist
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}