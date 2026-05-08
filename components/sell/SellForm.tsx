"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { booksAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type FormData = {
  title: string;
  subject: string;
  category: string;
  condition: string;
  price: string;
  originalPrice: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const categories = [
  { label: "Select a category", value: "" },
  { label: "School Books", value: "school" },
  { label: "College Books", value: "college" },
  { label: "Notes", value: "notes" },
  { label: "Notebooks", value: "notebooks" },
  { label: "Guides", value: "guides" },
];

const conditions = [
  { label: "Select condition", value: "" },
  { label: "New — Never used", value: "New" },
  { label: "Good — Minor wear", value: "Good" },
  { label: "Fair — Visible wear but complete", value: "Fair" },
];

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function SellForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subject: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Get auth state — we need to check if user is logged in
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  function handleChange(key: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (serverError) setServerError("");
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.condition) newErrors.condition = "Please select a condition";

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!formData.originalPrice) {
      newErrors.originalPrice = "Original MRP is required";
    } else if (isNaN(Number(formData.originalPrice)) || Number(formData.originalPrice) <= 0) {
      newErrors.originalPrice = "Enter a valid MRP";
    } else if (Number(formData.originalPrice) <= Number(formData.price)) {
      newErrors.originalPrice = "MRP must be higher than selling price";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "At least 20 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    // If not logged in redirect to login first
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      // Real API call — sends book data to backend
      // Backend uses req.user (from JWT) to set the seller
      await booksAPI.create({
        title: formData.title,
        subject: formData.subject,
        category: formData.category,
        condition: formData.condition,
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : 0,
        description: formData.description,
      });

      // Show success screen
      setIsSubmitted(true);

    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Listing Submitted!
        </h2>
        <p className="text-muted-foreground max-w-md">
          Your book{" "}
          <span className="font-semibold text-foreground">
            &ldquo;{formData.title}&rdquo;
          </span>{" "}
          has been listed successfully!
        </p>
        <div className="flex gap-3 mt-2">
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                title: "", subject: "", category: "",
                condition: "", price: "", originalPrice: "",
                description: "",
              });
            }}
          >
            List Another Book
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/books")}
          >
            Browse Books
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">

      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* Not logged in warning */}
      {!isLoggedIn && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-3 rounded-lg">
          You need to{" "}
          <span
            className="underline cursor-pointer font-medium"
            onClick={() => router.push("/login")}
          >
            login
          </span>{" "}
          to list a book.
        </div>
      )}

      {/* Book Details Section */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">
          📚 Book Details
        </h2>

        <FormField label="Book / Notes Title" error={errors.title} required>
          <input
            type="text"
            placeholder="e.g. Physics NCERT Class 12"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${
              errors.title ? "border-red-400" : "border-border"
            }`}
          />
        </FormField>

        <FormField label="Subject" error={errors.subject} required>
          <input
            type="text"
            placeholder="e.g. Mathematics, Physics"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${
              errors.subject ? "border-red-400" : "border-border"
            }`}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category" error={errors.category} required>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground outline-none transition-colors focus:border-primary ${
                errors.category ? "border-red-400" : "border-border"
              }`}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Condition" error={errors.condition} required>
            <select
              value={formData.condition}
              onChange={(e) => handleChange("condition", e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground outline-none transition-colors focus:border-primary ${
                errors.condition ? "border-red-400" : "border-border"
              }`}
            >
              {conditions.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Description" error={errors.description} required>
          <textarea
            placeholder="Describe the book condition, why you're selling..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary resize-none ${
              errors.description ? "border-red-400" : "border-border"
            }`}
          />
        </FormField>
      </div>

      {/* Pricing Section */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-foreground border-b border-border pb-3">
          💰 Pricing
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Selling Price (₹)" error={errors.price} required>
            <input
              type="number"
              placeholder="e.g. 120"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${
                errors.price ? "border-red-400" : "border-border"
              }`}
            />
          </FormField>

          <FormField label="Original MRP (₹)" error={errors.originalPrice} required>
            <input
              type="number"
              placeholder="e.g. 350"
              value={formData.originalPrice}
              onChange={(e) => handleChange("originalPrice", e.target.value)}
              className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${
                errors.originalPrice ? "border-red-400" : "border-border"
              }`}
            />
          </FormField>
        </div>

        {/* Live discount preview */}
        {formData.price &&
          formData.originalPrice &&
          Number(formData.originalPrice) > Number(formData.price) && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              <p className="text-sm text-green-700 font-medium">
                🎉 Buyers save{" "}
                {Math.round(
                  ((Number(formData.originalPrice) - Number(formData.price)) /
                    Number(formData.originalPrice)) *
                    100
                )}
                % compared to MRP!
              </p>
            </div>
          )}
      </div>

      {/* Submit Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "List My Book for Sale"}
      </Button>

    </div>
  );
}