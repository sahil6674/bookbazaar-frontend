import Link from "next/link";
import { BookOpen, Code2, Send, Camera } from "lucide-react";

// Footer link groups
const footerLinks = [
  {
    heading: "Marketplace",
    links: [
      { label: "Browse Books", href: "/books" },
      { label: "Sell a Book", href: "/sell" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Categories",
    links: [
      { label: "School Books", href: "/books?category=school" },
      { label: "College Books", href: "/books?category=college" },
      { label: "Notes & Notebooks", href: "/books?category=notes" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Profile", href: "/profile" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top section: Logo + Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">BookBazaar</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A student-first marketplace to buy and sell books, notes, and
              notebooks at prices that make sense.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Code2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-foreground">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BookBazaar. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}