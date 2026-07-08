import type {
  ISO8601String,
  UserId,
  WalletAddress,
} from "./types.js";

/* =============================================================================
 * Leaderboard Tier
 * ========================================================================== */

export enum LeaderboardTier {
  BRONZE = "bronze",

  SILVER = "silver",

  GOLD = "gold",

  PLATINUM = "platinum",

  DIAMOND = "diamond",
}

/* =============================================================================
 * Leaderboard Entry
 * ========================================================================== */

export interface LeaderboardEntry {

  /**
   * User identifier.
   */
  readonly userId: UserId;

  /**
   * Wallet associated with the player.
   */
  readonly wallet: WalletAddress;

  /**
   * Display name shown in the UI.
   */
  readonly displayName: string;

  /**
   * Total accumulated points.
   */
  readonly points: number;

  /**
   * Number of settled predictions.
   */
  readonly totalPredictions: number;

  /**
   * Number of winning predictions.
   */
  readonly wins: number;

  /**
   * Number of incorrect predictions.
   */
  readonly losses: number;

  /**
   * Current leaderboard position.
   *
   * This is recalculated whenever the
   * leaderboard is refreshed.
   */
  readonly rank: number;

  /**
   * Optional achievement tier.
   */
  readonly tier?: LeaderboardTier;

  /**
   * Last update timestamp.
   */
  readonly updatedAt: ISO8601String;
}