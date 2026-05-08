"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  // Where to navigate after search
  // Home page → "/books", Browse page → "/books"
  redirectTo?: string;
  // Placeholder text
  placeholder?: string;
  // Show button or search on type
  showButton?: boolean;
};

export default function SearchBar({
  redirectTo = "/books",
  placeholder = "Search books, subjects, authors...",
  showButton = true,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize with current search param if exists
  // So when user is on /books?search=Physics
  // the input shows "Physics"
  const [query, setQuery] = useState(
    searchParams.get("search") || ""
  );

  function handleSearch() {
    if (!query.trim()) {
      // If empty search go to base URL
      router.push(redirectTo);
      return;
    }

    // Build URL with search param
    // Preserve existing params like category, condition
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", query.trim());

    router.push(`${redirectTo}?${params.toString()}`);
  }

  // Allow searching by pressing Enter key
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 shadow-sm">
      <Search className="h-5 w-5 text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
      />
      {/* Clear button — shows when there's text */}
      {query && (
        <button
          onClick={() => {
            setQuery("");
            router.push(redirectTo);
          }}
          className="text-muted-foreground hover:text-foreground text-xs px-2"
        >
          ✕
        </button>
      )}
      {showButton && (
        <Button size="sm" onClick={handleSearch}>
          Search
        </Button>
      )}
    </div>
  );
}