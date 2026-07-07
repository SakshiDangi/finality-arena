import type {
  UserId,
  MatchId,
  WalletAddress,
} from "@finality/shared";

import {
  MatchOutcome,
  PredictionSource,
} from "@finality/shared";

/* ============================================================================
 * Submit Prediction Request
 * ============================================================================
 *
 * Input accepted by the protocol adapter.
 *
 * This object is created by the UI, CLI, REST API, or AI agent before
 * entering the Finality verification pipeline.
 * ============================================================================
 */

export interface SubmitPredictionRequest {
  readonly userId: UserId;
  /**
   * Wallet submitting the prediction.
   *
   * Used for signing the prediction envelope.
   */
  readonly walletAddress: WalletAddress;

  /**
   * Match being predicted.
   */
  readonly matchId: MatchId;

  /**
   * Selected outcome.
   */
  readonly outcome: MatchOutcome;

  /**
   * Origin of the prediction.
   */
  readonly source: PredictionSource;

  /**
   * Optional client version.
   */
  readonly clientVersion?: string;

  /**
   * Optional device identifier.
   */
  readonly deviceId?: string;

  /**
   * Optional correlation id for tracing.
   */
  readonly requestId?: string;
}