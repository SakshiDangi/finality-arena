"use client";

import {
  BadgeCheck,
  Copy,
 Fingerprint,
 Hash,
 ShieldAlert,
 ShieldCheck,
 Signature,
 Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type {
  Match,
  Prediction,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "@finality/finality";

type VerificationState =
  | "verified"
  | "pending"
  | "failed";

interface PredictionSummaryProps {

  match: Match;

  prediction?: Prediction;

  receipt?: FinalityReceipt;

  verified: boolean;

  className?: string;

}

const verificationConfig = {

  verified: {

    label: "Verified",

    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",

    icon: BadgeCheck,

  },

  pending: {

    label: "Pending",

    className:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",

    icon: ShieldAlert,

  },

  failed: {

    label: "Failed",

    className:
      "border-red-500/30 bg-red-500/10 text-red-300",

    icon: ShieldAlert,

  },

} satisfies Record<
  VerificationState,
  {
    label: string;
    className: string;
    icon: typeof ShieldCheck;
  }
>;

function shorten(
  value?: string,
  head = 10,
  tail = 8,
) {

  if (!value) {

    return "-";

  }

  if (
    value.length <=
    head + tail
  ) {

    return value;

  }

  return `${value.slice(
    0,
    head,
  )}...${value.slice(
    -tail,
  )}`;

}

function Row({

  icon: Icon,

  label,

  value,

}: {

  icon: typeof Hash;

  label: string;

  value: React.ReactNode;

}) {

  return (

    <div className="flex items-center justify-between py-3">

      <div className="flex items-center gap-2 text-sm text-zinc-400">

        <Icon className="h-4 w-4" />

        {label}

      </div>

      <div>

        {value}

      </div>

    </div>

  );

}

export default function PredictionSummary({

  match,

  prediction,

  receipt,

  verified,

  className,

}: PredictionSummaryProps) {

  const state: VerificationState =

    verified
      ? "verified"
      : receipt
      ? "pending"
      : "failed";

  const config =
    verificationConfig[
      state
    ];

  const StatusIcon =
    config.icon;

  async function copyDigest() {

    if (!receipt?.digest) {

      return;

    }

    await navigator.clipboard.writeText(
      receipt.digest,
    );

  }

  return (

    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur",
        className,
      )}
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Signature className="h-5 w-5 text-emerald-400" />

          <h2 className="font-semibold">

            Prediction Summary

          </h2>

        </div>

        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
            config.className,
          )}
        >

          <StatusIcon className="h-3 w-3" />

          {config.label}

        </span>

      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">

        <div className="flex items-center justify-between">

          <span>

            {match.homeTeam.name}

          </span>

          <span className="rounded-lg bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-300">

            {prediction?.outcome ?? "-"}

          </span>

          <span>

            {match.awayTeam.name}

          </span>

        </div>

      </div>

      <Separator className="my-6" />

      <div className="divide-y divide-white/10">

        <Row

          icon={Fingerprint}

          label="Wallet"

          value={

            <code className="font-mono text-xs text-emerald-300">

              {shorten(
                prediction?.player.wallet,
              )}

            </code>

          }

        />

        <Row

          icon={Signature}

          label="Signature"

          value={

            <code className="font-mono text-xs text-emerald-300">

              {shorten(
                prediction?.signature?.signature,
              )}

            </code>

          }

        />

        <Row

          icon={BadgeCheck}

          label="Envelope"

          value={

            <code className="font-mono text-xs">

              {shorten(
                receipt?.envelopeId,
              )}

            </code>

          }

        />

        <Row

          icon={Clock}

          label="Signed"

          value={

            prediction?.signature

              ? new Date(
                  prediction.signature.signedAt,
                ).toLocaleString()

              : "-"

          }

        />

        <Row

          icon={ShieldCheck}

          label="Replay Protection"

          value={

            <span className="text-emerald-400">

              Enabled

            </span>

          }

        />

      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">

        <div className="mb-3 flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500">

            <Hash className="h-4 w-4" />

            Canonical Digest

          </div>

          <Button

            variant="ghost"

            size="icon"

            disabled={!receipt}

            onClick={copyDigest}

          >

            <Copy className="h-4 w-4" />

          </Button>

        </div>

        <code className="block break-all font-mono text-xs text-zinc-400">

          {receipt?.digest ??
            "Waiting for Finality receipt..."}

        </code>

      </div>

    </div>

  );

}




// "use client";

// import {
//   BadgeCheck,
//   Copy,
//   Fingerprint,
//   Hash,
//   ShieldAlert,
//   ShieldCheck,
//   Signature,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// import type {
//   Match,
//   Prediction,
// } from "@finality/shared";

// import type {
//   FinalityReceipt,
// } from "@finality/finality";

// type VerificationState =
//   | "verified"
//   | "pending"
//   | "failed";

// export interface PredictionSummaryProps {

//   match: Match;

//   prediction?: Prediction;

//   receipt?: FinalityReceipt;

//   verified: boolean;

//   className?: string;

// }

// const verificationConfig: Record<
//   VerificationState,
//   {
//     label: string;
//     className: string;
//     icon: typeof ShieldCheck;
//   }
// > = {

//   verified: {

//     label: "Verified",

//     className:
//       "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",

//     icon: BadgeCheck,

//   },

//   pending: {

//     label: "Pending",

//     className:
//       "border-amber-400/30 bg-amber-400/10 text-amber-300",

//     icon: ShieldAlert,

//   },

//   failed: {

//     label: "Failed",

//     className:
//       "border-red-400/30 bg-red-400/10 text-red-300",

//     icon: ShieldAlert,

//   },

// };

// function truncateMiddle(
//   value: string,
//   head = 12,
//   tail = 10,
// ) {

//   if (
//     value.length <=
//     head + tail
//   ) {

//     return value;

//   }

//   return `${value.slice(
//     0,
//     head,
//   )}...${value.slice(
//     -tail,
//   )}`;

// }

// function Row({
//   icon: Icon,
//   label,
//   children,
// }: {
//   icon: typeof Hash;
//   label: string;
//   children: React.ReactNode;
// }) {

//   return (

//     <div className="flex items-center justify-between gap-4 py-3">

//       <div className="flex items-center gap-2 text-sm text-zinc-400">

//         <Icon className="h-4 w-4 text-zinc-500" />

//         {label}

//       </div>

//       <div className="text-right">

//         {children}

//       </div>

//     </div>

//   );

// }

// export default function PredictionSummary({

//   match,

//   prediction,

//   receipt,

//   verified,

//   className,

// }: PredictionSummaryProps) {

//   const state: VerificationState =
//     verified
//       ? "verified"
//       : receipt
//       ? "pending"
//       : "failed";

//   const config =
//     verificationConfig[
//       state
//     ];

//   const StatusIcon =
//     config.icon;

//   async function copyDigest() {

//     if (!receipt?.digest) {

//       return;

//     }

//     await navigator.clipboard.writeText(
//       receipt.digest,
//     );

//   }

//   return (

//     <div
//       className={cn(
//         "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
//         className,
//       )}
//     >

//       <div className="flex items-center justify-between">

//         <div className="flex items-center gap-2">

//           <Signature className="h-4 w-4 text-emerald-400" />

//           <h3 className="text-sm font-semibold text-zinc-100">

//             Prediction Summary

//           </h3>

//         </div>

//         <span
//           className={cn(
//             "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
//             config.className,
//           )}
//         >

//           <StatusIcon className="h-3 w-3" />

//           {config.label}

//         </span>

//       </div>

//       <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">

//         <div className="flex items-center justify-between">

//           <span className="font-medium text-zinc-200">

//             {match.homeTeam.name}

//           </span>

//           <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">

//             {prediction?.outcome ?? "-"}

//           </span>

//           <span className="font-medium text-zinc-200">

//             {match.awayTeam.name}

//           </span>

//         </div>

//       </div>

//       <Separator className="my-5 bg-white/10" />

//       <div className="divide-y divide-white/5">

//         <Row
//           icon={Fingerprint}
//           label="Wallet"
//         >

//           <code className="font-mono text-xs text-emerald-300">

//             {prediction
//               ? truncateMiddle(
//                   prediction.player.wallet,
//                 )
//               : "-"}

//           </code>

//         </Row>

//         <Row
//           icon={Signature}
//           label="Signature"
//         >

//           <code className="font-mono text-xs text-emerald-300">

//             {prediction?.signature
//               ? truncateMiddle(
//                   prediction.signature.signature,
//                 )
//               : "Not Signed"}

//           </code>

//         </Row>

//         <Row
//           icon={BadgeCheck}
//           label="Envelope"

//         >

//           <code className="font-mono text-xs text-zinc-300">

//             {receipt
//               ? truncateMiddle(
//                   receipt.envelopeId,
//                 )
//               : "-"}

//           </code>

//         </Row>

//         <Row
//           icon={ShieldCheck}
//           label="Replay Protection"

//         >

//           <span className="text-sm text-emerald-300">

//             Enabled

//           </span>

//         </Row>

//       </div>

//       <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">

//         <div className="mb-3 flex items-center justify-between">

//           <span className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">

//             <Hash className="h-4 w-4" />

//             Canonical Digest

//           </span>

//           <Button
//             size="icon"
//             variant="ghost"
//             onClick={copyDigest}
//             disabled={!receipt}
//           >

//             <Copy className="h-4 w-4" />

//           </Button>

//         </div>

//         <code className="block break-all font-mono text-xs leading-relaxed text-zinc-400">

//           {receipt?.digest ??
//             "Waiting for Finality receipt..."}

//         </code>

//       </div>

//     </div>

//   );

// }