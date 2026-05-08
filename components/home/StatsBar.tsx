// Define the TypeScript type for a single stat's props
type StatItemProps = {
  value: string;
  label: string;
};

// Small reusable component for each stat
function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-2xl sm:text-3xl font-bold text-primary">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 
          grid-cols-2 on mobile (2 columns)
          grid-cols-4 on medium+ screens (4 columns)
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value="10,000+" label="Books Listed" />
          <StatItem value="5,000+" label="Happy Students" />
          <StatItem value="₹49" label="Starting Price" />
          <StatItem value="4.8★" label="Average Rating" />
        </div>

      </div>
    </section>
  );
}