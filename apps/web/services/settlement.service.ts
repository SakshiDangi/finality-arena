import {
  MatchOutcome,
} from "@finality/shared";

import type {
  Prediction,
  Settlement,
} from "@finality/shared";

import {
  predictionStore,
  settlementStore,
} from "@finality/storage";

import {
  protocolService,
} from "@finality/protocol-adapter";

/* ============================================================
 * Settlement Run Result
 * ========================================================== */

export interface SettlementRunResult {

  /**
   * Successfully settled predictions.
   */
  settlements: Settlement[];

  /**
   * Number of processed predictions.
   */
  processed: number;

  /**
   * Winning outcome.
   */
  outcome: MatchOutcome;

}

/* ============================================================
 * Settlement Service
 * ============================================================
 *
 * Responsibilities
 *
 * • Determine official match outcome
 * • Load predictions for a match
 * • Resolve predictions through ProtocolService
 * • Persist settlements
 * • Provide settlement queries
 *
 * ========================================================== */

export class SettlementService {

  /* ==========================================================
   * Determine Match Outcome
   * ======================================================== */

  private determineOutcome(
    homeScore: number,
    awayScore: number,
  ): MatchOutcome {

    if (homeScore > awayScore) {

      return MatchOutcome.HOME;

    }

    if (awayScore > homeScore) {

      return MatchOutcome.AWAY;

    }

    return MatchOutcome.DRAW;

  }

  /* ==========================================================
   * Resolve Single Prediction
   * ======================================================== */

  async settlePrediction(
    prediction: Prediction,
    outcome: MatchOutcome,
  ): Promise<Settlement> {

    const settlement =
      await protocolService.resolvePrediction(
        prediction,
        outcome,
      );

    await settlementStore.save(
      settlement,
    );

    return settlement;

  }

  /* ==========================================================
   * Run Settlement For Match
   * ======================================================== */

  async runSettlement(
    matchId: string,
    homeScore: number,
    awayScore: number,
  ): Promise<SettlementRunResult> {

    const predictions =
      await predictionStore.list();

    if (!predictions.success) {

      throw new Error(
        "Unable to load predictions.",
      );

    }

    const outcome =
      this.determineOutcome(
        homeScore,
        awayScore,
      );

    const settlements: Settlement[] =
      [];

    for (const prediction of predictions.data) {

      if (
        prediction.matchId !==
        matchId
      ) {

        continue;

      }

      const settlement =
        await this.settlePrediction(
          prediction,
          outcome,
        );

      settlements.push(
        settlement,
      );

    }

    return {

      settlements,

      processed:
        settlements.length,

      outcome,

    };

  }

  /* ==========================================================
   * Settlement Lookup
   * ======================================================== */

  async getSettlement(
    id: string,
  ) {

    return settlementStore.findById(
      id,
    );

  }

  /* ==========================================================
   * List Settlements
   * ======================================================== */

  async getSettlements() {

    return settlementStore.list();

  }

  /* ==========================================================
   * Match Settlements
   * ======================================================== */

  async getMatchSettlements(
    matchId: string,
  ) {

    const result =
      await settlementStore.list();

    if (!result.success) {

      return result;

    }

    return {

      success: true,

      data:
        result.data.filter(
          settlement =>
            settlement.matchId ===
            matchId,
        ),

    };

  }

  /* ==========================================================
   * Delete Settlement
   * ======================================================== */

  async deleteSettlement(
    id: string,
  ) {

    return settlementStore.delete(
      id,
    );

  }

  /* ==========================================================
   * Reset Demo
   * ======================================================== */

  async clear() {

    return settlementStore.clear();

  }

}

/* ============================================================
 * Singleton
 * ========================================================== */

export const settlementService =
  new SettlementService();