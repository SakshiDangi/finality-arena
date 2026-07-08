import {
  NextResponse,
} from "next/server";

import {
  matchService,
} from "@/services/match.service";

/* ============================================================================
 * GET /api/matches
 * ============================================================================
 *
 * Returns every available match.
 * ============================================================================
 */

export async function GET() {

  try {

    const result =
      await matchService.getMatches();

    if (!result.success) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Unable to load matches.",

        },
        {

          status: 500,

        },
      );

    }

    return NextResponse.json(
      result,
      {

        status: 200,

      },
    );

  } catch (
    error
  ) {

    console.error(
      error,
    );

    return NextResponse.json(
      {

        success: false,

        error:
          "Internal server error.",

      },
      {

        status: 500,

      },
    );

  }

}