import { randomUUID } from "node:crypto";

import {
  SettlementResult,
  SettlementStatus,
  type MatchOutcome,
  type Prediction,
  type Settlement,
} from "@finality/shared";

import {
  settlementStore,
} from "@finality/storage";

import {
  scoreEngine,
} from "./score-engine.js";

/* ============================================================================
 * Settlement Engine
 * ============================================================================
 *
 * Responsible for:
 *  - Comparing a prediction with the actual match outcome.
 *  - Creating the settlement.
 *  - Calculating rewards.
 *  - Persisting the settlement.
 * ============================================================================
 */

export class SettlementEngine {
  /**
   * Resolve a prediction.
   */
  async settle(
    prediction: Prediction,
    actualOutcome: MatchOutcome,
  ): Promise<Settlement> {
    /* ------------------------------------------------------------------------
     * Determine settlement result
     * ---------------------------------------------------------------------- */

    const result =
      prediction.outcome === actualOutcome
        ? SettlementResult.WIN
        : SettlementResult.LOSS;

    /* ------------------------------------------------------------------------
     * Calculate rewards
     * ---------------------------------------------------------------------- */

    const points =
      scoreEngine.calculatePoints(
        result,
      );

    /* ------------------------------------------------------------------------
     * Create settlement
     * ---------------------------------------------------------------------- */

    const settlement: Settlement = {
      id: randomUUID(),

      predictionId: prediction.id,

      matchId: prediction.matchId,

      actualOutcome,

      result,

      status: SettlementStatus.COMPLETED,

      reward: {
        points,
      },

      metadata: {
        createdAt: new Date().toISOString(),

        settledAt: new Date().toISOString(),

        reason:
          result === SettlementResult.WIN
            ? "Prediction matched the final result."
            : "Prediction did not match the final result.",
      },
    };

    /* ------------------------------------------------------------------------
     * Persist settlement
     * ---------------------------------------------------------------------- */

    await settlementStore.save(
      settlement,
    );

    return settlement;
  }
}

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const settlementEngine =
  new SettlementEngine();