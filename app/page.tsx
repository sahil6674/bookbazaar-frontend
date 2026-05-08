import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedBooks from "@/components/home/FeaturedBooks";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <StatsBar/>
      <HowItWorks />
      <FeaturedBooks />
    </>
  );
}