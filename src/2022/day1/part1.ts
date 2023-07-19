import { readElfs } from "./common";

export default function () {
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
