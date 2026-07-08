import { CheckCircle2, Clock, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Match = {
  id: string
  home: string
  away: string
  score: string
  minute: string
  status: 'live' | 'upcoming'
  prediction: string
  predictionState: 'Signed' | 'Verified' | 'Open'
}

const matches: Match[] = [
  {
    id: 'A1F3',
    home: 'ARS',
    away: 'CHE',
    score: '2 : 1',
    minute: "67'",
    status: 'live',
    prediction: '2 - 1',
    predictionState: 'Verified',
  },
  {
    id: 'B7K2',
    home: 'BAR',
    away: 'RMA',
    score: '0 : 0',
    minute: 'Kickoff 20:45',
    status: 'upcoming',
    prediction: '1 - 2',
    predictionState: 'Signed',
  },
  {
    id: 'C4M9',
    home: 'MUN',
    away: 'LIV',
    score: '1 : 3',
    minute: "82'",
    status: 'live',
    prediction: '1 - 2',
    predictionState: 'Verified',
  },
]

const stateStyles: Record<Match['predictionState'], string> = {
  Verified: 'bg-primary/15 text-primary',
  Signed: 'bg-chart-2/15 text-chart-2',
  Open: 'bg-muted text-muted-foreground',
}

export function LiveMatches() {
  return (
    <section id="matches" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-medium text-primary">Live now</span>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Matches &amp; predictions
            </h2>
          </div>
          <Button variant="outline" size="sm">
            View all matches
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {matches.map((match) => (
            <article
              key={match.id}
              className="rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                {match.status === 'live' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-2.5 py-1 text-xs font-medium text-destructive">
                    <Radio className="size-3.5" />
                    LIVE · {match.minute}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <Clock className="size-3.5" />
                    {match.minute}
                  </span>
                )}
                <span className="font-mono text-xs text-muted-foreground">
                  #{match.id}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="flex-1 text-center text-sm font-semibold text-foreground">
                  {match.home}
                </span>
                <span className="px-3 font-mono text-2xl font-semibold tracking-tight text-foreground">
                  {match.score}
                </span>
                <span className="flex-1 text-center text-sm font-semibold text-foreground">
                  {match.away}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                    Your prediction
                  </p>
                  <p className="font-mono text-base font-semibold text-foreground">
                    {match.prediction}
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium',
                    stateStyles[match.predictionState],
                  )}
                >
                  <CheckCircle2 className="size-3.5" />
                  {match.predictionState}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
