import { readElfs } from './common'

export default function () {
	const elfs = readElfs()

	let mostCaloriesArr = [
		elfs[0].getCalories(),
		elfs[1].getCalories(),
		elfs[2].getCalories(),
	].sort()

	elfs.forEach(elf => {
		const calories = elf.getCalories()
		if (isTopThree(calories, mostCaloriesArr)) {
			mostCaloriesArr = addToTopThree(calories, mostCaloriesArr)
		}
	})

	return mostCaloriesArr.reduce((sum, curr) => sum + curr, 0)
}

function isTopThree(calories: number, topThree: number[]) {
	for (const val of topThree) {
		if (calories > val) {
			return true
		}
		return false
	}
}

function addToTopThree(calories: number, topThree: number[]) {
	const newTopThree = [...topThree]
	newTopThree[0] = calories
	return newTopThree.sort()
}
