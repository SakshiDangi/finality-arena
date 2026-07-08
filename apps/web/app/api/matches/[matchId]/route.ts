import {
  NextResponse,
} from "next/server";

import {
  matchService,
} from "@/services/match.service";

/* ============================================================================
 * GET /api/matches/:matchId
 * ============================================================================
 */

interface RouteParams {
  params: Promise<{
    matchId: string;
  }>;
}

export async function GET(
  _request: Request,
  {
    params,
  }: RouteParams,
) {

  const {
    matchId,
  } = await params;

  const result =
    await matchService.getMatchById(
      matchId,
    );

  if (
    !result.success ||
    !result.data
  ) {

    return NextResponse.json(
      {
        success: false,
        error: "Match not found.",
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

}