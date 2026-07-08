"use client";

import { useState } from "react";

import {
  Check,
  Clock,
  Copy,
  Cpu,
  Fingerprint,
  Loader2,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  Prediction,
} from "@finality/shared";

import type {
  FinalityReceipt,
} from "@finality/finality";

/* ============================================================================
 * Props
 * ========================================================================== */

interface SignatureCardProps {

  prediction?: Prediction;

  receipt?: FinalityReceipt;

  className?: string;

}

/* ============================================================================
 * Helpers
 * ========================================================================== */

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

function formatTimestamp(

  value?: string,

) {

  if (!value) {

    return "--";

  }

  return new Date(
    value,
  ).toLocaleString();

}

/* ============================================================================
 * Component
 * ========================================================================== */

export default function SignatureCard({

  prediction,

  receipt,

  className,

}: SignatureCardProps) {

  const [

    copied,

    setCopied,

  ] = useState(false);

  const signature =
    prediction?.signature;

  const digest =
    receipt?.digest;

  async function copyDigest() {

    if (!digest) {

      return;

    }

    await navigator.clipboard.writeText(
      digest,
    );

    setCopied(
      true,
    );

    setTimeout(

      () => {

        setCopied(
          false,
        );

      },

      1500,

    );

  }

  const signed =
    signature !==
    undefined;

  return (

    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl",
        className,
      )}
    >

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Fingerprint className="h-5 w-5 text-emerald-400" />

          <div>

            <h3 className="font-semibold text-white">

              Digital Signature

            </h3>

            <p className="text-xs text-zinc-500">

              Cryptographic proof of prediction

            </p>

          </div>

        </div>

        <span
          className={cn(

            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",

            signed

              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"

              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",

          )}
        >

          {signed

            ? (

              <ShieldCheck className="h-3 w-3" />

            )

            : (

              <Loader2 className="h-3 w-3 animate-spin" />

            )}

          {signed

            ? "Signed"

            : "Waiting"}

        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">

          <span className="text-xs uppercase tracking-wider text-zinc-500">

            Canonical Digest

          </span>

          <button

            type="button"

            disabled={!digest}

            onClick={copyDigest}

            className="flex items-center gap-2 text-xs text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"

          >

            {copied

              ? (

                <>

                  <Check className="h-3 w-3" />

                  Copied

                </>

              )

              : (

                <>

                  <Copy className="h-3 w-3" />

                  Copy

                </>

              )}

          </button>

        </div>

        <code className="block break-all rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-xs text-emerald-300">

          {digest ??

            "Waiting for Finality receipt..."}

        </code>

      </div>

      <div className="mt-6 space-y-3">

        <DetailRow

          icon={<Wallet className="h-4 w-4" />}

          label="Wallet"

          value={shorten(
            signature?.signer,
          )}

        />

        <DetailRow

          icon={<Cpu className="h-4 w-4" />}

          label="Algorithm"

          value={
            signature?.algorithm ??
            "--"
          }

        />

        <DetailRow

          icon={<Clock className="h-4 w-4" />}

          label="Signed At"

          value={formatTimestamp(
            signature?.signedAt,
          )}

        />

      </div>

    </div>

  );

}

/* ============================================================================
 * Detail Row
 * ========================================================================== */

interface DetailRowProps {

  icon: React.ReactNode;

  label: string;

  value: string;

}

function DetailRow({

  icon,

  label,

  value,

}: DetailRowProps) {

  return (

    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">

      <div className="flex items-center gap-2 text-xs text-zinc-500">

        {icon}

        {label}

      </div>

      <span className="font-mono text-xs text-zinc-300">

        {value}

      </span>

    </div>

  );

}



// "use client";

// import { useState } from "react";

// import {
//   Check,
//   Copy,
//   Cpu,
//   Fingerprint,
//   ShieldCheck,
//   Wallet,
//   Clock,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// import type {
//   Prediction,
// } from "@finality/shared";

// import type {
//   FinalityReceipt,
// } from "@finality/finality";

// interface SignatureCardProps {

//   prediction?: Prediction;

//   receipt?: FinalityReceipt;

//   className?: string;

// }

// function truncate(
//   value: string,
//   head = 10,
//   tail = 8,
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

// export default function SignatureCard({

//   prediction,

//   receipt,

//   className,

// }: SignatureCardProps) {

//   const [

//     copied,

//     setCopied,

//   ] =
//     useState(false);

//   const signature =
//     prediction?.signature;

//   const digest =
//     receipt?.digest ??
//     "Pending";

//   const wallet =
//     signature?.signer ??
//     "Unknown";

//   const algorithm =
//     signature?.algorithm ??
//     "Pending";

//   const signedAt =
//     signature?.signedAt ??
//     "--";

//   async function copyDigest() {

//     if (
//       !receipt?.digest
//     ) {

//       return;

//     }

//     await navigator.clipboard.writeText(
//       receipt.digest,
//     );

//     setCopied(
//       true,
//     );

//     setTimeout(
//       () =>
//         setCopied(
//           false,
//         ),
//       1500,
//     );

//   }

//   return (

//     <div
//       className={cn(
//         "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl",
//         className,
//       )}
//     >

//       <div className="flex items-center justify-between">

//         <div className="flex items-center gap-3">

//           <Fingerprint className="h-5 w-5 text-emerald-400" />

//           <div>

//             <h3 className="font-semibold text-zinc-100">

//               Digital Signature

//             </h3>

//             <p className="text-xs text-zinc-500">

//               Generated by Finality

//             </p>

//           </div>

//         </div>

//         <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">

//           <ShieldCheck className="h-3 w-3" />

//           {signature
//             ? "Signed"
//             : "Pending"}

//         </span>

//       </div>

//       <div className="mt-6">

//         <div className="mb-2 flex items-center justify-between">

//           <span className="text-xs uppercase tracking-wider text-zinc-500">

//             Digest

//           </span>

//           <button
//             onClick={
//               copyDigest
//             }
//             type="button"
//             className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
//           >

//             {copied ? (

//               <>

//                 <Check className="h-3 w-3" />

//                 Copied

//               </>

//             ) : (

//               <>

//                 <Copy className="h-3 w-3" />

//                 Copy

//               </>

//             )}

//           </button>

//         </div>

//         <code className="block break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs text-emerald-300">

//           {digest}

//         </code>

//       </div>

//       <div className="mt-6 space-y-3">

//         <Row
//           icon={
//             <Wallet className="h-4 w-4" />
//           }
//           label="Wallet"
//           value={
//             truncate(
//               wallet,
//             )
//           }
//         />

//         <Row
//           icon={
//             <Cpu className="h-4 w-4" />
//           }
//           label="Algorithm"
//           value={
//             algorithm
//           }
//         />

//         <Row
//           icon={
//             <Clock className="h-4 w-4" />
//           }
//           label="Signed At"
//           value={
//             signedAt
//           }
//         />

//       </div>

//     </div>

//   );

// }

// interface RowProps {

//   icon: React.ReactNode;

//   label: string;

//   value: string;

// }

// function Row({

//   icon,

//   label,

//   value,

// }: RowProps) {

//   return (

//     <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">

//       <div className="flex items-center gap-2 text-xs text-zinc-500">

//         {icon}

//         {label}

//       </div>

//       <span className="font-mono text-xs text-zinc-300">

//         {value}

//       </span>

//     </div>

//   );

// }