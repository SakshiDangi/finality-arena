"use client";

import type {
  LeaderboardEntry,
} from "@finality/shared";

import LeaderboardTable
  from "./leaderboard-table";

/* ============================================================
 * Props
 * ========================================================== */

interface LeaderboardClientProps {

  entries:
    readonly LeaderboardEntry[];

}

/* ============================================================
 * Component
 * ========================================================== */

export default function LeaderboardClient({
  entries,
}: LeaderboardClientProps) {

  return (

    <div className="container mx-auto py-10">

      <LeaderboardTable
        entries={entries}
      />

    </div>

  );

}