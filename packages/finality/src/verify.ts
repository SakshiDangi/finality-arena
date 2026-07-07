import {
  FinalityClient,
} from "./client.js";

import {
  FinalityStatus,
} from "./types.js";

import type {
  FinalityReceipt,
  FinalityVerificationResult,
} from "./types.js";

/* ============================================================================
 * Finality Verifier
 * ============================================================================
 *
 * Responsible for checking whether a submitted envelope has been
 * finalized by the Finality network.
 *
 * No football logic.
 * No settlement logic.
 * No storage.
 * ============================================================================
 */

export class FinalityVerifier {
  constructor(
    private readonly client: FinalityClient,
  ) {}

  /**
   * Verify a receipt with the Finality network.
   */
  async verify(
    receipt: FinalityReceipt,
  ): Promise<FinalityVerificationResult> {

    if (!this.client.isConnected()) {
      throw new Error(
        "Finality client is not connected.",
      );
    }

    /**
     * ------------------------------------------------------------------------
     * TODO
     *
     * Replace this placeholder with the real Finality SDK.
     *
     * Example:
     *
     * const verified = await sdk.verify(receipt.envelopeId);
     *
     * ------------------------------------------------------------------------
     */

    return {

      verified: receipt.status === FinalityStatus.VERIFIED,

      receipt,

      reason:
        receipt.status === FinalityStatus.FAILED
          ? "Verification failed."
          : undefined,

    };
  }
}