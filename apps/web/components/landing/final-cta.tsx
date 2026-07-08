import { ArrowRight, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          </div>

          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Make your first verifiable prediction
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
            Connect your wallet, sign a score, and prove your football instincts on a
            transparent, immutable ledger.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-5 text-sm">
              Start predicting
              <ArrowRight />
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-5 text-sm">
              <Wallet />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
