import {
  NextResponse,
} from "next/server";

import {
  predictionService,
} from "@/services/prediction.services";

/* ============================================================================
 * GET /api/predictions/match/:matchId
 * ============================================================================
 *
 * Returns every prediction submitted for a specific match.
 * ============================================================================
 */

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      matchId: string;
    }>;
  },
) {

  try {

    const {
      matchId,
    } = await params;

    const result =
      await predictionService.getPredictionsForMatch(
        matchId,
      );

    if (!result.success) {

      return NextResponse.json(
        {

          success: false,

          error:
            "Unable to load predictions.",

        },
        {

          status: 404,

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