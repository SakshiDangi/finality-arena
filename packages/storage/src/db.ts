import type {
  Match,
  MatchId,
  Prediction,
  PredictionId,
  Settlement,
  SettlementId,
} from "@finality/shared";

/* ============================================================================
 * Database
 * ============================================================================
 */

export class InMemoryDatabase {
  /**
   * Matches
   */
  readonly matches = new Map<
    MatchId,
    Match
  >();

  /**
   * Predictions
   */
  readonly predictions = new Map<
    PredictionId,
    Prediction
  >();

  /**
   * Settlements
   */
  readonly settlements = new Map<
    SettlementId,
    Settlement
  >();

  /* ==========================================================================
   * Reset
   * ==========================================================================
   */

  clear(): void {
    this.matches.clear();

    this.predictions.clear();

    this.settlements.clear();
  }
}

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const database =
  new InMemoryDatabase();