import { CheckCircle2, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MatchTicket({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl border border-border p-5 shadow-2xl shadow-black/40',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
          <Radio className="size-3.5" />
          LIVE · 67&apos;
        </span>
        <span className="font-mono text-xs text-muted-foreground">Match #A1F3</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
            ARS
          </div>
          <span className="text-xs text-muted-foreground">Arsenal</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-mono text-3xl font-semibold tracking-tight text-foreground">
            2 : 1
          </div>
          <span className="mt-1 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            Full time soon
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
            CHE
          </div>
          <span className="text-xs text-muted-foreground">Chelsea</span>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Your prediction</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            <CheckCircle2 className="size-3.5" />
            Signed &amp; verified
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-mono text-lg font-semibold text-foreground">2 - 1</span>
          <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            On track
          </span>
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <p className="truncate font-mono text-[0.7rem] text-muted-foreground">
            sig: 0x8f3a…c21d · nonce 4192
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Confidence', value: '94%' },
          { label: 'Rank', value: '#128' },
          { label: 'Points', value: '+30' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card/40 py-2">
            <div className="font-mono text-sm font-semibold text-foreground">{stat.value}</div>
            <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
