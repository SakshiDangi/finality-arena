import type {
  Settlement,
  SettlementId,
} from "@finality/shared";

import {
  database,
} from "./db.js";

import type {
  RepositoryResult,
  SettlementRepository,
} from "./types.js";

/* ============================================================================
 * Settlement Store
 * ============================================================================
 */

export class InMemorySettlementStore
  implements SettlementRepository
{
  /* ==========================================================================
   * Save
   * ==========================================================================
   */

  async save(
    settlement: Settlement,
  ): Promise<
    RepositoryResult<Settlement>
  > {
    database.settlements.set(
      settlement.id,
      settlement,
    );

    return {
      success: true,
      data: settlement,
    };
  }

  /* ==========================================================================
   * Find By Id
   * ==========================================================================
   */

  async findById(
    id: SettlementId,
  ): Promise<
    RepositoryResult<Settlement | null>
  > {
    const settlement =
      database.settlements.get(id);

    return {
      success: true,
      data: settlement ?? null,
    };
  }

  /* ==========================================================================
   * List
   * ==========================================================================
   */

  async list(): Promise<
    RepositoryResult<
      readonly Settlement[]
    >
  > {
    return {
      success: true,
      data: Array.from(
        database.settlements.values(),
      ),
    };
  }

  /* ==========================================================================
   * Delete
   * ==========================================================================
   */

  async delete(
    id: SettlementId,
  ): Promise<
    RepositoryResult<boolean>
  > {
    return {
      success: true,
      data: database.settlements.delete(id),
    };
  }

  /* ==========================================================================
   * Clear
   * ==========================================================================
   */

  async clear(): Promise<
    RepositoryResult<boolean>
  > {
    database.settlements.clear();

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

export const settlementStore =
  new InMemorySettlementStore();