import {
  leaderboardService,
} from "@/services/leaderboard.service";

import LeaderboardClient
  from "@/components/leaderboard/leaderboard-client";

/* ============================================================
 * Leaderboard Page
 * ========================================================== */

export default async function LeaderboardPage() {

  const result =
    await leaderboardService.getLeaderboard();

  if (!result.success) {

    return (

      <div className="container mx-auto py-12">

        <div className="rounded-lg border border-destructive p-6">

          <h2 className="text-lg font-semibold">

            Failed to load leaderboard

          </h2>

          <p className="mt-2 text-muted-foreground">

            {result.error}

          </p>

        </div>

      </div>

    );

  }

  return (

    <LeaderboardClient
      entries={result.data}
    />

  );

}