import type {
  Prediction,
} from "@finality/shared";

/**
 * ============================================================================
 * Protocol Payload
 * ============================================================================
 *
 * Canonical payload passed into the Finality protocol.
 *
 * This payload is deterministic and contains only the business data that
 * participates in hashing and signing.
 * ============================================================================
 */

export interface ProtocolPayload {

  /**
   * Prediction identifier.
   */
  readonly predictionId: string;

  /**
   * Match identifier.
   */
  readonly matchId: string;

  /**
   * Wallet submitting the prediction.
   */
  readonly wallet: string;

  /**
   * Selected match outcome.
   */
  readonly outcome: string;

  /**
   * Creation timestamp.
   */
  readonly createdAt: string;

  /**
   * Prediction source.
   */
  readonly source: string;

}

/**
 * ============================================================================
 * Prediction Mapper
 * ============================================================================
 */

export class PredictionMapper {

  /**
   * Convert a football prediction into a canonical protocol payload.
   */
  static toProtocolPayload(
    prediction: Prediction,
  ): ProtocolPayload {

    return {

      predictionId: prediction.id,

      matchId: prediction.matchId,

      wallet: prediction.player.wallet,

      outcome: prediction.outcome,

      createdAt: prediction.metadata.createdAt,

      source: prediction.metadata.source,

    };

  }

}