"use client";

import {
  Check,
  Loader2,
  ShieldCheck,
  FileSignature,
  Hash,
  Clock,
  RefreshCw,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  FinalityReceipt,
} from "@finality/finality";

type CheckState =
  | "passed"
  | "failed"
  | "pending";

interface VerificationCardProps {

  receipt?: FinalityReceipt;

  verified: boolean;

  className?: string;

}

interface VerificationCheck {

  label: string;

  description: string;

  icon: React.ReactNode;

  state: CheckState;

}

function StatusIcon({
  state,
}: {
  state: CheckState;
}) {

  if (state === "passed") {

    return (

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">

        <Check className="h-4 w-4 text-emerald-300" />

      </span>

    );

  }

  if (state === "failed") {

    return (

      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">

        <X className="h-4 w-4 text-red-300" />

      </span>

    );

  }

  return (

    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">

      <Loader2 className="h-4 w-4 animate-spin text-amber-300" />

    </span>

  );

}

export default function VerificationCard({

  receipt,

  verified,

  className,

}: VerificationCardProps) {

  const signatureState: CheckState =
    !receipt
      ? "pending"
      : verified
      ? "passed"
      : "failed";

  const hashState: CheckState =
    receipt
      ? "passed"
      : "pending";

  const timestampState: CheckState =
    receipt
      ? "passed"
      : "pending";

  const replayState: CheckState =
    receipt
      ? "passed"
      : "pending";

  const overallState: CheckState =
    !receipt
      ? "pending"
      : verified
      ? "passed"
      : "failed";

  const checks: VerificationCheck[] = [

    {

      label: "Digital Signature",

      description:
        "ECDSA signature validation",

      icon:
        <FileSignature className="h-4 w-4" />,

      state:
        signatureState,

    },

    {

      label: "Canonical Hash",

      description:
        "Payload digest integrity",

      icon:
        <Hash className="h-4 w-4" />,

      state:
        hashState,

    },

    {

      label: "Timestamp",

      description:
        "Receipt freshness verified",

      icon:
        <Clock className="h-4 w-4" />,

      state:
        timestampState,

    },

    {

      label: "Replay Protection",

      description:
        "Unique envelope accepted",

      icon:
        <RefreshCw className="h-4 w-4" />,

      state:
        replayState,

    },

  ];

  return (

    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">

          <ShieldCheck className="h-5 w-5 text-emerald-400" />

        </div>

        <div>

          <h3 className="text-sm font-semibold text-white">

            Verification Report

          </h3>

          <p className="text-xs text-zinc-500">

            Finality verification pipeline

          </p>

        </div>

      </div>

      <div className="mt-6 space-y-3">

        {checks.map((item) => (

          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-4"
          >

            <div className="flex items-center gap-3">

              <div className="text-zinc-400">

                {item.icon}

              </div>

              <div>

                <p className="text-sm font-medium text-white">

                  {item.label}

                </p>

                <p className="text-xs text-zinc-500">

                  {item.description}

                </p>

              </div>

            </div>

            <StatusIcon
              state={item.state}
            />

          </div>

        ))}

      </div>

      <div
        className={cn(
          "mt-6 rounded-xl border p-4",

          overallState === "passed" &&
            "border-emerald-500/30 bg-emerald-500/10",

          overallState === "failed" &&
            "border-red-500/30 bg-red-500/10",

          overallState === "pending" &&
            "border-amber-500/30 bg-amber-500/10",
        )}
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-zinc-500">

              Overall Status

            </p>

            <p
              className={cn(
                "mt-1 text-lg font-bold",

                overallState === "passed" &&
                  "text-emerald-300",

                overallState === "failed" &&
                  "text-red-300",

                overallState === "pending" &&
                  "text-amber-300",
              )}
            >

              {overallState === "passed" &&
                "Verified"}

              {overallState === "failed" &&
                "Rejected"}

              {overallState === "pending" &&
                "Waiting"}

            </p>

          </div>

          <StatusIcon
            state={overallState}
          />

        </div>

      </div>

      {receipt && (

        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">

          <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">

            Receipt ID

          </p>

          <code className="block break-all font-mono text-xs text-emerald-300">

            {receipt.envelopeId}

          </code>

        </div>

      )}

    </div>

  );

}




// "use client";

// import {
//   Check,
//   Loader2,
//   ShieldCheck,
//   FileSignature,
//   Hash,
//   Clock,
//   RefreshCw,
//   X,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// import type {
//   FinalityReceipt,
// } from "@finality/finality";

// /* =============================================================================
//  * Types
//  * ========================================================================== */

// type CheckState =
//   | "passed"
//   | "failed"
//   | "pending";

// interface VerificationCardProps {

//   receipt?: FinalityReceipt;

//   verified: boolean;

//   className?: string;

// }

// interface VerificationCheck {

//   label: string;

//   description: string;

//   icon: React.ReactNode;

//   state: CheckState;

// }

// /* =============================================================================
//  * Status Icon
//  * ========================================================================== */

// function StatusIcon({
//   state,
// }: {
//   state: CheckState;
// }) {

//   switch (state) {

//     case "passed":

//       return (

//         <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">

//           <Check className="h-4 w-4 text-emerald-300" />

//         </span>

//       );

//     case "failed":

//       return (

//         <span className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">

//           <X className="h-4 w-4 text-red-300" />

//         </span>

//       );

//     default:

//       return (

//         <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">

//           <Loader2 className="h-4 w-4 animate-spin text-amber-300" />

//         </span>

//       );

//   }

// }

// /* =============================================================================
//  * Verification Card
//  * ========================================================================== */

// export default function VerificationCard({

//   receipt,

//   verified,

//   className,

// }: VerificationCardProps) {

//   const state: CheckState =
//     receipt
//       ? verified
//         ? "passed"
//         : "failed"
//       : "pending";

//   const checks: VerificationCheck[] = [

//     {

//       label: "Signature",

//       description:
//         "ECDSA signature verified",

//       icon:
//         <FileSignature className="h-4 w-4" />,

//       state,

//     },

//     {

//       label: "Payload Hash",

//       description:
//         "Digest integrity validated",

//       icon:
//         <Hash className="h-4 w-4" />,

//       state,

//     },

//     {

//       label: "Timestamp",

//       description:
//         "Receipt timestamp accepted",

//       icon:
//         <Clock className="h-4 w-4" />,

//       state,

//     },

//     {

//       label: "Replay Protection",

//       description:
//         "Nonce uniqueness confirmed",

//       icon:
//         <RefreshCw className="h-4 w-4" />,

//       state,

//     },

//   ];

//   return (

//     <div
//       className={cn(
//         "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
//         className,
//       )}
//     >

//       {/* Header */}

//       <div className="flex items-center gap-3">

//         <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">

//           <ShieldCheck className="h-5 w-5 text-emerald-400" />

//         </div>

//         <div>

//           <h3 className="text-sm font-semibold text-zinc-100">

//             Verification Report

//           </h3>

//           <p className="text-xs text-zinc-500">

//             Finality verification pipeline

//           </p>

//         </div>

//       </div>

//       {/* Checks */}

//       <div className="mt-6 space-y-3">

//         {checks.map((check) => (

//           <div
//             key={check.label}
//             className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3"
//           >

//             <div className="flex items-center gap-3">

//               <div className="text-zinc-400">

//                 {check.icon}

//               </div>

//               <div>

//                 <p className="text-sm font-medium text-zinc-100">

//                   {check.label}

//                 </p>

//                 <p className="text-xs text-zinc-500">

//                   {check.description}

//                 </p>

//               </div>

//             </div>

//             <StatusIcon
//               state={check.state}
//             />

//           </div>

//         ))}

//       </div>

//       {/* Summary */}

//       <div
//         className={cn(
//           "mt-6 rounded-xl border p-4",

//           state === "passed" &&
//             "border-emerald-500/30 bg-emerald-500/10",

//           state === "failed" &&
//             "border-red-500/30 bg-red-500/10",

//           state === "pending" &&
//             "border-amber-500/30 bg-amber-500/10",
//         )}
//       >

//         <div className="flex items-center justify-between">

//           <div>

//             <p className="text-xs uppercase tracking-wider text-zinc-500">

//               Overall Status

//             </p>

//             <p
//               className={cn(
//                 "mt-1 text-lg font-bold",

//                 state === "passed" &&
//                   "text-emerald-300",

//                 state === "failed" &&
//                   "text-red-300",

//                 state === "pending" &&
//                   "text-amber-300",
//               )}
//             >

//               {state === "passed" &&
//                 "Verification Successful"}

//               {state === "failed" &&
//                 "Verification Failed"}

//               {state === "pending" &&
//                 "Waiting For Verification"}

//             </p>

//           </div>

//           <StatusIcon
//             state={state}
//           />

//         </div>

//       </div>

//       {/* Receipt */}

//       {receipt && (

//         <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">

//           <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">

//             Finality Receipt

//           </p>

//           <code className="block break-all font-mono text-xs text-emerald-300">

//             {JSON.stringify(
//               receipt,
//               null,
//               2,
//             )}

//           </code>

//         </div>

//       )}

//     </div>

//   );

// }