import type {
  Match,
  MatchId,
  Prediction,
  PredictionId,
  Settlement,
  SettlementId,
} from "@finality/shared";

/* ============================================================================
 * Repository Result
 * ============================================================================
 */

export interface RepositoryResult<T> {
  readonly success: boolean;

  readonly data?: T;

  readonly error?: string;
}

/* ============================================================================
 * Match Repository
 * ============================================================================
 */

export interface MatchRepository {
  save(
    match: Match,
  ): Promise<RepositoryResult<Match>>;

  findById(
    id: MatchId,
  ): Promise<RepositoryResult<Match | null>>;

  list(): Promise<
    RepositoryResult<readonly Match[]>
  >;
}

/* ============================================================================
 * Prediction Repository
 * ============================================================================
 */

export interface PredictionRepository {
  save(
    prediction: Prediction,
  ): Promise<
    RepositoryResult<Prediction>
  >;

  findById(
    id: PredictionId,
  ): Promise<
    RepositoryResult<Prediction | null>
  >;

  list(): Promise<
    RepositoryResult<
      readonly Prediction[]
    >
  >;

  delete(
    id: PredictionId,
  ): Promise<RepositoryResult<boolean>>;
  
  clear(): Promise<RepositoryResult<boolean>>;
}

/* ============================================================================
 * Settlement Repository
 * ============================================================================
 */

export interface SettlementRepository {
  save(
    settlement: Settlement,
  ): Promise<
    RepositoryResult<Settlement>
  >;

  findById(
    id: SettlementId,
  ): Promise<
    RepositoryResult<Settlement | null>
  >;

  list(): Promise<
    RepositoryResult<
      readonly Settlement[]
    >
  >;
}