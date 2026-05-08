import SellForm from "@/components/sell/SellForm";
import { BookOpen, Shield, Zap } from "lucide-react";

export default function SellPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Page header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Sell Your Books
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          List your old books, notes, or notebooks in under 2 minutes and
          start earning today.
        </p>
      </div>

      {/* Quick benefits bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: <Zap className="h-5 w-5 text-primary" />, title: "Quick Listing", desc: "List in under 2 minutes" },
          { icon: <Shield className="h-5 w-5 text-primary" />, title: "Safe & Secure", desc: "Verified buyers only" },
          { icon: <BookOpen className="h-5 w-5 text-primary" />, title: "Free to List", desc: "No listing fees ever" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The form */}
      <SellForm />

    </div>
  );
}