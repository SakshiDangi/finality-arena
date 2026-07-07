
/* =============================================================================
 * Identifiers
 * ========================================================================== */

export type MatchId = string;

export type PredictionId = string;

export type SettlementId = string;

export type EnvelopeId = string;

export type UserId = string;

export type TeamId = string;

export type LeagueId = string;

export type WalletAddress = string;

/* =============================================================================
 * Time
 * ========================================================================== */

export type ISO8601String = string;

export type UnixTimestamp = number;

export type CurrencyCode = "USDt";

export interface Money {

  amount: bigint;

  currency: CurrencyCode;

}

/* =============================================================================
 * Pagination
 * ========================================================================== */

export interface Pagination {

  page: number;

  limit: number;

}

export interface Page<T> {

  items: T[];

  page: number;

  limit: number;

  total: number;

}

/* =============================================================================
 * Metadata
 * ========================================================================== */

export interface Metadata {

  createdAt: ISO8601String;

  updatedAt?: ISO8601String;

}

export interface AuditFields {

  createdBy: UserId;

  updatedBy?: UserId;

}

/* =============================================================================
 * Generic API
 * ========================================================================== */

export interface ApiError {

  code: string;

  message: string;

  details?: unknown;

}

export interface Result<T> {
  readonly success: boolean;

  readonly data?: T;

  readonly error?: ApiError;
}