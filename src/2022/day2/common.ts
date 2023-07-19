import { readFileSync } from "fs";

export type OpponentKey = "A" | "B" | "C";

export type Hand = "ROCK" | "PAPER" | "SCISSORS";

export const OpponentHand: { [Key in OpponentKey]: Hand } = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
} as const;

export const PointsMap: { [Key in Hand]: number } = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
} as const;

export function readStrategy() {
  const file = readFileSync("./src/2022/day2/input.txt", "utf-8");
  return file.split("\n");
}
