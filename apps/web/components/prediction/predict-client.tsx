"use client";

import {
  useState,
} from "react";

import type {
  Match,
  Prediction,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "@finality/finality";

import type {
  PredictionSubmissionResult,
} from "@/services/prediction.services";

import PredictionMatchCard
  from "./prediction-match-card";

import PredictionForm
  from "./prediction-form";

import PredictionTimeline
  from "./prediction-timeline";

import PredictionSummary
  from "./prediction-summary";

import SignatureCard
  from "../signature/signature-card";

import VerificationCard
  from "../signature/verification-card";

/* ============================================================================
 * Props
 * ========================================================================== */

interface PredictClientProps {

  match: Match;

}

/* ============================================================================
 * Predict Client
 * ========================================================================== */

export default function PredictClient({

  match,

}: PredictClientProps) {

  const [
    prediction,
    setPrediction,
  ] = useState<
    Prediction | undefined
  >();

  const [
    receipt,
    setReceipt,
  ] = useState<
    FinalityReceipt | undefined
  >();

  const [
    verified,
    setVerified,
  ] = useState(false);

  /* ==========================================================================
   * Prediction Submitted
   * ========================================================================= */

  function handleSubmitted(
    result: PredictionSubmissionResult,
  ) {

    setPrediction(
      result.prediction,
    );

    setReceipt(
      result.receipt,
    );

    setVerified(
      result.verified,
    );

    console.log(
      "Prediction Submitted",
      result,
    );

  }

  /* ==========================================================================
   * Render
   * ========================================================================= */

  return (

    <main className="container mx-auto max-w-6xl space-y-8 py-10">

      {/* ------------------------------------------------------------- */}
      {/* Match */}
      {/* ------------------------------------------------------------- */}

      <PredictionMatchCard
        match={match}
      />

      {/* ------------------------------------------------------------- */}
      {/* Prediction Form */}
      {/* ------------------------------------------------------------- */}

      <PredictionForm
        match={match}
        onSubmitted={
          handleSubmitted
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* Timeline */}
      {/* ------------------------------------------------------------- */}

      <PredictionTimeline
        prediction={prediction}
        receipt={receipt}
        verified={verified}
      />

      {/* ------------------------------------------------------------- */}
      {/* Summary */}
      {/* ------------------------------------------------------------- */}

      <PredictionSummary
        match={match}
        prediction={prediction}
        receipt={receipt}
        verified={verified}
      />

      {/* ------------------------------------------------------------- */}
      {/* Signature */}
      {/* ------------------------------------------------------------- */}

      <SignatureCard
        prediction={prediction}
      />

      {/* ------------------------------------------------------------- */}
      {/* Verification */}
      {/* ------------------------------------------------------------- */}

      <VerificationCard
        receipt={receipt}
        verified={verified}
      />

    </main>

  );

}




// "use client";

// import { useState } from "react";

// import type {
//   Match,
//   Prediction,
// } from "@finality/shared";

// import type {
//   FinalityReceipt,
// } from "@finality/finality";

// import type {
//   PredictionSubmissionResult,
// } from "@/services/prediction.services";

// import PredictionMatchCard
//   from "./prediction-match-card";

// import PredictionForm
//   from "./prediction-form";

// import PredictionTimeline
//   from "./prediction-timeline";

// import PredictionSummary
//   from "./prediction-summary";

// import SignatureCard
//   from "../signature/signature-card";

// import VerificationCard
//   from "../signature/verification-card";

// /* =============================================================================
//  * Props
//  * ========================================================================== */

// interface PredictClientProps {

//   match: Match;

// }

// /* =============================================================================
//  * Component
//  * ========================================================================== */

// export default function PredictClient({

//   match,

// }: PredictClientProps) {

//   const [
//     prediction,
//     setPrediction,
//   ] = useState<
//     Prediction | undefined
//   >();

//   const [
//     receipt,
//     setReceipt,
//   ] = useState<
//     FinalityReceipt | undefined
//   >();

//   const [
//     verified,
//     setVerified,
//   ] = useState(false);

//   /* ===========================================================================
//    * Prediction Submitted
//    * ======================================================================== */

//   function handleSubmitted(
//     result: PredictionSubmissionResult,
//   ) {

//     setPrediction(
//       result.prediction,
//     );

//     setReceipt(
//       result.receipt,
//     );

//     setVerified(
//       result.verified,
//     );

//   }

//   /* ===========================================================================
//    * Render
//    * ======================================================================== */

//   return (

//     <div className="container mx-auto space-y-8 py-10">

//       <PredictionMatchCard
//         match={match}
//       />

//       <PredictionForm
//         match={match}
//         onSubmitted={
//           handleSubmitted
//         }
//       />

//       <PredictionTimeline
//         prediction={prediction}
//         receipt={receipt}
//         verified={verified}
//       />

//       <PredictionSummary
//         prediction={prediction}
//         receipt={receipt}
//         verified={verified}
//         match={match}
//       />

//       <SignatureCard
//         prediction={prediction}
//       />

//       <VerificationCard
//         receipt={receipt}
//         verified={verified}
//       />

//     </div>

//   );

// }