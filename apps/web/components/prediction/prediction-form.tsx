"use client";

import {
  useState,
} from "react";

import {
  Loader2,
} from "lucide-react";

import type {
  Match,
  Prediction,
  PredictionSignature,
} from "@finality/shared";

import {
  MatchOutcome,
  PredictionSource,
  PredictionStatus,
} from "@finality/shared";

import type {
  PredictionSubmissionResult,
} from "@/services/prediction.services";

import type {
  FinalityReceipt,
} from "@finality/finality";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

export interface PredictionFormProps {

  match: Match;

  onSubmitted?: (
    result: PredictionSubmissionResult,
  ) => void;

  className?: string;

}

export default function PredictionForm({

  match,

  onSubmitted,

}: PredictionFormProps) {

  const [
    homeScore,
    setHomeScore,
  ] = useState(2);

  const [
    awayScore,
    setAwayScore,
  ] = useState(1);

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function handleSubmit() {

    setLoading(true);

    /*
     * Simulate network latency
     */

    await new Promise(

      resolve =>

        setTimeout(
          resolve,
          1000,
        ),

    );

    const outcome =
      homeScore > awayScore
        ? MatchOutcome.HOME
        : homeScore < awayScore
        ? MatchOutcome.AWAY
        : MatchOutcome.DRAW;

    const signature: PredictionSignature = {

      algorithm:
        "ECDSA-secp256k1",

      signer:
        "0x1234567890123456789012345678901234567890",

      signature:
        `0x${crypto.randomUUID().replaceAll("-", "")}`,

      signedAt:
        new Date().toISOString(),

    };

    const prediction: Prediction = {

      id:
        crypto.randomUUID(),

      player: {

        id:
          crypto.randomUUID(),

        wallet:
          "0x1234567890123456789012345678901234567890" as never,

        displayName:
          "Demo Player",

      },

      matchId:
        match.id,

      outcome,

      status:
        PredictionStatus.VERIFIED,

      metadata: {

        createdAt:
          new Date().toISOString(),

        source:
          PredictionSource.WEB,

        client:
          "Demo Client",

      },

      signature,

    };

    const receipt: FinalityReceipt = {

      envelopeId:
        crypto.randomUUID(),

      digest:
        `0x${crypto.randomUUID().replaceAll("-", "")}`,

    } as FinalityReceipt;

    const result: PredictionSubmissionResult = {

      prediction,

      receipt,

      verified: true,

    };

    onSubmitted?.(
      result,
    );

    setLoading(false);

  }

  return (

    <div className="space-y-6 rounded-xl border p-6">

      <div className="grid grid-cols-2 gap-6">

        <div className="space-y-2">

          <p className="font-medium">

            {match.homeTeam.name}

          </p>

          <Input

            type="number"

            min={0}

            value={homeScore}

            onChange={event =>

              setHomeScore(
                Number(
                  event.target.value,
                ),
              )

            }

          />

        </div>

        <div className="space-y-2">

          <p className="font-medium">

            {match.awayTeam.name}

          </p>

          <Input

            type="number"

            min={0}

            value={awayScore}

            onChange={event =>

              setAwayScore(
                Number(
                  event.target.value,
                ),
              )

            }

          />

        </div>

      </div>

      <Button

        className="w-full"

        disabled={loading}

        onClick={handleSubmit}

      >

        {loading ? (

          <>

            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            Submitting...

          </>

        ) : (

          "Submit Prediction"

        )}

      </Button>

    </div>

  );

}






// "use client";

// import { useState } from "react";

// import {
//   Match,
//   MatchOutcome,
//   PredictionSource,
// } from "@finality/shared";

// import {
//   predictionService,
//   type PredictionSubmissionResult,
// } from "@/services/prediction.services";

// import { Button } from "@/components/ui/button";

// export interface PredictionFormProps {

//   match: Match;

//   onSubmitted?: (
//     result: PredictionSubmissionResult,
//   ) => void;

//   className?: string;

// }

// export default function PredictionForm({
//   match,
//   onSubmitted,
// }: PredictionFormProps) {

//   const [
//     homeScore,
//     setHomeScore,
//   ] = useState(0);

//   const [
//     awayScore,
//     setAwayScore,
//   ] = useState(0);

//   const [
//     loading,
//     setLoading,
//   ] = useState(false);

//   async function handleSubmit() {

//     setLoading(true);

//     try {

//       const result =
//         await predictionService.submitPrediction({

//           matchId:
//             match.id,

//           homeScore,

//           awayScore,

//         });

//       onSubmitted?.(
//         result,
//       );

//     } finally {

//       setLoading(false);

//     }

//   }

//   return (

//     <div className="space-y-6 rounded-xl border p-6">

//       <div className="grid grid-cols-2 gap-6">

//         <div>

//           <p>{match.homeTeam.name}</p>

//           <input
//             type="number"
//             min={0}
//             value={homeScore}
//             onChange={(e) =>
//               setHomeScore(
//                 Number(e.target.value),
//               )
//             }
//             className="w-full rounded border p-2"
//           />

//         </div>

//         <div>

//           <p>{match.awayTeam.name}</p>

//           <input
//             type="number"
//             min={0}
//             value={awayScore}
//             onChange={(e) =>
//               setAwayScore(
//                 Number(e.target.value),
//               )
//             }
//             className="w-full rounded border p-2"
//           />

//         </div>

//       </div>

//       <Button
//         onClick={handleSubmit}
//         disabled={loading}
//       >

//         {loading
//           ? "Submitting..."
//           : "Submit Prediction"}

//       </Button>

//     </div>

//   );

// }