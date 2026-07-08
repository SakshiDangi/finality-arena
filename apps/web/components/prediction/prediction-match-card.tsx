"use client";

import Image from "next/image";

import {
  Trophy,
  Radio,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  Match,
} from "@finality/shared";

import {
  MatchStatus,
} from "@finality/shared";

/* ============================================================================
 * Props
 * ========================================================================== */

export interface PredictionMatchCardProps {

  match: Match;

  className?: string;

}

/* ============================================================================
 * Team
 * ========================================================================== */

function Team({

  name,

  logo,

  align,

}: {

  name: string;

  logo?: string;

  align: "start" | "end";

}) {

  return (

    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-3 text-center",
        align === "start"
          ? "sm:items-start sm:text-left"
          : "sm:items-end sm:text-right",
      )}
    >

      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-inner shadow-black/30">

        <Image
          src={
            logo ??
            "/placeholder.svg"
          }
          alt={name}
          width={56}
          height={56}
          className="h-14 w-14 object-contain"
        />

      </div>

      <span className="max-w-[8rem] text-center text-base font-semibold text-zinc-100">

        {name}

      </span>

    </div>

  );

}

/* ============================================================================
 * Component
 * ========================================================================== */

export default function PredictionMatchCard({

  match,

  className,

}: PredictionMatchCardProps) {

  const isLive =
    match.status ===
    MatchStatus.LIVE;

  return (

    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
        className,
      )}
    >

      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">

          <Trophy className="h-4 w-4 text-amber-400" />

          <span className="text-xs text-zinc-200">

            {match.metadata.competition.name}

          </span>

        </div>

        {isLive ? (

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <Radio className="h-3 w-3" />

            {match.stage}

          </div>

        ) : (

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">

            {match.status}

          </div>

        )}

      </div>

      {/* Teams */}

      <div className="mt-8 flex items-center justify-between gap-4">

        <Team

          name={match.homeTeam.name}

          logo={match.homeTeam.logoUrl}

          align="start"

        />

        <div className="flex flex-col items-center">

          <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3">

            <span className="text-5xl font-black text-zinc-50">

              {match.score.home}

            </span>

            <span className="mx-3 text-zinc-600">

              :

            </span>

            <span className="text-5xl font-black text-zinc-50">

              {match.score.away}

            </span>

          </div>

          <span className="mt-2 text-xs uppercase tracking-widest text-zinc-500">

            Current Score

          </span>

        </div>

        <Team

          name={match.awayTeam.name}

          logo={match.awayTeam.logoUrl}

          align="end"

        />

      </div>

      {/* Footer */}

      <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-zinc-400">

        Kickoff

        <div className="mt-1 font-medium text-zinc-200">

          {new Date(
            match.timing.kickoff,
          ).toLocaleString()}

        </div>

      </div>

    </div>

  );

}