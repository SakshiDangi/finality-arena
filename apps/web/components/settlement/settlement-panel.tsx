"use client";

import { useState } from "react";

import {
  Loader2,
  Trophy,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

interface SettlementPanelProps {
  matchId: string;
}

export default function SettlementPanel({
  matchId,
}: SettlementPanelProps) {

  const [homeScore, setHomeScore] =
    useState(0);

  const [awayScore, setAwayScore] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function runSettlement(): Promise<void> {

    setLoading(true);
    setMessage("");

    try {

      const response =
        await fetch(
          "/api/admin/settle",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              matchId,
              homeScore,
              awayScore,
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {

        throw new Error(
          result.error ??
            "Settlement failed.",
        );

      }

      setMessage(
        "Settlement completed successfully.",
      );

    } catch (error: unknown) {

      if (error instanceof Error) {

        setMessage(
          error.message,
        );

      } else {

        setMessage(
          "Settlement failed.",
        );

      }

    } finally {

      setLoading(false);

    }

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Trophy className="h-5 w-5" />

          Run Settlement

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        <div className="grid grid-cols-2 gap-4">

          <Input
            type="number"
            value={homeScore}
            onChange={(event) =>
              setHomeScore(
                Number(
                  event.target.value,
                ),
              )
            }
            placeholder="Home Score"
          />

          <Input
            type="number"
            value={awayScore}
            onChange={(event) =>
              setAwayScore(
                Number(
                  event.target.value,
                ),
              )
            }
            placeholder="Away Score"
          />

        </div>

        <Button
          className="w-full"
          disabled={loading}
          onClick={runSettlement}
        >

          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Settlement...
            </>
          ) : (
            "Run Settlement"
          )}

        </Button>

        {message !== "" && (

          <p className="text-sm text-muted-foreground">

            {message}

          </p>

        )}

      </CardContent>

    </Card>

  );

}