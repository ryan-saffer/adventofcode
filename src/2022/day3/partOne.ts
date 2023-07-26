import { getPriority, readInput } from './common'

export default async function () {
	const lines = await readInput()

	const matchingItems: string[] = []

	for (const line of lines) {
		const firstHalf = line.slice(0, line.length / 2)
		const secondHalf = line.slice(line.length / 2, line.length)

		for (let i = 0; i < secondHalf.length; i++) {
			const char = secondHalf.charAt(i)
			if (firstHalf.includes(char)) {
				matchingItems.push(char)
				break
			}
		}
	}

	return matchingItems.reduce((sum, curr) => sum + getPriority(curr.charCodeAt(0)), 0)
}
