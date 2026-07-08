import PredictClient from "@/components/prediction/predict-client";

const demoMatch = {
  id: "arsenal-chelsea",

  homeTeam: {
    id: "arsenal",
    name: "Arsenal",
    shortName: "ARS",
  },

  awayTeam: {
    id: "chelsea",
    name: "Chelsea",
    shortName: "CHE",
  },

  startTime: new Date().toISOString(),

  status: "scheduled",
};

export default function PredictPage() {
  return (
    <PredictClient
      match={demoMatch as never}
    />
  );
}