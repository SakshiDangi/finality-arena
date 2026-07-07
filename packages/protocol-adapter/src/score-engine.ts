import {
  SettlementResult,
} from "@finality/shared";

/* ============================================================================
 * Score Engine
 * ============================================================================
 *
 * Responsible for calculating rewards after settlement.
 * ============================================================================
 */

export class ScoreEngine {
  /**
   * Calculate points for a settlement.
   */
  calculatePoints(
    result: SettlementResult,
  ): number {
    switch (result) {
      case SettlementResult.WIN:
        return 3;

      case SettlementResult.DRAW:
        return 1;

      case SettlementResult.LOSS:
        return 0;

      case SettlementResult.VOID:
        return 0;

      default:
        return 0;
    }
  }

  /**
   * Determine whether the prediction earned points.
   */
  isWinner(
    result: SettlementResult,
  ): boolean {
    return result === SettlementResult.WIN;
  }
}

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const scoreEngine =
  new ScoreEngine();