import {
  NextResponse,
} from "next/server";

import {
  leaderboardService,
} from "@/services/leaderboard.service";

/* ============================================================================
 * GET /api/leaderboard/[userId]
 * ============================================================================
 */

interface RouteParams {

  params: Promise<{

    userId: string;

  }>;

}

export async function GET({
  params,
}: RouteParams) {

  try {

    const {
      userId,
    } = await params;

    const result =
      await leaderboardService.getUserRank(
        userId as never,
      );

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
      err,
    );

    return NextResponse.json(

      {

        success: false,

        error:
          "Failed to load user leaderboard information.",

      },

      {

        status: 500,

      },

    );

  }

}