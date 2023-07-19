import {
  Hand,
  HandScoreMap,
  OpponentHand,
  OpponentKey,
  Result,
  readStrategy,
} from "./common";

type MyKey = "X" | "Y" | "Z";

const MyHand: { [Key in MyKey]: Hand } = {
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
} as const;

export default function () {
  const input = readStrategy();

  let score = 0;

  input.forEach((line) => {
    const [opponent, me] = line.split(" ") as [OpponentKey, MyKey];

    const opponentHand = OpponentHand[opponent];
    const myHand = MyHand[me];

    const result = calculateWinner(opponentHand, myHand);

    score += HandScoreMap[myHand];
    if (result === "WIN") score += 6;
    if (result === "DRAW") score += 3;
  });

  return score;
}

export function calculateWinner(opponentHand: Hand, yourHand: Hand): Result {
  if (opponentHand === yourHand) {
    return "DRAW";
  }
  if (opponentHand === "ROCK") {
    if (yourHand === "SCISSORS") return "LOSE";
    if (yourHand === "PAPER") return "WIN";
  }

  if (opponentHand === "PAPER") {
    if (yourHand === "ROCK") return "LOSE";
    if (yourHand === "SCISSORS") return "WIN";
  }

  if (opponentHand === "SCISSORS") {
    if (yourHand === "PAPER") return "LOSE";
    if (yourHand === "ROCK") return "WIN";
  }

  throw new Error("unreachable");
}
