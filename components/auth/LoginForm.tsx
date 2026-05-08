"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  function handleChange(key: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (serverError) setServerError("");
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsLoading(true);
    setServerError("");

    try {
      // Real API call to backend
      const data = await authAPI.login(formData);

      // Save token and user to context + localStorage
      login(data.token, data.user);

      // Redirect to home page
      router.push("/");

    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Server error message */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${errors.email ? "border-red-400" : "border-border"}`}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Password <span className="text-red-500">*</span>
          </label>
          <Link href="#" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={`w-full px-4 py-2.5 pr-10 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${errors.password ? "border-red-400" : "border-border"}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </div>

      {/* Submit */}
      <Button size="lg" className="w-full mt-2" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login to BookBazaar"}
      </Button>

      {/* Divider */}
      <div className="relative my-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full" asChild>
        <Link href="/books">Continue as Guest</Link>
      </Button>

    </div>
  );
}