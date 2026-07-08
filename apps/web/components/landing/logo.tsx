import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2 4 5.5v5.2c0 4.7 3.2 8.3 8 9.8 4.8-1.5 8-5.1 8-9.8V5.5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m8.5 12 2.4 2.4L15.5 9.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        Finality<span className="text-primary">Arena</span>
      </span>
    </div>
  )
}
