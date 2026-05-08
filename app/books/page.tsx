import { Suspense } from "react";
import BookFilters from "@/components/books/BookFilters";
import BooksGrid from "@/components/books/BooksGrid";
import SearchBar from "@/components/shared/SearchBar";

type SearchParams = {
  category?: string;
  condition?: string;
  maxPrice?: string;
  search?: string;
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Build query string from URL params
  // e.g. { category: "school", maxPrice: "200" } → "category=school&maxPrice=200"
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v)
    ) as Record<string, string>
  ).toString();

  // Fetch real books from backend — runs on SERVER
  let books = [];
  try {
    const response = await fetch(
      `http://localhost:5000/api/books${query ? `?${query}` : ""}`,
      // cache: "no-store" means always fetch fresh data
      // without this Next.js might cache old results
      { cache: "no-store" }
    );
    const data = await response.json();
    if (data.success) books = data.books;
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Browse Books
        </h1>
        <p className="text-muted-foreground">
          Find textbooks, notes, and notebooks at student-friendly prices
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8 max-w-xl">
        <Suspense fallback={
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3">
            <span className="text-sm text-muted-foreground">Loading search...</span>
          </div>
        }>
          <SearchBar
            redirectTo="/books"
            placeholder="Search books, subjects, authors..."
            showButton={true}
          />
        </Suspense>
      </div>

      {/* Active search indicator */}
      {params.search && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Showing results for:
          </span>
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {params.search}
          </span>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-10">

        {/* Sidebar */}
        <div className="w-56 shrink-0 hidden md:block">
          <Suspense fallback={<div>Loading filters...</div>}>
            <BookFilters />
          </Suspense>
        </div>

        {/* Books grid — now receives real books as props */}
        <div className="flex-1">
          <BooksGrid books={books} />
        </div>

      </div>
    </div>
  );
}