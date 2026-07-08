import type {
  FinalityReceipt,
} from "@finality/finality";

import type {
  EnvelopeId,
  Prediction,
} from "@finality/shared";

export interface SubmitPredictionResponse {

  readonly envelopeId: EnvelopeId;

  readonly prediction: Prediction;

  readonly digest: string;

  readonly accepted: boolean;

  /**
   * Receipt returned from Finality.
   */
  readonly receipt: FinalityReceipt;

  readonly message?: string;
}