import { readFileSync } from "fs";

export type OpponentKey = "A" | "B" | "C";

export type Hand = "ROCK" | "PAPER" | "SCISSORS";

export type Result = "WIN" | "LOSE" | "DRAW";

export const OpponentHand: { [Key in OpponentKey]: Hand } = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
} as const;

export const ResultScoreMap: { [Key in Result]: number } = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
} as const;

export const HandScoreMap: { [Key in Hand]: number } = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

export function readStrategy() {
  const file = readFileSync("./src/2022/day2/input.txt", "utf-8");
  return file.split("\n");
}
