import { readElfs } from './common'

export default function () {
  const elfs = readElfs()
  let mostCalories = 0

  elfs.forEach((elf) => {
    const calories = elf.getCalories()
    if (calories > mostCalories) {
      mostCalories = calories
    }
  })

  return mostCalories
}
