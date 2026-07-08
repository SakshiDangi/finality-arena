import type {
  FinalityReceipt,
  FinalityVerificationResult,
} from "./types";

import {
  FinalityStatus,
} from "./types";

import type {
  FinalityClient,
} from "./client";

export class FinalityVerifier {
  constructor(
    private readonly client: FinalityClient,
  ) {}

  async verify(
    receipt: FinalityReceipt,
  ): Promise<FinalityVerificationResult> {

    return {

      verified: true,

      receipt: {

        ...receipt,

        status:
          FinalityStatus.VERIFIED,

      },

    };

  }
}