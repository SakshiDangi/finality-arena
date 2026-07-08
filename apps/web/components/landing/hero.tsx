import { ArrowRight, BadgeCheck, Fingerprint, Lock, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MatchTicket } from './match-ticket'

const trustBadges = [
  { icon: ShieldCheck, label: 'ECDSA Signed' },
  { icon: Lock, label: 'Replay Protected' },
  { icon: Fingerprint, label: 'Immutable Records' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      {/* Background gradients */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute top-40 -right-32 h-[360px] w-[360px] rounded-full bg-chart-2/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,var(--color-background)_78%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <BadgeCheck className="size-3.5 text-primary" />
            Cryptographically verifiable predictions
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Football predictions{' '}
            <span className="text-primary">you can trust</span>
          </h1>

          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Predict match scores, sign them cryptographically, and settle against
            the final whistle. Every prediction is verified, immutable, and provably
            yours — no betting, just proof.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-5 text-sm">
              Start predicting
              <ArrowRight />
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-5 text-sm">
              View live matches
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="size-4 text-primary" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Live match dashboard */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl"
          />
          <MatchTicket className="animate-fa-float" />
        </div>
      </div>
    </section>
  )
}
