import type {
  LeaderboardEntry,
  UserId,
} from "@finality/shared";

import {
  leaderboardStore,
} from "@finality/storage";

import type {
  RepositoryResult,
} from "@finality/storage";

/* ============================================================
 * User Rank
 * ========================================================== */

export interface UserRank {

  rank: number;

  player: LeaderboardEntry;

}

/* ============================================================
 * Leaderboard Service
 * ============================================================
 *
 * Read-only service responsible for retrieving
 * leaderboard information for the frontend.
 *
 * This service never:
 *
 * - submits predictions
 * - verifies signatures
 * - settles matches
 *
 * It only reads leaderboard data.
 * ========================================================== */

export class LeaderboardService {

  /* ==========================================================
   * Full Leaderboard
   * ======================================================== */

  async getLeaderboard(): Promise<
    RepositoryResult<
      readonly LeaderboardEntry[]
    >
  > {

    return leaderboardStore.list();

  }

  /* ==========================================================
   * Top Players
   * ======================================================== */

  async getTopPlayers(
    limit = 10,
  ): Promise<
    RepositoryResult<
      readonly LeaderboardEntry[]
    >
  > {

    const result =
      await leaderboardStore.list();

    if (!result.success) {

      return result;

    }

    const players =
      [...result.data].sort(
        (
          a,
          b,
        ) =>
          b.points -
          a.points,
      );

    return {

      success: true,

      data:
        players.slice(
          0,
          limit,
        ),

    };

  }

  /* ==========================================================
   * User Rank
   * ======================================================== */

  async getUserRank(
    userId: UserId,
  ): Promise<
    RepositoryResult<UserRank>
  > {

    const result =
      await leaderboardStore.list();

    if (!result.success) {

      return result;

    }

    const leaderboard =
      [...result.data].sort(
        (
          a,
          b,
        ) =>
          b.points -
          a.points,
      );

    const index =
      leaderboard.findIndex(
        player =>
          player.userId ===
          userId,
      );

    if (index === -1) {

      return {

        success: false,

        error:
          "Player not found",

      };

    }

    return {

      success: true,

      data: {

        rank:
          index + 1,

        player:
          leaderboard[index],

      },

    };

  }

  /* ==========================================================
   * User Position
   * ======================================================== */

  async getPosition(
    userId: UserId,
  ): Promise<number | null> {

    const result =
      await this.getUserRank(
        userId,
      );

    if (!result.success) {

      return null;

    }

    return result.data.rank;

  }

  /* ==========================================================
   * Highest Score
   * ======================================================== */

  async getHighestScore(): Promise<
    RepositoryResult<LeaderboardEntry>
  > {

    const result =
      await leaderboardStore.list();

    if (!result.success) {

      return result;

    }

    if (
      result.data.length === 0
    ) {

      return {

        success: false,

        error:
          "Leaderboard is empty",

      };

    }

    const highest =
      result.data.reduce(
        (
          best,
          current,
        ) =>
          current.points >
          best.points
            ? current
            : best,
      );

    return {

      success: true,

      data: highest,

    };

  }

  /* ==========================================================
   * Lowest Score
   * ======================================================== */

  async getLowestScore(): Promise<
    RepositoryResult<LeaderboardEntry>
  > {

    const result =
      await leaderboardStore.list();

    if (!result.success) {

      return result;

    }

    if (
      result.data.length === 0
    ) {

      return {

        success: false,

        error:
          "Leaderboard is empty",

      };

    }

    const lowest =
      result.data.reduce(
        (
          best,
          current,
        ) =>
          current.points <
          best.points
            ? current
            : best,
      );

    return {

      success: true,

      data: lowest,

    };

  }

}

/* ============================================================
 * Singleton
 * ========================================================== */

export const leaderboardService =
  new LeaderboardService();