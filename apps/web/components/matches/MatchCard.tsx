"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Trophy,
  Clock,
  Radio,
  CheckCircle2,
  TrendingUp,
  XCircle,
} from "lucide-react";

import {
  MatchStatus,
} from "@finality/shared";

import type {
  Match,
} from "@finality/shared";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface MatchCardProps {
  match: Match;
}

const statusConfig = {
  [MatchStatus.SCHEDULED]: {
    label: "Upcoming",
    icon: Clock,
    className:
      "border-sky-400/30 bg-sky-400/10 text-sky-300",
    dot: "bg-sky-400",
  },

  [MatchStatus.LIVE]: {
    label: "Live",
    icon: Radio,
    className:
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400 animate-pulse",
  },

  [MatchStatus.FINISHED]: {
    label: "Finished",
    icon: CheckCircle2,
    className:
      "border-zinc-400/20 bg-zinc-400/10 text-zinc-300",
    dot: "bg-zinc-500",
  },

  [MatchStatus.CANCELLED]: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "border-red-400/30 bg-red-400/10 text-red-300",
    dot: "bg-red-500",
  },
} satisfies Record<
  MatchStatus,
  {
    label: string;
    icon: typeof Clock;
    className: string;
    dot: string;
  }
>;

function TeamColumn({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner shadow-black/20 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={logo ?? "/placeholder.svg"}
          alt={name}
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      </div>

      <span className="line-clamp-2 text-sm font-semibold leading-tight text-zinc-100">
        {name}
      </span>
    </div>
  );
}

export default function MatchCard({
  match,
}: MatchCardProps) {
  const homeTeam =
    match.homeTeam.name;

  const awayTeam =
    match.awayTeam.name;

  const homeLogo =
    match.homeTeam.logoUrl;

  const awayLogo =
    match.awayTeam.logoUrl;

  const league =
    match.metadata.competition.name;

  const kickoff =
    new Date(
      match.timing.kickoff,
    ).toLocaleString();

  const status =
    match.status;

  const {
    label,
    icon: StatusIcon,
    className,
    dot,
  } = statusConfig[status];

  const score =
    status === MatchStatus.SCHEDULED
      ? "VS"
      : `${match.score.home} - ${match.score.away}`;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-emerald-500/10">
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />

          <span className="text-xs font-medium text-zinc-200">
            {league}
          </span>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            className,
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              dot,
            )}
          />

          <StatusIcon className="h-3 w-3" />

          {label}
        </div>
      </div>

      {/* Teams */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <TeamColumn
          name={homeTeam}
          logo={homeLogo}
        />

        <div className="flex flex-col items-center gap-2 px-3">
          <span className="text-center text-xs font-medium uppercase tracking-widest text-zinc-500">
            {kickoff}
          </span>

          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-lg font-bold text-white">
            {score}
          </div>
        </div>

        <TeamColumn
          name={awayTeam}
          logo={awayLogo}
        />
      </div>

      {/* Footer */}
      <Link
        href={`/predict/${match.id}`}
        className="block"
      >
        <Button
          className="mt-6 w-full gap-2 bg-emerald-500 font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
          disabled={
            status === MatchStatus.FINISHED ||
            status === MatchStatus.CANCELLED
          }
        >
          <TrendingUp className="h-4 w-4" />

          {status === MatchStatus.FINISHED
            ? "View Result"
            : status === MatchStatus.CANCELLED
              ? "Cancelled"
              : "Predict"}
        </Button>
      </Link>
    </div>
  );
}