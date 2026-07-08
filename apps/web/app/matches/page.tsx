import { matchService } from "@/services/match.service";

import MatchCard from "@/components/matches/MatchCard";

export default async function MatchesPage() {

  const result =
    await matchService.getMatches();

  if (!result.success) {

    return (

      <div className="container py-20">

        Failed to load matches.

      </div>

    );

  }

  return (

    <main className="container py-12">

      <div className="grid gap-6">

        {result.data.map(match => (

          <MatchCard

            key={match.id}

            match={match}

          />

        ))}

      </div>

    </main>

  );

}