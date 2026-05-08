import Link from "next/link";
import { BookOpen } from "lucide-react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkHref: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  subtitle,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  children,
}: AuthCardProps) {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12 bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">BookBazaar</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* Form content passed as children */}
          {children}

        </div>

        {/* Bottom link */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {bottomText}{" "}
          <Link
            href={bottomLinkHref}
            className="text-primary font-medium hover:underline"
          >
            {bottomLinkText}
          </Link>
        </p>

      </div>
    </div>
  );
}