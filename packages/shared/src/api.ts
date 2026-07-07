import type { Match } from "./match.js";

import type { MatchOutcome } from "./match.js";

import type { Prediction } from "./prediction.js";

import type { Settlement } from "./settlement.js";

import type {
  ApiError,
  EnvelopeId,
  MatchId,
  Page,
} from "./types.js";

/* =============================================================================
 * Generic Response
 * ========================================================================== */

export interface ApiResponse<T> {

  success: boolean;

  data?: T;

  error?: ApiError;

}

/* =============================================================================
 * Request Metadata
 * ========================================================================== */

export interface RequestMetadata {

  requestId?: string;

  timestamp?: string;

  client?: string;

}

/* =============================================================================
 * Submit Prediction
 * ========================================================================== */

export interface SubmitPredictionRequest {

  prediction: Prediction;

  metadata?: RequestMetadata;

}

export interface SubmitPredictionResponse {

  envelopeId: EnvelopeId;

  prediction: Prediction;

  digest: string;

}

/* =============================================================================
 * Verify Prediction
 * ========================================================================== */

export interface VerifyPredictionRequest {

  envelopeId: EnvelopeId;

}

export interface VerifyPredictionResponse {

  verified: boolean;

  reason?: string;

}

/* =============================================================================
 * Resolve Match
 * ========================================================================== */

export interface ResolveMatchRequest {

  matchId: MatchId;

  actualOutcome: MatchOutcome;

}

export interface ResolveMatchResponse {

  settlement: Settlement;

}

/* =============================================================================
 * Match APIs
 * ========================================================================== */

export interface GetMatchResponse {

  match: Match;

}

export interface ListMatchesResponse {

  matches: Page<Match>;

}

/* =============================================================================
 * Prediction APIs
 * ========================================================================== */

export interface ListPredictionsResponse {

  predictions: Page<Prediction>;

}

/* =============================================================================
 * Settlement APIs
 * ========================================================================== */

export interface ListSettlementsResponse {

  settlements: Page<Settlement>;

}

/* =============================================================================
 * Arena API
 * ========================================================================== */

export interface ArenaApi {

  submitPrediction(

    request: SubmitPredictionRequest,

  ): Promise<ApiResponse<SubmitPredictionResponse>>;

  verifyPrediction(

    request: VerifyPredictionRequest,

  ): Promise<ApiResponse<VerifyPredictionResponse>>;

  resolveMatch(

    request: ResolveMatchRequest,

  ): Promise<ApiResponse<ResolveMatchResponse>>;

  getMatch(

    id: MatchId,

  ): Promise<ApiResponse<GetMatchResponse>>;

  listMatches(): Promise<ApiResponse<ListMatchesResponse>>;

  listPredictions(

    userId?: string,

  ): Promise<ApiResponse<ListPredictionsResponse>>;

  listSettlements(): Promise<ApiResponse<ListSettlementsResponse>>;

}