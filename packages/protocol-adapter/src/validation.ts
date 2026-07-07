import {
  MatchOutcome,
  PredictionSource,
} from "@finality/shared";

import type { SubmitPredictionRequest } from "./submit-request.js";

/* ============================================================================
 * Validation Error
 * ============================================================================
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ValidationError";
  }
}

/* ============================================================================
 * Validation Result
 * ============================================================================
 */

export interface ValidationResult {
  readonly valid: boolean;

  readonly errors: readonly string[];
}

/* ============================================================================
 * Prediction Validation
 * ============================================================================
 */

/**
 * Validates an incoming prediction request before it enters
 * the protocol execution pipeline.
 */
export function validatePredictionRequest(
  request: SubmitPredictionRequest,
): ValidationResult {
  const errors: string[] = [];

  /* ------------------------------------------------------------------------
   * Wallet
   * ---------------------------------------------------------------------- */

  if (!request.walletAddress.trim()) {
    errors.push("Wallet address is required.");
  }

  /* ------------------------------------------------------------------------
   * Match
   * ---------------------------------------------------------------------- */

  if (!request.matchId.trim()) {
    errors.push("Match ID is required.");
  }

  /* ------------------------------------------------------------------------
   * Outcome
   * ---------------------------------------------------------------------- */

  if (!Object.values(MatchOutcome).includes(request.outcome)) {
    errors.push("Invalid match outcome.");
  }

  /* ------------------------------------------------------------------------
   * Source
   * ---------------------------------------------------------------------- */

  if (!Object.values(PredictionSource).includes(request.source)) {
    errors.push("Invalid prediction source.");
  }

  /* ------------------------------------------------------------------------
   * Client Version
   * ---------------------------------------------------------------------- */

  if (
    request.clientVersion &&
    request.clientVersion.length > 100
  ) {
    errors.push("Client version is too long.");
  }

  /* ------------------------------------------------------------------------
   * Device ID
   * ---------------------------------------------------------------------- */

  if (
    request.deviceId &&
    request.deviceId.length > 100
  ) {
    errors.push("Device ID is too long.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Throws a ValidationError if the request is invalid.
 */
export function assertValidPredictionRequest(
  request: SubmitPredictionRequest,
): void {
  const result = validatePredictionRequest(request);

  if (!result.valid) {
    throw new ValidationError(result.errors.join(" "));
  }
}