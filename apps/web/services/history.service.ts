import type {
  MatchId,
  Prediction,
  PredictionId,
  UserId,
} from "@finality/shared";

import {
  predictionStore,
} from "@finality/storage";

import {
  PredictionStatus,
} from "@finality/shared";

/* ============================================================
 * History Service
 * ============================================================
 *
 * Read-only service responsible for retrieving
 * prediction history for the frontend.
 *
 * This service never:
 *
 * - creates predictions
 * - signs predictions
 * - settles predictions
 * - communicates with Finality
 * ========================================================== */

export class HistoryService {

  /* ==========================================================
   * List All Predictions
   * ======================================================== */

  async getHistory() {
    return predictionStore.list();
  }

  /* ==========================================================
   * Find Prediction
   * ======================================================== */

  async getPrediction(
    id: PredictionId,
  ) {
    return predictionStore.findById(id);
  }

  /* ==========================================================
   * Match History
   * ======================================================== */

  async getMatchHistory(
    matchId: MatchId,
  ) {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,

      data: result.data.filter(
        prediction =>
          prediction.matchId ===
          matchId,
      ),
    };
  }

  /* ==========================================================
   * User History
   * ======================================================== */

  async getUserHistory(
    userId: UserId,
  ) {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,

      data: result.data.filter(
        prediction =>
          prediction.player.id ===
          userId,
      ),
    };
  }

  /* ==========================================================
   * Status Filter
   * ======================================================== */

  async getPredictionsByStatus(
    status: Prediction["status"],
  ) {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,

      data: result.data.filter(
        prediction =>
          prediction.status ===
          status,
      ),
    };
  }

  /* ==========================================================
   * Signed Predictions
   * ======================================================== */

  async getSignedPredictions() {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,

      data: result.data.filter(
        prediction =>
          prediction.signature !==
          undefined,
      ),
    };
  }

  /* ==========================================================
   * Verified Predictions
   * ======================================================== */

  async getVerifiedPredictions() {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,

      data: result.data.filter(
        prediction =>
          prediction.status ===
          "verified",
      ),
    };
  }

  /* ==========================================================
   * Latest Predictions
   * ======================================================== */

  async getLatestPredictions(
    limit = 10,
  ) {

    const result =
      await predictionStore.list();

    if (!result.success) {
      return result;
    }

    const predictions =
      [...result.data].sort(
        (a, b) =>
          new Date(
            b.metadata.createdAt,
          ).getTime() -
          new Date(
            a.metadata.createdAt,
          ).getTime(),
      );

    return {
      success: true,

      data:
        predictions.slice(
          0,
          limit,
        ),
    };
  }

}

export const historyService =
  new HistoryService();