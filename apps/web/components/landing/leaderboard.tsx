import { Crown, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type Player = {
  rank: number
  name: string
  handle: string
  accuracy: string
  points: number
}

const players: Player[] = [
  { rank: 1, name: 'Nadia K.', handle: '0x7f…a01c', accuracy: '92%', points: 4820 },
  { rank: 2, name: 'Marco V.', handle: '0x3b…9d4e', accuracy: '89%', points: 4610 },
  { rank: 3, name: 'Priya S.', handle: '0xc2…17ff', accuracy: '87%', points: 4390 },
  { rank: 4, name: 'Tomas R.', handle: '0x9a…5b22', accuracy: '84%', points: 4155 },
  { rank: 5, name: 'Lena M.', handle: '0x1e…c8a7', accuracy: '82%', points: 3980 },
]

export function Leaderboard() {
  return (
    <section id="leaderboard" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-medium text-primary">Provably fair</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Top predictors
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Ranked entirely on verified, immutable prediction records.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card/50">
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 border-b border-border px-5 py-3 text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            <span>Rank</span>
            <span>Predictor</span>
            <span className="text-right">Accuracy</span>
            <span className="text-right">Points</span>
          </div>

          {players.map((player) => (
            <div
              key={player.rank}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 transition-colors hover:bg-muted/40"
            >
              <div
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg font-mono text-sm font-semibold',
                  player.rank === 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground',
                )}
              >
                {player.rank === 1 ? <Crown className="size-4" /> : player.rank}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {player.name}
                  </span>
                  <ShieldCheck className="size-3.5 shrink-0 text-primary" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {player.handle}
                </span>
              </div>

              <span className="text-right font-mono text-sm text-muted-foreground">
                {player.accuracy}
              </span>
              <span className="text-right font-mono text-sm font-semibold text-foreground">
                {player.points.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
