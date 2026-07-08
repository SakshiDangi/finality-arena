import {
  PredictionStatus,
} from "@finality/shared";

import type {
  Player,
  Prediction,
} from "@finality/shared";

import type {
  SubmitPredictionRequest,
} from "./submit-request.js";

import type {
  PredictionEngineResult,
} from "./prediction-result.js";

import {
  assertValidPredictionRequest,
} from "./validation.js";

/* ============================================================================
 * Prediction Engine
 * ============================================================================
 * Responsible for:
 * - validating incoming requests
 * - constructing Prediction objects
 * - preparing submissions for Finality
 * ============================================================================
 */

export class PredictionEngine {
  async submit(
    request: SubmitPredictionRequest,
  ): Promise<PredictionEngineResult> {

    /* ------------------------------------------------------------------------
     * Validate request
     * ---------------------------------------------------------------------- */

    assertValidPredictionRequest(request);

    /* ------------------------------------------------------------------------
     * Generate identifiers
     * ---------------------------------------------------------------------- */

    const predictionId = crypto.randomUUID();

    const envelopeId = crypto.randomUUID();

    /* ------------------------------------------------------------------------
     * Create player
     * ---------------------------------------------------------------------- */

    const player: Player = {
      id: crypto.randomUUID(),
      wallet: request.walletAddress,
    };

    /* ------------------------------------------------------------------------
     * Create prediction
     * ---------------------------------------------------------------------- */

    const prediction: Prediction = {
      id: predictionId,

      player,

      matchId: request.matchId,

      outcome: request.outcome,

      status: PredictionStatus.CREATED,

      metadata: {
        createdAt: new Date().toISOString(),
        source: request.source,
        client: request.clientVersion,
      },
    };

    /* ------------------------------------------------------------------------
     * TODO:
     * Submit prediction to Finality.
     *
     * This will later become:
     *
     * const receipt = await finality.submit(prediction);
     * ---------------------------------------------------------------------- */

    return {
      accepted: true,

      envelopeId,

      prediction,

      digest: "",

      message: "Prediction created successfully.",
    };
  }
}