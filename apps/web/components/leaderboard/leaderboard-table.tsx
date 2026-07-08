"use client";

import type {
  LeaderboardEntry,
} from "@finality/shared";

import {
  LeaderboardTier,
} from "@finality/shared";

import {
  Trophy,
  Medal,
  Wallet,
  Target,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

interface LeaderboardTableProps {

  entries: readonly LeaderboardEntry[];

  loading?: boolean;

  className?: string;

}

function tierColor(
  tier?: LeaderboardTier,
) {

  switch (tier) {

    case LeaderboardTier.DIAMOND:
      return "text-cyan-400";

    case LeaderboardTier.PLATINUM:
      return "text-slate-300";

    case LeaderboardTier.GOLD:
      return "text-yellow-400";

    case LeaderboardTier.SILVER:
      return "text-zinc-300";

    case LeaderboardTier.BRONZE:
      return "text-orange-400";

    default:
      return "text-muted-foreground";

  }

}

function shortenWallet(
  wallet: string,
) {

  return `${wallet.slice(
    0,
    6,
  )}...${wallet.slice(-4)}`;

}

export default function LeaderboardTable({
  entries,
  loading = false,
  className,
}: LeaderboardTableProps) {

  if (loading) {

    return (

      <div
        className={cn(
          "rounded-xl border p-6 text-center",
          className,
        )}
      >

        Loading leaderboard...

      </div>

    );

  }

  if (entries.length === 0) {

    return (

      <div
        className={cn(
          "rounded-xl border p-6 text-center",
          className,
        )}
      >

        No leaderboard entries available.

      </div>

    );

  }

  return (

    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-background",
        className,
      )}
    >

      <table className="w-full">

        <thead className="border-b bg-muted/40">

          <tr>

            <th className="p-4 text-left">

              <Trophy className="inline mr-2 h-4 w-4" />

              Rank

            </th>

            <th className="p-4 text-left">

              Player

            </th>

            <th className="p-4 text-left">

              <Wallet className="inline mr-2 h-4 w-4" />

              Wallet

            </th>

            <th className="p-4 text-center">

              <Star className="inline mr-2 h-4 w-4" />

              Points

            </th>

            <th className="p-4 text-center">

              <Target className="inline mr-2 h-4 w-4" />

              Predictions

            </th>

            <th className="p-4 text-center">

              <CheckCircle2 className="inline mr-2 h-4 w-4 text-emerald-500" />

              Wins

            </th>

            <th className="p-4 text-center">

              <XCircle className="inline mr-2 h-4 w-4 text-red-500" />

              Losses

            </th>

            <th className="p-4 text-center">

              Tier

            </th>

            <th className="p-4 text-right">

              Updated

            </th>

          </tr>

        </thead>

        <tbody>

          {entries.map(

            entry => (

              <tr
                key={entry.userId}
                className="border-b last:border-0 hover:bg-muted/20"
              >

                <td className="p-4 font-bold">

                  {entry.rank <= 3 && (

                    <Medal className="mr-2 inline h-4 w-4 text-yellow-500" />

                  )}

                  #{entry.rank}

                </td>

                <td className="p-4">

                  {entry.displayName}

                </td>

                <td className="p-4 font-mono text-sm">

                  {shortenWallet(
                    entry.wallet,
                  )}

                </td>

                <td className="p-4 text-center font-bold">

                  {entry.points}

                </td>

                <td className="p-4 text-center">

                  {entry.totalPredictions}

                </td>

                <td className="p-4 text-center text-emerald-600">

                  {entry.wins}

                </td>

                <td className="p-4 text-center text-red-600">

                  {entry.losses}

                </td>

                <td
                  className={cn(
                    "p-4 text-center font-semibold capitalize",
                    tierColor(
                      entry.tier,
                    ),
                  )}
                >

                  {entry.tier ??
                    "-"}

                </td>

                <td className="p-4 text-right text-sm text-muted-foreground">

                  {new Date(
                    entry.updatedAt,
                  ).toLocaleString()}

                </td>

              </tr>

            ),
          )}

        </tbody>

      </table>

    </div>

  );

}