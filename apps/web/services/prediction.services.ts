import type {
  Prediction,
  MatchId,
  UserId,
  WalletAddress,
} from "@finality/shared";

import {
  MatchOutcome,
  PredictionSource,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "@finality/finality";

import {
  predictionStore,
} from "@finality/storage";

import {
  protocolService,
} from "@finality/protocol-adapter";

import type {
  SubmitPredictionRequest,
} from "@finality/protocol-adapter";

import type {
  PredictionRequest,
} from "./prediction-request";

/* ============================================================
 * Demo Identity
 * ========================================================== */

const DEMO_USER_ID: UserId =
  "demo-user";

const DEMO_WALLET: WalletAddress =
  "0x1234567890123456789012345678901234567890";

/* ============================================================
 * Prediction Submission Result
 * ========================================================== */

export interface PredictionSubmissionResult {

  /**
   * Newly created prediction.
   */
  prediction: Prediction;

  /**
   * Finality receipt.
   */
  receipt?: FinalityReceipt;

  /**
   * Signature verification.
   */
  verified: boolean;

}

/* ============================================================
 * Prediction Service
 * ========================================================== */

export class PredictionService {

  /* ==========================================================
   * Submit Prediction
   * ======================================================== */

  async submitPrediction(
    request: PredictionRequest,
  ): Promise<PredictionSubmissionResult> {

    /* --------------------------------------------------------
     * Convert score -> outcome
     * ------------------------------------------------------ */

    const outcome =
      request.homeScore >
      request.awayScore

        ? MatchOutcome.HOME

        : request.homeScore <
            request.awayScore

        ? MatchOutcome.AWAY

        : MatchOutcome.DRAW;

    /* --------------------------------------------------------
     * Build protocol request
     * ------------------------------------------------------ */

    const protocolRequest:
      SubmitPredictionRequest = {

      userId:
        DEMO_USER_ID,

      walletAddress:
        DEMO_WALLET,

      matchId:
        request.matchId,

      outcome,

      source:
        PredictionSource.WEB,

      clientVersion:
        "1.0.0",

    };

    /* --------------------------------------------------------
     * Submit to protocol
     * ------------------------------------------------------ */

    const response =
      await protocolService.submitPrediction(
        protocolRequest,
      );

    /* --------------------------------------------------------
     * Verify receipt
     * ------------------------------------------------------ */

    let verified =
      false;

    if (
      response.receipt
    ) {

      const verification =
        await protocolService.verifySubmission(
          response.receipt,
        );

      verified =
        verification.verified;

    }

    /* --------------------------------------------------------
     * Return
     * ------------------------------------------------------ */

    return {

      prediction:
        response.prediction,

      receipt:
        response.receipt,

      verified,

    };

  }

  /* ==========================================================
   * Get Prediction
   * ======================================================== */

  async getPrediction(
    id: string,
  ) {

    return predictionStore.findById(
      id,
    );

  }

  /* ==========================================================
   * List Predictions
   * ======================================================== */

  async getPredictions() {

    return predictionStore.list();

  }

  /* ==========================================================
   * Match History
   * ======================================================== */

  async getPredictionsForMatch(
    matchId: MatchId,
  ) {

    const result =
      await predictionStore.list();

    if (
      !result.success
    ) {

      return result;

    }

    return {

      success: true,

      data:
        result.data.filter(
          prediction =>
            prediction.matchId ===
            matchId,
        ),

    };

  }

  /* ==========================================================
   * Delete Prediction
   * ======================================================== */

  async deletePrediction(
    id: string,
  ) {

    return predictionStore.delete(
      id,
    );

  }

  /* ==========================================================
   * Reset Demo
   * ======================================================== */

  async clear() {

    return predictionStore.clear();

  }

}

/* ============================================================
 * Singleton
 * ========================================================== */

export const predictionService =
  new PredictionService();