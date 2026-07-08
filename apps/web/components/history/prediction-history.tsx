"use client"

import { useMemo, useState } from "react"
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  Check,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type PredictionStatus = "Won" | "Lost" | "Pending"

export interface PredictionHistoryRow {
  id: string
  homeTeam: string
  awayTeam: string
  league?: string
  prediction: string
  signatureHash: string
  verified: boolean
  points: number
  status: PredictionStatus
  date: string
}

export interface PredictionHistoryProps {
  rows?: PredictionHistoryRow[]
  title?: string
  className?: string
}

const DEFAULT_ROWS: PredictionHistoryRow[] = [
  {
    id: "1",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    league: "Premier League",
    prediction: "2 - 1",
    signatureHash: "0x8f3a9c2b7e1d4f60a5c8b3e2d1f9a7c6b4e8d2f1",
    verified: true,
    points: 30,
    status: "Won",
    date: "2026-05-12",
  },
  {
    id: "2",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    league: "La Liga",
    prediction: "1 - 3",
    signatureHash: "0x2d1f9a7c6b4e8d2f18f3a9c2b7e1d4f60a5c8b3e",
    verified: true,
    points: 0,
    status: "Lost",
    date: "2026-05-10",
  },
  {
    id: "3",
    homeTeam: "Bayern",
    awayTeam: "Dortmund",
    league: "Bundesliga",
    prediction: "2 - 2",
    signatureHash: "0x7e1d4f60a5c8b3e2d1f9a7c6b4e8d2f18f3a9c2b",
    verified: false,
    points: 0,
    status: "Pending",
    date: "2026-05-14",
  },
  {
    id: "4",
    homeTeam: "Inter",
    awayTeam: "Juventus",
    league: "Serie A",
    prediction: "0 - 0",
    signatureHash: "0xb4e8d2f18f3a9c2b7e1d4f60a5c8b3e2d1f9a7c6",
    verified: true,
    points: 15,
    status: "Won",
    date: "2026-05-08",
  },
  {
    id: "5",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    league: "Ligue 1",
    prediction: "3 - 1",
    signatureHash: "0xa5c8b3e2d1f9a7c6b4e8d2f18f3a9c2b7e1d4f60",
    verified: true,
    points: 30,
    status: "Won",
    date: "2026-05-06",
  },
]

const STATUS_STYLES: Record<PredictionStatus, string> = {
  Won: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Lost: "border-red-500/30 bg-red-500/10 text-red-400",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
}

const STATUS_ICON: Record<PredictionStatus, typeof CheckCircle2> = {
  Won: CheckCircle2,
  Lost: XCircle,
  Pending: Clock,
}

function truncateHash(hash: string) {
  if (hash.length <= 14) return hash
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`
}

export default function PredictionHistory({
  rows = DEFAULT_ROWS,
  title = "Prediction History",
  className,
}: PredictionHistoryProps) {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [verifiedFilter, setVerifiedFilter] = useState<string>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      const matchesQuery =
        !q ||
        row.homeTeam.toLowerCase().includes(q) ||
        row.awayTeam.toLowerCase().includes(q) ||
        row.league?.toLowerCase().includes(q) ||
        row.signatureHash.toLowerCase().includes(q)
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter
      const matchesVerified =
        verifiedFilter === "all" ||
        (verifiedFilter === "verified" ? row.verified : !row.verified)
      return matchesQuery && matchesStatus && matchesVerified
    })
  }, [rows, query, statusFilter, verifiedFilter])

  async function handleCopy(row: PredictionHistoryRow) {
    try {
      await navigator.clipboard.writeText(row.signatureHash)
      setCopiedId(row.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {rows.length} predictions
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search teams or hash..."
              className="w-full border-white/10 bg-white/[0.04] pl-9 text-foreground placeholder:text-muted-foreground sm:w-56"
            />
          </div>

          <Select value={statusFilter} onValueChange={(value) => {setStatusFilter(value ?? "all")}}>
            <SelectTrigger className="w-full border-white/10 bg-white/[0.04] text-foreground sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Won">Won</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={verifiedFilter} onValueChange={(value) => {setVerifiedFilter(value ?? "all")}}>
            <SelectTrigger className="w-full border-white/10 bg-white/[0.04] text-foreground sm:w-36">
              <SelectValue placeholder="Verified" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Match</TableHead>
              <TableHead className="text-muted-foreground">Prediction</TableHead>
              <TableHead className="text-muted-foreground">Signature</TableHead>
              <TableHead className="text-muted-foreground">Verified</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Points
              </TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  No predictions match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row) => {
                const StatusIcon = STATUS_ICON[row.status]
                return (
                  <TableRow
                    key={row.id}
                    className="border-white/10 transition-colors hover:bg-white/[0.04]"
                  >
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {row.homeTeam}{" "}
                        <span className="text-muted-foreground">vs</span>{" "}
                        {row.awayTeam}
                      </div>
                      {row.league ? (
                        <div className="text-xs text-muted-foreground">
                          {row.league}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                        {row.prediction}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => handleCopy(row)}
                        className="group inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                        title="Copy signature hash"
                      >
                        {truncateHash(row.signatureHash)}
                        {copiedId === row.id ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      {row.verified ? (
                        <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
                          <ShieldCheck className="h-4 w-4" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                          <ShieldAlert className="h-4 w-4" />
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold tabular-nums",
                          row.points > 0
                            ? "text-emerald-400"
                            : "text-muted-foreground",
                        )}
                      >
                        {row.points > 0 ? `+${row.points}` : row.points}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "gap-1 font-medium",
                          STATUS_STYLES[row.status],
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(row.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
