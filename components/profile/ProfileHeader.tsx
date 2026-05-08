import { User, MapPin, Star, BookOpen } from "lucide-react";

// Receives real user data as props from the page
type ProfileHeaderProps = {
  name: string;
  email: string;
  location?: string;
  joinedDate: string;
  totalListings: number;
  totalSales: number;
};

export default function ProfileHeader({
  name,
  email,
  location,
  joinedDate,
  totalListings,
  totalSales,
}: ProfileHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

        {/* Avatar */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
          <User className="h-10 w-10 text-primary" />
        </div>

        {/* User info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Member since {joinedDate}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold text-foreground">{totalListings}</span>
            </div>
            <p className="text-xs text-muted-foreground">Listings</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold text-foreground">{totalSales}</span>
            </div>
            <p className="text-xs text-muted-foreground">Sales</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold text-foreground">4.8</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </div>

      </div>
    </div>
  );
}