"use client";

import {
  BadgeCheck,
  Check,
  Database,
  FilePlus2,
  Loader2,
  PenLine,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  Prediction,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "@finality/finality";

/* ============================================================================
 * Types
 * ========================================================================== */

type StepState =
  | "done"
  | "active"
  | "pending";

interface TimelineStep {

  key: string;

  label: string;

  timestamp?: string;

  state: StepState;

}

interface PredictionTimelineProps {

  prediction?: Prediction;

  receipt?: FinalityReceipt;

  verified: boolean;

  className?: string;

}

/* ============================================================================
 * Icons
 * ========================================================================== */

const stepIcons = {

  created: FilePlus2,

  signed: PenLine,

  submitted: Database,

  verified: BadgeCheck,

} as const;

/* ============================================================================
 * Helpers
 * ========================================================================== */

function formatTime(
  value?: string,
) {

  if (!value) {

    return "--";

  }

  return new Date(
    value,
  ).toLocaleTimeString();

}

/* ============================================================================
 * Component
 * ========================================================================== */

export default function PredictionTimeline({

  prediction,

  receipt,

  verified,

  className,

}: PredictionTimelineProps) {

  const steps: TimelineStep[] = [

    {

      key: "created",

      label: "Prediction Created",

      timestamp: prediction?.metadata.createdAt,

      state:
        prediction
          ? "done"
          : "pending",

    },

    {

      key: "signed",

      label: "Prediction Signed",

      timestamp:
        prediction?.signature?.signedAt,

      state:

        prediction?.signature
          ? "done"

          : prediction
          ? "active"

          : "pending",

    },

    {

      key: "submitted",

      label: "Submitted To Finality",

      // timestamp:
      //   receipt?.createdAt,

      state:

        receipt
          ? "done"

          : prediction
          ? "active"

          : "pending",

    },

    {

      key: "verified",

      label: "Verification Complete",

      timestamp:

        verified
          ? new Date().toISOString()
          : undefined,

      state:

        verified

          ? "done"

          : receipt

          ? "active"

          : "pending",

    },

  ];

  return (

    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
        className,
      )}
    >

      <h3 className="text-sm font-semibold text-white">

        Verification Timeline

      </h3>

      <ol className="mt-6 space-y-1">

        {steps.map((step, index) => {

          const Icon =
            stepIcons[
              step.key as keyof typeof stepIcons
            ];

          const isLast =
            index ===
            steps.length - 1;

          return (

            <li
              key={step.key}
              className="relative flex gap-4 pb-6 last:pb-0"
            >

              {!isLast && (

                <span
                  className={cn(
                    "absolute left-[15px] top-8 h-full w-px",
                    step.state === "done"
                      ? "bg-emerald-500/40"
                      : "bg-white/10",
                  )}
                />

              )}

              <div
                className={cn(
                  "z-10 flex h-8 w-8 items-center justify-center rounded-full border",

                  step.state === "done" &&
                    "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",

                  step.state === "active" &&
                    "border-yellow-500/40 bg-yellow-500/15 text-yellow-300",

                  step.state === "pending" &&
                    "border-white/10 bg-white/5 text-zinc-500",
                )}
              >

                {step.state === "done"

                  ? (

                    <Check className="h-4 w-4" />

                  )

                  : step.state === "active"

                  ? (

                    <Loader2 className="h-4 w-4 animate-spin" />

                  )

                  : (

                    <Icon className="h-4 w-4" />

                  )}

              </div>

              <div className="flex flex-1 items-center justify-between">

                <div>

                  <p
                    className={cn(

                      "text-sm font-medium",

                      step.state === "pending"

                        ? "text-zinc-500"

                        : "text-zinc-100",

                    )}
                  >

                    {step.label}

                  </p>

                </div>

                <span className="font-mono text-xs text-zinc-500">

                  {formatTime(
                    step.timestamp,
                  )}

                </span>

              </div>

            </li>

          );

        })}

      </ol>

    </div>

  );

}



// "use client";

// import {
//   BadgeCheck,
//   Check,
//   Database,
//   FilePlus2,
//   Loader2,
//   PenLine,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// import type {
//   Prediction,
// } from "@finality/shared";

// import {
//   PredictionStatus,
// } from "@finality/shared";

// import type {
//   FinalityReceipt,
// } from "@finality/finality";

// interface TimelineStep {

//   key: string;

//   label: string;

//   timestamp?: string;

//   state:
//     | "done"
//     | "active"
//     | "pending";

// }

// export interface PredictionTimelineProps {

//   prediction?: Prediction;

//   receipt?: FinalityReceipt;

//   verified: boolean;

//   className?: string;

// }

// const stepIcons = {

//   created: FilePlus2,

//   signed: PenLine,

//   submitted: Database,

//   verified: BadgeCheck,

// };

// export default function PredictionTimeline({

//   prediction,

//   receipt,

//   verified,

//   className,

// }: PredictionTimelineProps) {

//   const steps: TimelineStep[] = [

//     {

//       key: "created",

//       label: "Prediction Created",

//       timestamp:
//         prediction?.metadata.createdAt,

//       state:
//         prediction
//           ? "done"
//           : "pending",

//     },

//     {

//       key: "signed",

//       label: "Prediction Signed",

//       timestamp:
//         prediction?.signature?.signedAt,

//       state:
//         prediction?.status ===
//           PredictionStatus.SIGNED ||

//         prediction?.status ===
//           PredictionStatus.SUBMITTED ||

//         prediction?.status ===
//           PredictionStatus.VERIFIED ||

//         prediction?.status ===
//           PredictionStatus.SETTLED
//           ? "done"
//           : prediction
//           ? "active"
//           : "pending",

//     },

//     {

//       key: "submitted",

//       label: "Submitted To Finality",

//       timestamp:
//         receipt
//           ? "Completed"
//           : undefined,

//       state:
//         receipt
//           ? "done"
//           : prediction
//           ? "active"
//           : "pending",

//     },

//     {

//       key: "verified",

//       label: "Signature Verified",

//       timestamp:
//         verified
//           ? "Verified"
//           : undefined,

//       state:
//         verified
//           ? "done"
//           : receipt
//           ? "active"
//           : "pending",

//     },

//   ];

//   return (

//     <div
//       className={cn(
//         "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
//         className,
//       )}
//     >

//       <h3 className="text-sm font-semibold text-zinc-100">

//         Verification Timeline

//       </h3>

//       <ol className="mt-6 space-y-1">

//         {steps.map((step, index) => {

//           const Icon =
//             stepIcons[
//               step.key as keyof typeof stepIcons
//             ];

//           const last =
//             index ===
//             steps.length - 1;

//           return (

//             <li
//               key={step.key}
//               className="relative flex gap-4 pb-6 last:pb-0"
//             >

//               {!last && (

//                 <span
//                   className={cn(
//                     "absolute left-[15px] top-8 h-full w-px",
//                     step.state === "done"
//                       ? "bg-emerald-500/40"
//                       : "bg-white/10",
//                   )}
//                 />

//               )}

//               <div
//                 className={cn(
//                   "z-10 flex h-8 w-8 items-center justify-center rounded-full border",

//                   step.state ===
//                     "done" &&
//                     "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",

//                   step.state ===
//                     "active" &&
//                     "border-amber-500/40 bg-amber-500/15 text-amber-400",

//                   step.state ===
//                     "pending" &&
//                     "border-white/10 bg-white/5 text-zinc-500",
//                 )}
//               >

//                 {step.state ===
//                 "done" ? (

//                   <Check className="h-4 w-4" />

//                 ) : step.state ===
//                   "active" ? (

//                   <Loader2 className="h-4 w-4 animate-spin" />

//                 ) : (

//                   <Icon className="h-4 w-4" />

//                 )}

//               </div>

//               <div className="flex flex-1 items-center justify-between">

//                 <span
//                   className={cn(
//                     "text-sm font-medium",

//                     step.state ===
//                       "pending"
//                       ? "text-zinc-500"
//                       : "text-zinc-100",
//                   )}
//                 >

//                   {step.label}

//                 </span>

//                 <span className="font-mono text-xs text-zinc-500">

//                   {step.timestamp ??
//                     "--"}

//                 </span>

//               </div>

//             </li>

//           );

//         })}

//       </ol>

//     </div>

//   );

// }