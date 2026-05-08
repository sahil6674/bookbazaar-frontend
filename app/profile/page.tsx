"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import MyListings from "@/components/profile/MyListings";
import MyPurchases from "@/components/profile/MyPurchases";
import ProfileSettings from "@/components/profile/ProfileSettings";
import { userAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type UserProfile = {
  name: string;
  email: string;
  location?: string;
  phone: string;
  createdAt: string;
};

type Book = {
  _id: string;
  title: string;
  subject: string;
  price: number;
  originalPrice: number;
  condition: string;
  status: string;
};

export default function ProfilePage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  // State for profile data
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [listings, setListings] = useState<Book[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  // Fetch profile + listings when page loads
  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchData() {
      try {
        // Fetch both at the same time using Promise.all
        // Instead of waiting for one then the other
        const [profileData, listingsData] = await Promise.all([
          userAPI.getProfile(),
          userAPI.getMyListings(),
        ]);

        setProfile(profileData.user);
        setListings(listingsData.listings);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, [isLoggedIn]);

  // Show loading while checking auth or fetching data
  if (isLoading || isFetching) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  // If no profile loaded
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Could not load profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Profile header with real data */}
      <div className="mb-8">
        <ProfileHeader
          name={profile.name}
          email={profile.email}
          location={profile.location}
          joinedDate={new Date(profile.createdAt).toLocaleDateString(
            "en-IN",
            { month: "long", year: "numeric" }
          )}
          totalListings={listings.length}
          totalSales={listings.filter((b) => b.status === "sold").length}
        />
      </div>

      {/* Tabs with real data */}
      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="listings">
          {/* Pass real listings */}
          <MyListings listings={listings} />
        </TabsContent>

        <TabsContent value="purchases">
          {/* Purchases from profile data */}
          <MyPurchases />
        </TabsContent>

        <TabsContent value="settings">
          {/* Pass real user data to settings */}
          <ProfileSettings
            name={profile.name}
            location={profile.location || ""}
            phone={profile.phone}
          />
        </TabsContent>
      </Tabs>

    </div>
  );
}