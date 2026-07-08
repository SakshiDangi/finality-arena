import {
  NextResponse,
} from "next/server";

import {
  leaderboardService,
} from "@/services/leaderboard.service";

/* ============================================================================
 * GET /api/leaderboard
 * ============================================================================
 *
 * Returns the complete leaderboard.
 * ============================================================================
 */

export async function GET() {

  try {

    const result =
      await leaderboardService.getLeaderboard();

    if (!result.success) {

      return NextResponse.json(

        {

          success: false,

          error:
            result.error,

        },

        {

          status: 404,

        },

      );

    }

    return NextResponse.json(

      {

        success: true,

        data:
          result.data,

      },

      {

        status: 200,

      },

    );

  } catch (err: unknown) {

    console.error(
      "Failed to load leaderboard:",
      err,
    );

    return NextResponse.json(

      {

        success: false,

        error:
          "Failed to load leaderboard.",

      },

      {

        status: 500,

      },

    );

  }

}