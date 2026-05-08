"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Categories list
const categories = [
  { label: "All", value: "" },
  { label: "School Books", value: "school" },
  { label: "College Books", value: "college" },
  { label: "Notes", value: "notes" },
  { label: "Notebooks", value: "notebooks" },
  { label: "Guides", value: "guides" },
];

const conditions = [
  { label: "Any Condition", value: "" },
  { label: "New", value: "new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
];

export default function BookFilters() {
  // useRouter lets us navigate programmatically
  const router = useRouter();
  // useSearchParams reads current URL params
  const searchParams = useSearchParams();
  // usePathname gives us the current path (/books)
  const pathname = usePathname();

  // Read current filter values from URL
  const currentCategory = searchParams.get("category") || "";
  const currentCondition = searchParams.get("condition") || "";

  // This function updates the URL when user clicks a filter
  function updateFilter(key: string, value: string) {
    // Copy all existing params
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      // Remove param if empty (e.g. "All" selected)
      params.delete(key);
    }

    // Navigate to new URL with updated filters
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="flex flex-col gap-8">

      {/* Category Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-foreground">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => updateFilter("category", cat.value)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                currentCategory === cat.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-foreground">Condition</h3>
        <div className="flex flex-col gap-2">
          {conditions.map((cond) => (
            <button
              key={cond.value}
              onClick={() => updateFilter("condition", cond.value)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                currentCondition === cond.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-foreground">Max Price</h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "Any Price", value: "" },
            { label: "Under ₹100", value: "100" },
            { label: "Under ₹250", value: "250" },
            { label: "Under ₹500", value: "500" },
          ].map((price) => (
            <button
              key={price.value}
              onClick={() => updateFilter("maxPrice", price.value)}
              className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                (searchParams.get("maxPrice") || "") === price.value
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {price.label}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}