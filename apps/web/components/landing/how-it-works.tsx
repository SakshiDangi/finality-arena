import {
  ClipboardCheck,
  Database,
  PenLine,
  ShieldCheck,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react'

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Target,
    title: 'Predict',
    description: 'Choose a match and commit to an exact final score.',
  },
  {
    icon: PenLine,
    title: 'Sign',
    description: 'Your prediction is signed with your private key.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify',
    description: 'The signature is validated against your public key.',
  },
  {
    icon: Database,
    title: 'Store',
    description: 'The verified prediction is stored immutably.',
  },
  {
    icon: ClipboardCheck,
    title: 'Settle',
    description: 'Predictions settle against the official final score.',
  },
  {
    icon: Trophy,
    title: 'Leaderboard',
    description: 'Verified results update the fair leaderboard.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-64 max-w-3xl -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">How it works</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The verification protocol
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Six deterministic stages take a prediction from intent to a provably
            fair leaderboard position.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border bg-card/50 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <step.icon className="size-5" />
                </div>
                <span className="font-mono text-sm text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
