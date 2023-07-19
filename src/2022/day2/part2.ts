import {
  Hand,
  HandScoreMap,
  OpponentHand,
  OpponentKey,
  Result,
  ResultScoreMap,
  readStrategy,
} from "./common";

type ResultKey = "X" | "Y" | "Z";

const RequiredOutcomeMap: { [Key in ResultKey]: Result } = {
  X: "LOSE",
  Y: "DRAW",
  Z: "WIN",
} as const;

export default function () {
  const input = readStrategy();

  let score = 0;

  input.forEach((round) => {
    const [opponent, required] = round.split(" ") as [OpponentKey, ResultKey];

    const opponentHand = OpponentHand[opponent];
    const requiredResult = RequiredOutcomeMap[required];

    const requiredMove = calculateRequiredMove(opponentHand, requiredResult);

    score += ResultScoreMap[requiredResult];
    score += HandScoreMap[requiredMove];
  });

  return score;
}

function calculateRequiredMove(opponentHand: Hand, requiredResult: Result) {
  if (requiredResult === "DRAW") return opponentHand;

  if (requiredResult === "WIN") {
    switch (opponentHand) {
      case "ROCK":
        return "PAPER";
      case "PAPER":
        return "SCISSORS";
      case "SCISSORS":
        return "ROCK";
    }
  }

  if (requiredResult === "LOSE") {
    switch (opponentHand) {
      case "ROCK":
        return "SCISSORS";
      case "PAPER":
        return "ROCK";
      case "SCISSORS":
        return "PAPER";
    }
  }

  throw new Error("unreachable");
}
