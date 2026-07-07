import type {
  MatchOutcome,
  Prediction,
  Settlement,
} from "@finality/shared";

import {
  PredictionEngine,
} from "./prediction-engine.js";

import {
  SettlementEngine,
} from "./settlement-engine.js";

import type {
  SubmitPredictionRequest,
} from "./submit-request.js";

import type {
  SubmitPredictionResponse,
} from "./submit-response.js";

/* ============================================================================
 * Protocol Engine
 * ============================================================================
 *
 * High-level orchestration for the Finality Arena protocol.
 *
 * Coordinates:
 *
 *  - Prediction creation
 *  - Validation
 *  - Finality submission
 *  - Match settlement
 *
 * ============================================================================
 */

export class ProtocolEngine {
  readonly predictionEngine =
    new PredictionEngine();

  readonly settlementEngine =
    new SettlementEngine();

  /* ==========================================================================
   * Submit Prediction
   * ==========================================================================
   */

  async submitPrediction(
    request: SubmitPredictionRequest,
  ): Promise<SubmitPredictionResponse> {
    return this.predictionEngine.submit(
      request,
    );
  }

  /* ==========================================================================
   * Settle Prediction
   * ==========================================================================
   */

  async settlePrediction(
    prediction: Prediction,
    actualOutcome: MatchOutcome,
  ): Promise<Settlement> {
    return this.settlementEngine.settle(
      prediction,
      actualOutcome,
    );
  }
}

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const protocolEngine =
  new ProtocolEngine();