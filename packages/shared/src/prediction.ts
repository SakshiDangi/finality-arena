import type { MatchOutcome } from "./match.js";

import type {
  ISO8601String,
  MatchId,
  PredictionId,
  UserId,
  WalletAddress,
} from "./types.js";

/* =============================================================================
 * Prediction Status
 * ========================================================================== */

export enum PredictionStatus {
  CREATED = "created",

  SIGNED = "signed",

  SUBMITTED = "submitted",

  VERIFIED = "verified",

  REJECTED = "rejected",

  SETTLED = "settled",
}

/* =============================================================================
 * Prediction Source
 * ========================================================================== */

export enum PredictionSource {
  WEB = "web",

  MOBILE = "mobile",

  API = "api",

  AI = "ai",
}

/* =============================================================================
 * Player
 * ========================================================================== */

export interface Player {

  id: UserId;

  wallet: WalletAddress;

  displayName?: string;
}

/* =============================================================================
 * Prediction Metadata
 * ========================================================================== */

export interface PredictionMetadata {

  createdAt: ISO8601String;

  updatedAt?: ISO8601String;

  client?: string;

  source: PredictionSource;
}

export interface PredictionSignature {
  algorithm: string;
  signer: WalletAddress;
  signature: string;
  signedAt: ISO8601String;
}

/* =============================================================================
 * Prediction
 * ========================================================================== */

export interface Prediction {

  id: PredictionId;

  player: Player;

  matchId: MatchId;

  outcome: MatchOutcome;

  status: PredictionStatus;

  metadata: PredictionMetadata;

  signature?: PredictionSignature;
}