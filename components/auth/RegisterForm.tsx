"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setIsLoading(true);
    setServerError("");

    try {
      const data = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      // Save token and user
      login(data.token, data.user);

      // Redirect to home
      router.push("/");

    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {serverError}
        </div>
      )}

      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Manjeet Singh"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${errors.name ? "border-red-400" : "border-border"}`}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
      </div>

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

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="10-digit number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${errors.phone ? "border-red-400" : "border-border"}`}
        />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Minimum 6 characters"
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className={`w-full px-4 py-2.5 pr-10 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary ${errors.confirmPassword ? "border-red-400" : "border-border"}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Terms */}
      <p className="text-xs text-muted-foreground">
        By registering you agree to our{" "}
        <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
        {" "}and{" "}
        <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
      </p>

      {/* Submit */}
      <Button size="lg" className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create My Account"}
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