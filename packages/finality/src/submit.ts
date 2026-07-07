import type {
  Prediction,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "./types.js";

import {
  FinalityStatus,
} from "./types.js";

import {
  FinalityClient,
} from "./client.js";

/* ============================================================================
 * Finality Submitter
 * ============================================================================
 *
 * Responsible only for submitting predictions to the
 * Finality network.
 *
 * No validation.
 * No settlement.
 * No rewards.
 * ============================================================================
 */

export class FinalitySubmitter {
  constructor(
    private readonly client: FinalityClient,
  ) {}

  /**
   * Submit a prediction.
   */
  async submit(
    prediction: Prediction,
  ): Promise<FinalityReceipt> {

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
     * const receipt = await sdk.submit(prediction);
     *
     * ------------------------------------------------------------------------
     */

    return {

      envelopeId: crypto.randomUUID(),

      digest: "",

      status: FinalityStatus.PENDING,

      proof: undefined,

      transactionId: undefined,

      verifiedAt: undefined,

    };
  }
}