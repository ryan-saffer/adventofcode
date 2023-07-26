import { getPriority, readInput } from './common'

export default async function () {
    const input = await readInput()

    const badges: string[] = []

    for (let i = 0; i < input.length; i += 3) {
        const first = input[i]
        const second = input[i + 1]
        const third = input[i + 2]

        for (let j = 0; j < first.length; j++) {
            const char = first.charAt(j)
            if (second.includes(char) && third.includes(char)) {
                badges.push(char)
                break
            }
        }
    }

    return badges.reduce((sum, curr) => sum + getPriority(curr.charCodeAt(0)), 0)
}
