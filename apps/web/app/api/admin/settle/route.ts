import {
  NextResponse,
} from "next/server";

import {
  settlementService,
} from "@/services/settlement.service";

/* ============================================================================
 * Settlement Request
 * ========================================================================== */

interface SettlementRequest {

  matchId: string;

  homeScore: number;

  awayScore: number;

}

/* ============================================================================
 * POST /api/admin/settle
 * ========================================================================== */

export async function POST(
  request: Request,
) {

  try {

    const body: SettlementRequest =
      await request.json();

    if (

      !body.matchId ||

      body.homeScore === undefined ||

      body.awayScore === undefined

    ) {

      return NextResponse.json(

        {

          success: false,

          error:
            "Invalid settlement request.",

        },

        {

          status: 400,

        },

      );

    }

    const result =
      await settlementService.runSettlement(

        body.matchId,

        body.homeScore,

        body.awayScore,

      );

    return NextResponse.json(

      {

        success: true,

        data: result,

      },

      {

        status: 200,

      },

    );

  } catch (
    error
  ) {

    console.error(
      "Settlement Error:",
      error,
    );

    return NextResponse.json(

      {

        success: false,

        error:

          error instanceof Error

            ? error.message

            : "Settlement failed.",

      },

      {

        status: 500,

      },

    );

  }

}