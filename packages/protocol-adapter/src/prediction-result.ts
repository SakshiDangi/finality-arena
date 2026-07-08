import type {
  EnvelopeId,
  Prediction,
} from "@finality/shared";

export interface PredictionEngineResult {

  readonly envelopeId: EnvelopeId;

  readonly prediction: Prediction;

  readonly digest: string;

  readonly accepted: boolean;

  readonly message?: string;

}