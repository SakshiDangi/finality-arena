import type {
  MatchId,
} from "@finality/shared";

export interface PredictionRequest {

  readonly matchId: MatchId;

  readonly homeScore: number;

  readonly awayScore: number;

}