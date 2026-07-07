import type { MatchOutcome } from "./match.js";

import type {
  ISO8601String,
  MatchId,
  Money,
  SettlementId,
  PredictionId
} from "./types.js";

/* =============================================================================
 * Settlement Status
 * ========================================================================== */

export enum SettlementStatus {
  PENDING = "pending",

  PROCESSING = "processing",

  COMPLETED = "completed",

  FAILED = "failed",
}

/* =============================================================================
 * Settlement Result
 * ========================================================================== */

export enum SettlementResult {
  WIN = "win",

  LOSS = "loss",

  DRAW = "draw",

  VOID = "void",
}

/* =============================================================================
 * Reward
 * ========================================================================== */

export interface Reward {
  /**
   * Score awarded to the player.
   */
  points: number;

  /**
   * Optional monetary reward.
   */
  payout?: Money;

  /**
   * Optional prize description.
   */
  prize?: string;
}

/* =============================================================================
 * Settlement Metadata
 * ========================================================================== */

export interface SettlementMetadata {
  /**
   * Settlement creation time.
   */
  createdAt: ISO8601String;

  /**
   * Settlement completion time.
   */
  settledAt?: ISO8601String;

  /**
   * Human-readable explanation.
   */
  reason?: string;
}

/* =============================================================================
 * Settlement
 * ========================================================================== */

export interface Settlement {

  id: SettlementId;

  predictionId: PredictionId;

  matchId: MatchId;

  actualOutcome: MatchOutcome;

  result: SettlementResult;

  status: SettlementStatus;

  reward?: Reward;

  metadata: SettlementMetadata;
}