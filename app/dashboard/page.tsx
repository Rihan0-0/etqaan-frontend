import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import InfoCards from "@/components/InfoCards";
import RandomStars from "@/components/RandomStars";

export default function Dashboard() {
  return (
    <div className="bg-orange-50 min-h-screen relative overflow-hidden">
      <RandomStars count={60} />

      <div className="relative z-10">
        <Header />
        <main className="p-6 max-w-5xl mx-auto">
          <WelcomeCard />
          <InfoCards />
        </main>
      </div>
    </div>
  );
}
