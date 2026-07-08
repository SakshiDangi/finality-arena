import {
  FileSignature,
  Repeat2,
  ScanSearch,
  Scale,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

const features: Feature[] = [
  {
    icon: FileSignature,
    title: 'Signed Predictions',
    description:
      'Every score prediction is signed with your private key, producing a tamper-proof cryptographic commitment before kickoff.',
    className: 'lg:col-span-2',
  },
  {
    icon: Repeat2,
    title: 'Replay Protection',
    description:
      'Per-prediction nonces guarantee each signature is used exactly once — no duplicates, no manipulation.',
  },
  {
    icon: ScanSearch,
    title: 'Verification',
    description:
      'Anyone can independently verify a signature against the public key. Trust is math, not middlemen.',
  },
  {
    icon: Scale,
    title: 'Transparent Settlement',
    description:
      'Predictions settle deterministically against the official final score. Results are auditable end to end.',
    className: 'lg:col-span-2',
  },
  {
    icon: Trophy,
    title: 'Leaderboard',
    description:
      'Accurate predictions climb a provably fair leaderboard ranked on verified, immutable records.',
    className: 'lg:col-span-3',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">The protocol</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built on cryptographic trust
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Finality Arena replaces blind trust with verifiable proof at every stage
            of the prediction lifecycle.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-primary/40',
                feature.className,
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
