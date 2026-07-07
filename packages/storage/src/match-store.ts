import type {
  Match,
  MatchId,
} from "@finality/shared";

import {
  database,
} from "./db.js";

import type {
  MatchRepository,
  RepositoryResult,
} from "./types.js";

/* ============================================================================
 * Match Store
 * ============================================================================
 */

export class InMemoryMatchStore
  implements MatchRepository
{
  /* ==========================================================================
   * Save
   * ==========================================================================
   */

  async save(
    match: Match,
  ): Promise<
    RepositoryResult<Match>
  > {
    database.matches.set(
      match.id,
      match,
    );

    return {
      success: true,
      data: match,
    };
  }

  /* ==========================================================================
   * Find By Id
   * ==========================================================================
   */

  async findById(
    id: MatchId,
  ): Promise<
    RepositoryResult<Match | null>
  > {
    const match =
      database.matches.get(id);

    return {
      success: true,
      data: match ?? null,
    };
  }

  /* ==========================================================================
   * List
   * ==========================================================================
   */

  async list(): Promise<
    RepositoryResult<
      readonly Match[]
    >
  > {
    return {
      success: true,
      data: Array.from(
        database.matches.values(),
      ),
    };
  }

  /* ==========================================================================
   * Delete
   * ==========================================================================
   */

  async delete(
    id: MatchId,
  ): Promise<
    RepositoryResult<boolean>
  > {
    return {
      success: true,
      data: database.matches.delete(id),
    };
  }

  /* ==========================================================================
   * Clear
   * ==========================================================================
   */

  async clear(): Promise<
    RepositoryResult<boolean>
  > {
    database.matches.clear();

    return {
      success: true,
      data: true,
    };
  }
}

/* ============================================================================
 * Singleton
 * ============================================================================
 */

export const matchStore =
  new InMemoryMatchStore();