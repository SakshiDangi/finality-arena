import type {
  Prediction,
} from "@finality/shared";

import type {
  FinalitySubmissionResult,
} from "./types";

import {
  FinalityStatus,
} from "./types";

import type {
  FinalityClient,
} from "./client";

export class FinalitySubmitter {
  constructor(
    private readonly client: FinalityClient,
  ) {}

  async submit(
    prediction: Prediction,
  ): Promise<FinalitySubmissionResult> {

    return {

      accepted: true,

      receipt: {

        envelopeId:
          prediction.id,

        digest:
          crypto.randomUUID(),

        status:
          FinalityStatus.PENDING,

      },

    };

  }
}