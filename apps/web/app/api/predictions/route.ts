import {
  NextResponse,
} from "next/server";

import {
  predictionService,
} from "@/services/prediction.services";

import type {
  PredictionRequest,
} from "@/services/prediction-request";

/* ============================================================================
 * POST /api/predictions
 * ============================================================================
 */

export async function POST(
  request: Request,
) {

  try {

    const body: PredictionRequest =
      await request.json();

    const result =
      await predictionService.submitPrediction(
        body,
      );

    return NextResponse.json(
      result,
      {
        status: 200,
      },
    );

  } catch (error) {

    console.error(
      error,
    );

    return NextResponse.json(
      {

        success: false,

        error:
          "Prediction submission failed.",

      },
      {
        status: 500,
      },
    );

  }

}