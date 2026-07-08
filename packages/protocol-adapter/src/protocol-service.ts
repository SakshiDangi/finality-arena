import type {
  MatchOutcome,
  Prediction,
  Settlement,
} from "@finality/shared";

import {
  predictionStore,
} from "@finality/storage";

import {
  FinalityClient,
  FinalitySubmitter,
  FinalityVerifier,
} from "@finality/finality";

import type {
  FinalityReceipt,
} from "@finality/finality";

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
 * Protocol Service
 * ============================================================================
 *
 * High-level application service responsible for coordinating:
 *
 * - Prediction creation
 * - Local persistence
 * - Finality submission
 * - Match settlement
 *
 * This class contains orchestration only.
 * ============================================================================
 */

export class ProtocolService {
  private readonly predictionEngine: PredictionEngine;

  private readonly settlementEngine: SettlementEngine;

  private readonly submitter: FinalitySubmitter;

  private readonly verifier: FinalityVerifier;

  constructor(
    client: FinalityClient,
  ) {
    this.predictionEngine =
      new PredictionEngine();

    this.settlementEngine =
      new SettlementEngine();

    this.submitter =
      new FinalitySubmitter(
        client,
      );

    this.verifier =
      new FinalityVerifier(
        client,
      );
  }

  /* ==========================================================================
   * Submit Prediction
   * ==========================================================================
   */

  async submitPrediction(
    request: SubmitPredictionRequest,
  ): Promise<SubmitPredictionResponse> {
    /* ------------------------------------------------------------------------
     * Create prediction
     * ---------------------------------------------------------------------- */

    const response =
      await this.predictionEngine.submit(
        request,
      );

    /* ------------------------------------------------------------------------
     * Persist prediction
     * ---------------------------------------------------------------------- */

    await predictionStore.save(
      response.prediction,
    );

    /* ------------------------------------------------------------------------
     * Submit to Finality
     * ---------------------------------------------------------------------- */

    const submission =
      await this.submitter.submit(
        response.prediction,
      );
    
    return {
    
      ...response,
    
      receipt:
        submission.receipt,
    
    };
  }

  /* ==========================================================================
   * Verify Submission
   * ==========================================================================
   */

  async verifySubmission(
    receipt: FinalityReceipt,
  ) {
    return this.verifier.verify(
      receipt,
    );
  }

  /* ==========================================================================
   * Resolve Prediction
   * ==========================================================================
   */

  async resolvePrediction(
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
 * Default Client
 * ============================================================================
 */

const client =
  new FinalityClient({

    endpoint:
      process.env
        .FINALITY_ENDPOINT ??
      "http://localhost:8080",

  });

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const protocolService =
  new ProtocolService(
    client,
  );