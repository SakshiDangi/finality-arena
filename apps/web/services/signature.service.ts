import type {
  Prediction,
  PredictionSignature,
} from "@finality/shared";

import type {
  FinalityReceipt,
  FinalityVerificationResult,
} from "@finality/finality";

import {
  protocolService,
} from "@finality/protocol-adapter";

/* ============================================================================
 * Signature Verification Result
 * ============================================================================
 */

export interface SignatureVerificationResult {

  /**
   * Overall verification status.
   */
  readonly verified: boolean;

  /**
   * Prediction signature.
   */
  readonly signature?: PredictionSignature;

  /**
   * Finality receipt.
   */
  readonly receipt?: FinalityReceipt;

  /**
   * Failure reason.
   */
  readonly reason?: string;

}

/* ============================================================================
 * Signature Service
 * ============================================================================
 */

export class SignatureService {

  /* ==========================================================================
   * Get Prediction Signature
   * ==========================================================================
   */

  getSignature(
    prediction: Prediction,
  ): PredictionSignature | undefined {

    return prediction.signature;

  }

  /* ==========================================================================
   * Check Signature
   * ==========================================================================
   */

  hasSignature(
    prediction: Prediction,
  ): boolean {

    return prediction.signature !== undefined;

  }

  /* ==========================================================================
   * Verify Finality Receipt
   * ==========================================================================
   */

  async verifyReceipt(
    receipt: unknown,
  ): Promise<FinalityVerificationResult> {

    return protocolService.verifySubmission(
      receipt as never,
    );

  }

  /* ==========================================================================
   * Verify Complete Prediction
   * ==========================================================================
   */

  async verifyPrediction(
    prediction: Prediction,
    receipt?: unknown,
  ): Promise<SignatureVerificationResult> {

    /*
     * Prediction has never been signed.
     */

    if (!prediction.signature) {

      return {

        verified: false,

        reason:
          "Prediction is not signed.",

      };

    }

    /*
     * Signature exists but no receipt available yet.
     * This means signing succeeded locally.
     */

    if (!receipt) {

      return {

        verified: true,

        signature:
          prediction.signature,

      };

    }

    /*
     * Verify with Finality.
     */

    const verification =
      await this.verifyReceipt(
        receipt,
      );

    return {

      verified:
        verification.verified,

      signature:
        prediction.signature,

      receipt:
        verification.receipt,

      reason:
        verification.reason,

    };

  }

  /* ==========================================================================
   * Wallet Formatter
   * ==========================================================================
   */

  formatWallet(
    wallet: string,
  ): string {

    if (wallet.length <= 12) {

      return wallet;

    }

    return `${wallet.slice(
      0,
      6,
    )}...${wallet.slice(-4)}`;

  }

  /* ==========================================================================
   * Signature Formatter
   * ==========================================================================
   */

  formatSignature(
    signature: string,
  ): string {

    if (signature.length <= 24) {

      return signature;

    }

    return `${signature.slice(
      0,
      18,
    )}...${signature.slice(-10)}`;

  }

  /* ==========================================================================
   * Envelope Formatter
   * ==========================================================================
   */

  formatEnvelopeId(
    envelopeId: string,
  ): string {

    if (envelopeId.length <= 18) {

      return envelopeId;

    }

    return `${envelopeId.slice(
      0,
      10,
    )}...${envelopeId.slice(-6)}`;

  }

  /* ==========================================================================
   * Digest Formatter
   * ==========================================================================
   */

  formatDigest(
    digest: string,
  ): string {

    if (digest.length <= 24) {

      return digest;

    }

    return `${digest.slice(
      0,
      14,
    )}...${digest.slice(-10)}`;

  }

  /* ==========================================================================
   * Timestamp Formatter
   * ==========================================================================
   */

  formatSignedAt(
    timestamp: string,
  ): string {

    return new Date(
      timestamp,
    ).toLocaleString();

  }

}

export const signatureService =
  new SignatureService();