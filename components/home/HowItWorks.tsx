import { Search, ShoppingBag, BookMarked } from "lucide-react";

// TypeScript type for each step's props
type StepProps = {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
};

function StepCard({ icon, step, title, description }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-6">
      {/* Step number + icon */}
      <div className="relative">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
        {/* Small number badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
          {step}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
    </div>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-7 w-7 text-primary" />,
      title: "Search & Browse",
      description:
        "Search for your required books, notes, or notebooks. Filter by subject, class, condition, or price.",
    },
    {
      icon: <ShoppingBag className="h-7 w-7 text-primary" />,
      title: "Buy or List",
      description:
        "Buy directly from fellow students or list your own old books and notes to earn money.",
    },
    {
      icon: <BookMarked className="h-7 w-7 text-primary" />,
      title: "Learn & Save",
      description:
        "Save up to 70% compared to buying new. Every rupee saved is a rupee earned.",
    },
  ];

  return (
    // id="how-it-works" lets the Navbar's anchor link scroll here
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            BookBazaar makes it simple for anyone to buy or sell books in just a few steps.
          </p>
        </div>

        {/* Steps grid — connector line visible on desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Horizontal connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-border z-0" />

          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}