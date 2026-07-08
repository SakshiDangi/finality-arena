import type {
  LeaderboardEntry,
  UserId,
} from "@finality/shared";

import { database } from "./db";

import type {
  RepositoryResult,
} from "./types";

export class InMemoryLeaderboardStore {

  private readonly entries =
    database.leaderboard;

  async list(): Promise<
    RepositoryResult<
      readonly LeaderboardEntry[]
    >
  > {

    return {

      success: true,

      data: Array.from(
        this.entries.values(),
      ),

    };

  }

  async findByUserId(
    userId: UserId,
  ) {

    return {

      success: true,

      data:
        this.entries.get(
          userId,
        ) ?? null,

    };

  }

}

export const leaderboardStore =
  new InMemoryLeaderboardStore();