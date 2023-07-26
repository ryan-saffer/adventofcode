import { readFileSync } from 'fs'

class Elf {
	#backpack: number[] = []
	#calories: number | undefined

	addItemToBackpack(item: number) {
		this.#backpack.push(item)
	}

	getCalories() {
		if (this.#calories) return this.#calories
		this.#calories = this.#backpack.reduce((sum, curr) => sum + curr, 0)
		return this.#calories
	}
}

export function readElfs() {
	const file = readFileSync('./src/2022/day1/input.txt', 'utf-8')

	const input = file.split('\n')

	const elfs: Elf[] = []
	let elf = new Elf()
	input.forEach(value => {
		if (value !== '') {
			elf.addItemToBackpack(parseInt(value))
		} else {
			elfs.push(elf)
			elf = new Elf()
		}
	})

	return elfs
}
