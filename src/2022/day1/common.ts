import { readFileSync } from "fs";
import { Elf } from "../common";

export function readElfs() {
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
