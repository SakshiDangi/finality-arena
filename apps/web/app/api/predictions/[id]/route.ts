import {
  NextResponse,
} from "next/server";

import {
  predictionService,
} from "@/services/prediction.services";

/* ============================================================================
 * GET /api/predictions/:id
 * ========================================================================== */

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {

  try {

    const {
      id,
    } = await params;

    const result =
      await predictionService.getPrediction(
        id,
      );

    if (
      !result.success ||
      !result.data
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Prediction not found.",
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
          "Unable to fetch prediction.",
      },
      {
        status: 500,
      },
    );

  }

}

/* ============================================================================
 * DELETE /api/predictions/:id
 * ========================================================================== */

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {

  try {

    const {
      id,
    } = await params;

    const result =
      await predictionService.deletePrediction(
        id,
      );

    return NextResponse.json(
      result,
      {
        status: result.success
          ? 200
          : 404,
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
          "Unable to delete prediction.",
      },
      {
        status: 500,
      },
    );

  }

}