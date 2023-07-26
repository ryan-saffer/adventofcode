import { readFile } from 'fs/promises'

export async function readInput() {
	return (await readFile('./src/2022/day3/input.txt')).toString().split('\n')
}

export function getPriority(charCode: number) {
	if (charCode >= 65 && charCode <= 90) {
		// A - Z
		return charCode - 38
	} else {
		// a - z
		return charCode - 96
	}
}
