import { readFileSync } from "fs";
import { Elf } from "../common";

function readElfs() {
  const file = readFileSync("./src/2022/day1/input.txt", "utf-8");

  const input = file.split("\n");

  const elfs: Elf[] = [];
  let elf = new Elf();
  input.forEach((value) => {
    if (value !== "") {
      elf.addItemToBackpack(parseInt(value));
    } else {
      elfs.push(elf);
      elf = new Elf();
    }
  });

  return elfs;
}

export function part1() {
  const elfs = readElfs();
  let mostCalories = 0;
  let mostCaloriesElf = elfs[0];

  elfs.forEach((elf) => {
    const calories = elf.getCalories();
    if (calories > mostCalories) {
      mostCaloriesElf = elf;
      mostCalories = calories;
    }
  });

  return mostCalories;
}

export function part2() {
  const elfs = readElfs();

  let mostCaloriesArr = [
    elfs[0].getCalories(),
    elfs[1].getCalories(),
    elfs[2].getCalories(),
  ].sort();

  elfs.forEach((elf) => {
    const calories = elf.getCalories();
    if (isTopThree(calories, mostCaloriesArr)) {
      mostCaloriesArr = addToTopThree(calories, mostCaloriesArr);
    }
  });

  return mostCaloriesArr.reduce((sum, curr) => sum + curr, 0);
}

function isTopThree(calories: number, topThree: number[]) {
  for (const val of topThree) {
    if (calories > val) {
      return true;
    }
    return false;
  }
}

function addToTopThree(calories: number, topThree: number[]) {
  const newTopThree = [...topThree];
  newTopThree[0] = calories;
  return newTopThree.sort();
}
