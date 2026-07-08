import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LiveMatches } from "@/components/landing/live-matches";
import { Leaderboard } from "@/components/landing/leaderboard";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />

        <Features />

        <HowItWorks />

        {/* Must contain Predict buttons */}
        <LiveMatches />

        {/* Preview only */}
        <Leaderboard />

        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}



// import { Navbar } from '@/components/landing/navbar'
// import { Hero } from '@/components/landing/hero'
// import { Features } from '@/components/landing/features'
// import { HowItWorks } from '@/components/landing/how-it-works'
// import { LiveMatches } from '@/components/landing/live-matches'
// import { Leaderboard } from '@/components/landing/leaderboard'
// import { FinalCta } from '@/components/landing/final-cta'
// import { Footer } from '@/components/landing/footer'

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main>
//         <Hero />
//         <Features />
//         <HowItWorks />
//         <LiveMatches />
//         <Leaderboard />
//         <FinalCta />
//       </main>
//       <Footer />
//     </div>
//   )
// }
