import type {
  EnvelopeId,
} from "@finality/shared";

import {
  FinalityClient,
} from "./client.js";

import {
  FinalityStatus,
} from "./types.js";

import type {
  FinalityReceipt,
} from "./types.js";

/* ============================================================================
 * Finality Receipt Service
 * ============================================================================
 *
 * Responsible for retrieving receipts from the Finality network.
 *
 * No prediction logic.
 * No settlement logic.
 * No verification logic.
 * ============================================================================
 */

export class FinalityReceiptService {
  constructor(
    private readonly client: FinalityClient,
  ) {}

  /**
   * Retrieve a receipt by envelope identifier.
   */
  async get(
    envelopeId: EnvelopeId,
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
     * Replace with the real Finality SDK:
     *
     * const receipt = await sdk.getReceipt(envelopeId);
     *
     * return receipt;
     *
     * ------------------------------------------------------------------------
     */

    return {
      envelopeId,

      digest: "",

      status: FinalityStatus.PENDING,

      proof: undefined,

      transactionId: undefined,

      verifiedAt: undefined,
    };
  }
}