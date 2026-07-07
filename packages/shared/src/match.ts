import type {
  ISO8601String,
  LeagueId,
  MatchId,
  TeamId,
} from "./types.js";

/* =============================================================================
 * Match Status
 * ========================================================================== */

export enum MatchStatus {
  SCHEDULED = "scheduled",

  LIVE = "live",

  FINISHED = "finished",

  CANCELLED = "cancelled",
}

/* =============================================================================
 * Match Stage
 * ========================================================================== */

export enum MatchStage {
  PRE_MATCH = "pre-match",

  FIRST_HALF = "first-half",

  HALF_TIME = "half-time",

  SECOND_HALF = "second-half",

  EXTRA_TIME = "extra-time",

  PENALTIES = "penalties",

  FULL_TIME = "full-time",
}

/* =============================================================================
 * Match Outcome
 * ========================================================================== */

export enum MatchOutcome {
  HOME = "home",

  DRAW = "draw",

  AWAY = "away",
}

/* =============================================================================
 * Team
 * ========================================================================== */

export interface Team {

  id: TeamId;

  name: string;

  shortName: string;

  country: string;

  logoUrl?: string;

}

/* =============================================================================
 * Venue
 * ========================================================================== */

export interface Venue {

  name: string;

  city: string;

  country: string;

  capacity?: number;

}

/* =============================================================================
 * Competition
 * ========================================================================== */

export interface Competition {

  id: LeagueId;

  name: string;

  season: string;

  round?: string;

}

/* =============================================================================
 * Score
 * ========================================================================== */

export interface Score {

  readonly home: number;
  
  readonly away: number;

}

/* =============================================================================
 * Officials
 * ========================================================================== */

export interface MatchOfficials {

  referee?: string;

  assistantReferees?: string[];

  fourthOfficial?: string;

  varAvailable: boolean;

}

/* =============================================================================
 * Match Timing
 * ========================================================================== */

export interface MatchTiming {

  kickoff: ISO8601String;

  startedAt?: ISO8601String;

  endedAt?: ISO8601String;

}

/* =============================================================================
 * Match Metadata
 * ========================================================================== */

export interface MatchMetadata {

  venue: Venue;

  competition: Competition;

  officials?: MatchOfficials;

}

/* =============================================================================
 * Main Match
 * ========================================================================== */

export interface Match {

  id: MatchId;

  homeTeam: Team;

  awayTeam: Team;

  score: Score;

  status: MatchStatus;

  stage: MatchStage;

  outcome?: MatchOutcome;

  timing: MatchTiming;

  metadata: MatchMetadata;
}