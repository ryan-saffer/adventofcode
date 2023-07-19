import {
  Hand,
  OpponentHand,
  OpponentKey,
  PointsMap,
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

    score += PointsMap[myHand];
    if (result === "second") score += 6;
    if (result === "draw") score += 3;
  });

  return score;
}

export function calculateWinner(firstHand: Hand, secondHand: Hand) {
  if (firstHand === secondHand) {
    return "draw";
  }
  if (firstHand === "ROCK") {
    if (secondHand === "SCISSORS") return "first";
    if (secondHand === "PAPER") return "second";
  }

  if (firstHand === "PAPER") {
    if (secondHand === "ROCK") return "first";
    if (secondHand === "SCISSORS") return "second";
  }

  if (firstHand === "SCISSORS") {
    if (secondHand === "PAPER") return "first";
    if (secondHand === "ROCK") return "second";
  }

  throw new Error("unreachable scenario");
}
