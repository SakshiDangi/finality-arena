import type {
  LeaderboardEntry,
  Match,
  MatchId,
  Prediction,
  PredictionId,
  Settlement,
  SettlementId,
  UserId,
} from "@finality/shared";

/* ============================================================================
 * In-Memory Database
 * ============================================================================
 */

export interface InMemoryDatabase {

  /**
   * Football matches.
   */
  matches: Map<
    MatchId,
    Match
  >;

  /**
   * User predictions.
   */
  predictions: Map<
    PredictionId,
    Prediction
  >;

  /**
   * Settlements.
   */
  settlements: Map<
    SettlementId,
    Settlement
  >;

  /**
   * Leaderboard.
   */
  leaderboard: Map<
    UserId,
    LeaderboardEntry
  >;

}

/* ============================================================================
 * Singleton Database
 * ============================================================================
 */

export const database: InMemoryDatabase = {

  matches: new Map(),

  predictions: new Map(),

  settlements: new Map(),

  leaderboard: new Map(),

};