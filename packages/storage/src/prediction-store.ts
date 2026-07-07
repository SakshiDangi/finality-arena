import type {
  Prediction,
  PredictionId,
} from "@finality/shared";

import {
  database,
} from "./db.js";

import type {
  PredictionRepository,
  RepositoryResult,
} from "./types.js";

/* ============================================================================
 * Prediction Store
 * ============================================================================
 */

export class InMemoryPredictionStore
  implements PredictionRepository
{
  /* ==========================================================================
   * Save
   * ==========================================================================
   */

  async save(
    prediction: Prediction,
  ): Promise<
    RepositoryResult<Prediction>
  > {
    database.predictions.set(
      prediction.id,
      prediction,
    );

    return {
      success: true,
      data: prediction,
    };
  }

  /* ==========================================================================
   * Find By Id
   * ==========================================================================
   */

  async findById(
    id: PredictionId,
  ): Promise<
    RepositoryResult<Prediction | null>
  > {
    const prediction =
      database.predictions.get(id);

    return {
      success: true,
      data: prediction ?? null,
    };
  }

  /* ==========================================================================
   * List
   * ==========================================================================
   */

  async list(): Promise<
    RepositoryResult<
      readonly Prediction[]
    >
  > {
    return {
      success: true,
      data: Array.from(
        database.predictions.values(),
      ),
    };
  }

  /* ==========================================================================
   * Delete
   * ==========================================================================
   *
   * Useful during development and tests.
   * ==========================================================================
   */

  async delete(
    id: PredictionId,
  ): Promise<
    RepositoryResult<boolean>
  > {
    return {
      success: true,
      data: database.predictions.delete(id),
    };
  }

  /* ==========================================================================
   * Clear
   * ==========================================================================
   */

  async clear(): Promise<
    RepositoryResult<boolean>
  > {
    database.predictions.clear();

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

export const predictionStore =
  new InMemoryPredictionStore();