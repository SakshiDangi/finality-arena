import {
  MatchStatus,
  type Match,
  type MatchId,
} from "@finality/shared";

import {
  matchStore,
} from "@finality/storage";

/* ============================================================================
 * Match Service
 * ============================================================================
 *
 * Frontend adapter around the Match Store.
 *
 * UI
 *   ↓
 * MatchService
 *   ↓
 * MatchStore
 * ============================================================================
 */

export class MatchService {

  /* ==========================================================================
   * All Matches
   * ==========================================================================
   */

  async getMatches() {
    return matchStore.list();
  }

  /* ==========================================================================
   * Match By Id
   * ==========================================================================
   */

  async getMatchById(
    id: MatchId,
  ) {
    return matchStore.findById(id);
  }

  /* ==========================================================================
   * Today's Matches
   * ==========================================================================
   */

  async getTodayMatches() {
    const result =
      await matchStore.list();

    if (!result.success) {
      return result;
    }

    const today =
      new Date().toDateString();

    return {
      success: true,
      data: result.data.filter(
        (match) =>
          new Date(
            match.timing.kickoff,
          ).toDateString() === today,
      ),
    };
  }

  /* ==========================================================================
   * Upcoming Matches
   * ==========================================================================
   */

  async getUpcomingMatches() {
    const result =
      await matchStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: result.data.filter(
        (match) =>
          match.status ===
          MatchStatus.SCHEDULED,
      ),
    };
  }

  /* ==========================================================================
   * Live Matches
   * ==========================================================================
   */

  async getLiveMatches() {
    const result =
      await matchStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: result.data.filter(
        (match) =>
          match.status ===
          MatchStatus.LIVE,
      ),
    };
  }

  /* ==========================================================================
   * Finished Matches
   * ==========================================================================
   */

  async getFinishedMatches() {
    const result =
      await matchStore.list();

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: result.data.filter(
        (match) =>
          match.status ===
          MatchStatus.FINISHED,
      ),
    };
  }

  /* ==========================================================================
   * Save Match
   * ==========================================================================
   */

  async saveMatch(
    match: Match,
  ) {
    return matchStore.save(match);
  }

  /* ==========================================================================
   * Delete Match
   * ==========================================================================
   */

  async deleteMatch(
    id: MatchId,
  ) {
    return matchStore.delete(id);
  }

  /* ==========================================================================
   * Clear Demo Data
   * ==========================================================================
   */

  async clearMatches() {
    return matchStore.clear();
  }
}

export const matchService =
  new MatchService();